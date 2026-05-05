import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="backdrop-blur-xl bg-slate-900/90 border border-white/20 rounded-xl p-3 text-sm">
      <p className="text-white font-bold mb-1">{d.name}</p>
      <p className="text-orange-400">Impact Score: <span className="font-bold">{d.impactScore}</span></p>
      <p className="text-red-400">Weak Students: <span className="font-bold">{d.weakPct}%</span></p>
      <p className="text-blue-400">Concept Impact: <span className="font-bold">{d.impact}/10</span></p>
    </div>
  );
};

function barColor(rank) {
  if (rank === 0) return '#ef4444';
  if (rank === 1) return '#f97316';
  if (rank === 2) return '#eab308';
  return '#3b82f6';
}

export default function InterventionROI({ roiRanking }) {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white">Intervention ROI Ranking</h3>
        <p className="text-gray-400 text-sm mt-0.5">Concepts ranked by impact score — fix these first</p>
      </div>

      {/* Top 3 badges */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {roiRanking.slice(0, 3).map((c, i) => (
          <div
            key={c.id}
            className="rounded-xl p-3 text-center"
            style={{
              background: i === 0 ? 'rgba(239,68,68,0.12)' : i === 1 ? 'rgba(249,115,22,0.10)' : 'rgba(234,179,8,0.10)',
              border: `1px solid ${i === 0 ? 'rgba(239,68,68,0.4)' : i === 1 ? 'rgba(249,115,22,0.4)' : 'rgba(234,179,8,0.4)'}`,
            }}
          >
            <p className="text-xs text-gray-400 mb-1">#{i + 1} Priority</p>
            <p className="text-white font-bold text-sm leading-tight">{c.name}</p>
            <p className="text-2xl font-black mt-1" style={{ color: barColor(i) }}>{c.impactScore}</p>
            <p className="text-gray-500 text-xs">impact score</p>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={roiRanking} layout="vertical" barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
          <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={110}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="impactScore" radius={[0, 6, 6, 0]}>
            {roiRanking.map((_, i) => (
              <Cell key={i} fill={barColor(i)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
