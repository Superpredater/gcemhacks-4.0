import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { students, timeVsPerformance } from '../data/studentData';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="backdrop-blur-xl bg-slate-900/90 border border-white/20 rounded-xl p-3 text-sm">
      <p className="text-white font-bold">{d.name}</p>
      <p className="text-blue-400">Hours/week: {d.hours}</p>
      <p className="text-green-400">Performance: {d.perf}%</p>
    </div>
  );
};

export default function TimeVsPerformance({ studentId, timePerf }) {
  const allData = students.map(s => ({
    name: s.name,
    hours: timeVsPerformance[s.id]?.hoursPerWeek ?? 0,
    perf:  timeVsPerformance[s.id]?.performance  ?? 0,
    isSelected: s.id === studentId,
  }));

  const efficiency = timePerf.hoursPerWeek > 0
    ? Math.round(timePerf.performance / timePerf.hoursPerWeek)
    : 0;

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Time vs Performance</h3>
          <p className="text-gray-400 text-sm mt-0.5">Effort vs results — class scatter</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-purple-400">{efficiency}</p>
          <p className="text-gray-500 text-xs">pts/hour</p>
        </div>
      </div>

      {/* Selected student highlight */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
          <p className="text-xs text-gray-400">Study Hours/Week</p>
          <p className="text-2xl font-black text-blue-400">{timePerf.hoursPerWeek}h</p>
        </div>
        <div className="flex-1 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
          <p className="text-xs text-gray-400">Performance</p>
          <p className="text-2xl font-black text-green-400">{timePerf.performance}%</p>
        </div>
        <div className="flex-1 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
          <p className="text-xs text-gray-400">Efficiency</p>
          <p className="text-2xl font-black text-purple-400">{efficiency}</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="hours" name="Hours" type="number" domain={[0, 10]}
            tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false}
            label={{ value: 'Hours/week', fill: '#64748b', fontSize: 10, position: 'insideBottom', offset: -2 }}
          />
          <YAxis dataKey="perf" name="Performance" domain={[0, 100]}
            tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={allData.filter(d => !d.isSelected)} fill="#3b82f6" fillOpacity={0.5} r={5} />
          <Scatter data={allData.filter(d => d.isSelected)} fill="#f59e0b" r={8} />
        </ScatterChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-500 mt-2 text-center">
        🟡 = selected student · 🔵 = classmates
      </p>
    </div>
  );
}
