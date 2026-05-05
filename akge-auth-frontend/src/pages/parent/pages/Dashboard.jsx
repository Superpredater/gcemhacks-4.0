import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useParentStore from '../store/useParentStore';
import { weeklyProgress, activityLog, child } from '../data/parentData';

const activityIcon = { lesson: '📚', assessment: '📝', streak: '🔥', badge: '🏆' };

export default function Dashboard() {
  const navigate = useNavigate();
  const { getOverallMastery, getWeakConcepts, getUnreadCount } = useParentStore();

  const overall = getOverallMastery();
  const weak = getWeakConcepts();
  const unread = getUnreadCount();
  const recentActivity = activityLog.slice(0, 4);

  const insight1 = overall >= 70
    ? `${child.name} is performing well overall with ${overall}% mastery.`
    : `${child.name} needs support — overall mastery is ${overall}%.`;
  const insight2 = weak.length > 0
    ? `Needs attention in: ${weak.slice(0, 2).map(c => c.name).join(', ')}.`
    : 'No critical weak areas detected this week.';

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800">Good morning! 👋</h1>
            <p className="text-slate-500 mt-1 text-sm">{child.name} · {child.grade} · {child.school}</p>
            <div className="mt-3 space-y-1">
              <p className="text-slate-600 text-sm">💡 {insight1}</p>
              <p className="text-slate-600 text-sm">⚠️ {insight2}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-black text-blue-600">{overall}%</p>
            <p className="text-slate-400 text-sm">Overall Mastery</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Overall Mastery', value: `${overall}%`, icon: '📊', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
          { label: 'Streak',          value: '12 days',     icon: '🔥', color: 'text-orange-500', bg: 'bg-orange-50 border-orange-100' },
          { label: 'Weak Concepts',   value: weak.length,   icon: '⚠️', color: 'text-red-500',    bg: 'bg-red-50 border-red-100' },
          { label: 'Unread Alerts',   value: unread,        icon: '🔔', color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl p-5 border ${s.bg}`}>
            <span className="text-2xl">{s.icon}</span>
            <p className={`text-3xl font-black mt-2 ${s.color}`}>{s.value}</p>
            <p className="text-slate-400 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly progress */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-1">Weekly Progress</h3>
          <p className="text-slate-400 text-sm mb-4">Mastery trend this week</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyProgress}>
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[55, 80]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                labelStyle={{ color: '#64748b' }} itemStyle={{ color: '#3b82f6' }} />
              <Area type="monotone" dataKey="mastery" stroke="#3b82f6" strokeWidth={2.5}
                fill="url(#blueGrad)" dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent activity */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map(a => (
              <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xl shrink-0">{activityIcon[a.type]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-700 text-sm font-medium truncate">{a.text}</p>
                  <p className="text-slate-400 text-xs">{a.date}</p>
                </div>
                {a.score > 0 && (
                  <span className={`text-xs font-bold shrink-0 ${a.score >= 70 ? 'text-green-600' : 'text-red-500'}`}>
                    {a.score}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <button onClick={() => navigate('/parent/weak-areas')}
          className="px-5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 font-semibold text-sm hover:bg-red-100 transition-all">
          ⚠️ View Weak Areas ({weak.length})
        </button>
        <button onClick={() => navigate('/parent/mastery')}
          className="px-5 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 font-semibold text-sm hover:bg-blue-100 transition-all">
          📊 View Mastery Progress
        </button>
        <button onClick={() => navigate('/parent/alerts')}
          className="px-5 py-2.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 font-semibold text-sm hover:bg-purple-100 transition-all">
          🔔 View Alerts {unread > 0 && `(${unread})`}
        </button>
      </div>
    </div>
  );
}
