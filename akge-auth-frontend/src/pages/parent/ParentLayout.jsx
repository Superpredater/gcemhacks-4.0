import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useParentStore from './store/useParentStore';
import { child } from './data/parentData';

const NAV = [
  { id: 'dashboard', label: 'Dashboard',          icon: '🏠', route: '/parent/dashboard' },
  { id: 'learning',  label: 'Learning Activity',  icon: '📚', route: '/parent/learning' },
  { id: 'mastery',   label: 'Mastery Progress',   icon: '📊', route: '/parent/mastery' },
  { id: 'weak-areas',label: 'Weak Areas',         icon: '⚠️', route: '/parent/weak-areas' },
  { id: 'alerts',    label: 'Alerts',             icon: '🔔', route: '/parent/alerts' },
  { id: 'settings',  label: 'Privacy & Settings', icon: '⚙️', route: '/parent/settings' },
];

const BREADCRUMBS = {
  '/parent/dashboard':  'Dashboard',
  '/parent/learning':   'Learning Activity',
  '/parent/mastery':    'Mastery Progress',
  '/parent/weak-areas': 'Weak Areas',
  '/parent/alerts':     'Alerts',
  '/parent/settings':   'Privacy & Settings',
};

export default function ParentLayout() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, logout } = useAuthStore();
  const { getUnreadCount } = useParentStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const unread = getUnreadCount();
  const isActive = (route) => location.pathname === route;
  const crumb = BREADCRUMBS[location.pathname] ?? 'Dashboard';

  return (
    <div className="min-h-screen bg-slate-50 flex" style={{ fontFamily: 'system-ui, sans-serif' }}>

      {/* Sidebar */}
      <div
        className="fixed left-0 top-0 h-screen bg-white border-r border-slate-200 transition-all duration-300 z-40 flex flex-col shadow-sm"
        style={{ width: sidebarOpen ? 240 : 72 }}
      >
        {/* Logo */}
        <div className="p-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shrink-0 shadow-md">
              A
            </div>
            {sidebarOpen && (
              <div>
                <p className="text-slate-800 font-bold text-sm">AKGE</p>
                <p className="text-slate-400 text-xs">Parent Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Child info */}
        {sidebarOpen && (
          <div className="px-4 py-3 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
              <span className="text-2xl">{child.avatar}</span>
              <div className="min-w-0">
                <p className="text-slate-800 font-semibold text-sm truncate">{child.name}</p>
                <p className="text-slate-400 text-xs">{child.grade}</p>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {NAV.map(n => {
            const active = isActive(n.route);
            const isAlerts = n.id === 'alerts';
            return (
              <button key={n.id} onClick={() => navigate(n.route)} title={sidebarOpen ? '' : n.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                  active
                    ? 'bg-blue-50 border border-blue-200 text-blue-700'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-transparent'
                }`}>
                {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full" />}
                <span className="text-lg shrink-0">{n.icon}</span>
                {sidebarOpen && (
                  <span className={`text-sm font-semibold flex-1 text-left ${active ? 'text-blue-700' : ''}`}>
                    {n.label}
                  </span>
                )}
                {isAlerts && unread > 0 && (
                  <span className={`shrink-0 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center ${!sidebarOpen ? 'absolute top-1 right-1' : ''}`}>
                    {unread}
                  </span>
                )}
                {!sidebarOpen && (
                  <div className="absolute left-[68px] top-1/2 -translate-y-1/2 bg-slate-800 text-white rounded-lg px-3 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 text-xs font-semibold shadow-xl">
                    {n.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Collapse + logout */}
        <div className="p-3 border-t border-slate-100 shrink-0 space-y-2">
          {sidebarOpen && (
            <button onClick={() => { logout(); navigate('/login'); }}
              className="w-full py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 border border-red-100 text-xs font-semibold transition-all">
              Logout
            </button>
          )}
          <button onClick={() => setSidebarOpen(o => !o)}
            className="w-full flex items-center justify-center py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all border border-slate-200 text-sm">
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 transition-all duration-300" style={{ marginLeft: sidebarOpen ? 240 : 72 }}>
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">Parent</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700 font-semibold">{crumb}</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/parent/alerts')} className="relative p-2 rounded-lg hover:bg-slate-50 transition-colors">
              <span className="text-lg">🔔</span>
              {unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                  {unread}
                </span>
              )}
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              {(user?.userId ?? 'P').charAt(0).toUpperCase()}
            </div>
            <span className="text-slate-700 text-sm font-semibold hidden md:block">{user?.userId}</span>
          </div>
        </div>

        {/* Page content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
