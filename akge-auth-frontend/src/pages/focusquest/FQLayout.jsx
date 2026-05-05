import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../../store/authStore';
import useFQStore from './store/useFQStore';

const NAV = [
  { id: 'dashboard',    label: 'Dashboard',     icon: '🏠', route: '/student/fq/dashboard' },
  { id: 'map',          label: 'Learning Map',  icon: '🗺️', route: '/student/fq/map' },
  { id: 'mastery',      label: 'Mastery Score', icon: '📊', route: '/student/fq/mastery' },
  { id: 'achievements', label: 'Achievements',  icon: '🏆', route: '/student/fq/achievements' },
];

const CRUMBS = {
  '/student/fq/dashboard':    'Dashboard',
  '/student/fq/map':          'Learning Map',
  '/student/fq/mastery':      'Mastery Score',
  '/student/fq/achievements': 'Achievements',
};

export default function FQLayout() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, logout } = useAuthStore();
  const { focusScore, totalXP, streak, newlyUnlocked, clearNewlyUnlocked } = useFQStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (newlyUnlocked) {
      setShowToast(true);
      const t = setTimeout(() => { setShowToast(false); clearNewlyUnlocked(); }, 3500);
      return () => clearTimeout(t);
    }
  }, [newlyUnlocked]);

  const isActive = (route) => location.pathname === route || location.pathname.startsWith(route.replace('/fq/', '/fq/game/'));
  const crumb = CRUMBS[location.pathname] ?? 'Focus Quest';

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)', fontFamily: 'system-ui, sans-serif' }}>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen border-r border-white/10 transition-all duration-300 z-40 flex flex-col"
        style={{ width: sidebarOpen ? 220 : 68, background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(20px)' }}>

        {/* Logo */}
        <div className="p-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', boxShadow: '0 0 16px rgba(139,92,246,0.4)' }}>
              🎯
            </div>
            {sidebarOpen && (
              <div>
                <p className="text-white font-black text-sm">Focus Quest</p>
                <p className="text-purple-300 text-xs">Calm Learning</p>
              </div>
            )}
          </div>
        </div>

        {/* XP + Focus */}
        {sidebarOpen && (
          <div className="px-4 py-3 border-b border-white/10 shrink-0 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-purple-300 text-xs font-semibold">Focus</span>
              <span className="text-purple-300 text-xs font-bold">{focusScore}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <motion.div className="h-2 rounded-full" animate={{ width: `${focusScore}%` }} transition={{ duration: 0.8 }}
                style={{ background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)' }} />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-yellow-400 font-bold">⚡ {totalXP} XP</span>
              <span className="text-orange-400 font-bold">🔥 {streak}d</span>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {NAV.map(n => {
            const active = isActive(n.route);
            return (
              <button key={n.id} onClick={() => navigate(n.route)} title={sidebarOpen ? '' : n.label}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative border"
                style={{
                  background: active ? 'rgba(139,92,246,0.2)' : 'transparent',
                  borderColor: active ? 'rgba(139,92,246,0.5)' : 'transparent',
                  color: active ? '#c084fc' : '#94a3b8',
                  boxShadow: active ? '0 0 12px rgba(139,92,246,0.2)' : 'none',
                }}>
                {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full" style={{ background: '#8b5cf6' }} />}
                <span className="text-lg shrink-0">{n.icon}</span>
                {sidebarOpen && <span className="text-sm font-semibold">{n.label}</span>}
                {!sidebarOpen && (
                  <div className="absolute left-[64px] top-1/2 -translate-y-1/2 bg-slate-900 border border-white/20 rounded-xl px-3 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-xl text-xs font-semibold text-white">
                    {n.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/10 shrink-0 space-y-2">
          <button onClick={() => navigate('/student/dashboard')}
            style={{ width: '100%', padding: '8px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
            {sidebarOpen ? '← Student Portal' : '←'}
          </button>
          <button onClick={() => setSidebarOpen(o => !o)}
            style={{ width: '100%', padding: '8px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#64748b', cursor: 'pointer', fontSize: 13 }}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 transition-all duration-300" style={{ marginLeft: sidebarOpen ? 220 : 68 }}>
        {/* Top bar */}
        <div className="sticky top-0 z-30 px-6 py-3 flex items-center justify-between border-b border-white/10"
          style={{ background: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(20px)' }}>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-purple-400">Focus Quest</span>
            <span className="text-white/20">/</span>
            <span className="text-white font-semibold">{crumb}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.4)', color: '#c084fc' }}>
              🎯 Focus: {focusScore}%
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}>
              {(user?.userId ?? 'S').charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* Achievement toast */}
      <AnimatePresence>
        {showToast && newlyUnlocked && (
          <motion.div initial={{ opacity: 0, y: 60, x: 20 }} animate={{ opacity: 1, y: 0, x: 0 }} exit={{ opacity: 0, y: 60 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 rounded-2xl shadow-2xl"
            style={{ background: 'rgba(15,23,42,0.98)', border: '1px solid rgba(139,92,246,0.6)', backdropFilter: 'blur(20px)', boxShadow: '0 0 32px rgba(139,92,246,0.4)' }}>
            <span className="text-3xl">{newlyUnlocked.icon}</span>
            <div>
              <p className="text-purple-300 font-black text-sm">🎉 Achievement Unlocked!</p>
              <p className="text-white font-semibold text-sm">{newlyUnlocked.title}</p>
              <p className="text-yellow-400 text-xs font-bold">+{newlyUnlocked.xp} XP</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
