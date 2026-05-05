import { create } from 'zustand';
import { initialUsers, initialRoles, initialConsents, initialRequests, initialAuditLogs, healthMetrics } from '../data/adminData';

const useAdminStore = create((set, get) => ({
  // ── Users ──
  users: initialUsers.map(u => ({ ...u })),
  selectedUsers: [],

  addUser: (user) => set(s => ({
    users: [...s.users, { ...user, id: Date.now(), lastLogin: 'Never', avatar: '👤' }],
  })),
  updateUser: (id, updates) => set(s => ({
    users: s.users.map(u => u.id === id ? { ...u, ...updates } : u),
  })),
  deleteUser: (id) => set(s => ({
    users: s.users.filter(u => u.id !== id),
    selectedUsers: s.selectedUsers.filter(x => x !== id),
  })),
  toggleUserStatus: (id) => set(s => ({
    users: s.users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u),
  })),
  toggleSelectUser: (id) => set(s => ({
    selectedUsers: s.selectedUsers.includes(id) ? s.selectedUsers.filter(x => x !== id) : [...s.selectedUsers, id],
  })),
  selectAllUsers: (ids) => set({ selectedUsers: ids }),
  clearSelection: () => set({ selectedUsers: [] }),
  bulkUpdateRole: (role) => set(s => ({
    users: s.users.map(u => s.selectedUsers.includes(u.id) ? { ...u, role } : u),
    selectedUsers: [],
  })),
  bulkUpdateStatus: (status) => set(s => ({
    users: s.users.map(u => s.selectedUsers.includes(u.id) ? { ...u, status } : u),
    selectedUsers: [],
  })),

  // ── Roles ──
  roles: initialRoles.map(r => ({ ...r, permissions: { ...r.permissions } })),
  selectedRoleId: 'r1',

  setSelectedRole: (id) => set({ selectedRoleId: id }),
  togglePermission: (roleId, module, action) => set(s => ({
    roles: s.roles.map(r =>
      r.id === roleId
        ? { ...r, permissions: { ...r.permissions, [module]: { ...r.permissions[module], [action]: !r.permissions[module][action] } } }
        : r
    ),
  })),
  addRole: (name, color) => set(s => ({
    roles: [...s.roles, {
      id: `r_${Date.now()}`, name, color,
      permissions: { users: { read: false, write: false, delete: false }, content: { read: true, write: false, delete: false }, analytics: { read: false, write: false, delete: false }, compliance: { read: false, write: false, delete: false }, settings: { read: false, write: false, delete: false } },
    }],
  })),
  resetRole: (roleId) => set(s => ({
    roles: s.roles.map(r =>
      r.id === roleId
        ? { ...r, permissions: Object.fromEntries(Object.keys(r.permissions).map(m => [m, { read: false, write: false, delete: false }])) }
        : r
    ),
  })),

  // ── Compliance ──
  consents: initialConsents.map(c => ({ ...c })),
  requests: initialRequests.map(r => ({ ...r })),
  auditLogs: initialAuditLogs.map(l => ({ ...l })),
  retentionPolicy: { days: 365, autoDelete: false, notifyBefore: 30 },

  updateRequest: (id, status) => set(s => ({
    requests: s.requests.map(r => r.id === id ? { ...r, status } : r),
    auditLogs: [{ id: Date.now(), actor: 'admin@school.edu', action: `Request ${status}`, target: s.requests.find(r => r.id === id)?.userName ?? '', date: new Date().toLocaleString(), module: 'compliance' }, ...s.auditLogs],
  })),
  updateRetentionPolicy: (updates) => set(s => ({ retentionPolicy: { ...s.retentionPolicy, ...updates } })),

  // ── Health ──
  healthMetrics: { ...healthMetrics },
  alerts: [
    { id: 1, type: 'warning',  msg: 'Response time elevated (245ms)',    time: '2h ago' },
    { id: 2, type: 'critical', msg: 'Auth failure rate above threshold', time: '5h ago' },
  ],
  incidents: [
    { id: 1, title: 'Auth service degraded',    severity: 'high',   status: 'resolved', date: '2026-05-04 14:00', duration: '12 min' },
    { id: 2, title: 'DB response time spike',   severity: 'medium', status: 'resolved', date: '2026-05-03 10:30', duration: '5 min' },
    { id: 3, title: 'Cache invalidation issue', severity: 'low',    status: 'resolved', date: '2026-05-01 08:15', duration: '3 min' },
  ],
  dismissAlert: (id) => set(s => ({ alerts: s.alerts.filter(a => a.id !== id) })),
  refreshHealth: () => set(s => ({
    healthMetrics: {
      ...s.healthMetrics,
      activeUsers: s.healthMetrics.activeUsers + Math.floor(Math.random() * 20 - 10),
      cpuUsage: Math.min(95, Math.max(20, s.healthMetrics.cpuUsage + Math.floor(Math.random() * 6 - 3))),
      responseTime: Math.max(180, s.healthMetrics.responseTime + Math.floor(Math.random() * 20 - 10)),
    },
  })),
}));

export default useAdminStore;
