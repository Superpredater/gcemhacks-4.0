// ─── PARENT DASHBOARD MOCK DATA ──────────────────────────────────────────────

export const child = {
  id: 1,
  name: 'Sarah Johnson',
  grade: '9th Grade',
  age: 14,
  avatar: '👧',
  school: 'Central High School',
  teacher: 'Mr. Thompson',
};

export const concepts = [
  { id: 'c1',  name: 'Arithmetic',        mastery: 92, subject: 'Math', status: 'strong'      },
  { id: 'c2',  name: 'Fractions',         mastery: 85, subject: 'Math', status: 'strong'      },
  { id: 'c3',  name: 'Algebra Basics',    mastery: 72, subject: 'Math', status: 'average'     },
  { id: 'c4',  name: 'Linear Equations',  mastery: 65, subject: 'Math', status: 'average'     },
  { id: 'c5',  name: 'Quadratic Eq.',     mastery: 42, subject: 'Math', status: 'weak'        },
  { id: 'c6',  name: 'Trigonometry',      mastery: 35, subject: 'Math', status: 'critical'    },
  { id: 'c7',  name: 'Calculus Basics',   mastery: 28, subject: 'Math', status: 'critical'    },
  { id: 'c8',  name: 'Statistics',        mastery: 78, subject: 'Math', status: 'average'     },
  { id: 'c9',  name: 'Geometry',          mastery: 80, subject: 'Math', status: 'strong'      },
  { id: 'c10', name: 'Complex Numbers',   mastery: 20, subject: 'Math', status: 'critical'    },
];

export const weeklyProgress = [
  { day: 'Mon', mastery: 62, timeSpent: 45, sessions: 2 },
  { day: 'Tue', mastery: 65, timeSpent: 60, sessions: 3 },
  { day: 'Wed', mastery: 63, timeSpent: 30, sessions: 1 },
  { day: 'Thu', mastery: 68, timeSpent: 75, sessions: 3 },
  { day: 'Fri', mastery: 72, timeSpent: 90, sessions: 4 },
  { day: 'Sat', mastery: 70, timeSpent: 50, sessions: 2 },
  { day: 'Sun', mastery: 75, timeSpent: 80, sessions: 3 },
];

export const activityLog = [
  { id: 1,  date: 'Today, 4:30 PM',    type: 'lesson',     text: 'Completed Algebra Basics revision',       duration: 25, score: 82 },
  { id: 2,  date: 'Today, 2:00 PM',    type: 'assessment', text: 'Scored 80% on Linear Equations quiz',     duration: 20, score: 80 },
  { id: 3,  date: 'Yesterday, 5:00 PM',type: 'lesson',     text: 'Practiced Fractions exercises',           duration: 30, score: 90 },
  { id: 4,  date: 'Yesterday, 3:30 PM',type: 'assessment', text: 'Attempted Quadratic Equations test',      duration: 25, score: 45 },
  { id: 5,  date: '2 days ago',        type: 'lesson',     text: 'Reviewed Arithmetic fundamentals',        duration: 20, score: 95 },
  { id: 6,  date: '2 days ago',        type: 'streak',     text: 'Maintained 12-day learning streak!',      duration: 0,  score: 0  },
  { id: 7,  date: '3 days ago',        type: 'lesson',     text: 'Started Trigonometry module',             duration: 35, score: 38 },
  { id: 8,  date: '4 days ago',        type: 'assessment', text: 'Completed Statistics quiz',               duration: 20, score: 78 },
];

export const initialAlerts = [
  { id: 1,  type: 'critical', title: 'Trigonometry needs urgent attention',    desc: 'Sarah scored below 40% in 3 consecutive sessions. Immediate support recommended.', time: '2h ago',  read: false, module: 'weak-areas' },
  { id: 2,  type: 'warning',  title: 'Missed 2 practice sessions this week',   desc: 'Sarah skipped scheduled practice on Tuesday and Wednesday.', time: '1d ago',  read: false, module: 'learning' },
  { id: 3,  type: 'warning',  title: 'Quadratic Equations below threshold',    desc: 'Mastery dropped to 42% — below the 50% target. Review recommended.', time: '1d ago',  read: false, module: 'weak-areas' },
  { id: 4,  type: 'info',     title: 'Algebra Basics improving steadily',      desc: 'Sarah improved from 65% to 72% this week. Keep up the momentum!', time: '2d ago',  read: true,  module: 'mastery' },
  { id: 5,  type: 'success',  title: 'Arithmetic mastery achieved!',           desc: 'Sarah reached 92% mastery in Arithmetic. Excellent work!', time: '3d ago',  read: true,  module: 'mastery' },
  { id: 6,  type: 'critical', title: 'Predictive: Calculus risk detected',     desc: 'Based on current patterns, Sarah may struggle with Calculus next week.', time: '3d ago',  read: false, module: 'weak-areas' },
  { id: 7,  type: 'info',     title: 'Weekly report ready',                    desc: 'Sarah\'s weekly performance summary is available for review.', time: '4d ago',  read: true,  module: 'mastery' },
];

export const engagementData = [
  { week: 'Wk1', engagement: 72, timeSpent: 180 },
  { week: 'Wk2', engagement: 68, timeSpent: 150 },
  { week: 'Wk3', engagement: 75, timeSpent: 200 },
  { week: 'Wk4', engagement: 80, timeSpent: 220 },
  { week: 'Wk5', engagement: 78, timeSpent: 210 },
  { week: 'Wk6', engagement: 82, timeSpent: 240 },
  { week: 'Wk7', engagement: 85, timeSpent: 260 },
  { week: 'Wk8', engagement: 83, timeSpent: 250 },
];
