import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import DashboardLayout from '../../components/DashboardLayout';

const cards = [
  { icon: '🌅', title: 'Morning Learners', value: '18 students', desc: 'Perform 15% better in morning sessions', color: 'from-yellow-500/20 to-orange-500/20', border: 'border-yellow-500/30' },
  { icon: '👥', title: 'Group Study Effect', value: '+22% retention', desc: 'Students who study in groups retain more', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30' },
  { icon: '👁️', title: 'Visual Learners', value: '12 students', desc: 'Need more diagrams and visual aids', color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30' },
  { icon: '🔄', title: 'Spaced Repetition', value: '+18% mastery', desc: 'Students using spaced review improve faster', color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30' },
];

const patterns = [
  { pattern: 'Fast Learners',    count: 4,  pct: 33, color: '#22c55e' },
  { pattern: 'Steady Achievers', count: 5,  pct: 42, color: '#3b82f6' },
  { pattern: 'Struggling',       count: 3,  pct: 25, color: '#ef4444' },
];

export default function LearningPatterns() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <DashboardLayout role="teacher" userId={user?.userId} onLogout={handleLogout}>
      <div className="space-y-6">
        <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/20 rounded-2xl p-6">
          <h1 className="text-3xl font-black text-white">Learning Patterns</h1>
          <p className="text-gray-300 mt-1">Identify how your students learn best</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((c, i) => (
            <div key={i} className={`backdrop-blur-xl bg-gradient-to-br ${c.color} border ${c.border} rounded-2xl p-6`}>
              <div className="flex items-start gap-4">
                <span className="text-3xl">{c.icon}</span>
                <div>
                  <p className="text-white font-bold text-lg">{c.title}</p>
                  <p className="text-2xl font-black text-white mt-1">{c.value}</p>
                  <p className="text-gray-300 text-sm mt-1">{c.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Student Archetype Distribution</h3>
          <div className="space-y-3">
            {patterns.map(p => (
              <div key={p.pattern}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300 font-medium">{p.pattern}</span>
                  <span className="font-bold" style={{ color: p.color }}>{p.count} students ({p.pct}%)</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <div className="h-3 rounded-full transition-all duration-700" style={{ width: `${p.pct}%`, background: p.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={() => navigate('/teacher/weak-concepts')} className="px-5 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 transition-all font-semibold text-sm">⚠️ View Weak Concepts</button>
          <button onClick={() => navigate('/teacher/student-performance')} className="px-5 py-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30 transition-all font-semibold text-sm">👥 Student Performance</button>
          <button onClick={() => navigate('/teacher/recommendations')} className="px-5 py-2.5 rounded-xl bg-green-500/20 border border-green-500/30 text-green-300 hover:bg-green-500/30 transition-all font-semibold text-sm">💡 Recommendations</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
