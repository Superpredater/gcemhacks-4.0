// ─── WEAK CONCEPTS MOCK DATA ──────────────────────────────────────────────────

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
  { id: 'c1',  name: 'Arithmetic',        mastery: 88, position: [-5,  2,  0], impact: 9 },
  { id: 'c2',  name: 'Fractions',         mastery: 80, position: [-3,  2,  1], impact: 7 },
  { id: 'c3',  name: 'Algebra Basics',    mastery: 62, position: [-1,  1,  0], impact: 8 },
  { id: 'c4',  name: 'Linear Equations',  mastery: 55, position: [ 1,  1,  1], impact: 7 },
  { id: 'c5',  name: 'Quadratic Eq.',     mastery: 38, position: [ 3,  0,  0], impact: 9 },
  { id: 'c6',  name: 'Trigonometry',      mastery: 34, position: [ 4, -1,  2], impact: 8 },
  { id: 'c7',  name: 'Calculus Basics',   mastery: 30, position: [ 2, -2,  0], impact: 10 },
  { id: 'c8',  name: 'Complex Numbers',   mastery: 42, position: [ 0, -1,  2], impact: 6 },
  { id: 'c9',  name: 'Statistics',        mastery: 70, position: [-4,  0, -1], impact: 5 },
  { id: 'c10', name: 'Geometry',          mastery: 74, position: [-2, -2, -1], impact: 6 },
];

// edges: { from, to, weight 0-1 (causal contribution) }
export const dependencies = [
  { from: 'c1', to: 'c2', weight: 0.9 },
  { from: 'c1', to: 'c3', weight: 0.8 },
  { from: 'c2', to: 'c3', weight: 0.7 },
  { from: 'c3', to: 'c4', weight: 0.85 },
  { from: 'c4', to: 'c5', weight: 0.9 },
  { from: 'c5', to: 'c6', weight: 0.75 },
  { from: 'c4', to: 'c7', weight: 0.8 },
  { from: 'c5', to: 'c7', weight: 0.85 },
  { from: 'c3', to: 'c8', weight: 0.6 },
  { from: 'c1', to: 'c9', weight: 0.5 },
  { from: 'c1', to: 'c10', weight: 0.6 },
  { from: 'c10', to: 'c6', weight: 0.7 },
];

// scores[studentId][conceptId]
export const scores = {
  1:  { c1:95, c2:90, c3:85, c4:82, c5:78, c6:75, c7:70, c8:65, c9:88, c10:85 },
  2:  { c1:88, c2:85, c3:78, c4:72, c5:68, c6:62, c7:58, c8:55, c9:82, c10:80 },
  3:  { c1:82, c2:78, c3:70, c4:65, c5:58, c6:52, c7:48, c8:44, c9:76, c10:74 },
  4:  { c1:42, c2:38, c3:35, c4:30, c5:25, c6:22, c7:18, c8:15, c9:48, c10:45 },
  5:  { c1:48, c2:44, c3:40, c4:36, c5:30, c6:26, c7:22, c8:20, c9:52, c10:50 },
  6:  { c1:75, c2:72, c3:65, c4:60, c5:55, c6:50, c7:45, c8:40, c9:70, c10:68 },
  7:  { c1:90, c2:88, c3:82, c4:78, c5:72, c6:68, c7:62, c8:58, c9:85, c10:82 },
  8:  { c1:55, c2:52, c3:48, c4:44, c5:38, c6:34, c7:28, c8:24, c9:60, c10:58 },
  9:  { c1:85, c2:82, c3:76, c4:70, c5:65, c6:60, c7:55, c8:50, c9:80, c10:78 },
  10: { c1:38, c2:34, c3:30, c4:26, c5:20, c6:18, c7:14, c8:12, c9:42, c10:40 },
  11: { c1:70, c2:68, c3:62, c4:56, c5:50, c6:46, c7:40, c8:36, c9:66, c10:64 },
  12: { c1:80, c2:76, c3:70, c4:65, c5:60, c6:55, c7:50, c8:45, c9:75, c10:72 },
};

// Error taxonomy per concept — all 10 concepts
export const errorTypes = {
  c1:  { conceptual: 15, procedural: 25, careless: 60 },  // Arithmetic    — mostly careless slips
  c2:  { conceptual: 25, procedural: 42, careless: 33 },  // Fractions     — procedural (wrong steps)
  c3:  { conceptual: 30, procedural: 45, careless: 25 },  // Algebra Basics
  c4:  { conceptual: 35, procedural: 40, careless: 25 },  // Linear Equations
  c5:  { conceptual: 45, procedural: 35, careless: 20 },  // Quadratic Eq.
  c6:  { conceptual: 50, procedural: 30, careless: 20 },  // Trigonometry
  c7:  { conceptual: 55, procedural: 30, careless: 15 },  // Calculus Basics — mostly conceptual
  c8:  { conceptual: 40, procedural: 40, careless: 20 },  // Complex Numbers
  c9:  { conceptual: 20, procedural: 38, careless: 42 },  // Statistics     — careless + procedural
  c10: { conceptual: 28, procedural: 44, careless: 28 },  // Geometry       — procedural dominant
};

// Problematic questions per concept
export const questions = {
  c5: [
    { id: 'q1', text: 'Solve x² - 7x + 12 = 0 by factoring',         failRate: 72 },
    { id: 'q2', text: 'Complete the square: x² + 6x + 5 = 0',         failRate: 68 },
    { id: 'q3', text: 'Find roots using quadratic formula: 2x²+3x-2=0', failRate: 58 },
  ],
  c6: [
    { id: 'q4', text: 'Find sin(135°) without a calculator',           failRate: 78 },
    { id: 'q5', text: 'Prove: sin²θ + cos²θ = 1',                     failRate: 65 },
    { id: 'q6', text: 'Solve: 2sin(x) = √3 for 0 ≤ x ≤ 2π',          failRate: 82 },
  ],
  c7: [
    { id: 'q7', text: 'Differentiate f(x) = x³ - 4x² + 2x',          failRate: 75 },
    { id: 'q8', text: 'Find the limit: lim(x→0) sin(x)/x',            failRate: 80 },
    { id: 'q9', text: 'Apply chain rule: d/dx[sin(x²)]',              failRate: 85 },
  ],
  c3: [
    { id: 'q10', text: 'Simplify: 3(x+2) - 2(x-1)',                   failRate: 48 },
    { id: 'q11', text: 'Solve for x: 2x + 5 = 3x - 7',               failRate: 42 },
  ],
};

// Trend data per concept (8 weeks)
export const conceptTrends = {
  c5: [28, 30, 32, 35, 36, 38, 38, 38],
  c6: [22, 24, 26, 28, 30, 32, 33, 34],
  c7: [18, 20, 22, 24, 26, 28, 29, 30],
  c3: [50, 52, 55, 58, 60, 62, 62, 62],
};

export const weeks = ['Wk1','Wk2','Wk3','Wk4','Wk5','Wk6','Wk7','Wk8'];

// Remediation plan
export const remediationPlan = [
  { step: 1, concept: 'Arithmetic',      action: 'Verify foundational arithmetic — 1 session',       duration: '1 week',  priority: 'medium' },
  { step: 2, concept: 'Algebra Basics',  action: 'Re-teach sign rules and transposition',             duration: '1 week',  priority: 'high' },
  { step: 3, concept: 'Linear Equations',action: 'Guided practice with worked examples',              duration: '1 week',  priority: 'high' },
  { step: 4, concept: 'Quadratic Eq.',   action: 'Introduce factoring → completing square → formula', duration: '2 weeks', priority: 'critical' },
  { step: 5, concept: 'Trigonometry',    action: 'Unit circle + ratio mnemonics + practice',          duration: '2 weeks', priority: 'critical' },
  { step: 6, concept: 'Calculus Basics', action: 'Limits → derivatives → chain rule progression',    duration: '3 weeks', priority: 'critical' },
];

export const assignmentSuggestions = [
  { concept: 'Quadratic Eq.',   type: 'Practice Set',    title: '20 factoring problems (graded difficulty)',    difficulty: 'Medium', estimatedGain: '+12%' },
  { concept: 'Trigonometry',    type: 'Visual Worksheet', title: 'Unit circle labeling + ratio identification',  difficulty: 'Easy',   estimatedGain: '+10%' },
  { concept: 'Calculus Basics', type: 'Worked Examples',  title: '10 derivative problems with step-by-step',    difficulty: 'Hard',   estimatedGain: '+8%' },
  { concept: 'Algebra Basics',  type: 'Peer Activity',    title: 'Pair weak + strong students for equation solving', difficulty: 'Easy', estimatedGain: '+9%' },
  { concept: 'Complex Numbers', type: 'Video + Quiz',     title: 'Watch conjugate division video + 5 questions', difficulty: 'Medium', estimatedGain: '+7%' },
];

export const teachingStrategies = [
  { concept: 'Quadratic Eq.',   strategy: 'Visual Analogy',    desc: 'Use parabola graph to show roots visually before algebra',    effectiveness: 88 },
  { concept: 'Trigonometry',    strategy: 'Mnemonic + Drill',  desc: 'SOH-CAH-TOA mnemonic + 10-min daily drill for 1 week',       effectiveness: 82 },
  { concept: 'Calculus Basics', strategy: 'Scaffolded Steps',  desc: 'Break into: limits → slope → derivative — one per session',  effectiveness: 85 },
  { concept: 'Algebra Basics',  strategy: 'Error Analysis',    desc: 'Show common mistakes, ask students to spot and fix errors',   effectiveness: 79 },
];

export const cascadeAlerts = [
  { from: 'Quadratic Eq.',  to: 'Calculus Basics',  risk: 'critical', pct: 85, desc: '85% of students failing Calculus also failed Quadratic Eq.' },
  { from: 'Algebra Basics', to: 'Linear Equations', risk: 'high',     pct: 72, desc: '72% of Linear Equation failures trace back to Algebra Basics' },
  { from: 'Trigonometry',   to: 'Calculus Basics',  risk: 'high',     pct: 68, desc: '68% of Calculus failures also show Trig weakness' },
  { from: 'Fractions',      to: 'Algebra Basics',   risk: 'moderate', pct: 45, desc: '45% of Algebra failures have weak Fraction foundations' },
];
