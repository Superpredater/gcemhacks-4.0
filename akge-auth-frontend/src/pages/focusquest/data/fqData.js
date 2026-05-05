// ─── FOCUS QUEST DATA ─────────────────────────────────────────────────────────

export const fqConcepts = [
  { id: 'fq1',  name: 'Arithmetic',        zone: 'Number Forest',    emoji: '🌲', color: '#22c55e', mastery: 88, unlocked: true,  requires: [] },
  { id: 'fq2',  name: 'Fractions',         zone: 'Fraction Falls',   emoji: '💧', color: '#3b82f6', mastery: 75, unlocked: true,  requires: ['fq1'] },
  { id: 'fq3',  name: 'Algebra Basics',    zone: 'Algebra Meadow',   emoji: '🌸', color: '#8b5cf6', mastery: 62, unlocked: true,  requires: ['fq1','fq2'] },
  { id: 'fq4',  name: 'Linear Equations',  zone: 'Equation Valley',  emoji: '🏔️', color: '#06b6d4', mastery: 55, unlocked: true,  requires: ['fq3'] },
  { id: 'fq5',  name: 'Quadratic Eq.',     zone: 'Parabola Peak',    emoji: '⛰️', color: '#f59e0b', mastery: 40, unlocked: true,  requires: ['fq4'] },
  { id: 'fq6',  name: 'Trigonometry',      zone: 'Trig Temple',      emoji: '🏛️', color: '#ec4899', mastery: 30, unlocked: false, requires: ['fq5'] },
  { id: 'fq7',  name: 'Calculus Basics',   zone: 'Calculus Cavern',  emoji: '🕳️', color: '#ef4444', mastery: 20, unlocked: false, requires: ['fq5','fq6'] },
  { id: 'fq8',  name: 'Statistics',        zone: 'Data Dunes',       emoji: '🏜️', color: '#84cc16', mastery: 70, unlocked: true,  requires: ['fq3'] },
  { id: 'fq9',  name: 'Geometry',          zone: 'Shape Shores',     emoji: '🏖️', color: '#14b8a6', mastery: 78, unlocked: true,  requires: ['fq1'] },
  { id: 'fq10', name: 'Complex Numbers',   zone: 'Imaginary Isle',   emoji: '🏝️', color: '#a855f7', mastery: 15, unlocked: false, requires: ['fq7'] },
];

// Micro-challenges per concept (3 difficulty tiers: calm, focus, deep)
export const challenges = {
  fq1: [
    { id:'c1a', tier:'calm',  text:'What is 15% of 200?',                    options:['25','30','35','40'],       correct:1, hint:'15/100 × 200 = ?' },
    { id:'c1b', tier:'calm',  text:'Simplify: 48 ÷ 6 × 2',                  options:['4','16','8','24'],          correct:1, hint:'Follow order of operations: left to right' },
    { id:'c1c', tier:'focus', text:'What is 2³ × 3?',                        options:['18','24','12','48'],        correct:1, hint:'2³ = 2×2×2 = 8, then ×3' },
    { id:'c1d', tier:'focus', text:'Find: √144',                             options:['11','12','13','14'],        correct:1, hint:'12 × 12 = 144' },
    { id:'c1e', tier:'deep',  text:'If 3x = 45, what is x?',                 options:['12','15','18','9'],         correct:1, hint:'Divide both sides by 3' },
  ],
  fq2: [
    { id:'c2a', tier:'calm',  text:'Add: 1/2 + 1/4',                         options:['2/6','3/4','1/3','2/4'],   correct:1, hint:'Find common denominator: 4' },
    { id:'c2b', tier:'calm',  text:'Simplify: 12/18',                        options:['2/3','3/4','4/6','1/2'],   correct:0, hint:'Divide both by 6' },
    { id:'c2c', tier:'focus', text:'Multiply: 3/4 × 8/9',                    options:['2/3','1/3','3/4','4/9'],   correct:0, hint:'Multiply tops, multiply bottoms, simplify' },
    { id:'c2d', tier:'focus', text:'What is 5/6 - 1/4?',                     options:['7/12','4/2','2/3','1/2'],  correct:0, hint:'Common denominator is 12' },
    { id:'c2e', tier:'deep',  text:'Convert 1.75 to a fraction',              options:['7/4','3/2','5/3','9/5'],   correct:0, hint:'1.75 = 1 + 3/4 = 7/4' },
  ],
  fq3: [
    { id:'c3a', tier:'calm',  text:'Simplify: 3(x+2) - 2(x-1)',              options:['x+8','x+4','5x+4','x-8'], correct:0, hint:'Expand brackets first' },
    { id:'c3b', tier:'calm',  text:'Solve: 2x + 5 = 3x - 7',                 options:['x=12','x=-12','x=2','x=-2'],correct:0,hint:'Move x terms to one side' },
    { id:'c3c', tier:'focus', text:'Expand: (x+3)(x-2)',                     options:['x²+x-6','x²-x-6','x²+5x-6','x²-5x+6'],correct:0,hint:'FOIL method' },
    { id:'c3d', tier:'focus', text:'Factor: x² - 9',                         options:['(x-3)²','(x+3)(x-3)','(x+9)(x-1)','(x-9)(x+1)'],correct:1,hint:'Difference of squares' },
    { id:'c3e', tier:'deep',  text:'Solve: 3(x-4) = 2x + 1',                 options:['x=13','x=11','x=7','x=5'], correct:0, hint:'Expand left side first' },
  ],
  fq4: [
    { id:'c4a', tier:'calm',  text:'Solve: 4x - 3 = 2x + 7',                 options:['x=5','x=2','x=4','x=3'],   correct:0, hint:'Move x to left, numbers to right' },
    { id:'c4b', tier:'calm',  text:'Find slope of y = 3x - 5',               options:['3','-5','5','-3'],          correct:0, hint:'y = mx + b, m is slope' },
    { id:'c4c', tier:'focus', text:'Solve system: x+y=5, x-y=1',             options:['(3,2)','(2,3)','(4,1)','(1,4)'],correct:0,hint:'Add the equations' },
    { id:'c4d', tier:'focus', text:'y-intercept of 2x+3y=6?',                options:['2','3','6','1'],            correct:0, hint:'Set x=0 and solve for y' },
    { id:'c4e', tier:'deep',  text:'Solve: |2x - 4| = 6',                    options:['x=5 or x=-1','x=5 or x=1','x=3 or x=-1','x=4 or x=-2'],correct:0,hint:'Two cases: 2x-4=6 and 2x-4=-6' },
  ],
  fq5: [
    { id:'c5a', tier:'calm',  text:'Solve: x² - 5x + 6 = 0',                 options:['x=2,3','x=-2,-3','x=1,6','x=-1,-6'],correct:0,hint:'Factor: (x-2)(x-3)' },
    { id:'c5b', tier:'calm',  text:'Discriminant of x²-4x+4=0',              options:['0','4','8','16'],           correct:0, hint:'b²-4ac = 16-16' },
    { id:'c5c', tier:'focus', text:'Complete the square: x²+6x+?',           options:['9','6','3','12'],           correct:0, hint:'(b/2)² = (6/2)² = 9' },
    { id:'c5d', tier:'focus', text:'Vertex of y = x² - 4x + 3',              options:['(2,-1)','(-2,1)','(2,1)','(-2,-1)'],correct:0,hint:'x = -b/2a = 2' },
    { id:'c5e', tier:'deep',  text:'Solve: 2x² + 3x - 2 = 0',               options:['x=1/2,-2','x=-1/2,2','x=2,-1/2','x=-2,1/2'],correct:0,hint:'Use quadratic formula' },
  ],
  fq6: [
    { id:'c6a', tier:'calm',  text:'sin(30°) = ?',                           options:['1/2','√3/2','1/√2','√3'],  correct:0, hint:'Remember SOH-CAH-TOA' },
    { id:'c6b', tier:'calm',  text:'cos(60°) = ?',                           options:['1/2','√3/2','1','0'],       correct:0, hint:'cos(60°) = sin(30°)' },
    { id:'c6c', tier:'focus', text:'tan(45°) = ?',                           options:['1','0','√3','1/√3'],        correct:0, hint:'tan = sin/cos' },
    { id:'c6d', tier:'focus', text:'sin²θ + cos²θ = ?',                      options:['1','0','2','sinθcosθ'],     correct:0, hint:'Pythagorean identity' },
    { id:'c6e', tier:'deep',  text:'sin(135°) = ?',                          options:['1/√2','-1/√2','√3/2','-√3/2'],correct:0,hint:'135° is in 2nd quadrant' },
  ],
  fq7: [
    { id:'c7a', tier:'calm',  text:'d/dx(x³) = ?',                           options:['3x²','x²','3x','2x³'],     correct:0, hint:'Power rule: bring down exponent' },
    { id:'c7b', tier:'calm',  text:'lim(x→0) sin(x)/x = ?',                  options:['1','0','∞','undefined'],   correct:0, hint:'Famous limit = 1' },
    { id:'c7c', tier:'focus', text:'∫2x dx = ?',                             options:['x²+C','2x²+C','x+C','2+C'],correct:0, hint:'Reverse power rule' },
    { id:'c7d', tier:'focus', text:'d/dx(e^x) = ?',                          options:['e^x','xe^(x-1)','e^(x-1)','1'],correct:0,hint:'e^x is its own derivative' },
    { id:'c7e', tier:'deep',  text:'Chain rule: d/dx[sin(x²)] = ?',          options:['2x·cos(x²)','cos(x²)','2cos(x²)','sin(2x)'],correct:0,hint:'Outer × inner derivative' },
  ],
  fq8: [
    { id:'c8a', tier:'calm',  text:'Mean of: 4,8,6,5,3,2,8,9',              options:['5.5','5.625','6','5.75'],   correct:1, hint:'Sum ÷ count' },
    { id:'c8b', tier:'calm',  text:'Median of: 3,5,7,9,11',                  options:['7','5','9','6'],            correct:0, hint:'Middle value when sorted' },
    { id:'c8c', tier:'focus', text:'Mode of: 2,3,3,4,5,3,2',                 options:['3','2','4','5'],            correct:0, hint:'Most frequent value' },
    { id:'c8d', tier:'focus', text:'Standard deviation measures?',           options:['Spread','Center','Skew','Range'],correct:0,hint:'How spread out data is' },
    { id:'c8e', tier:'deep',  text:'P(A∪B) = P(A)+P(B) when?',              options:['Mutually exclusive','Independent','Dependent','Always'],correct:0,hint:'No overlap between events' },
  ],
  fq9: [
    { id:'c9a', tier:'calm',  text:'Area of circle r=5',                     options:['25π','10π','5π','50π'],     correct:0, hint:'A = πr²' },
    { id:'c9b', tier:'calm',  text:'Pythagoras: a=3,b=4, c=?',               options:['5','7','6','8'],            correct:0, hint:'c² = a² + b²' },
    { id:'c9c', tier:'focus', text:'Sum of angles in triangle',              options:['180°','360°','90°','270°'], correct:0, hint:'Always 180°' },
    { id:'c9d', tier:'focus', text:'Volume of cube side=3',                  options:['27','9','18','81'],         correct:0, hint:'V = s³' },
    { id:'c9e', tier:'deep',  text:'Perimeter of rectangle 4×6',             options:['20','24','10','12'],        correct:0, hint:'P = 2(l+w)' },
  ],
  fq10: [
    { id:'c10a',tier:'calm',  text:'i² = ?',                                 options:['-1','1','i','-i'],          correct:0, hint:'Definition of imaginary unit' },
    { id:'c10b',tier:'calm',  text:'|3+4i| = ?',                             options:['5','7','3','4'],            correct:0, hint:'√(3²+4²)' },
    { id:'c10c',tier:'focus', text:'(2+3i)+(1-2i) = ?',                     options:['3+i','3-i','1+5i','3+5i'], correct:0, hint:'Add real and imaginary separately' },
    { id:'c10d',tier:'focus', text:'Conjugate of 3-4i',                      options:['3+4i','-3+4i','3-4i','-3-4i'],correct:0,hint:'Flip sign of imaginary part' },
    { id:'c10e',tier:'deep',  text:'(1+i)² = ?',                             options:['2i','2','1+2i','-2i'],     correct:0, hint:'Expand: 1+2i+i²' },
  ],
};

export const fqAchievements = [
  { id: 'fqa1', title: 'First Focus',      icon: '🎯', desc: 'Complete your first Focus Quest session',    xp: 50,  condition: 'sessions >= 1',       unlocked: false },
  { id: 'fqa2', title: 'Deep Focus',       icon: '🧘', desc: 'Reach 80% focus meter in one session',      xp: 150, condition: 'focus >= 80',         unlocked: false },
  { id: 'fqa3', title: 'Calm Learner',     icon: '🌊', desc: 'Complete 3 sessions without any hints',     xp: 200, condition: 'no_hints_sessions >= 3',unlocked: false },
  { id: 'fqa4', title: 'Consistency',      icon: '📅', desc: 'Play 5 days in a row',                      xp: 250, condition: 'streak >= 5',         unlocked: false },
  { id: 'fqa5', title: 'Zone Explorer',    icon: '🗺️', desc: 'Visit 5 different concept zones',           xp: 100, condition: 'zones_visited >= 5',   unlocked: false },
  { id: 'fqa6', title: 'Perfect Session',  icon: '💯', desc: 'Answer all 5 challenges correctly',         xp: 300, condition: 'perfect_session',     unlocked: false },
  { id: 'fqa7', title: 'Streak Master',    icon: '🔥', desc: 'Maintain 7-day learning streak',            xp: 200, condition: 'streak >= 7',         unlocked: false },
  { id: 'fqa8', title: 'Focus Champion',   icon: '🏆', desc: 'Reach 90% overall mastery',                 xp: 500, condition: 'overall_mastery >= 90',unlocked: false },
];

export const weeklyFocusTrend = [
  { day: 'Mon', focus: 62, mastery: 65 },
  { day: 'Tue', focus: 70, mastery: 68 },
  { day: 'Wed', focus: 65, mastery: 66 },
  { day: 'Thu', focus: 78, mastery: 72 },
  { day: 'Fri', focus: 82, mastery: 75 },
  { day: 'Sat', focus: 75, mastery: 73 },
  { day: 'Sun', focus: 85, mastery: 78 },
];
