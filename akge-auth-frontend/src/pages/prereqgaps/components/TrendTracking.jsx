import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import { gapTrends, trendWeeks, concepts } from '../data/prereqData';

const COLORS = ['#ef4444', '#f97316', '#eab308', '#3b82f6', '#a855f7'];
const conceptsWithTrend = concepts.filter(c => gapTrends[c.id]);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="backdrop-blur-xl bg-slate-900/90 border border-white/20 rounded-xl p-3 text-sm">
      <p className="text-gray-400 mb-2">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color }} className="font-semibold">{p.name}: {p.value}% students with gap</p>
      ))}
    </div>
  );
};

export default function TrendTracking() {
  const [selected, setSelected] = useState(conceptsWithTrend.map(c => c.id));

  const chartData = trendWeeks.map((w, i) => {
    const row = { week: w };
    conceptsWithTrend.forEach(c => { row[c.id] = gapTrends[c.id][i]; });
    return row;
  });

  const toggle = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white">Gap Trend Tracking</h3>
          <p className="text-gray-400 text-xs mt-0.5">% students with gap over 8 weeks</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {conceptsWithTrend.map((c, i) => {
          const active = selected.includes(c.id);
          return (
            <button key={c.id} onClick={() => toggle(c.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border"
              style={{
                background: active ? `${COLORS[i]}22` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${active ? COLORS[i] : 'rgba(255,255,255,0.1)'}`,
                color: active ? COLORS[i] : '#6b7280',
              }}>
              {c.name}
            </button>
          );
        })}
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={40} stroke="#22c55e" strokeDasharray="4 4" label={{ value: 'Target', fill: '#22c55e', fontSize: 10 }} />
          {conceptsWithTrend.map((c, i) =>
            selected.includes(c.id) ? (
              <Line key={c.id} type="monotone" dataKey={c.id} name={c.name}
                stroke={COLORS[i]} strokeWidth={2}
                dot={{ r: 3, fill: COLORS[i], strokeWidth: 0 }} activeDot={{ r: 5 }}
              />
            ) : null
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
