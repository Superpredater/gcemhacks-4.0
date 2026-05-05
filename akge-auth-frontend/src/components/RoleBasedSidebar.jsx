import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// ─── Route map per role ───────────────────────────────────────────────────────
const roleNavigation = {
  student: [
    {
      section: 'Learning',
      items: [
        { icon: '📊', label: 'Dashboard',     route: '/student/dashboard',  description: 'Your learning overview' },
        { icon: '📚', label: 'Learning Path', route: '/student/dashboard',  description: 'Personalized journey' },
        { icon: '🎯', label: 'Concepts',      route: '/student/dashboard',  description: 'Master concepts' },
        { icon: '📝', label: 'Assessments',   route: '/student/dashboard',  description: 'Quizzes & tests' },
      ],
    },
    {
      section: 'Progress',
      items: [
        { icon: '📈', label: 'Mastery Score', route: '/student/dashboard', description: 'Track progress' },
        { icon: '🏆', label: 'Achievements',  route: '/student/dashboard', description: 'Badges & milestones' },
      ],
    },
  ],

  parent: [
    {
      section: 'Child Monitoring',
      items: [
        { icon: '👨‍👧', label: 'Dashboard',       route: '/parent/dashboard', description: 'Child overview' },
        { icon: '📚', label: 'Learning Path',    route: '/parent/dashboard', description: 'Current journey' },
        { icon: '📈', label: 'Mastery Progress', route: '/parent/dashboard', description: 'Progress tracking' },
        { icon: '⚠️', label: 'Weak Areas',       route: '/parent/dashboard', description: 'Areas needing help' },
      ],
    },
    {
      section: 'Notifications & Privacy',
      items: [
        { icon: '🔔', label: 'Alerts',          route: '/parent/dashboard', description: 'Performance alerts' },
        { icon: '🔒', label: 'Privacy Control', route: '/parent/dashboard', description: 'DPDP compliance' },
      ],
    },
  ],

  teacher: [
    {
      section: 'Class Monitoring',
      items: [
        { icon: '🏠', label: 'Dashboard',           route: '/teacher/dashboard',           description: 'Class overview' },
        { icon: '📊', label: 'Mastery Distribution', route: '/teacher/mastery',             description: 'Class-wide scores' },
        { icon: '⚠️', label: 'Weak Concepts',        route: '/teacher/weak-concepts',       description: 'Problem areas' },
        { icon: '👥', label: 'Student Performance',  route: '/teacher/student-performance', description: 'Individual metrics' },
      ],
    },
    {
      section: 'Teaching Insights',
      items: [
        { icon: '🔍', label: 'Prerequisite Gaps',  route: '/teacher/prereq-gaps',          description: 'Missing foundations' },
        { icon: '📈', label: 'Learning Patterns',  route: '/teacher/learning-patterns',    description: 'Analyze trends' },
        { icon: '💡', label: 'Recommendations',    route: '/teacher/recommendations',      description: 'Teaching suggestions' },
      ],
    },
    {
      section: 'Content Control',
      items: [
        { icon: '📚', label: 'Question Bank',      route: '/teacher/question-bank',        description: 'Manage questions' },
        { icon: '⚙️', label: 'Settings',           route: '/teacher/settings',             description: 'Preferences' },
      ],
    },
  ],

  management: [
    {
      section: 'Analytics',
      items: [
        { icon: '📊', label: 'Dashboard',         route: '/management/dashboard', description: 'Institution overview' },
        { icon: '📈', label: 'Growth Index',      route: '/management/dashboard', description: 'Growth trends' },
        { icon: '📚', label: 'Subject Analytics', route: '/management/dashboard', description: 'By subject' },
      ],
    },
    {
      section: 'Monitoring',
      items: [
        { icon: '⚡', label: 'System Monitoring', route: '/management/dashboard', description: 'System health' },
        { icon: '📈', label: 'Scalability',       route: '/management/dashboard', description: 'Capacity metrics' },
      ],
    },
  ],

  admin: [
    {
      section: 'System Control',
      items: [
        { icon: '👥', label: 'User Management',    route: '/admin/dashboard', description: 'Manage all users' },
        { icon: '🔐', label: 'Roles & Permissions', route: '/admin/dashboard', description: 'Access control' },
      ],
    },
    {
      section: 'Compliance',
      items: [
        { icon: '📋', label: 'DPDP Compliance',  route: '/admin/dashboard', description: 'Regulations' },
        { icon: '🚨', label: 'System Health',    route: '/admin/dashboard', description: 'Error tracking' },
      ],
    },
  ],

  investor: [
    {
      section: 'Business Insights',
      items: [
        { icon: '📊', label: 'Dashboard',       route: '/investor/dashboard', description: 'Platform overview' },
        { icon: '📈', label: 'Usage Stats',     route: '/investor/dashboard', description: 'Platform metrics' },
        { icon: '💰', label: 'ROI Analysis',    route: '/investor/dashboard', description: 'Return on investment' },
      ],
    },
    {
      section: 'Impact',
      items: [
        { icon: '🎯', label: 'Engagement',      route: '/investor/dashboard', description: 'User engagement' },
        { icon: '📈', label: 'Scalability',     route: '/investor/dashboard', description: 'Growth indicators' },
      ],
    },
  ],

  board: [
    {
      section: 'Strategic Overview',
      items: [
        { icon: '📊', label: 'Dashboard',            route: '/board/dashboard', description: 'Strategic overview' },
        { icon: '📚', label: 'Learning Outcomes',    route: '/board/dashboard', description: 'Learning results' },
        { icon: '🏢', label: 'Institution Perf.',    route: '/board/dashboard', description: 'Overall metrics' },
      ],
    },
    {
      section: 'Governance',
      items: [
        { icon: '✅', label: 'Compliance',           route: '/board/dashboard', description: 'Compliance status' },
        { icon: '💡', label: 'Recommendations',      route: '/board/dashboard', description: 'Strategic advice' },
      ],
    },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function RoleBasedSidebar({ role, sidebarOpen, onToggle }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [expandedSections, setExpandedSections] = useState({});

  const navigation = roleNavigation[role?.toLowerCase()] ?? roleNavigation.student;

  const toggleSection = (section) =>
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));

  const isActive = (route) => location.pathname === route;

  const handleNav = (route) => navigate(route);

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900/98 to-slate-800/98 backdrop-blur-xl border-r border-white/10 transition-all duration-300 z-40 flex flex-col ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo */}
      <div className="p-5 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-black text-lg shrink-0 shadow-lg shadow-blue-500/30">
            A
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-white font-bold text-sm">AKGE</p>
              <p className="text-xs text-gray-400">Learning Platform</p>
            </div>
          )}
        </div>
      </div>

      {/* Role badge */}
      {sidebarOpen && (
        <div className="px-4 py-3 border-b border-white/10 shrink-0">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold capitalize">
            {role}
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navigation.map((section, si) => {
          const isExpanded = expandedSections[section.section] !== false; // default open
          return (
            <div key={si} className="mb-1">
              {/* Section header */}
              {sidebarOpen && (
                <button
                  onClick={() => toggleSection(section.section)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-widest"
                >
                  <span>{section.section}</span>
                  <span className={`transition-transform duration-200 text-xs ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                </button>
              )}

              {/* Items */}
              {(sidebarOpen ? isExpanded : true) && (
                <div className="space-y-0.5">
                  {section.items.map((item, ii) => {
                    const active = isActive(item.route);
                    return (
                      <button
                        key={ii}
                        onClick={() => handleNav(item.route)}
                        title={sidebarOpen ? '' : item.label}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                          active
                            ? 'bg-blue-500/25 border border-blue-500/40 text-blue-300 shadow-sm shadow-blue-500/20'
                            : 'text-gray-400 hover:bg-white/8 hover:text-white border border-transparent'
                        }`}
                      >
                        {/* Active indicator */}
                        {active && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-400 rounded-r-full" />
                        )}

                        <span className={`text-lg shrink-0 transition-transform duration-200 ${active ? '' : 'group-hover:scale-110'}`}>
                          {item.icon}
                        </span>

                        {sidebarOpen && (
                          <div className="flex-1 text-left min-w-0">
                            <p className={`text-sm font-semibold truncate ${active ? 'text-blue-300' : ''}`}>
                              {item.label}
                            </p>
                            <p className="text-xs text-gray-500 truncate group-hover:text-gray-400">
                              {item.description}
                            </p>
                          </div>
                        )}

                        {/* Tooltip when collapsed */}
                        {!sidebarOpen && (
                          <div className="absolute left-[72px] top-1/2 -translate-y-1/2 bg-slate-900 border border-white/20 rounded-xl px-3 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-xl">
                            <p className="text-sm font-semibold text-white">{item.label}</p>
                            <p className="text-xs text-gray-400">{item.description}</p>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-white/10 shrink-0">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200 border border-white/10"
        >
          <span className="text-sm">{sidebarOpen ? '◀' : '▶'}</span>
          {sidebarOpen && <span className="text-sm font-medium">Collapse</span>}
        </button>
      </div>
    </div>
  );
}
