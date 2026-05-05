import { create } from 'zustand';
import { fqConcepts, fqAchievements } from '../data/fqData';

const useFQStore = create((set, get) => ({
  // ── Core state ──
  concepts:     fqConcepts.map(c => ({ ...c })),
  achievements: fqAchievements.map(a => ({ ...a })),
  focusScore:   72,
  streak:       8,
  totalXP:      1340,
  sessionsPlayed: 3,
  zonesVisited:   new Set(['fq1','fq2','fq3']),
  newlyUnlocked:  null,

  // ── Computed ──
  getOverallMastery: () => {
    const { concepts } = get();
    return Math.round(concepts.reduce((s, c) => s + c.mastery, 0) / concepts.length);
  },

  // ── Session complete ──
  completeSession: ({ conceptId, focusGained, masteryGain, xpGained, perfect, noHints }) => {
    const { concepts, achievements, focusScore, totalXP, sessionsPlayed, zonesVisited, streak } = get();

    // Update concept mastery
    const newConcepts = concepts.map(c =>
      c.id === conceptId
        ? { ...c, mastery: Math.min(100, c.mastery + masteryGain) }
        : c
    );

    // Unlock next concepts
    newConcepts.forEach(c => {
      if (!c.unlocked && c.requires.every(r => newConcepts.find(x => x.id === r)?.mastery >= 50)) {
        c.unlocked = true;
      }
    });

    const newFocus = Math.min(100, Math.round((focusScore + focusGained) / 2));
    const newXP = totalXP + xpGained;
    const newSessions = sessionsPlayed + 1;
    const newZones = new Set([...zonesVisited, conceptId]);
    const newStreak = streak; // simplified

    // Check achievements
    let newlyUnlocked = null;
    const newAchievements = achievements.map(a => {
      if (a.unlocked) return a;
      let unlock = false;
      if (a.id === 'fqa1' && newSessions >= 1) unlock = true;
      if (a.id === 'fqa2' && focusGained >= 80) unlock = true;
      if (a.id === 'fqa5' && newZones.size >= 5) unlock = true;
      if (a.id === 'fqa6' && perfect) unlock = true;
      if (a.id === 'fqa7' && newStreak >= 7) unlock = true;
      if (a.id === 'fqa8' && get().getOverallMastery() >= 90) unlock = true;
      if (unlock) { newlyUnlocked = { ...a, unlocked: true }; return { ...a, unlocked: true }; }
      return a;
    });

    set({
      concepts: newConcepts,
      achievements: newAchievements,
      focusScore: newFocus,
      totalXP: newXP,
      sessionsPlayed: newSessions,
      zonesVisited: newZones,
      streak: newStreak,
      newlyUnlocked,
    });
  },

  clearNewlyUnlocked: () => set({ newlyUnlocked: null }),
}));

export default useFQStore;
