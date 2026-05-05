// ─── ADMIN DASHBOARD DATA ─────────────────────────────────────────────────────

export const initialUsers = [
  { id: 1,  name: 'Alice Johnson',   email: 'alice@school.edu',   role: 'student',    status: 'active',   lastLogin: '2026-05-05 09:30', avatar: '👩‍🎓' },
  { id: 2,  name: 'Bob Smith',       email: 'bob@school.edu',     role: 'student',    status: 'active',   lastLogin: '2026-05-05 08:15', avatar: '👨‍🎓' },
  { id: 3,  name: 'Carol White',     email: 'carol@school.edu',   role: 'teacher',    status: 'active',   lastLogin: '2026-05-05 07:45', avatar: '👩‍🏫' },
  { id: 4,  name: 'David Brown',     email: 'david@school.edu',   role: 'student',    status: 'inactive', lastLogin: '2026-04-28 14:20', avatar: '👨‍🎓' },
  { id: 5,  name: 'Emma Davis',      email: 'emma@school.edu',    role: 'parent',     status: 'active',   lastLogin: '2026-05-04 18:00', avatar: '👩' },
  { id: 6,  name: 'Frank Miller',    email: 'frank@school.edu',   role: 'teacher',    status: 'active',   lastLogin: '2026-05-05 06:30', avatar: '👨‍🏫' },
  { id: 7,  name: 'Grace Wilson',    email: 'grace@school.edu',   role: 'student',    status: 'active',   lastLogin: '2026-05-05 10:00', avatar: '👩‍🎓' },
  { id: 8,  name: 'Henry Moore',     email: 'henry@school.edu',   role: 'management', status: 'active',   lastLogin: '2026-05-05 08:00', avatar: '👨‍💼' },
  { id: 9,  name: 'Iris Taylor',     email: 'iris@school.edu',    role: 'student',    status: 'active',   lastLogin: '2026-05-04 20:15', avatar: '👩‍🎓' },
  { id: 10, name: 'Jack Anderson',   email: 'jack@school.edu',    role: 'student',    status: 'suspended',lastLogin: '2026-04-20 11:30', avatar: '👨‍🎓' },
  { id: 11, name: 'Karen Thomas',    email: 'karen@school.edu',   role: 'parent',     status: 'active',   lastLogin: '2026-05-03 16:45', avatar: '👩' },
  { id: 12, name: 'Leo Jackson',     email: 'leo@school.edu',     role: 'admin',      status: 'active',   lastLogin: '2026-05-05 07:00', avatar: '👨‍💻' },
];

export const ROLES = ['admin', 'teacher', 'student', 'parent', 'management', 'investor', 'board'];

export const initialRoles = [
  {
    id: 'r1', name: 'Admin', color: '#ef4444',
    permissions: {
      users:      { read: true,  write: true,  delete: true  },
      content:    { read: true,  write: true,  delete: true  },
      analytics:  { read: true,  write: true,  delete: false },
      compliance: { read: true,  write: true,  delete: true  },
      settings:   { read: true,  write: true,  delete: true  },
    },
  },
  {
    id: 'r2', name: 'Teacher', color: '#3b82f6',
    permissions: {
      users:      { read: true,  write: false, delete: false },
      content:    { read: true,  write: true,  delete: false },
      analytics:  { read: true,  write: false, delete: false },
      compliance: { read: false, write: false, delete: false },
      settings:   { read: true,  write: false, delete: false },
    },
  },
  {
    id: 'r3', name: 'Student', color: '#22c55e',
    permissions: {
      users:      { read: false, write: false, delete: false },
      content:    { read: true,  write: false, delete: false },
      analytics:  { read: true,  write: false, delete: false },
      compliance: { read: false, write: false, delete: false },
      settings:   { read: true,  write: false, delete: false },
    },
  },
  {
    id: 'r4', name: 'Parent', color: '#f59e0b',
    permissions: {
      users:      { read: false, write: false, delete: false },
      content:    { read: true,  write: false, delete: false },
      analytics:  { read: true,  write: false, delete: false },
      compliance: { read: true,  write: false, delete: false },
      settings:   { read: true,  write: false, delete: false },
    },
  },
];

export const MODULES = ['users', 'content', 'analytics', 'compliance', 'settings'];
export const ACTIONS = ['read', 'write', 'delete'];

export const initialConsents = [
  { userId: 1,  userName: 'Alice Johnson', status: 'granted', date: '2026-01-15', scope: 'full' },
  { userId: 2,  userName: 'Bob Smith',     status: 'granted', date: '2026-01-16', scope: 'limited' },
  { userId: 4,  userName: 'David Brown',   status: 'revoked', date: '2026-03-10', scope: 'none' },
  { userId: 7,  userName: 'Grace Wilson',  status: 'pending', date: '2026-05-01', scope: 'full' },
  { userId: 9,  userName: 'Iris Taylor',   status: 'granted', date: '2026-02-20', scope: 'full' },
];

export const initialRequests = [
  { id: 1,  userId: 1,  userName: 'Alice Johnson', type: 'access',   status: 'pending',  date: '2026-05-03', reason: 'Requesting full data export' },
  { id: 2,  userId: 4,  userName: 'David Brown',   type: 'deletion', status: 'pending',  date: '2026-05-04', reason: 'Account closure request' },
  { id: 3,  userId: 7,  userName: 'Grace Wilson',  type: 'access',   status: 'approved', date: '2026-04-28', reason: 'Academic records review' },
  { id: 4,  userId: 10, userName: 'Jack Anderson', type: 'deletion', status: 'rejected', date: '2026-04-15', reason: 'Incomplete verification' },
  { id: 5,  userId: 9,  userName: 'Iris Taylor',   type: 'access',   status: 'pending',  date: '2026-05-05', reason: 'Parent consent verification' },
];

export const initialAuditLogs = [
  { id: 1,  actor: 'leo@school.edu',   action: 'User deactivated',       target: 'jack@school.edu',  date: '2026-05-04 14:30', module: 'users' },
  { id: 2,  actor: 'leo@school.edu',   action: 'Role changed to Teacher', target: 'carol@school.edu', date: '2026-05-03 10:15', module: 'roles' },
  { id: 3,  actor: 'henry@school.edu', action: 'Data export approved',    target: 'grace@school.edu', date: '2026-04-28 09:00', module: 'compliance' },
  { id: 4,  actor: 'leo@school.edu',   action: 'Retention policy updated',target: 'system',           date: '2026-04-25 16:45', module: 'compliance' },
  { id: 5,  actor: 'carol@school.edu', action: 'Content created',         target: 'Algebra Quiz',     date: '2026-05-05 08:30', module: 'content' },
];

export const healthMetrics = {
  uptime: 99.8,
  activeUsers: 856,
  errorCount: 12,
  responseTime: 245,
  cpuUsage: 42,
  memoryUsage: 58,
};

export const usageTimeline = [
  { time: '00:00', users: 120, errors: 1 },
  { time: '04:00', users: 80,  errors: 0 },
  { time: '08:00', users: 420, errors: 3 },
  { time: '10:00', users: 720, errors: 5 },
  { time: '12:00', users: 856, errors: 4 },
  { time: '14:00', users: 780, errors: 2 },
  { time: '16:00', users: 820, errors: 3 },
  { time: '18:00', users: 650, errors: 2 },
  { time: '20:00', users: 480, errors: 1 },
  { time: '22:00', users: 280, errors: 1 },
];

export const errorsByType = [
  { type: 'API Timeout',   count: 5, severity: 'medium' },
  { type: 'Auth Failure',  count: 3, severity: 'high' },
  { type: 'DB Slow Query', count: 2, severity: 'low' },
  { type: 'Cache Miss',    count: 2, severity: 'low' },
];

export const incidents = [
  { id: 1, title: 'Auth service degraded',     severity: 'high',   status: 'resolved', date: '2026-05-04 14:00', duration: '12 min' },
  { id: 2, title: 'DB response time spike',    severity: 'medium', status: 'resolved', date: '2026-05-03 10:30', duration: '5 min' },
  { id: 3, title: 'Cache invalidation issue',  severity: 'low',    status: 'resolved', date: '2026-05-01 08:15', duration: '3 min' },
];
