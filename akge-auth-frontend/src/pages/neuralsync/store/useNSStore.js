import { create } from 'zustand';
import { levels } from '../data/nsData';

const useNSStore = create((set, get) => ({
  // ── Game state ──
  currentLevelIdx: 0,
  nodes:           [],
  connections:     [],   // { id, fromId, toId, correct }
  selectedNodeId:  null,
  score:           0,
  attempts:        0,
  gamePhase:       'menu', // menu | playing | result
  shakeNodeId:     null,
  hintText:        null,
  timeLeft:        0,
  masteryGained:   0,
  totalMastery:    62,

  // ── Init level ──
  initLevel: (levelIdx) => {
    const level = levels[levelIdx];
    if (!level) return;
    set({
      currentLevelIdx: levelIdx,
      nodes: level.nodes.map(n => ({ ...n, state: 'idle' })), // idle | selected | connected | wrong
      connections: [],
      selectedNodeId: null,
      score: 0,
      attempts: 0,
      gamePhase: 'playing',
      shakeNodeId: null,
      hintText: null,
      timeLeft: level.mode === 'challenge' ? 120 : 0,
      masteryGained: 0,
    });
  },

  // ── Select node ──
  selectNode: (nodeId) => {
    const { selectedNodeId, nodes, connections, currentLevelIdx, attempts } = get();
    const level = levels[currentLevelIdx];

    // Already connected — ignore
    const node = nodes.find(n => n.id === nodeId);
    if (node?.state === 'connected') return;

    // No selection yet → select this node
    if (!selectedNodeId) {
      set({
        selectedNodeId: nodeId,
        nodes: nodes.map(n => n.id === nodeId ? { ...n, state: 'selected' } : n),
        hintText: null,
      });
      return;
    }

    // Same node clicked → deselect
    if (selectedNodeId === nodeId) {
      set({
        selectedNodeId: null,
        nodes: nodes.map(n => n.id === nodeId ? { ...n, state: 'idle' } : n),
      });
      return;
    }

    // Attempt connection
    const pair = [selectedNodeId, nodeId].sort().join('-');
    const reversePair = [nodeId, selectedNodeId].sort().join('-');
    const validPairs = level.validConnections.map(([a, b]) => [a, b].sort().join('-'));
    const isValid = validPairs.includes(pair) || validPairs.includes(reversePair);

    // Already connected?
    const alreadyConnected = connections.some(c =>
      (c.fromId === selectedNodeId && c.toId === nodeId) ||
      (c.fromId === nodeId && c.toId === selectedNodeId)
    );
    if (alreadyConnected) {
      set({ selectedNodeId: null, nodes: nodes.map(n => n.state === 'selected' ? { ...n, state: 'idle' } : n) });
      return;
    }

    const newAttempts = attempts + 1;

    if (isValid) {
      const newConnections = [...connections, { id: `${selectedNodeId}-${nodeId}`, fromId: selectedNodeId, toId: nodeId, correct: true }];
      const newNodes = nodes.map(n =>
        n.id === selectedNodeId || n.id === nodeId ? { ...n, state: 'connected' } : n
      );
      const newScore = get().score + 10;

      // Check level complete
      const totalValid = level.validConnections.length;
      const done = newConnections.filter(c => c.correct).length >= totalValid;
      const gained = done ? Math.round((newScore / (totalValid * 10)) * 20) : 0;

      set({
        nodes: newNodes,
        connections: newConnections,
        selectedNodeId: null,
        score: newScore,
        attempts: newAttempts,
        hintText: null,
        gamePhase: done ? 'result' : 'playing',
        masteryGained: gained,
        totalMastery: done ? Math.min(100, get().totalMastery + gained) : get().totalMastery,
      });
    } else {
      // Wrong connection
      const hintKey = pair;
      const hint = level.hints?.[hintKey] ?? level.hints?.[reversePair] ?? 'Think about how these concepts relate to each other.';
      set({
        shakeNodeId: nodeId,
        hintText: hint,
        attempts: newAttempts,
        nodes: nodes.map(n => n.id === selectedNodeId ? { ...n, state: 'idle' } : n),
        selectedNodeId: null,
      });
      setTimeout(() => set({ shakeNodeId: null }), 600);
    }
  },

  resetShake: () => set({ shakeNodeId: null }),
  clearHint:  () => set({ hintText: null }),
  setPhase:   (phase) => set({ gamePhase: phase }),
  tickTimer:  () => set(s => {
    if (s.timeLeft <= 1) return { timeLeft: 0, gamePhase: 'result' };
    return { timeLeft: s.timeLeft - 1 };
  }),

  nextLevel: () => {
    const next = get().currentLevelIdx + 1;
    if (next < levels.length) get().initLevel(next);
    else set({ gamePhase: 'menu' });
  },

  retry: () => get().initLevel(get().currentLevelIdx),
  goMenu: () => set({ gamePhase: 'menu' }),
}));

export default useNSStore;
