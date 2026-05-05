import { create } from 'zustand';
import { concepts as initConcepts, initialAlerts } from '../data/parentData';

const useParentStore = create((set, get) => ({
  concepts: initConcepts.map(c => ({ ...c })),
  alerts: initialAlerts.map(a => ({ ...a })),
  settings: {
    emailAlerts:       true,
    smsAlerts:         false,
    weeklyReport:      true,
    lowPerformance:    true,
    missedSessions:    true,
    achievements:      true,
    dataVisibility:    'full',
    shareWithTeacher:  true,
    allowAnalytics:    true,
  },

  // Alerts
  markAlertRead:  (id) => set(s => ({ alerts: s.alerts.map(a => a.id === id ? { ...a, read: true } : a) })),
  markAllRead:    ()   => set(s => ({ alerts: s.alerts.map(a => ({ ...a, read: true })) })),
  dismissAlert:   (id) => set(s => ({ alerts: s.alerts.filter(a => a.id !== id) })),

  // Settings
  updateSettings: (updates) => set(s => ({ settings: { ...s.settings, ...updates } })),
  resetSettings:  () => set({ settings: {
    emailAlerts: true, smsAlerts: false, weeklyReport: true,
    lowPerformance: true, missedSessions: true, achievements: true,
    dataVisibility: 'full', shareWithTeacher: true, allowAnalytics: true,
  }}),

  // Computed
  getUnreadCount: () => get().alerts.filter(a => !a.read).length,
  getWeakConcepts: () => get().concepts.filter(c => c.mastery < 60).sort((a, b) => a.mastery - b.mastery),
  getOverallMastery: () => Math.round(get().concepts.reduce((s, c) => s + c.mastery, 0) / get().concepts.length),
}));

export default useParentStore;
