import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import useModuleStore from '../store/useModuleStore';
import { concepts } from '../data/moduleData';

const priorityColor = { critical: '#ef4444', high: '#f97316', medium: '#eab308', low: '#22c55e' };
const statusStyle = {
  pending:            { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)',  text: '#9ca3af',  label: 'Pending' },
  'practice-assigned':{ bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.4)',   text: '#60a5fa',  label: '✏️ Practice Assigned' },
  'revision-scheduled':{ bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.4)',   text: '#c084fc',  label: '📅 Revision Scheduled' },
  completed:          { bg: 'rgba(34,197,94,0.12)',   border: 'rgba(34,197,94,0.4)',    text: '#86efac',  label: '✅ Completed' },
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="backdrop-blur-xl bg-slate-900/95 border border-white/20 rounded-xl p-3 text-sm">
      <p className="text-white font-bold text-xs">{d.action}</p>
      <p style={{ color: priorityColor[d.priority] }}>Impact: +{d.impact}%</p>
    </div>
  );
};

export default function Recommendations() {
  const { recommendations, assignPractice, scheduleRevision, markComplete, resetRec } = useModuleStore();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? recommendations : recommendations.filter(r => r.priority === filter || r.status === filter);
  const chartData = [...recommendations].sort((a, b) => b.impact - a.impact);

  const done = recommendations.filter(r => r.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-white font-semibold">Action Progress</p>
          <p className="text-green-400 font-bold">{done}/{recommendations.length} completed</p>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
          <div className="h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-700"
            style={{ width: `${(done / recommendations.length) * 100}%` }} />
        </div>
      </div>

      {/* Priority histogram */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-1">Impact Priority Histogram</h3>
        <p className="text-gray-400 text-sm mb-4">Sorted by expected improvement %</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} layout="vertical" barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
            <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="action" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} width={180} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
            <Bar dataKey="impact" radius={[0, 5, 5, 0]} maxBarSize={20}>
              {chartData.map((d, i) => (
                <Cell key={i} fill={priorityColor[d.priority]} fillOpacity={d.status === 'completed' ? 0.3 : 0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {['all', 'critical', 'high', 'medium', 'low', 'completed'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border capitalize ${
              filter === f ? 'bg-blue-500/30 border-blue-400 text-blue-300' : 'bg-white/5 border-white/10 text-gray-400 hover:text-gray-200'
            }`}>
            {f}
          </button>
        ))}
      </div>

      {/* Recommendation cards */}
      <div className="space-y-3">
        {filtered.map(r => {
          const s = statusStyle[r.status];
          const conceptName = concepts.find(c => c.id === r.concept)?.name ?? r.concept;
          return (
            <div key={r.id} className="rounded-2xl p-4 transition-all"
              style={{ background: s.bg, border: `1px solid ${s.border}` }}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: priorityColor[r.priority] }} />
                    <p className="text-white font-semibold text-sm">{r.action}</p>
                  </div>
                  <p className="text-gray-400 text-xs ml-4">Concept: {conceptName} · Impact: +{r.impact}%</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full capitalize"
                    style={{ background: `${priorityColor[r.priority]}22`, color: priorityColor[r.priority] }}>
                    {r.priority}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: s.text }}>{s.label}</span>
                </div>
              </div>
              {r.status !== 'completed' && (
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => assignPractice(r.id)}
                    className="px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold hover:bg-blue-500/30 transition-all">
                    ✏️ Assign Practice
                  </button>
                  <button onClick={() => scheduleRevision(r.id)}
                    className="px-3 py-1.5 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold hover:bg-purple-500/30 transition-all">
                    📅 Schedule Revision
                  </button>
                  <button onClick={() => markComplete(r.id)}
                    className="px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300 text-xs font-semibold hover:bg-green-500/30 transition-all">
                    ✅ Mark Complete
                  </button>
                </div>
              )}
              {r.status === 'completed' && (
                <button onClick={() => resetRec(r.id)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-gray-400 text-xs font-semibold hover:bg-white/20 transition-all">
                  ↩ Reset
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
