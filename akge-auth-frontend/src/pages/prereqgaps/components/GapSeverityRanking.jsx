import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import useGapStore from '../store/useGapStore';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="backdrop-blur-xl bg-slate-900/90 border border-white/20 rounded-xl p-3 text-sm">
      <p className="text-white font-bold mb-1">{d.name}</p>
      <p className="text-orange-400">Impact Score: <span className="font-bold">{d.impactScore}</span></p>
      <p className="text-red-400">Mastery: <span className="font-bold">{d.mastery}%</span></p>
      <p className="text-blue-400">Students: <span className="font-bold">{d.affectedStudents?.length ?? 0}</span></p>
    </div>
  );
};

function barColor(rank) {
  if (rank === 0) return '#ef4444';
  if (rank === 1) return '#f97316';
  if (rank === 2) return '#eab308';
  return '#3b82f6';
}

export default function GapSeverityRanking() {
  const { gapData, selectedConcept, selectConcept } = useGapStore();
  const ranked = [...gapData].filter(c => c.isGap || c.isPartial).slice(0, 8);

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="mb-4">
        <h3 className="text-base font-bold text-white">Gap Severity & Impact Ranking</h3>
        <p className="text-gray-400 text-xs mt-0.5">Sorted by impact score — click bar to select</p>
      </div>

      {/* Top 3 */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {ranked.slice(0, 3).map((c, i) => (
          <button key={c.id} onClick={() => selectConcept(c)}
            className="rounded-xl p-3 text-center transition-all hover:scale-105"
            style={{
              background: i === 0 ? 'rgba(239,68,68,0.12)' : i === 1 ? 'rgba(249,115,22,0.10)' : 'rgba(234,179,8,0.10)',
              border: `1px solid ${i === 0 ? 'rgba(239,68,68,0.4)' : i === 1 ? 'rgba(249,115,22,0.4)' : 'rgba(234,179,8,0.4)'}`,
              boxShadow: selectedConcept?.id === c.id ? `0 0 12px ${barColor(i)}40` : 'none',
            }}>
            <p className="text-xs text-gray-400 mb-1">#{i + 1}</p>
            <p className="text-white font-bold text-xs leading-tight">{c.name}</p>
            <p className="text-2xl font-black mt-1" style={{ color: barColor(i) }}>{c.impactScore}</p>
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={ranked} layout="vertical" barCategoryGap="20%"
          onClick={d => d?.activePayload?.[0] && selectConcept(d.activePayload[0].payload)}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
          <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} width={100} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="impactScore" radius={[0, 5, 5, 0]} cursor="pointer">
            {ranked.map((_, i) => <Cell key={i} fill={barColor(i)} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
