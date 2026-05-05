// ─── STUDENT MOCK DATA ────────────────────────────────────────────────────────

export const studentProfile = {
  id: 1,
  name: 'Alex Student',
  grade: '10A',
  avatar: '👨‍🎓',
  xp: 1240,
  level: 8,
  streak: 12,
  joinDate: '2024-09-01',
};

export const concepts = [
  { id: 'c1',  name: 'Arithmetic',        mastery: 92, difficulty: 'Easy',   subject: 'Math', status: 'mastered' },
  { id: 'c2',  name: 'Fractions',         mastery: 85, difficulty: 'Easy',   subject: 'Math', status: 'mastered' },
  { id: 'c3',  name: 'Algebra Basics',    mastery: 72, difficulty: 'Medium', subject: 'Math', status: 'in-progress' },
  { id: 'c4',  name: 'Linear Equations',  mastery: 65, difficulty: 'Medium', subject: 'Math', status: 'in-progress' },
  { id: 'c5',  name: 'Quadratic Eq.',     mastery: 48, difficulty: 'Hard',   subject: 'Math', status: 'weak' },
  { id: 'c6',  name: 'Trigonometry',      mastery: 38, difficulty: 'Hard',   subject: 'Math', status: 'weak' },
  { id: 'c7',  name: 'Calculus Basics',   mastery: 22, difficulty: 'Hard',   subject: 'Math', status: 'locked' },
  { id: 'c8',  name: 'Complex Numbers',   mastery: 0,  difficulty: 'Hard',   subject: 'Math', status: 'locked' },
  { id: 'c9',  name: 'Statistics',        mastery: 78, difficulty: 'Medium', subject: 'Math', status: 'in-progress' },
  { id: 'c10', name: 'Geometry',          mastery: 80, difficulty: 'Medium', subject: 'Math', status: 'mastered' },
];

export const weeklyProgress = [
  { week: 'Mon', mastery: 62, xp: 80  },
  { week: 'Tue', mastery: 65, xp: 120 },
  { week: 'Wed', mastery: 63, xp: 60  },
  { week: 'Thu', mastery: 68, xp: 150 },
  { week: 'Fri', mastery: 72, xp: 200 },
  { week: 'Sat', mastery: 70, xp: 90  },
  { week: 'Sun', mastery: 75, xp: 180 },
];

export const learningPath = [
  { id: 'lp1', title: 'Number Foundations',  concepts: ['c1','c2'],     status: 'completed', xpReward: 200 },
  { id: 'lp2', title: 'Algebra Essentials',  concepts: ['c3','c4'],     status: 'in-progress', xpReward: 300 },
  { id: 'lp3', title: 'Advanced Algebra',    concepts: ['c5'],          status: 'available', xpReward: 400 },
  { id: 'lp4', title: 'Trigonometry',        concepts: ['c6'],          status: 'locked', xpReward: 500 },
  { id: 'lp5', title: 'Calculus Intro',      concepts: ['c7'],          status: 'locked', xpReward: 600 },
  { id: 'lp6', title: 'Complex & Stats',     concepts: ['c8','c9'],     status: 'locked', xpReward: 700 },
];

export const quizQuestions = [
  {
    id: 'q1', concept: 'c3', text: 'Simplify: 3(x + 2) - 2(x - 1)',
    options: ['x + 8', 'x + 4', '5x + 4', 'x - 8'],
    correct: 0, explanation: '3x + 6 - 2x + 2 = x + 8',
  },
  {
    id: 'q2', concept: 'c4', text: 'Solve for x: 2x + 5 = 3x - 7',
    options: ['x = 12', 'x = -12', 'x = 2', 'x = -2'],
    correct: 0, explanation: '2x - 3x = -7 - 5 → -x = -12 → x = 12',
  },
  {
    id: 'q3', concept: 'c5', text: 'Solve: x² - 5x + 6 = 0',
    options: ['x = 2, 3', 'x = -2, -3', 'x = 1, 6', 'x = -1, -6'],
    correct: 0, explanation: '(x-2)(x-3) = 0 → x = 2 or x = 3',
  },
  {
    id: 'q4', concept: 'c1', text: 'What is 15% of 200?',
    options: ['25', '30', '35', '40'],
    correct: 1, explanation: '15/100 × 200 = 30',
  },
  {
    id: 'q5', concept: 'c2', text: 'Add: 2/3 + 3/4',
    options: ['5/7', '17/12', '5/12', '6/7'],
    correct: 1, explanation: '8/12 + 9/12 = 17/12',
  },
];

export const allAchievements = [
  { id: 'a1',  title: 'First Steps',       icon: '👣', desc: 'Complete your first concept',       xp: 50,  condition: 'concepts_completed >= 1',  unlocked: true  },
  { id: 'a2',  title: 'Quick Learner',     icon: '⚡', desc: 'Complete 3 concepts in one day',    xp: 100, condition: 'daily_concepts >= 3',       unlocked: true  },
  { id: 'a3',  title: 'Streak Master',     icon: '🔥', desc: 'Maintain a 7-day streak',           xp: 200, condition: 'streak >= 7',               unlocked: true  },
  { id: 'a4',  title: 'Algebra Ace',       icon: '🧮', desc: 'Master Algebra Basics',             xp: 150, condition: 'c3_mastery >= 80',          unlocked: false },
  { id: 'a5',  title: 'Perfect Score',     icon: '💯', desc: 'Score 100% on any assessment',      xp: 300, condition: 'assessment_score == 100',   unlocked: false },
  { id: 'a6',  title: 'Consistent',        icon: '📅', desc: 'Study 5 days in a row',             xp: 150, condition: 'streak >= 5',               unlocked: true  },
  { id: 'a7',  title: 'Explorer',          icon: '🗺️', desc: 'Visit all 6 modules',               xp: 100, condition: 'modules_visited >= 6',      unlocked: false },
  { id: 'a8',  title: 'XP Hunter',         icon: '💎', desc: 'Earn 1000 XP',                      xp: 250, condition: 'total_xp >= 1000',          unlocked: true  },
  { id: 'a9',  title: 'Trig Warrior',      icon: '📐', desc: 'Complete Trigonometry module',       xp: 400, condition: 'c6_mastery >= 70',          unlocked: false },
  { id: 'a10', title: 'Math Champion',     icon: '🏆', desc: 'Reach 80% overall mastery',         xp: 500, condition: 'overall_mastery >= 80',     unlocked: false },
];

export const recentActivity = [
  { type: 'concept',    text: 'Completed Algebra Basics revision',  time: '2h ago',  xp: 30  },
  { type: 'assessment', text: 'Scored 80% on Linear Equations quiz', time: '5h ago',  xp: 80  },
  { type: 'streak',     text: 'Maintained 12-day streak!',           time: '1d ago',  xp: 50  },
  { type: 'badge',      text: 'Earned "XP Hunter" badge',            time: '2d ago',  xp: 250 },
];
