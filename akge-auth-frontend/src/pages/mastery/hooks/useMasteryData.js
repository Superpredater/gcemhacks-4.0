import { useMemo } from 'react';
import { students, concepts, scores } from '../data/mockData';

export function useMasteryData() {
  return useMemo(() => {
    // Class average
    const allScores = students.flatMap(s =>
      concepts.map(c => scores[s.id]?.[c.id] ?? 0)
    );
    const classAverage = Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length);

    // Mastery overview buckets
    const studentAverages = students.map(s => {
      const vals = concepts.map(c => scores[s.id]?.[c.id] ?? 0);
      return { ...s, avg: Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) };
    });

    const high   = studentAverages.filter(s => s.avg >= 80);
    const medium = studentAverages.filter(s => s.avg >= 50 && s.avg < 80);
    const low    = studentAverages.filter(s => s.avg < 50);

    const overviewData = [
      { name: 'High (80–100)', count: high.length,   fill: '#22c55e' },
      { name: 'Medium (50–79)', count: medium.length, fill: '#eab308' },
      { name: 'Low (<50)',      count: low.length,    fill: '#ef4444' },
    ];

    // Segmentation
    const segmentation = {
      advanced: high,
      average:  medium,
      atRisk:   low,
    };

    // Concept heatmap: for each concept, % of students below 50
    const heatmapData = concepts.map(c => {
      const conceptScores = students.map(s => scores[s.id]?.[c.id] ?? 0);
      const avg = Math.round(conceptScores.reduce((a, b) => a + b, 0) / conceptScores.length);
      const weakCount = conceptScores.filter(v => v < 50).length;
      const weakPct = Math.round((weakCount / students.length) * 100);
      return { ...c, avg, weakCount, weakPct, isWeak: weakPct > 40 };
    });

    // Drill-down: for a given conceptId, return student scores sorted
    const getDrillDown = (conceptId) =>
      students
        .map(s => ({ ...s, score: scores[s.id]?.[conceptId] ?? 0 }))
        .sort((a, b) => b.score - a.score);

    return { classAverage, overviewData, segmentation, heatmapData, getDrillDown, studentAverages };
  }, []);
}
