import { create } from 'zustand';
import { kpis, subjects, systemMetrics, systemAlerts } from '../data/mgmtData';

const useMgmtStore = create((set, get) => ({
  kpis: { ...kpis },
  subjects: subjects.map(s => ({ ...s })),
  systemMetrics: { ...systemMetrics },
  alerts: systemAlerts.map(a => ({ ...a })),
  selectedSubject: null,

  setSelectedSubject: (id) => set({ selectedSubject: id }),
  dismissAlert: (id) => set(s => ({ alerts: s.alerts.filter(a => a.id !== id) })),

  // Simulate live metric refresh
  refreshMetrics: () => set(s => ({
    systemMetrics: {
      ...s.systemMetrics,
      activeConnections: s.systemMetrics.activeConnections + Math.floor(Math.random() * 20 - 10),
      cpuUsage: Math.min(95, Math.max(20, s.systemMetrics.cpuUsage + Math.floor(Math.random() * 6 - 3))),
      responseTime: Math.max(180, s.systemMetrics.responseTime + Math.floor(Math.random() * 20 - 10)),
    },
  })),
}));

export default useMgmtStore;
