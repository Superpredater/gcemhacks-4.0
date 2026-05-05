import { useMemo } from 'react';
import { students, concepts, scores, performanceTrend, errorPatterns, timeVsPerformance } from '../data/studentData';

export function useStudentData(studentId) {
  return useMemo(() => {
    const student = students.find(s => s.id === studentId);
    if (!student) return null;

    const studentScores = scores[studentId] ?? {};

    // Overall mastery average
    const masteryValues = concepts.map(c => studentScores[c.id]?.mastery ?? 0);
    const overallMastery = Math.round(masteryValues.reduce((a, b) => a + b, 0) / masteryValues.length);

    // Radar dimensions (average across all concepts)
    const radarMetrics = {
      mastery:   overallMastery,
      accuracy:  Math.round(concepts.map(c => studentScores[c.id]?.accuracy  ?? 0).reduce((a,b)=>a+b,0) / concepts.length),
      retention: Math.round(concepts.map(c => studentScores[c.id]?.retention ?? 0).reduce((a,b)=>a+b,0) / concepts.length),
      speed:     Math.round(concepts.map(c => studentScores[c.id]?.speed     ?? 0).reduce((a,b)=>a+b,0) / concepts.length),
    };

    // Concept-wise mastery for bar chart
    const conceptMastery = concepts.map(c => ({
      name:    c.name,
      id:      c.id,
      mastery: studentScores[c.id]?.mastery ?? 0,
      isWeak:  (studentScores[c.id]?.mastery ?? 0) < 50,
    }));

    // Weakness map — sorted by severity
    const weaknessMap = [...conceptMastery]
      .filter(c => c.mastery < 70)
      .sort((a, b) => a.mastery - b.mastery);

    // Trend data
    const trend = (performanceTrend[studentId] ?? []).map((v, i) => ({
      week: `Wk${i + 1}`,
      score: v,
    }));

    // Velocity = average weekly improvement
    const trendVals = performanceTrend[studentId] ?? [];
    const velocity = trendVals.length > 1
      ? +((trendVals[trendVals.length - 1] - trendVals[0]) / (trendVals.length - 1)).toFixed(1)
      : 0;

    // Last test score = last trend value
    const lastScore = trendVals[trendVals.length - 1] ?? overallMastery;

    // Status
    let status = 'good';
    if (overallMastery < 50) status = 'at-risk';
    else if (overallMastery < 70) status = 'average';

    // Consistency score = 100 - std deviation of trend
    const mean = trendVals.reduce((a, b) => a + b, 0) / (trendVals.length || 1);
    const variance = trendVals.reduce((s, v) => s + (v - mean) ** 2, 0) / (trendVals.length || 1);
    const stdDev = Math.sqrt(variance);
    const consistency = Math.max(0, Math.round(100 - stdDev * 2));

    // Class rank
    const allAverages = students.map(s => {
      const vals = concepts.map(c => scores[s.id]?.[c.id]?.mastery ?? 0);
      return { id: s.id, avg: Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) };
    }).sort((a, b) => b.avg - a.avg);
    const rank = allAverages.findIndex(s => s.id === studentId) + 1;
    const percentile = Math.round(((students.length - rank) / students.length) * 100);

    // Risk prediction
    let riskLevel = 'low';
    let riskWarnings = [];
    if (overallMastery < 40) { riskLevel = 'critical'; riskWarnings = ['Mastery critically low', 'Multiple concepts below 30%', 'Immediate intervention required']; }
    else if (overallMastery < 55) { riskLevel = 'high'; riskWarnings = ['Below class average', 'Weak foundation in core concepts', 'Recommend remedial sessions']; }
    else if (overallMastery < 70) { riskLevel = 'moderate'; riskWarnings = ['Some weak concepts detected', 'Monitor progress weekly']; }
    else { riskWarnings = ['On track', 'Continue current study plan']; }

    // Recommendations
    const recommendations = [];
    if (weaknessMap.length > 0) {
      recommendations.push({ type: 'revision',  icon: '📖', action: `Revise ${weaknessMap[0].name}`,                    reason: 'Lowest mastery concept',          impact: '+8–12%' });
      recommendations.push({ type: 'practice',  icon: '✏️', action: `Practice set: ${weaknessMap[0].name}`,             reason: 'Targeted weak area',              impact: '+6–10%' });
    }
    if (weaknessMap.length > 1) {
      recommendations.push({ type: 'revision',  icon: '📖', action: `Review ${weaknessMap[1].name} fundamentals`,       reason: 'Second weakest concept',          impact: '+5–8%' });
    }
    const strongConcepts = conceptMastery.filter(c => c.mastery >= 80);
    if (strongConcepts.length > 0) {
      recommendations.push({ type: 'next',      icon: '🚀', action: `Advance to next topic after ${strongConcepts[0].name}`, reason: 'Strong mastery achieved',     impact: 'Enrichment' });
    }
    recommendations.push({ type: 'consistency', icon: '📅', action: 'Daily 20-min review sessions',                     reason: 'Improve consistency score',       impact: '+consistency' });

    return {
      student, overallMastery, radarMetrics, conceptMastery, weaknessMap,
      trend, velocity, lastScore, status, consistency,
      rank, percentile, totalStudents: students.length,
      riskLevel, riskWarnings,
      errorPattern: errorPatterns[studentId] ?? { conceptual: 33, procedural: 33, careless: 34 },
      timePerf: timeVsPerformance[studentId] ?? { hoursPerWeek: 4, performance: overallMastery },
      recommendations,
    };
  }, [studentId]);
}

export { students };
