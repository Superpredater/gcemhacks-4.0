// ─── MOCK DATA ────────────────────────────────────────────────────────────────

export const students = [
  { id: 1,  name: 'Alice Johnson' },
  { id: 2,  name: 'Bob Smith' },
  { id: 3,  name: 'Carol White' },
  { id: 4,  name: 'David Brown' },
  { id: 5,  name: 'Emma Davis' },
  { id: 6,  name: 'Frank Miller' },
  { id: 7,  name: 'Grace Wilson' },
  { id: 8,  name: 'Henry Moore' },
  { id: 9,  name: 'Iris Taylor' },
  { id: 10, name: 'Jack Anderson' },
  { id: 11, name: 'Karen Thomas' },
  { id: 12, name: 'Leo Jackson' },
];

export const concepts = [
  { id: 'c1', name: 'Arithmetic',        mastery: 88, position: [-4,  2,  0] },
  { id: 'c2', name: 'Fractions',         mastery: 82, position: [-2,  2,  1] },
  { id: 'c3', name: 'Algebra Basics',    mastery: 65, position: [ 0,  1,  0] },
  { id: 'c4', name: 'Linear Equations',  mastery: 58, position: [ 2,  1,  1] },
  { id: 'c5', name: 'Quadratic Eq.',     mastery: 42, position: [ 4,  0,  0] },
  { id: 'c6', name: 'Trigonometry',      mastery: 38, position: [ 3, -1,  2] },
  { id: 'c7', name: 'Calculus Basics',   mastery: 35, position: [ 1, -2,  0] },
  { id: 'c8', name: 'Complex Numbers',   mastery: 44, position: [-1, -1,  2] },
  { id: 'c9', name: 'Statistics',        mastery: 72, position: [-3,  0, -1] },
  { id: 'c10',name: 'Geometry',          mastery: 76, position: [-2, -2, -1] },
];

// prerequisite edges: [from, to] means "from" is prerequisite of "to"
export const dependencies = [
  ['c1', 'c2'],
  ['c1', 'c3'],
  ['c2', 'c3'],
  ['c3', 'c4'],
  ['c4', 'c5'],
  ['c5', 'c6'],
  ['c4', 'c7'],
  ['c5', 'c7'],
  ['c3', 'c8'],
  ['c1', 'c9'],
  ['c1', 'c10'],
  ['c10','c6'],
];

// scores[studentId][conceptId] = score 0-100
export const scores = {
  1:  { c1:95, c2:92, c3:88, c4:85, c5:80, c6:78, c7:72, c8:68, c9:90, c10:88 },
  2:  { c1:90, c2:88, c3:82, c4:78, c5:75, c6:70, c7:65, c8:60, c9:85, c10:82 },
  3:  { c1:85, c2:80, c3:75, c4:70, c5:65, c6:60, c7:55, c8:50, c9:80, c10:78 },
  4:  { c1:45, c2:40, c3:38, c4:35, c5:30, c6:28, c7:25, c8:22, c9:50, c10:48 },
  5:  { c1:50, c2:48, c3:45, c4:42, c5:38, c6:35, c7:30, c8:28, c9:55, c10:52 },
  6:  { c1:78, c2:75, c3:70, c4:65, c5:60, c6:55, c7:50, c8:45, c9:75, c10:72 },
  7:  { c1:92, c2:90, c3:85, c4:80, c5:75, c6:70, c7:65, c8:60, c9:88, c10:85 },
  8:  { c1:60, c2:58, c3:55, c4:50, c5:45, c6:40, c7:35, c8:30, c9:65, c10:62 },
  9:  { c1:88, c2:85, c3:80, c4:75, c5:70, c6:65, c7:60, c8:55, c9:82, c10:80 },
  10: { c1:42, c2:38, c3:35, c4:30, c5:25, c6:22, c7:20, c8:18, c9:45, c10:42 },
  11: { c1:72, c2:70, c3:65, c4:60, c5:55, c6:50, c7:45, c8:40, c9:70, c10:68 },
  12: { c1:82, c2:80, c3:75, c4:70, c5:65, c6:60, c7:55, c8:50, c9:78, c10:75 },
};

export const learningTrend = [
  { week: 'Week 1', mastery: 58 },
  { week: 'Week 2', mastery: 61 },
  { week: 'Week 3', mastery: 59 },
  { week: 'Week 4', mastery: 65 },
  { week: 'Week 5', mastery: 68 },
  { week: 'Week 6', mastery: 72 },
  { week: 'Week 7', mastery: 70 },
  { week: 'Week 8', mastery: 75 },
];

export const misconceptions = [
  { concept: 'Quadratic Equations', pattern: 'Students confuse factoring with completing the square', frequency: 68 },
  { concept: 'Trigonometry',        pattern: 'Mixing up sin/cos/tan ratios in non-standard triangles', frequency: 72 },
  { concept: 'Calculus Basics',     pattern: 'Applying power rule incorrectly to composite functions', frequency: 58 },
  { concept: 'Complex Numbers',     pattern: 'Forgetting to conjugate when dividing complex numbers', frequency: 64 },
  { concept: 'Algebra Basics',      pattern: 'Sign errors when transposing terms across equals sign', frequency: 45 },
];

export const riskAlerts = [
  { id: 1, type: 'critical', title: '4 students at high dropout risk',       desc: 'David, Emma, Jack, Henry scoring below 50% across 6+ concepts', action: 'Schedule 1-on-1 sessions' },
  { id: 2, type: 'warning',  title: 'Trigonometry failure chain detected',   desc: '72% of class will struggle with Calculus if Trig is not addressed', action: 'Revise Trig fundamentals' },
  { id: 3, type: 'warning',  title: 'Quadratic Equations weak cluster',      desc: '58% of students below 50% — prerequisite gap in Algebra Basics', action: 'Re-teach Algebra Basics first' },
  { id: 4, type: 'info',     title: 'Top 3 students ready for advanced work', desc: 'Alice, Bob, Grace have mastered all core concepts', action: 'Assign enrichment problems' },
];

export const recommendations = [
  { priority: 'high',   icon: '🔴', action: 'Re-teach Algebra Basics',          reason: 'Root cause of 3 downstream failures', impact: '+18% projected improvement' },
  { priority: 'high',   icon: '🔴', action: 'Assign Trigonometry practice set',  reason: '72% class weakness detected',          impact: '+15% projected improvement' },
  { priority: 'medium', icon: '🟡', action: 'Schedule Calculus revision session', reason: 'Prerequisite gaps from Algebra',        impact: '+12% projected improvement' },
  { priority: 'medium', icon: '🟡', action: 'Peer tutoring: Alice → David',       reason: 'Fast learner can support at-risk peer', impact: '+10% projected improvement' },
  { priority: 'low',    icon: '🟢', action: 'Assign enrichment to top 3',         reason: 'Advanced students need challenge',      impact: 'Retention boost' },
];
