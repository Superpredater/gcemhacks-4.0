import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import { conceptTrends, weeks, concepts } from '../data/weakData';

const COLORS = ['#ef4444', '#f97316', '#eab308', '#3b82f6'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="backdrop-blur-xl bg-slate-900/90 border border-white/20 rounded-xl p-3 text-sm">
      <p className="text-gray-400 mb-2">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color }} className="font-semibold">
          {p.name}: {p.value}%
        </p>
      ))}
    </div>
  );
};

export default function TrendVelocity() {
  const conceptIds = Object.keys(conceptTrends);
  const [selected, setSelected] = useState(conceptIds);

  const chartData = weeks.map((w, i) => {
    const row = { week: w };
    conceptIds.forEach(id => { row[id] = conceptTrends[id][i]; });
    return row;
  });

  const toggle = (id) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Trend & Learning Velocity</h3>
          <p className="text-gray-400 text-sm mt-0.5">Mastery improvement over 8 weeks for weak concepts</p>
        </div>
      </div>

      {/* Toggle buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {conceptIds.map((id, i) => {
          const name = concepts.find(c => c.id === id)?.name ?? id;
          const active = selected.includes(id);
          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border"
              style={{
                background: active ? `${COLORS[i]}22` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${active ? COLORS[i] : 'rgba(255,255,255,0.1)'}`,
                color: active ? COLORS[i] : '#6b7280',
              }}
            >
              {name}
            </button>
          );
        })}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis domain={[15, 75]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={50} stroke="#22c55e" strokeDasharray="4 4" label={{ value: 'Pass', fill: '#22c55e', fontSize: 10 }} />
          {conceptIds.map((id, i) =>
            selected.includes(id) ? (
              <Line
                key={id}
                type="monotone"
                dataKey={id}
                name={concepts.find(c => c.id === id)?.name ?? id}
                stroke={COLORS[i]}
                strokeWidth={2}
                dot={{ r: 3, fill: COLORS[i], strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            ) : null
          )}
        </LineChart>
      </ResponsiveContainer>

      {/* Velocity insight */}
      <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
        <p className="text-xs text-gray-400">
          📉 <span className="text-white font-medium">Calculus Basics</span> shows the slowest improvement velocity (+12% over 8 weeks).
          Immediate intervention recommended.
        </p>
      </div>
    </div>
  );
}
