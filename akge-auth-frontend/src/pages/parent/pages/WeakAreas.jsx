import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import useParentStore from '../store/useParentStore';

const sevStyle = {
  critical: { bg: 'bg-red-50 border-red-200',    text: 'text-red-600',    badge: 'bg-red-100 text-red-600 border-red-200',    dot: 'bg-red-500',    label: 'Critical' },
  weak:     { bg: 'bg-orange-50 border-orange-200', text: 'text-orange-600', badge: 'bg-orange-100 text-orange-600 border-orange-200', dot: 'bg-orange-500', label: 'Weak' },
  average:  { bg: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-600', badge: 'bg-yellow-100 text-yellow-600 border-yellow-200', dot: 'bg-yellow-500', label: 'Average' },
};

const suggestions = {
  critical: ['Schedule daily 20-min revision sessions', 'Ask teacher for extra support', 'Use visual aids and worked examples'],
  weak:     ['Practice 3 problems daily', 'Review prerequisite concepts', 'Watch tutorial videos'],
  average:  ['Regular practice exercises', 'Focus on understanding, not memorizing', 'Take practice quizzes'],
};

export default function WeakAreas() {
  const navigate = useNavigate();
  const { concepts, getWeakConcepts } = useParentStore();
  const [selected, setSelected] = useState(null);

  const weak = getWeakConcepts();
  const chartData = weak.map(c => ({ name: c.name, mastery: c.mastery, status: c.status }));

  const barColor = (status) => status === 'critical' ? '#ef4444' : status === 'weak' ? '#f97316' : '#eab308';

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 rounded-2xl p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800">Weak Areas</h1>
            <p className="text-slate-500 mt-1 text-sm">Concepts that need attention and support</p>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-red-100 border border-red-200 text-red-600 text-sm font-bold">
            {weak.length} concepts flagged
          </span>
        </div>
      </div>

      {/* Chart */}
      {weak.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-4">Weak Concept Mastery</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} barCategoryGap="25%"
              onClick={d => d?.activePayload?.[0] && setSelected(d.activePayload[0].payload.name)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false}
                angle={-10} textAnchor="end" height={40} />
              <YAxis domain={[0, 70]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10 }}
                labelStyle={{ color: '#334155' }} itemStyle={{ color: '#ef4444' }} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
              <Bar dataKey="mastery" radius={[5, 5, 0, 0]} cursor="pointer" maxBarSize={50}>
                {chartData.map((d, i) => <Cell key={i} fill={barColor(d.status)} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Concept cards */}
      <div className="space-y-3">
        {weak.map(c => {
          const s = sevStyle[c.status] ?? sevStyle.average;
          const isSelected = selected === c.name;
          return (
            <div key={c.id} className={`rounded-2xl border transition-all duration-200 ${s.bg} ${isSelected ? 'ring-2 ring-blue-300' : ''}`}>
              <button onClick={() => setSelected(isSelected ? null : c.name)}
                className="w-full text-left p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${s.dot}`} />
                    <div>
                      <p className="text-slate-800 font-bold">{c.name}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{c.subject}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-2xl font-black ${s.text}`}>{c.mastery}%</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${s.badge}`}>{s.label}</span>
                  </div>
                </div>
                <div className="w-full bg-white/60 rounded-full h-2 overflow-hidden">
                  <div className="h-2 rounded-full transition-all duration-700"
                    style={{ width: `${c.mastery}%`, background: barColor(c.status) }} />
                </div>
              </button>

              {isSelected && (
                <div className="px-5 pb-5 border-t border-white/50 pt-4">
                  <p className="text-slate-600 text-sm font-semibold mb-3">💡 Suggested Actions:</p>
                  <div className="space-y-2 mb-4">
                    {(suggestions[c.status] ?? suggestions.average).map((s, i) => (
                      <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-white/70 border border-white">
                        <span className="text-blue-500 text-sm shrink-0">•</span>
                        <p className="text-slate-600 text-sm">{s}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => navigate('/parent/learning')}
                      className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition-all">
                      📚 View Activity
                    </button>
                    <button onClick={() => navigate('/parent/alerts')}
                      className="px-4 py-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 text-xs font-semibold hover:bg-purple-100 transition-all">
                      🔔 Set Alert
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {weak.length === 0 && (
          <div className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center">
            <span className="text-4xl">🎉</span>
            <p className="text-green-700 font-bold mt-3">No weak areas detected!</p>
            <p className="text-slate-400 text-sm mt-1">Sarah is performing well across all concepts.</p>
          </div>
        )}
      </div>
    </div>
  );
}
