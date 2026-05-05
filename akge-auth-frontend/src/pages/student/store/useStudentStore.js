import { create } from 'zustand';
import { concepts as initConcepts, allAchievements, studentProfile, quizQuestions } from '../data/studentData';

const useStudentStore = create((set, get) => ({
  // ── Profile ──
  profile: { ...studentProfile },
  visitedModules: new Set(['dashboard']),

  markVisited: (mod) => set(s => {
    const v = new Set(s.visitedModules);
    v.add(mod);
    const newXp = v.size >= 6 ? s.profile.xp + 100 : s.profile.xp;
    return { visitedModules: v, profile: { ...s.profile, xp: newXp } };
  }),

  // ── Concepts ──
  concepts: initConcepts.map(c => ({ ...c })),

  updateMastery: (id, delta) => set(s => ({
    concepts: s.concepts.map(c =>
      c.id === id ? { ...c, mastery: Math.min(100, Math.max(0, c.mastery + delta)) } : c
    ),
  })),

  // ── Assessment ──
  assessmentAnswers: {},
  assessmentSubmitted: false,
  assessmentScore: null,

  setAnswer: (qId, idx) => set(s => ({ assessmentAnswers: { ...s.assessmentAnswers, [qId]: idx } })),

  submitAssessment: () => {
    const { assessmentAnswers } = get();
    const correct = quizQuestions.filter(q => assessmentAnswers[q.id] === q.correct).length;
    const score = Math.round((correct / quizQuestions.length) * 100);
    set(s => ({
      assessmentSubmitted: true,
      assessmentScore: score,
      profile: { ...s.profile, xp: s.profile.xp + score },
    }));
    // Update mastery for answered concepts
    quizQuestions.forEach(q => {
      const correct = get().assessmentAnswers[q.id] === q.correct;
      get().updateMastery(q.concept, correct ? 3 : -2);
    });
  },

  resetAssessment: () => set({ assessmentAnswers: {}, assessmentSubmitted: false, assessmentScore: null }),

  // ── Achievements ──
  achievements: allAchievements.map(a => ({ ...a })),
  newlyUnlocked: null,

  checkAndUnlock: (achievementId) => set(s => {
    const already = s.achievements.find(a => a.id === achievementId)?.unlocked;
    if (already) return {};
    const updated = s.achievements.map(a =>
      a.id === achievementId ? { ...a, unlocked: true } : a
    );
    const badge = updated.find(a => a.id === achievementId);
    return {
      achievements: updated,
      newlyUnlocked: badge,
      profile: { ...s.profile, xp: s.profile.xp + (badge?.xp ?? 0) },
    };
  }),

  clearNewlyUnlocked: () => set({ newlyUnlocked: null }),

  // ── Learning Path ──
  activeLpId: 'lp2',
  setActiveLp: (id) => set({ activeLpId: id }),
}));

export default useStudentStore;
