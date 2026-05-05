// ─── SHARED MOCK DATA ─────────────────────────────────────────────────────────

export const students = [
  { id: 1,  name: 'Alice Johnson',  avg: 87, streak: 12, sessions: 8  },
  { id: 2,  name: 'Bob Smith',      avg: 74, streak: 6,  sessions: 6  },
  { id: 3,  name: 'Carol White',    avg: 66, streak: 4,  sessions: 5  },
  { id: 4,  name: 'David Brown',    avg: 33, streak: 1,  sessions: 2  },
  { id: 5,  name: 'Emma Davis',     avg: 37, streak: 2,  sessions: 3  },
  { id: 6,  name: 'Frank Miller',   avg: 67, streak: 5,  sessions: 5  },
  { id: 7,  name: 'Grace Wilson',   avg: 86, streak: 10, sessions: 7  },
  { id: 8,  name: 'Henry Moore',    avg: 47, streak: 3,  sessions: 3  },
  { id: 9,  name: 'Iris Taylor',    avg: 76, streak: 7,  sessions: 6  },
  { id: 10, name: 'Jack Anderson',  avg: 30, streak: 1,  sessions: 2  },
  { id: 11, name: 'Karen Thomas',   avg: 62, streak: 4,  sessions: 4  },
  { id: 12, name: 'Leo Jackson',    avg: 72, streak: 6,  sessions: 6  },
];

export const concepts = [
  { id: 'c1',  name: 'Arithmetic',        subject: 'Mathematics', weight: 8 },
  { id: 'c2',  name: 'Fractions',         subject: 'Mathematics', weight: 7 },
  { id: 'c3',  name: 'Algebra Basics',    subject: 'Mathematics', weight: 9 },
  { id: 'c4',  name: 'Linear Equations',  subject: 'Mathematics', weight: 8 },
  { id: 'c5',  name: 'Quadratic Eq.',     subject: 'Mathematics', weight: 9 },
  { id: 'c6',  name: 'Trigonometry',      subject: 'Mathematics', weight: 8 },
  { id: 'c7',  name: 'Calculus Basics',   subject: 'Mathematics', weight: 10 },
  { id: 'c8',  name: 'Complex Numbers',   subject: 'Mathematics', weight: 6 },
  { id: 'c9',  name: 'Statistics',        subject: 'Mathematics', weight: 7 },
  { id: 'c10', name: 'Geometry',          subject: 'Mathematics', weight: 7 },
];

export const initialQuestions = [
  { id: 1,  text: 'Solve x² - 7x + 12 = 0',                    concept: 'c5', difficulty: 'Medium', successRate: 42, tags: ['algebra', 'quadratic'] },
  { id: 2,  text: 'Find sin(135°)',                              concept: 'c6', difficulty: 'Hard',   successRate: 35, tags: ['trig'] },
  { id: 3,  text: 'Differentiate f(x) = x³ - 4x²',             concept: 'c7', difficulty: 'Hard',   successRate: 38, tags: ['calculus'] },
  { id: 4,  text: 'Simplify: 3(x+2) - 2(x-1)',                 concept: 'c3', difficulty: 'Easy',   successRate: 78, tags: ['algebra'] },
  { id: 5,  text: 'Find lim(x→0) sin(x)/x',                    concept: 'c7', difficulty: 'Hard',   successRate: 30, tags: ['calculus', 'limits'] },
  { id: 6,  text: 'Solve: 2x + 5 = 3x - 7',                    concept: 'c4', difficulty: 'Easy',   successRate: 82, tags: ['algebra'] },
  { id: 7,  text: 'What is 15% of 200?',                        concept: 'c1', difficulty: 'Easy',   successRate: 90, tags: ['arithmetic'] },
  { id: 8,  text: 'Add fractions: 2/3 + 3/4',                   concept: 'c2', difficulty: 'Medium', successRate: 65, tags: ['fractions'] },
  { id: 9,  text: 'Find the area of a circle with r=5',         concept: 'c10',difficulty: 'Medium', successRate: 70, tags: ['geometry'] },
  { id: 10, text: 'Calculate mean of: 4, 8, 6, 5, 3, 2, 8, 9', concept: 'c9', difficulty: 'Easy',   successRate: 85, tags: ['statistics'] },
  { id: 11, text: 'Solve: x² + 4x + 4 = 0',                    concept: 'c5', difficulty: 'Medium', successRate: 55, tags: ['quadratic'] },
  { id: 12, text: 'Prove: sin²θ + cos²θ = 1',                   concept: 'c6', difficulty: 'Hard',   successRate: 28, tags: ['trig', 'proof'] },
];

export const performanceTrend = [
  { week: 'Wk1', avg: 58 },
  { week: 'Wk2', avg: 61 },
  { week: 'Wk3', avg: 59 },
  { week: 'Wk4', avg: 65 },
  { week: 'Wk5', avg: 68 },
  { week: 'Wk6', avg: 72 },
  { week: 'Wk7', avg: 70 },
  { week: 'Wk8', avg: 75 },
];

export const subjects = [
  { id: 's1', name: 'Mathematics', concepts: ['c1','c2','c3','c4','c5','c6','c7','c8','c9','c10'], difficultyRule: 'adaptive' },
  { id: 's2', name: 'Physics',     concepts: ['c6','c7'],                                          difficultyRule: 'fixed' },
  { id: 's3', name: 'Statistics',  concepts: ['c9'],                                               difficultyRule: 'adaptive' },
];
