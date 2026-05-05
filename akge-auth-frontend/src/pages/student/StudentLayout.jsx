import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useStudentStore from './store/useStudentStore';

const NAV = [
  { id: 'dashboard',     label: 'Dashboard',      icon: '🏠', route: '/student/dashboard' },
  { id: 'learning-path', label: 'Learning Path',  icon: '🗺️', route: '/student/learning-path' },
  { id: 'concepts',      label: 'Concepts',       icon: '📚', route: '/student/concepts' },
  { id: 'assessment',    label: 'Assessment',     icon: '📝', route: '/student/assessment' },
  { id: 'mastery',       label: 'Mastery Score',  icon: '📊', route: '/student/mastery' },
  { id: 'achievements',  label: 'Achievements',   icon: '🏆', route: '/student/achievements' },
  { id: 'map',           label: '3D Skill Map',   icon: '🗺️', route: '/student/map' },
  { id: 'leaderboard',   label: 'Leaderboard',    icon: '🏅', route: '/student/leaderboard' },
  { id: 'focusquest',    label: 'Focus Quest',    icon: '🎯', route: '/student/fq/dashboard' },
  { id: 'neuralsync',    label: 'Neural Sync',    icon: '🧠', route: '/student/neural-sync' },
];

export default function StudentLayout() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, logout } = useAuthStore();
  const { profile, markVisited, newlyUnlocked, clearNewlyUnlocked } = useStudentStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showUnlock, setShowUnlock] = useState(false);

  // Mark module visited on route change
  useEffect(() => {
    const seg = location.pathname.split('/').pop();
    markVisited(seg);
  }, [location.pathname]);

  // Show unlock toast
  useEffect(() => {
    if (newlyUnlocked) {
      setShowUnlock(true);
      const t = setTimeout(() => { setShowUnlock(false); clearNewlyUnlocked(); }, 3500);
      return () => clearTimeout(t);
    }
  }, [newlyUnlocked]);

  const handleLogout = () => { logout(); navigate('/login'); };
  const isActive = (route) => location.pathname === route;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900/98 to-slate-800/98 backdrop-blur-xl border-r border-white/10 transition-all duration-300 z-40 flex flex-col`}
        style={{ width: sidebarOpen ? '240px' : '72px' }}>
        {/* Logo */}
        <div className="p-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-black text-lg shrink-0 shadow-lg shadow-blue-500/30">
              A
            </div>
            {sidebarOpen && (
              <div>
                <p className="text-white font-bold text-sm">AKGE</p>
                <p className="text-xs text-gray-400">Student Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* XP bar */}
        {sidebarOpen && (
          <div className="px-4 py-3 border-b border-white/10 shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-400 font-semibold">Level {profile.level}</span>
              <span className="text-xs text-yellow-400 font-bold">{profile.xp} XP</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div className="h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-700"
                style={{ width: `${(profile.xp % 200) / 2}%` }} />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-orange-400 text-sm">🔥</span>
              <span className="text-xs text-gray-300">{profile.streak} day streak</span>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {NAV.map(n => {
            const active = isActive(n.route);
            return (
              <button key={n.id} onClick={() => navigate(n.route)} title={sidebarOpen ? '' : n.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                  active
                    ? 'bg-blue-500/25 border border-blue-500/40 text-blue-300 shadow-sm shadow-blue-500/20'
                    : 'text-gray-400 hover:bg-white/8 hover:text-white border border-transparent'
                }`}>
                {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-400 rounded-r-full" />}
                <span className="text-lg shrink-0">{n.icon}</span>
                {sidebarOpen && <span className={`text-sm font-semibold ${active ? 'text-blue-300' : ''}`}>{n.label}</span>}
                {!sidebarOpen && (
                  <div className="absolute left-[68px] top-1/2 -translate-y-1/2 bg-slate-900 border border-white/20 rounded-xl px-3 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-xl">
                    <p className="text-sm font-semibold text-white">{n.label}</p>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Collapse + logout */}
        <div className="p-3 border-t border-white/10 shrink-0 space-y-2">
          {sidebarOpen && (
            <button onClick={handleLogout}
              className="w-full py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 hover:text-red-300 border border-red-500/25 text-xs font-semibold transition-all">
              Logout
            </button>
          )}
          <button onClick={() => setSidebarOpen(o => !o)}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-white/10 text-sm">
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300`} style={{ marginLeft: sidebarOpen ? '240px' : '72px' }}>
        {/* Top bar */}
        <div className="sticky top-0 z-30 backdrop-blur-xl bg-slate-900/80 border-b border-white/10 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Student</span>
            <span className="text-gray-600">/</span>
            <span className="text-white font-semibold capitalize">
              {location.pathname.split('/').pop().replace('-', ' ')}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-yellow-400 text-sm font-bold">⚡ {profile.xp} XP</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
              {(user?.userId ?? 'S').charAt(0).toUpperCase()}
            </div>
            <span className="text-white text-sm font-semibold hidden md:block">{user?.userId}</span>
          </div>
        </div>

        {/* Page content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* Achievement unlock toast */}
      {showUnlock && newlyUnlocked && (
        <div className="fixed bottom-6 right-6 z-50 backdrop-blur-xl bg-yellow-500/20 border border-yellow-500/50 rounded-2xl p-4 shadow-2xl shadow-yellow-500/20 animate-bounce"
          style={{ animation: 'slideIn 0.4s ease' }}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{newlyUnlocked.icon}</span>
            <div>
              <p className="text-yellow-300 font-black text-sm">🎉 Achievement Unlocked!</p>
              <p className="text-white font-semibold text-sm">{newlyUnlocked.title}</p>
              <p className="text-yellow-400 text-xs font-bold">+{newlyUnlocked.xp} XP</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
