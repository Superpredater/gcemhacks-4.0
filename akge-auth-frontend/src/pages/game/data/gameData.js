// ─── GAMIFIED LEARNING DATA ───────────────────────────────────────────────────

export const levels = [
  { id: 'l1',  concept: 'Arithmetic',       difficulty: 1, xpReward: 100, position: [-6,  0,  0], importance: 1.2, requires: [] },
  { id: 'l2',  concept: 'Fractions',        difficulty: 1, xpReward: 120, position: [-4,  2,  1], importance: 1.0, requires: ['l1'] },
  { id: 'l3',  concept: 'Algebra Basics',   difficulty: 2, xpReward: 180, position: [-2,  0,  0], importance: 1.3, requires: ['l1','l2'] },
  { id: 'l4',  concept: 'Linear Equations', difficulty: 2, xpReward: 200, position: [ 0,  2,  1], importance: 1.1, requires: ['l3'] },
  { id: 'l5',  concept: 'Quadratic Eq.',    difficulty: 3, xpReward: 280, position: [ 2,  0,  0], importance: 1.4, requires: ['l4'] },
  { id: 'l6',  concept: 'Trigonometry',     difficulty: 3, xpReward: 300, position: [ 4,  2,  1], importance: 1.3, requires: ['l5'] },
  { id: 'l7',  concept: 'Calculus Basics',  difficulty: 4, xpReward: 400, position: [ 6,  0,  0], importance: 1.5, requires: ['l5','l6'] },
  { id: 'l8',  concept: 'Statistics',       difficulty: 2, xpReward: 220, position: [-2, -2, -1], importance: 1.0, requires: ['l3'] },
  { id: 'l9',  concept: 'Geometry',         difficulty: 2, xpReward: 200, position: [ 0, -2, -1], importance: 1.1, requires: ['l1'] },
  { id: 'l10', concept: 'Complex Numbers',  difficulty: 4, xpReward: 450, position: [ 6,  2,  1], importance: 1.4, requires: ['l7'] },
];

export const edges = [
  ['l1','l2'], ['l1','l3'], ['l2','l3'], ['l3','l4'], ['l4','l5'],
  ['l5','l6'], ['l5','l7'], ['l6','l7'], ['l3','l8'], ['l1','l9'],
  ['l7','l10'],
];

export const questions = {
  l1: [
    { id:'q1', text:'What is 15% of 200?',                options:['25','30','35','40'],       correct:1, xp:20 },
    { id:'q2', text:'Simplify: 48 ÷ 6 × 2',              options:['4','16','8','24'],          correct:1, xp:20 },
    { id:'q3', text:'What is 2³ × 3?',                    options:['18','24','12','48'],        correct:1, xp:25 },
    { id:'q4', text:'Find: √144',                         options:['11','12','13','14'],        correct:1, xp:20 },
    { id:'q5', text:'What is 7 × 8 + 4?',                options:['60','56','60','64'],        correct:0, xp:15 },
  ],
  l2: [
    { id:'q6', text:'Add: 2/3 + 3/4',                    options:['5/7','17/12','5/12','6/7'],correct:1, xp:25 },
    { id:'q7', text:'Simplify: 12/18',                   options:['2/3','3/4','4/6','1/2'],   correct:0, xp:20 },
    { id:'q8', text:'Multiply: 3/4 × 8/9',               options:['2/3','1/3','3/4','4/9'],   correct:0, xp:25 },
    { id:'q9', text:'What is 5/6 - 1/4?',                options:['7/12','4/2','2/3','1/2'],  correct:0, xp:25 },
    { id:'q10',text:'Convert 1.75 to fraction',          options:['7/4','3/2','5/3','9/5'],   correct:0, xp:20 },
  ],
  l3: [
    { id:'q11',text:'Simplify: 3(x+2) - 2(x-1)',        options:['x+8','x+4','5x+4','x-8'], correct:0, xp:30 },
    { id:'q12',text:'Solve: 2x + 5 = 3x - 7',           options:['x=12','x=-12','x=2','x=-2'],correct:0,xp:30 },
    { id:'q13',text:'Expand: (x+3)(x-2)',                options:['x²+x-6','x²-x-6','x²+5x-6','x²-5x+6'],correct:0,xp:35},
    { id:'q14',text:'Factor: x² - 9',                   options:['(x-3)²','(x+3)(x-3)','(x+9)(x-1)','(x-9)(x+1)'],correct:1,xp:35},
    { id:'q15',text:'Solve: 3(x-4) = 2x + 1',           options:['x=13','x=11','x=7','x=5'], correct:0, xp:30 },
  ],
  l4: [
    { id:'q16',text:'Solve: 4x - 3 = 2x + 7',           options:['x=5','x=2','x=4','x=3'],   correct:0, xp:35 },
    { id:'q17',text:'Find slope of y = 3x - 5',          options:['3','-5','5','-3'],          correct:0, xp:30 },
    { id:'q18',text:'Solve system: x+y=5, x-y=1',        options:['(3,2)','(2,3)','(4,1)','(1,4)'],correct:0,xp:40},
    { id:'q19',text:'What is the y-intercept of 2x+3y=6?',options:['2','3','6','1'],           correct:0, xp:35 },
    { id:'q20',text:'Solve: |2x - 4| = 6',               options:['x=5 or x=-1','x=5 or x=1','x=3 or x=-1','x=4 or x=-2'],correct:0,xp:40},
  ],
  l5: [
    { id:'q21',text:'Solve: x² - 5x + 6 = 0',           options:['x=2,3','x=-2,-3','x=1,6','x=-1,-6'],correct:0,xp:45},
    { id:'q22',text:'Discriminant of x²-4x+4=0',         options:['0','4','8','16'],           correct:0, xp:40 },
    { id:'q23',text:'Complete the square: x²+6x+?=perfect square',options:['9','6','3','12'],  correct:0, xp:45 },
    { id:'q24',text:'Vertex of y = x² - 4x + 3',         options:['(2,-1)','(-2,1)','(2,1)','(-2,-1)'],correct:0,xp:50},
    { id:'q25',text:'Solve: 2x² + 3x - 2 = 0',           options:['x=1/2,-2','x=-1/2,2','x=2,-1/2','x=-2,1/2'],correct:0,xp:50},
  ],
  l6: [
    { id:'q26',text:'sin(30°) = ?',                      options:['1/2','√3/2','1/√2','√3'],  correct:0, xp:50 },
    { id:'q27',text:'cos(60°) = ?',                      options:['1/2','√3/2','1','0'],       correct:0, xp:50 },
    { id:'q28',text:'tan(45°) = ?',                      options:['1','0','√3','1/√3'],        correct:0, xp:50 },
    { id:'q29',text:'sin²θ + cos²θ = ?',                 options:['1','0','2','sinθcosθ'],     correct:0, xp:55 },
    { id:'q30',text:'sin(135°) = ?',                     options:['1/√2','-1/√2','√3/2','-√3/2'],correct:0,xp:55},
  ],
  l7: [
    { id:'q31',text:'d/dx(x³) = ?',                     options:['3x²','x²','3x','2x³'],      correct:0, xp:60 },
    { id:'q32',text:'lim(x→0) sin(x)/x = ?',            options:['1','0','∞','undefined'],    correct:0, xp:65 },
    { id:'q33',text:'∫2x dx = ?',                        options:['x²+C','2x²+C','x+C','2+C'],correct:0, xp:65 },
    { id:'q34',text:'d/dx(e^x) = ?',                    options:['e^x','xe^(x-1)','e^(x-1)','1'],correct:0,xp:70},
    { id:'q35',text:'Chain rule: d/dx[sin(x²)] = ?',    options:['2x·cos(x²)','cos(x²)','2cos(x²)','sin(2x)'],correct:0,xp:70},
  ],
  l8: [
    { id:'q36',text:'Mean of: 4,8,6,5,3,2,8,9',         options:['5.5','5.625','6','5.75'],   correct:1, xp:40 },
    { id:'q37',text:'Median of: 3,5,7,9,11',             options:['7','5','9','6'],            correct:0, xp:35 },
    { id:'q38',text:'Mode of: 2,3,3,4,5,3,2',            options:['3','2','4','5'],            correct:0, xp:35 },
    { id:'q39',text:'Standard deviation measures?',      options:['Spread','Center','Skew','Range'],correct:0,xp:40},
    { id:'q40',text:'P(A∪B) = P(A)+P(B) when?',         options:['Mutually exclusive','Independent','Dependent','Always'],correct:0,xp:45},
  ],
  l9: [
    { id:'q41',text:'Area of circle r=5',                options:['25π','10π','5π','50π'],     correct:0, xp:35 },
    { id:'q42',text:'Pythagoras: a=3,b=4, c=?',          options:['5','7','6','8'],            correct:0, xp:35 },
    { id:'q43',text:'Sum of angles in triangle',         options:['180°','360°','90°','270°'], correct:0, xp:30 },
    { id:'q44',text:'Volume of cube side=3',             options:['27','9','18','81'],         correct:0, xp:40 },
    { id:'q45',text:'Perimeter of rectangle 4×6',        options:['20','24','10','12'],        correct:0, xp:35 },
  ],
  l10: [
    { id:'q46',text:'i² = ?',                            options:['-1','1','i','-i'],          correct:0, xp:70 },
    { id:'q47',text:'|3+4i| = ?',                        options:['5','7','3','4'],            correct:0, xp:70 },
    { id:'q48',text:'(2+3i)+(1-2i) = ?',                options:['3+i','3-i','1+5i','3+5i'], correct:0, xp:75 },
    { id:'q49',text:'Conjugate of 3-4i',                 options:['3+4i','-3+4i','3-4i','-3-4i'],correct:0,xp:75},
    { id:'q50',text:'(1+i)² = ?',                        options:['2i','2','1+2i','-2i'],     correct:0, xp:80 },
  ],
};

export const leaderboardData = [
  { id: 'u1',  name: 'Alex Student',   xp: 1240, rank: 1,  avatar: '👨‍🎓', change: 0  },
  { id: 'u2',  name: 'Zara Khan',      xp: 1180, rank: 2,  avatar: '👩‍🎓', change: 1  },
  { id: 'u3',  name: 'Liam Chen',      xp: 1050, rank: 3,  avatar: '🧑‍🎓', change: -1 },
  { id: 'u4',  name: 'Mia Patel',      xp: 980,  rank: 4,  avatar: '👩‍🎓', change: 2  },
  { id: 'u5',  name: 'Noah Williams',  xp: 920,  rank: 5,  avatar: '👨‍🎓', change: 0  },
  { id: 'u6',  name: 'Emma Davis',     xp: 860,  rank: 6,  avatar: '👩‍🎓', change: -2 },
  { id: 'u7',  name: 'Oliver Brown',   xp: 800,  rank: 7,  avatar: '🧑‍🎓', change: 1  },
  { id: 'u8',  name: 'Ava Johnson',    xp: 740,  rank: 8,  avatar: '👩‍🎓', change: 0  },
  { id: 'u9',  name: 'Ethan Lee',      xp: 680,  rank: 9,  avatar: '👨‍🎓', change: 3  },
  { id: 'u10', name: 'Sophia Martinez',xp: 620,  rank: 10, avatar: '👩‍🎓', change: -1 },
];

export const CURRENT_USER_ID = 'u1';
