import { create } from 'zustand';
import { concepts, dependencies, students, scores } from '../data/prereqData';

// ─── helpers ─────────────────────────────────────────────────────────────────
function calcImpactScore(concept) {
  const outEdges = dependencies.filter(d => d.from === concept.id);
  const inEdges  = dependencies.filter(d => d.to   === concept.id);
  const depWeight = outEdges.reduce((s, d) => s + d.weight, 0) + inEdges.reduce((s, d) => s + d.weight, 0);
  const affectedStudents = students.filter(s => (scores[s.id]?.[concept.id] ?? 0) < 50).length;
  return Math.round((affectedStudents / students.length) * 50 + depWeight * 10 + concept.importance * 3);
}

function buildGapData(masteryOverrides = {}) {
  return concepts.map(c => {
    const mastery = masteryOverrides[c.id] ?? c.mastery;
    const isGap = mastery < 50;
    const isPartial = mastery >= 50 && mastery < 70;
    const affectedStudents = students.filter(s => (scores[s.id]?.[c.id] ?? 0) < 50);
    const impactScore = calcImpactScore({ ...c, mastery });
    const prereqs = dependencies.filter(d => d.to === c.id).map(d => {
      const prereqConcept = concepts.find(x => x.id === d.from);
      const prereqMastery = masteryOverrides[d.from] ?? prereqConcept?.mastery ?? 0;
      return { ...prereqConcept, mastery: prereqMastery, weight: d.weight, isGap: prereqMastery < 50 };
    });
    const dependents = dependencies.filter(d => d.from === c.id).map(d => {
      const depConcept = concepts.find(x => x.id === d.to);
      const depMastery = masteryOverrides[d.to] ?? depConcept?.mastery ?? 0;
      return { ...depConcept, mastery: depMastery, weight: d.weight };
    });
    return { ...c, mastery, isGap, isPartial, affectedStudents, impactScore, prereqs, dependents };
  }).sort((a, b) => b.impactScore - a.impactScore);
}

// ─── Zustand store ────────────────────────────────────────────────────────────
const useGapStore = create((set, get) => ({
  // State
  gapData:          buildGapData(),
  selectedConcept:  null,
  selectedStudents: [],
  simMasteries:     {},
  simSessions:      4,
  simConceptId:     'c5',
  isSimulating:     false,
  activeTab:        'overview',

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),

  selectConcept: (concept) => {
    const gapData = get().gapData;
    const full = gapData.find(c => c.id === concept.id) ?? concept;
    const affected = full.affectedStudents ?? [];
    set({ selectedConcept: full, selectedStudents: affected });
  },

  clearSelection: () => set({ selectedConcept: null, selectedStudents: [] }),

  setSimConceptId: (id) => set({ simConceptId: id }),
  setSimSessions:  (n)  => set({ simSessions: n }),

  runSimulation: () => {
    const { simConceptId, simSessions, gapData } = get();
    set({ isSimulating: true });

    // Simulate mastery improvement with cascade
    const overrides = {};
    const simulate = (mastery, sessions) => {
      let r = mastery;
      for (let i = 0; i < sessions; i++) r += (100 - r) * 0.13;
      return Math.min(Math.round(r), 98);
    };

    // Improve selected concept
    const target = concepts.find(c => c.id === simConceptId);
    if (target) {
      overrides[simConceptId] = simulate(target.mastery, simSessions);
      // Cascade: dependents improve by 40% of the gain
      const gain = overrides[simConceptId] - target.mastery;
      dependencies.filter(d => d.from === simConceptId).forEach(d => {
        const dep = concepts.find(c => c.id === d.to);
        if (dep) {
          overrides[d.to] = Math.min(Math.round(dep.mastery + gain * d.weight * 0.4), 98);
        }
      });
    }

    setTimeout(() => {
      set({ simMasteries: overrides, gapData: buildGapData(overrides), isSimulating: false });
    }, 600);
  },

  resetSimulation: () => {
    set({ simMasteries: {}, gapData: buildGapData(), isSimulating: false });
  },

  // Computed helpers
  getGaps:    () => get().gapData.filter(c => c.isGap),
  getPartials:() => get().gapData.filter(c => c.isPartial),
}));

export default useGapStore;
