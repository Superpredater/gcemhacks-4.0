import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useMgmtStore from './store/useMgmtStore';

const NAV = [
  { id: 'dashboard',  label: 'Dashboard',        icon: '🏠', route: '/management/dashboard' },
  { id: 'growth',     label: 'Growth Index',      icon: '📈', route: '/management/growth' },
  { id: 'subjects',   label: 'Subject Analytics', icon: '📚', route: '/management/subjects' },
  { id: 'monitoring', label: 'System Monitoring', icon: '⚡', route: '/management/monitoring' },
  { id: 'scalability',label: 'Scalability',       icon: '🚀', route: '/management/scalability' },
];

const CRUMBS = {
  '/management/dashboard':   'Dashboard',
  '/management/growth':      'Growth Index',
  '/management/subjects':    'Subject Analytics',
  '/management/monitoring':  'System Monitoring',
  '/management/scalability': 'Scalability',
};

export default function MgmtLayout() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, logout } = useAuthStore();
  const { alerts } = useMgmtStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const criticalAlerts = alerts.filter(a => a.type === 'critical').length;
  const isActive = (route) => location.pathname === route;
  const crumb = CRUMBS[location.pathname] ?? 'Dashboard';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen border-r border-white/10 transition-all duration-300 z-40 flex flex-col"
        style={{ width: sidebarOpen ? 240 : 72, background: 'rgba(15,23,42,0.97)', backdropFilter: 'blur(20px)' }}>

        {/* Logo */}
        <div className="p-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-lg shrink-0 shadow-lg shadow-blue-500/30">
              M
            </div>
            {sidebarOpen && (
              <div>
                <p className="text-white font-bold text-sm">AKGE</p>
                <p className="text-blue-300 text-xs">Management Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {NAV.map(n => {
            const active = isActive(n.route);
            const isMonitor = n.id === 'monitoring';
            return (
              <button key={n.id} onClick={() => navigate(n.route)} title={sidebarOpen ? '' : n.label}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative border"
                style={{
                  background: active ? 'rgba(59,130,246,0.2)' : 'transparent',
                  borderColor: active ? 'rgba(59,130,246,0.4)' : 'transparent',
                  color: active ? '#93c5fd' : '#64748b',
                }}>
                {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-400 rounded-r-full" />}
                <span className="text-lg shrink-0">{n.icon}</span>
                {sidebarOpen && <span className={`text-sm font-semibold flex-1 text-left ${active ? 'text-blue-300' : 'text-slate-400 group-hover:text-white'}`}>{n.label}</span>}
                {isMonitor && criticalAlerts > 0 && (
                  <span className={`w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center shrink-0 ${!sidebarOpen ? 'absolute top-1 right-1' : ''}`}>
                    {criticalAlerts}
                  </span>
                )}
                {!sidebarOpen && (
                  <div className="absolute left-[68px] top-1/2 -translate-y-1/2 bg-slate-900 border border-white/20 rounded-xl px-3 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-xl text-xs font-semibold text-white">
                    {n.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/10 shrink-0 space-y-2">
          {sidebarOpen && (
            <button onClick={() => { logout(); navigate('/login'); }}
              className="w-full py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold transition-all">
              Logout
            </button>
          )}
          <button onClick={() => setSidebarOpen(o => !o)}
            className="w-full flex items-center justify-center py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-500 hover:text-white transition-all border border-white/10 text-sm">
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 transition-all duration-300" style={{ marginLeft: sidebarOpen ? 240 : 72 }}>
        {/* Top bar */}
        <div className="sticky top-0 z-30 px-6 py-3 flex items-center justify-between border-b border-white/10"
          style={{ background: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(20px)' }}>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Management</span>
            <span className="text-slate-700">/</span>
            <span className="text-white font-semibold">{crumb}</span>
          </div>
          <div className="flex items-center gap-3">
            {criticalAlerts > 0 && (
              <button onClick={() => navigate('/management/monitoring')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-500/25 transition-all">
                🚨 {criticalAlerts} alert{criticalAlerts > 1 ? 's' : ''}
              </button>
            )}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-sm">
              {(user?.userId ?? 'M').charAt(0).toUpperCase()}
            </div>
            <span className="text-white text-sm font-semibold hidden md:block">{user?.userId}</span>
          </div>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
