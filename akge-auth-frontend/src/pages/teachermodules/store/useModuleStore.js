import { create } from 'zustand';
import { students, concepts, initialQuestions, subjects } from '../data/moduleData';

// ─── Pattern classifier ───────────────────────────────────────────────────────
function classifyPattern(s) {
  if (s.avg >= 75 && s.sessions >= 6) return 'Fast Learner';
  if (s.avg >= 60 && s.streak >= 4)   return 'Slow Consistent';
  if (s.avg >= 50)                     return 'Average';
  return 'Inconsistent';
}

function classifyArchetype(s) {
  if (s.avg >= 80 && s.streak < 5)    return 'Fast Careless';
  if (s.avg >= 70 && s.streak >= 6)   return 'Fast Consistent';
  if (s.avg >= 55 && s.streak >= 4)   return 'Slow Consistent';
  if (s.avg >= 45)                     return 'Average';
  return 'Struggling';
}

// ─── Initial derived data ─────────────────────────────────────────────────────
const initPatterns = () => {
  const map = {};
  students.forEach(s => {
    const p = classifyPattern(s);
    if (!map[p]) map[p] = [];
    map[p].push(s);
  });
  return map;
};

const initArchetypes = () => {
  const map = {};
  students.forEach(s => {
    const a = classifyArchetype(s);
    if (!map[a]) map[a] = [];
    map[a].push(s);
  });
  return map;
};

const initRecs = () => [
  { id: 1, action: 'Re-teach Algebra Basics',           concept: 'c3', priority: 'critical', impact: 18, status: 'pending' },
  { id: 2, action: 'Assign Trigonometry practice set',  concept: 'c6', priority: 'high',     impact: 15, status: 'pending' },
  { id: 3, action: 'Schedule Calculus revision',        concept: 'c7', priority: 'high',     impact: 12, status: 'pending' },
  { id: 4, action: 'Peer tutoring for at-risk students',concept: 'c5', priority: 'medium',   impact: 10, status: 'pending' },
  { id: 5, action: 'Assign enrichment to top students', concept: 'c1', priority: 'low',      impact: 5,  status: 'pending' },
  { id: 6, action: 'Daily 20-min review sessions',      concept: 'c4', priority: 'medium',   impact: 8,  status: 'pending' },
];

const initDifficultyMap = () => {
  const map = {};
  initialQuestions.forEach(q => { map[q.id] = q.difficulty; });
  return map;
};

const initTagMap = () => {
  const map = {};
  initialQuestions.forEach(q => { map[q.id] = q.concept; });
  return map;
};

// ─── Store ────────────────────────────────────────────────────────────────────
const useModuleStore = create((set, get) => ({
  // ── Learning Patterns ──
  patternData:     initPatterns(),
  selectedPattern: null,
  setSelectedPattern: (p) => set({ selectedPattern: p }),

  // ── Archetypes ──
  archetypes:       initArchetypes(),
  selectedArchetype: null,
  setSelectedArchetype: (a) => set({ selectedArchetype: a }),

  // ── Recommendations ──
  recommendations: initRecs(),
  assignPractice:  (id) => set(s => ({ recommendations: s.recommendations.map(r => r.id === id ? { ...r, status: 'practice-assigned' } : r) })),
  scheduleRevision:(id) => set(s => ({ recommendations: s.recommendations.map(r => r.id === id ? { ...r, status: 'revision-scheduled' } : r) })),
  markComplete:    (id) => set(s => ({ recommendations: s.recommendations.map(r => r.id === id ? { ...r, status: 'completed' } : r) })),
  resetRec:        (id) => set(s => ({ recommendations: s.recommendations.map(r => r.id === id ? { ...r, status: 'pending' } : r) })),

  // ── Question Bank ──
  questions:        [...initialQuestions],
  selectedQuestions:[],
  qSearch:          '',
  qFilterConcept:   'all',
  qFilterDiff:      'all',
  setQSearch:       (v) => set({ qSearch: v }),
  setQFilterConcept:(v) => set({ qFilterConcept: v }),
  setQFilterDiff:   (v) => set({ qFilterDiff: v }),
  addQuestion: (q) => set(s => ({ questions: [...s.questions, { ...q, id: Date.now(), successRate: 50, tags: [] }] })),
  editQuestion:(id, updates) => set(s => ({ questions: s.questions.map(q => q.id === id ? { ...q, ...updates } : q) })),
  deleteQuestion:(id) => set(s => ({ questions: s.questions.filter(q => q.id !== id), difficultyMap: { ...s.difficultyMap, [id]: undefined } })),
  toggleSelectQ:(id) => set(s => ({
    selectedQuestions: s.selectedQuestions.includes(id)
      ? s.selectedQuestions.filter(x => x !== id)
      : [...s.selectedQuestions, id],
  })),

  // ── Concept Tagging ──
  tags:          concepts.map(c => ({ id: c.id, name: c.name, color: '#3b82f6' })),
  questionTagMap: initTagMap(),
  selectedTag:   null,
  setSelectedTag:(t) => set({ selectedTag: t }),
  addTag:   (name) => set(s => ({ tags: [...s.tags, { id: `tag_${Date.now()}`, name, color: '#8b5cf6' }] })),
  deleteTag:(id)   => set(s => ({ tags: s.tags.filter(t => t.id !== id) })),
  assignTag:(qId, tagId) => set(s => ({ questionTagMap: { ...s.questionTagMap, [qId]: tagId } })),

  // ── Difficulty ──
  difficultyMap: initDifficultyMap(),
  setDifficulty:(id, diff) => set(s => ({ difficultyMap: { ...s.difficultyMap, [id]: diff } })),
  bulkSetDifficulty:(ids, diff) => set(s => {
    const updated = { ...s.difficultyMap };
    ids.forEach(id => { updated[id] = diff; });
    return { difficultyMap: updated };
  }),
  autoAdjust: () => set(s => {
    const updated = { ...s.difficultyMap };
    s.questions.forEach(q => {
      if (q.successRate > 80) updated[q.id] = 'Hard';
      else if (q.successRate > 55) updated[q.id] = 'Medium';
      else updated[q.id] = 'Easy';
    });
    return { difficultyMap: updated };
  }),

  // ── Subject Settings ──
  subjectConfig: subjects.map(s => ({ ...s })),
  saveSubjectConfig: (config) => set({ subjectConfig: config }),
  updateSubject: (id, updates) => set(s => ({
    subjectConfig: s.subjectConfig.map(sub => sub.id === id ? { ...sub, ...updates } : sub),
  })),

  // ── System Settings ──
  settings: {
    weakThreshold:  50,
    riskThreshold:  40,
    emailAlerts:    true,
    weeklyReport:   false,
    adaptiveDiff:   true,
    peerCollab:     false,
    spacedRep:      true,
    darkMode:       true,
    role:           'teacher',
  },
  updateSettings: (updates) => set(s => ({ settings: { ...s.settings, ...updates } })),
  resetSettings:  () => set({ settings: {
    weakThreshold: 50, riskThreshold: 40, emailAlerts: true, weeklyReport: false,
    adaptiveDiff: true, peerCollab: false, spacedRep: true, darkMode: true, role: 'teacher',
  }}),
}));

export default useModuleStore;
