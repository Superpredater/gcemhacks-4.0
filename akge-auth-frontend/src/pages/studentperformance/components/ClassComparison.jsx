import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { students, scores, concepts } from '../data/studentData';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="backdrop-blur-xl bg-slate-900/90 border border-white/20 rounded-xl p-3 text-sm">
      <p className="text-white font-bold">{d.name}</p>
      <p style={{ color: d.isSelected ? '#f59e0b' : '#3b82f6' }}>Mastery: {d.avg}%</p>
    </div>
  );
};

export default function ClassComparison({ studentId, rank, percentile, overallMastery }) {
  const classData = students.map(s => {
    const vals = concepts.map(c => scores[s.id]?.[c.id]?.mastery ?? 0);
    const avg = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
    return { name: s.name.split(' ')[0], avg, isSelected: s.id === studentId };
  }).sort((a, b) => b.avg - a.avg);

  const classAvg = Math.round(classData.reduce((s, d) => s + d.avg, 0) / classData.length);

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Class Comparison</h3>
          <p className="text-gray-400 text-sm mt-0.5">Ranked by overall mastery</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-yellow-400">#{rank}</p>
          <p className="text-gray-500 text-xs">{percentile}th percentile</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center">
          <p className="text-xs text-gray-400">Your Score</p>
          <p className="text-xl font-black text-yellow-400">{overallMastery}%</p>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-xs text-gray-400">Class Avg</p>
          <p className="text-xl font-black text-blue-400">{classAvg}%</p>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-xs text-gray-400">vs Average</p>
          <p className={`text-xl font-black ${overallMastery >= classAvg ? 'text-green-400' : 'text-red-400'}`}>
            {overallMastery >= classAvg ? '+' : ''}{overallMastery - classAvg}%
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={classData} barCategoryGap="15%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 9 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <ReferenceLine y={classAvg} stroke="#3b82f6" strokeDasharray="4 4" />
          <Bar dataKey="avg" radius={[3, 3, 0, 0]}>
            {classData.map((d, i) => (
              <Cell key={i} fill={d.isSelected ? '#f59e0b' : '#3b82f650'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
