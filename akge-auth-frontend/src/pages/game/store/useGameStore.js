import { create } from 'zustand';
import { levels, leaderboardData, CURRENT_USER_ID } from '../data/gameData';

const useGameStore = create((set, get) => ({
  // ── Progress ──
  completedLevels: ['l1', 'l2'],   // already completed
  unlockedLevels:  ['l1', 'l2', 'l3'],  // available to play
  mastery: { l1: 92, l2: 85, l3: 72, l4: 65 },
  xp: 1240,
  streak: 12,
  currentMode: 'practice',

  // ── Leaderboard ──
  leaderboard: leaderboardData.map(u => ({ ...u })),

  // ── Game session ──
  lastResult: null,

  setMode: (mode) => set({ currentMode: mode }),

  completeLevel: (levelId, score, xpGained) => {
    const { completedLevels, unlockedLevels, mastery, xp, leaderboard } = get();

    // Mark completed
    const newCompleted = completedLevels.includes(levelId)
      ? completedLevels
      : [...completedLevels, levelId];

    // Unlock next levels
    const level = levels.find(l => l.id === levelId);
    const newUnlocked = [...new Set([...unlockedLevels])];
    levels.forEach(l => {
      if (l.requires.every(r => newCompleted.includes(r)) && !newUnlocked.includes(l.id)) {
        newUnlocked.push(l.id);
      }
    });

    // Update mastery
    const newMastery = { ...mastery, [levelId]: Math.min(100, (mastery[levelId] ?? 0) + Math.round(score * 0.3)) };

    // Update XP
    const newXp = xp + xpGained;

    // Update leaderboard
    const newLeaderboard = leaderboard.map(u =>
      u.id === CURRENT_USER_ID ? { ...u, xp: newXp } : u
    ).sort((a, b) => b.xp - a.xp).map((u, i) => ({ ...u, rank: i + 1 }));

    set({
      completedLevels: newCompleted,
      unlockedLevels: newUnlocked,
      mastery: newMastery,
      xp: newXp,
      leaderboard: newLeaderboard,
      lastResult: { levelId, score, xpGained, newMastery: newMastery[levelId] },
    });
  },

  getLevelStatus: (levelId) => {
    const { completedLevels, unlockedLevels } = get();
    if (completedLevels.includes(levelId)) return 'completed';
    if (unlockedLevels.includes(levelId)) return 'unlocked';
    return 'locked';
  },
}));

export default useGameStore;
