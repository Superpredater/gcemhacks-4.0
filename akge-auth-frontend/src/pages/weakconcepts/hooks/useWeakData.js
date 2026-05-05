import { useMemo } from 'react';
import { students, concepts, scores, dependencies } from '../data/weakData';

export function useWeakData() {
  return useMemo(() => {
    // For each concept: % students below 50
    const conceptStats = concepts.map(c => {
      const vals = students.map(s => scores[s.id]?.[c.id] ?? 0);
      const avg = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
      const weakCount = vals.filter(v => v < 50).length;
      const weakPct = Math.round((weakCount / students.length) * 100);
      let severity = 'mild';
      if (weakPct > 60) severity = 'critical';
      else if (weakPct > 40) severity = 'moderate';
      // impact score = weakPct * concept.impact / 10
      const impactScore = Math.round((weakPct * c.impact) / 10);
      return { ...c, avg, weakCount, weakPct, severity, impactScore };
    });

    // Only concepts with >40% weak
    const weakConcepts = conceptStats
      .filter(c => c.weakPct > 40)
      .sort((a, b) => b.impactScore - a.impactScore);

    // All concepts sorted by impact for ROI ranking
    const roiRanking = [...conceptStats]
      .filter(c => c.weakPct > 0)
      .sort((a, b) => b.impactScore - a.impactScore)
      .slice(0, 8);

    // Student segmentation
    const studentAvgs = students.map(s => {
      const vals = concepts.map(c => scores[s.id]?.[c.id] ?? 0);
      const avg = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
      const weakConceptCount = concepts.filter(c => (scores[s.id]?.[c.id] ?? 0) < 50).length;
      let segment = 'recoverable';
      if (avg < 45 || weakConceptCount >= 7) segment = 'highRisk';
      else if (avg < 65 || weakConceptCount >= 4) segment = 'moderate';
      return { ...s, avg, weakConceptCount, segment };
    });

    const segmentation = {
      highRisk:    studentAvgs.filter(s => s.segment === 'highRisk'),
      moderate:    studentAvgs.filter(s => s.segment === 'moderate'),
      recoverable: studentAvgs.filter(s => s.segment === 'recoverable'),
    };

    // Drill-down for a concept
    const getDrillDown = (conceptId) =>
      students
        .map(s => ({ ...s, score: scores[s.id]?.[conceptId] ?? 0 }))
        .sort((a, b) => a.score - b.score);

    // Learning pattern clusters (concepts that are weak together)
    const clusterMap = {};
    students.forEach(s => {
      const weakIds = concepts.filter(c => (scores[s.id]?.[c.id] ?? 0) < 50).map(c => c.id);
      if (weakIds.length >= 2) {
        const key = weakIds.slice(0, 3).sort().join('+');
        clusterMap[key] = (clusterMap[key] || 0) + 1;
      }
    });
    const clusters = Object.entries(clusterMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([key, count]) => ({
        concepts: key.split('+').map(id => concepts.find(c => c.id === id)?.name ?? id),
        count,
      }));

    return { conceptStats, weakConcepts, roiRanking, segmentation, getDrillDown, clusters };
  }, []);
}
