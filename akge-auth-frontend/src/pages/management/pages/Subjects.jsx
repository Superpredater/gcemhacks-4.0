import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line } from 'recharts';
import useMgmtStore from '../store/useMgmtStore';
import { subjectTrend } from '../data/mgmtData';

function masteryColor(m) {
  if (m >= 80) return '#22c55e';
  if (m >= 70) return '#3b82f6';
  if (m >= 60) return '#eab308';
  return '#ef4444';
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="backdrop-blur-xl bg-slate-900/95 border border-white/20 rounded-xl p-3 text-sm">
      <p className="text-white font-bold mb-1">{label}</p>
      {payload.map(p => <p key={p.dataKey} style={{ color: p.color }} className="font-semibold">{p.name}: {p.value}%</p>)}
    </div>
  );
};

const SUBJECT_COLORS = { Mathematics: '#3b82f6', Physics: '#8b5cf6', Chemistry: '#22c55e', Biology: '#f59e0b', English: '#ec4899' };

export default function Subjects() {
  const navigate = useNavigate();
  const { subjects, selectedSubject, setSelectedSubject } = useMgmtStore();
  const [trendFilter, setTrendFilter] = useState(['Mathematics', 'Physics', 'Chemistry']);

  const weakSubjects = subjects.filter(s => s.mastery < 72);
  const selected = subjects.find(s => s.id === selectedSubject);

  const toggleTrend = (name) => setTrendFilter(prev =>
    prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]
  );

  return (
    <div className="space-y-6">
      <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/15 to-blue-500/15 border border-white/20 rounded-2xl p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Subject Analytics</h1>
            <p className="text-slate-400 mt-1 text-sm">Subject-wise performance and weak area detection</p>
          </div>
          <button onClick={() => navigate('/management/dashboard')}
            className="px-5 py-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 font-semibold text-sm hover:bg-blue-500/30 transition-all">
            ← Dashboard
          </button>
        </div>
      </div>

      {/* Weak subject alert */}
      {weakSubjects.length > 0 && (
        <div className="backdrop-blur-xl bg-red-500/10 border border-red-500/30 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="text-white font-semibold text-sm">Weak subjects detected: {weakSubjects.map(s => s.name).join(', ')}</p>
              <p className="text-slate-400 text-xs mt-0.5">These subjects are below the 72% mastery threshold</p>
            </div>
          </div>
        </div>
      )}

      {/* Subject bar chart */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-4">Subject Mastery Comparison</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={subjects} barCategoryGap="25%"
            onClick={d => d?.activePayload?.[0] && setSelectedSubject(d.activePayload[0].payload.id)}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis domain={[55, 90]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
            <Bar dataKey="mastery" name="Mastery" radius={[5, 5, 0, 0]} cursor="pointer" maxBarSize={50}>
              {subjects.map((s, i) => (
                <Cell key={i} fill={masteryColor(s.mastery)}
                  opacity={selectedSubject && selectedSubject !== s.id ? 0.4 : 1}
                  stroke={selectedSubject === s.id ? '#fff' : 'none'} strokeWidth={selectedSubject === s.id ? 2 : 0} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Trend chart */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h3 className="text-base font-bold text-white">Subject Trend (6 months)</h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(SUBJECT_COLORS).map(name => (
              <button key={name} onClick={() => toggleTrend(name)}
                className="px-3 py-1 rounded-lg text-xs font-semibold transition-all border"
                style={{
                  background: trendFilter.includes(name) ? `${SUBJECT_COLORS[name]}22` : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${trendFilter.includes(name) ? SUBJECT_COLORS[name] : 'rgba(255,255,255,0.1)'}`,
                  color: trendFilter.includes(name) ? SUBJECT_COLORS[name] : '#64748b',
                }}>
                {name}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={subjectTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis domain={[58, 85]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
            <Tooltip content={<CustomTooltip />} />
            {Object.entries(SUBJECT_COLORS).map(([name, color]) =>
              trendFilter.includes(name) ? (
                <Line key={name} type="monotone" dataKey={name} stroke={color} strokeWidth={2}
                  dot={{ r: 3, fill: color, strokeWidth: 0 }} activeDot={{ r: 5 }} />
              ) : null
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Subject cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map(s => {
          const color = masteryColor(s.mastery);
          const isSelected = selectedSubject === s.id;
          return (
            <button key={s.id} onClick={() => setSelectedSubject(isSelected ? null : s.id)}
              className="text-left rounded-2xl p-5 border transition-all hover:scale-[1.01]"
              style={{ background: `${color}12`, border: `1px solid ${isSelected ? color : `${color}44`}`, boxShadow: isSelected ? `0 0 16px ${color}30` : 'none' }}>
              <div className="flex items-start justify-between mb-3">
                <p className="text-white font-bold">{s.name}</p>
                <span className="text-2xl font-black" style={{ color }}>{s.mastery}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden mb-3">
                <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${s.mastery}%`, background: color }} />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">{s.students.toLocaleString()} students</span>
                <span className="text-green-400 font-bold">+{s.trend}%</span>
              </div>
              {s.weakConcepts.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {s.weakConcepts.map(c => (
                    <span key={c} className="px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/25 text-red-300 text-xs">{c}</span>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
