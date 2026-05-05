// ─── MANAGEMENT DASHBOARD DATA ───────────────────────────────────────────────

export const kpis = {
  totalStudents: 1250,
  totalTeachers: 85,
  averageMastery: 74,
  activeUsers: 856,
  trends: {
    totalStudents: +8.2,
    totalTeachers: +2.4,
    averageMastery: +5.1,
    activeUsers: +12.3,
  },
};

export const weeklyActivity = [
  { day: 'Mon', students: 720, teachers: 62, sessions: 1840 },
  { day: 'Tue', students: 810, teachers: 70, sessions: 2100 },
  { day: 'Wed', students: 780, teachers: 68, sessions: 1980 },
  { day: 'Thu', students: 856, teachers: 75, sessions: 2250 },
  { day: 'Fri', students: 900, teachers: 80, sessions: 2400 },
  { day: 'Sat', students: 620, teachers: 45, sessions: 1500 },
  { day: 'Sun', students: 540, teachers: 38, sessions: 1200 },
];

export const growthTrend = [
  { month: 'Aug', mastery: 62, students: 980,  improvement: 0   },
  { month: 'Sep', mastery: 65, students: 1020, improvement: 3   },
  { month: 'Oct', mastery: 68, students: 1080, improvement: 3   },
  { month: 'Nov', mastery: 70, students: 1120, improvement: 2   },
  { month: 'Dec', mastery: 72, students: 1180, improvement: 2   },
  { month: 'Jan', mastery: 74, students: 1250, improvement: 2   },
  { month: 'Feb', mastery: 77, students: 1320, improvement: 3   }, // forecast
  { month: 'Mar', mastery: 79, students: 1400, improvement: 2   }, // forecast
];

export const segmentGrowth = [
  { segment: 'Grade 9',  growth: 8.2, mastery: 72, students: 320 },
  { segment: 'Grade 10', growth: 6.5, mastery: 74, students: 380 },
  { segment: 'Grade 11', growth: 5.1, mastery: 76, students: 290 },
  { segment: 'Grade 12', growth: 4.8, mastery: 78, students: 260 },
];

export const subjects = [
  { id: 's1', name: 'Mathematics',  mastery: 74, students: 1250, trend: +5.1, weakConcepts: ['Calculus', 'Trigonometry'] },
  { id: 's2', name: 'Physics',      mastery: 68, students: 820,  trend: +3.2, weakConcepts: ['Quantum Mechanics', 'Optics'] },
  { id: 's3', name: 'Chemistry',    mastery: 71, students: 760,  trend: +4.5, weakConcepts: ['Organic Chemistry'] },
  { id: 's4', name: 'Biology',      mastery: 78, students: 690,  trend: +6.2, weakConcepts: ['Genetics'] },
  { id: 's5', name: 'English',      mastery: 82, students: 1250, trend: +2.8, weakConcepts: [] },
  { id: 's6', name: 'History',      mastery: 76, students: 580,  trend: +3.9, weakConcepts: ['Modern History'] },
];

export const subjectTrend = [
  { month: 'Aug', Mathematics: 65, Physics: 60, Chemistry: 63, Biology: 70, English: 76 },
  { month: 'Sep', Mathematics: 67, Physics: 62, Chemistry: 65, Biology: 72, English: 78 },
  { month: 'Oct', Mathematics: 69, Physics: 64, Chemistry: 67, Biology: 74, English: 79 },
  { month: 'Nov', Mathematics: 71, Physics: 65, Chemistry: 69, Biology: 76, English: 80 },
  { month: 'Dec', Mathematics: 72, Physics: 67, Chemistry: 70, Biology: 77, English: 81 },
  { month: 'Jan', Mathematics: 74, Physics: 68, Chemistry: 71, Biology: 78, English: 82 },
];

export const systemMetrics = {
  uptime: 99.8,
  responseTime: 245,
  errorRate: 0.02,
  activeConnections: 856,
  cpuUsage: 42,
  memoryUsage: 58,
};

export const usageOverTime = [
  { time: '00:00', users: 120, errors: 1, responseMs: 210 },
  { time: '04:00', users: 80,  errors: 0, responseMs: 190 },
  { time: '08:00', users: 420, errors: 3, responseMs: 280 },
  { time: '10:00', users: 720, errors: 5, responseMs: 320 },
  { time: '12:00', users: 856, errors: 4, responseMs: 310 },
  { time: '14:00', users: 780, errors: 2, responseMs: 290 },
  { time: '16:00', users: 820, errors: 3, responseMs: 300 },
  { time: '18:00', users: 650, errors: 2, responseMs: 260 },
  { time: '20:00', users: 480, errors: 1, responseMs: 240 },
  { time: '22:00', users: 280, errors: 1, responseMs: 220 },
];

export const errorDistribution = [
  { type: 'API Timeout',    count: 12, severity: 'medium' },
  { type: 'Auth Failure',   count: 8,  severity: 'high' },
  { type: 'DB Slow Query',  count: 15, severity: 'low' },
  { type: 'Cache Miss',     count: 22, severity: 'low' },
  { type: 'Rate Limit',     count: 5,  severity: 'medium' },
];

export const systemAlerts = [
  { id: 1, type: 'warning',  msg: 'Response time spike at 10:00 AM (320ms)',  time: '2h ago' },
  { id: 2, type: 'info',     msg: 'Peak concurrent users: 856 at 12:00 PM',   time: '3h ago' },
  { id: 3, type: 'critical', msg: 'Auth failure rate above threshold (0.8%)', time: '5h ago' },
];

export const scalabilityData = {
  currentCapacity: 2000,
  currentLoad: 856,
  projectedPeak: 1400,
  safeThreshold: 1600,
};

export const userGrowthHistogram = [
  { month: 'Aug', users: 980,  newUsers: 120 },
  { month: 'Sep', users: 1020, newUsers: 140 },
  { month: 'Oct', users: 1080, newUsers: 160 },
  { month: 'Nov', users: 1120, newUsers: 180 },
  { month: 'Dec', users: 1180, newUsers: 200 },
  { month: 'Jan', users: 1250, newUsers: 220 },
  { month: 'Feb', users: 1320, newUsers: 240 }, // forecast
  { month: 'Mar', users: 1400, newUsers: 260 }, // forecast
];

export const loadDistribution = [
  { hour: '6AM',  load: 18 },
  { hour: '8AM',  load: 52 },
  { hour: '10AM', load: 86 },
  { hour: '12PM', load: 100 },
  { hour: '2PM',  load: 92 },
  { hour: '4PM',  load: 96 },
  { hour: '6PM',  load: 78 },
  { hour: '8PM',  load: 58 },
  { hour: '10PM', load: 34 },
];
