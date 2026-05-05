import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RoleBasedSidebar from './RoleBasedSidebar';

// ─── Breadcrumb map ───────────────────────────────────────────────────────────
const BREADCRUMBS = {
  '/teacher/dashboard':           ['Teacher', 'Dashboard'],
  '/teacher/mastery':             ['Teacher', 'Mastery Distribution'],
  '/teacher/weak-concepts':       ['Teacher', 'Weak Concepts'],
  '/teacher/student-performance': ['Teacher', 'Student Performance'],
  '/teacher/prereq-gaps':         ['Teacher', 'Prerequisite Gaps'],
  '/teacher/learning-patterns':   ['Teacher', 'Learning Patterns'],
  '/teacher/recommendations':     ['Teacher', 'Recommendations'],
  '/teacher/question-bank':       ['Teacher', 'Question Bank'],
  '/teacher/settings':            ['Teacher', 'Settings'],
  '/student/dashboard':           ['Student', 'Dashboard'],
  '/parent/dashboard':            ['Parent', 'Dashboard'],
  '/management/dashboard':        ['Management', 'Dashboard'],
  '/admin/dashboard':             ['Admin', 'Dashboard'],
  '/investor/dashboard':          ['Investor', 'Dashboard'],
  '/board/dashboard':             ['Board', 'Dashboard'],
};

export default function DashboardLayout({ role, userId, onLogout, children }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const crumbs = BREADCRUMBS[location.pathname] ?? [role, 'Dashboard'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar */}
      <RoleBasedSidebar
        role={role}
        sidebarOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(o => !o)}
      />

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>

        {/* Top bar */}
        <div className="sticky top-0 z-30 backdrop-blur-xl bg-slate-900/80 border-b border-white/10">
          <div className="flex items-center justify-between px-6 py-3">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500 font-medium">{crumbs[0]}</span>
              <span className="text-gray-600">/</span>
              <span className="text-white font-semibold">{crumbs[1]}</span>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg bg-white/8 hover:bg-white/15 text-gray-400 hover:text-white transition-all duration-200 text-sm">
                🔔
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">
                {(userId ?? 'U').charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:block">
                <p className="text-white text-sm font-semibold leading-none">{userId}</p>
                <p className="text-gray-500 text-xs capitalize mt-0.5">{role}</p>
              </div>
              <button
                onClick={onLogout}
                className="px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-400 hover:text-red-300 border border-red-500/25 hover:border-red-500/40 transition-all duration-200 text-xs font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-6">
          {children}
        </div>
      </div>

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>
    </div>
  );
}
