import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { activityLog, weeklyProgress, engagementData } from '../data/parentData';

const typeStyle = {
  lesson:     { bg: 'bg-blue-50 border-blue-100',   icon: '📚', color: 'text-blue-600' },
  assessment: { bg: 'bg-green-50 border-green-100', icon: '📝', color: 'text-green-600' },
  streak:     { bg: 'bg-orange-50 border-orange-100',icon: '🔥', color: 'text-orange-500' },
  badge:      { bg: 'bg-yellow-50 border-yellow-100',icon: '🏆', color: 'text-yellow-600' },
};

export default function LearningActivity() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? activityLog : activityLog.filter(a => a.type === filter);
  const totalTime = weeklyProgress.reduce((s, d) => s + d.timeSpent, 0);
  const avgEngagement = Math.round(engagementData.reduce((s, d) => s + d.engagement, 0) / engagementData.length);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-100 rounded-2xl p-6">
        <h1 className="text-2xl font-black text-slate-800">Learning Activity</h1>
        <p className="text-slate-500 mt-1 text-sm">Track Sarah's daily learning sessions and engagement</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Time This Week', value: `${totalTime}m`, icon: '⏱️', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
          { label: 'Sessions',       value: weeklyProgress.reduce((s, d) => s + d.sessions, 0), icon: '📖', color: 'text-green-600', bg: 'bg-green-50 border-green-100' },
          { label: 'Avg Engagement', value: `${avgEngagement}%`, icon: '⚡', color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl p-5 border ${s.bg}`}>
            <span className="text-2xl">{s.icon}</span>
            <p className={`text-3xl font-black mt-2 ${s.color}`}>{s.value}</p>
            <p className="text-slate-400 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time spent chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-4">Daily Time Spent (minutes)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyProgress} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10 }}
                labelStyle={{ color: '#64748b' }} itemStyle={{ color: '#22c55e' }} />
              <Bar dataKey="timeSpent" fill="#22c55e" radius={[5, 5, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement trend */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-4">Engagement Score (8 weeks)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 90]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10 }}
                labelStyle={{ color: '#64748b' }} itemStyle={{ color: '#8b5cf6' }} />
              <Line type="monotone" dataKey="engagement" stroke="#8b5cf6" strokeWidth={2.5}
                dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity timeline */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h3 className="text-base font-bold text-slate-800">Activity Timeline</h3>
          <div className="flex gap-2">
            {['all', 'lesson', 'assessment'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border capitalize ${
                  filter === f ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
                }`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {filtered.map(a => {
            const s = typeStyle[a.type] ?? typeStyle.lesson;
            return (
              <div key={a.id} className={`flex items-center gap-4 p-4 rounded-xl border ${s.bg}`}>
                <span className="text-xl shrink-0">{s.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-700 font-medium text-sm">{a.text}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-slate-400 text-xs">{a.date}</span>
                    {a.duration > 0 && <span className="text-slate-400 text-xs">⏱ {a.duration}min</span>}
                  </div>
                </div>
                {a.score > 0 && (
                  <div className="text-right shrink-0">
                    <p className={`text-lg font-black ${a.score >= 70 ? 'text-green-600' : 'text-red-500'}`}>{a.score}%</p>
                    <p className="text-slate-400 text-xs">score</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
