// ─── PREREQUISITE GAPS MOCK DATA ─────────────────────────────────────────────

export const concepts = [
  { id: 'c1',  name: 'Arithmetic',        mastery: 88, position: [-5,  2,  0], importance: 9 },
  { id: 'c2',  name: 'Fractions',         mastery: 80, position: [-3,  2,  1], importance: 7 },
  { id: 'c3',  name: 'Algebra Basics',    mastery: 58, position: [-1,  1,  0], importance: 8 },
  { id: 'c4',  name: 'Linear Equations',  mastery: 52, position: [ 1,  1,  1], importance: 7 },
  { id: 'c5',  name: 'Quadratic Eq.',     mastery: 38, position: [ 3,  0,  0], importance: 9 },
  { id: 'c6',  name: 'Trigonometry',      mastery: 32, position: [ 4, -1,  2], importance: 8 },
  { id: 'c7',  name: 'Calculus Basics',   mastery: 28, position: [ 2, -2,  0], importance: 10 },
  { id: 'c8',  name: 'Complex Numbers',   mastery: 44, position: [ 0, -1,  2], importance: 6 },
  { id: 'c9',  name: 'Statistics',        mastery: 72, position: [-4,  0, -1], importance: 5 },
  { id: 'c10', name: 'Geometry',          mastery: 76, position: [-2, -2, -1], importance: 6 },
];

// edges: { from, to, weight 0-1 }
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

export const students = [
  { id: 1,  name: 'Alice Johnson',  avatar: '👩‍🎓' },
  { id: 2,  name: 'Bob Smith',      avatar: '👨‍🎓' },
  { id: 3,  name: 'Carol White',    avatar: '👩‍🎓' },
  { id: 4,  name: 'David Brown',    avatar: '👨‍🎓' },
  { id: 5,  name: 'Emma Davis',     avatar: '👩‍🎓' },
  { id: 6,  name: 'Frank Miller',   avatar: '👨‍🎓' },
  { id: 7,  name: 'Grace Wilson',   avatar: '👩‍🎓' },
  { id: 8,  name: 'Henry Moore',    avatar: '👨‍🎓' },
  { id: 9,  name: 'Iris Taylor',    avatar: '👩‍🎓' },
  { id: 10, name: 'Jack Anderson',  avatar: '👨‍🎓' },
  { id: 11, name: 'Karen Thomas',   avatar: '👩‍🎓' },
  { id: 12, name: 'Leo Jackson',    avatar: '👨‍🎓' },
];

// scores[studentId][conceptId]
export const scores = {
  1:  { c1:95, c2:90, c3:85, c4:82, c5:78, c6:75, c7:70, c8:65, c9:88, c10:85 },
  2:  { c1:88, c2:85, c3:78, c4:72, c5:68, c6:62, c7:58, c8:55, c9:82, c10:80 },
  3:  { c1:80, c2:78, c3:68, c4:62, c5:55, c6:50, c7:45, c8:40, c9:75, c10:72 },
  4:  { c1:42, c2:38, c3:35, c4:30, c5:25, c6:22, c7:18, c8:15, c9:48, c10:45 },
  5:  { c1:48, c2:44, c3:40, c4:36, c5:30, c6:26, c7:22, c8:20, c9:52, c10:50 },
  6:  { c1:75, c2:72, c3:65, c4:60, c5:55, c6:50, c7:45, c8:40, c9:70, c10:68 },
  7:  { c1:92, c2:90, c3:82, c4:78, c5:72, c6:68, c7:62, c8:58, c9:85, c10:82 },
  8:  { c1:55, c2:52, c3:48, c4:44, c5:38, c6:34, c7:28, c8:24, c9:60, c10:58 },
  9:  { c1:85, c2:82, c3:76, c4:70, c5:65, c6:60, c7:55, c8:50, c9:80, c10:78 },
  10: { c1:38, c2:34, c3:30, c4:26, c5:20, c6:18, c7:14, c8:12, c9:42, c10:40 },
  11: { c1:70, c2:68, c3:62, c4:56, c5:50, c6:46, c7:40, c8:36, c9:66, c10:64 },
  12: { c1:80, c2:76, c3:70, c4:65, c5:60, c6:55, c7:50, c8:45, c9:75, c10:72 },
};

// Gap trend per concept (8 weeks — % students with gap)
export const gapTrends = {
  c5: [65, 62, 60, 58, 55, 52, 50, 48],
  c6: [72, 70, 68, 66, 64, 62, 60, 58],
  c7: [78, 76, 74, 72, 70, 68, 66, 64],
  c3: [45, 43, 42, 40, 38, 36, 35, 34],
  c4: [52, 50, 48, 46, 44, 42, 40, 38],
};
export const trendWeeks = ['Wk1','Wk2','Wk3','Wk4','Wk5','Wk6','Wk7','Wk8'];

// Questions per concept
export const questions = {
  c5: [
    { id:'q1', text:'Solve x² - 7x + 12 = 0 by factoring',          failRate: 72, errorType:'conceptual' },
    { id:'q2', text:'Complete the square: x² + 6x + 5 = 0',          failRate: 65, errorType:'procedural' },
    { id:'q3', text:'Quadratic formula: 2x² + 3x - 2 = 0',           failRate: 58, errorType:'procedural' },
  ],
  c6: [
    { id:'q4', text:'Find sin(135°) without calculator',              failRate: 78, errorType:'conceptual' },
    { id:'q5', text:'Prove sin²θ + cos²θ = 1',                       failRate: 65, errorType:'conceptual' },
  ],
  c7: [
    { id:'q6', text:'Differentiate f(x) = x³ - 4x² + 2x',           failRate: 75, errorType:'procedural' },
    { id:'q7', text:'Find lim(x→0) sin(x)/x',                        failRate: 80, errorType:'conceptual' },
  ],
  c3: [
    { id:'q8', text:'Simplify: 3(x+2) - 2(x-1)',                     failRate: 48, errorType:'careless' },
    { id:'q9', text:'Solve for x: 2x + 5 = 3x - 7',                  failRate: 42, errorType:'procedural' },
  ],
};
