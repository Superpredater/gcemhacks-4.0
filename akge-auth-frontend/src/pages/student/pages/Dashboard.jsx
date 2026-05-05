import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import useStudentStore from '../store/useStudentStore';
import { weeklyProgress, recentActivity } from '../data/studentData';

const activityIcon = { concept: '📚', assessment: '📝', streak: '🔥', badge: '🏆' };

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile, concepts } = useStudentStore();

  const overallMastery = Math.round(concepts.reduce((s, c) => s + c.mastery, 0) / concepts.length);
  const weakCount = concepts.filter(c => c.mastery < 50).length;
  const masteredCount = concepts.filter(c => c.mastery >= 80).length;
  const pendingTasks = concepts.filter(c => c.status === 'in-progress').length;

  const insight = overallMastery >= 75
    ? '🚀 Great progress! You\'re above average in most concepts.'
    : overallMastery >= 60
    ? '📈 Good work! Focus on Quadratic Equations and Trigonometry to level up.'
    : '💪 Keep going! Consistent practice will improve your mastery quickly.';

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 rounded-2xl p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Welcome back, {profile.name.split(' ')[0]}! 👋</h1>
            <p className="text-gray-300 mt-1">{insight}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/student/learning-path')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold text-sm transition-all hover:scale-105 shadow-lg shadow-blue-500/30">
              🗺️ Continue Learning
            </button>
            <button onClick={() => navigate('/student/assessment')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold text-sm transition-all hover:scale-105 shadow-lg shadow-green-500/30">
              📝 Take Assessment
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Overall Mastery', value: `${overallMastery}%`, icon: '📊', color: '#3b82f6', sub: 'across all concepts' },
          { label: 'Streak',          value: `${profile.streak}d`, icon: '🔥', color: '#f97316', sub: 'days in a row' },
          { label: 'Mastered',        value: masteredCount,         icon: '✅', color: '#22c55e', sub: 'concepts ≥80%' },
          { label: 'Pending',         value: pendingTasks,          icon: '⏳', color: '#eab308', sub: 'in-progress topics' },
        ].map(s => (
          <div key={s.label} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-xs text-gray-500">{s.sub}</span>
            </div>
            <p className="text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-gray-400 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly progress chart */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-1">Weekly Progress</h3>
          <p className="text-gray-400 text-sm mb-4">Mastery trend this week</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyProgress}>
              <defs>
                <linearGradient id="masteryGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[55, 80]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10 }}
                labelStyle={{ color: '#94a3b8' }} itemStyle={{ color: '#60a5fa' }} />
              <Area type="monotone" dataKey="mastery" stroke="#3b82f6" strokeWidth={2.5}
                fill="url(#masteryGrad)" dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent activity */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                <span className="text-xl shrink-0">{activityIcon[a.type]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-200 text-sm truncate">{a.text}</p>
                  <p className="text-gray-500 text-xs">{a.time}</p>
                </div>
                <span className="text-yellow-400 text-xs font-bold shrink-0">+{a.xp} XP</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weak concepts alert */}
      {weakCount > 0 && (
        <div className="backdrop-blur-xl bg-red-500/10 border border-red-500/30 rounded-2xl p-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="text-white font-semibold">{weakCount} concepts need attention</p>
                <p className="text-gray-400 text-sm">Quadratic Equations and Trigonometry are below 50%</p>
              </div>
            </div>
            <button onClick={() => navigate('/student/concepts')}
              className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm font-semibold hover:bg-red-500/30 transition-all">
              View Weak Concepts →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
