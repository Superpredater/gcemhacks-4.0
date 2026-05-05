import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="backdrop-blur-xl bg-slate-900/90 border border-white/20 rounded-xl p-3 text-sm">
      <p className="text-white font-bold mb-1">{d.name}</p>
      <p style={{ color: d.isWeak ? '#ef4444' : '#22c55e' }} className="font-semibold">
        Mastery: {d.mastery}%
      </p>
      {d.isWeak && <p className="text-red-400 text-xs mt-1">⚠ Weak concept</p>}
    </div>
  );
};

export default function ConceptPerformance({ conceptMastery, onConceptClick }) {
  const weakCount = conceptMastery.filter(c => c.isWeak).length;

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Concept-wise Performance</h3>
          <p className="text-gray-400 text-sm mt-0.5">Click a bar to drill down</p>
        </div>
        {weakCount > 0 && (
          <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold">
            {weakCount} weak
          </span>
        )}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={conceptMastery} barCategoryGap="20%"
          onClick={d => d?.activePayload?.[0] && onConceptClick?.(d.activePayload[0].payload)}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <ReferenceLine y={50} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Weak', fill: '#ef4444', fontSize: 10 }} />
          <ReferenceLine y={70} stroke="#eab308" strokeDasharray="4 4" label={{ value: 'Target', fill: '#eab308', fontSize: 10 }} />
          <Bar dataKey="mastery" radius={[4, 4, 0, 0]} cursor="pointer">
            {conceptMastery.map((c, i) => (
              <Cell key={i} fill={c.isWeak ? '#ef4444' : c.mastery >= 80 ? '#22c55e' : '#3b82f6'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
