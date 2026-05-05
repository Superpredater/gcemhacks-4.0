import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useAdminStore from './store/useAdminStore';

const NAV = [
  { id: 'users',      label: 'User Management',    icon: '👥', route: '/admin/users' },
  { id: 'roles',      label: 'Roles & Permissions', icon: '🔐', route: '/admin/roles' },
  { id: 'compliance', label: 'DPDP Compliance',     icon: '📋', route: '/admin/compliance' },
  { id: 'health',     label: 'System Health',       icon: '⚡', route: '/admin/health' },
];

const CRUMBS = {
  '/admin/users':      'User Management',
  '/admin/roles':      'Roles & Permissions',
  '/admin/compliance': 'DPDP Compliance',
  '/admin/health':     'System Health',
};

export default function AdminLayout() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, logout } = useAuthStore();
  const { alerts } = useAdminStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const criticalCount = alerts.filter(a => a.type === 'critical').length;
  const isActive = (route) => location.pathname === route;
  const crumb = CRUMBS[location.pathname] ?? 'Admin';

  return (
    <div className="min-h-screen bg-slate-50 flex" style={{ fontFamily: 'system-ui, sans-serif' }}>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen bg-slate-900 border-r border-slate-800 transition-all duration-300 z-40 flex flex-col"
        style={{ width: sidebarOpen ? 240 : 68 }}>

        {/* Logo */}
        <div className="p-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center text-white font-black text-lg shrink-0 shadow-lg">
              A
            </div>
            {sidebarOpen && (
              <div>
                <p className="text-white font-bold text-sm">AKGE Admin</p>
                <p className="text-red-400 text-xs">Control Panel</p>
              </div>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {NAV.map(n => {
            const active = isActive(n.route);
            const isHealth = n.id === 'health';
            return (
              <button key={n.id} onClick={() => navigate(n.route)} title={sidebarOpen ? '' : n.label}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative"
                style={{
                  background: active ? 'rgba(239,68,68,0.15)' : 'transparent',
                  color: active ? '#fca5a5' : '#94a3b8',
                }}>
                {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-400 rounded-r-full" />}
                <span className="text-lg shrink-0">{n.icon}</span>
                {sidebarOpen && <span className={`text-sm font-semibold flex-1 text-left ${active ? 'text-red-300' : 'text-slate-400 group-hover:text-white'}`}>{n.label}</span>}
                {isHealth && criticalCount > 0 && (
                  <span className={`w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center shrink-0 ${!sidebarOpen ? 'absolute top-1 right-1' : ''}`}>
                    {criticalCount}
                  </span>
                )}
                {!sidebarOpen && (
                  <div className="absolute left-[64px] top-1/2 -translate-y-1/2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-xl text-xs font-semibold text-white">
                    {n.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-slate-800 shrink-0 space-y-2">
          {sidebarOpen && (
            <button onClick={() => { logout(); navigate('/login'); }}
              className="w-full py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold transition-all">
              Logout
            </button>
          )}
          <button onClick={() => setSidebarOpen(o => !o)}
            className="w-full flex items-center justify-center py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-500 hover:text-white transition-all text-sm">
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 transition-all duration-300" style={{ marginLeft: sidebarOpen ? 240 : 68 }}>
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">Admin</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700 font-semibold">{crumb}</span>
          </div>
          <div className="flex items-center gap-3">
            {criticalCount > 0 && (
              <button onClick={() => navigate('/admin/health')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-100 transition-all">
                🚨 {criticalCount} critical
              </button>
            )}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
              {(user?.userId ?? 'A').charAt(0).toUpperCase()}
            </div>
            <span className="text-slate-700 text-sm font-semibold hidden md:block">{user?.userId}</span>
          </div>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
