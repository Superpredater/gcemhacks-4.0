import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="backdrop-blur-xl bg-slate-900/90 border border-white/20 rounded-xl p-3 text-sm">
      <p className="text-white font-bold">{payload[0].payload.name}</p>
      <p style={{ color: payload[0].payload.fill }} className="font-semibold">{payload[0].value} students</p>
    </div>
  );
};

export default function MasteryOverview({ overviewData, classAverage, totalStudents }) {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 h-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">Mastery Overview</h3>
          <p className="text-gray-400 text-sm mt-1">Student distribution by mastery level</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black text-blue-400">{classAverage}%</p>
          <p className="text-gray-400 text-xs">Class Average</p>
          <p className="text-gray-500 text-xs mt-1">{totalStudents} students</p>
        </div>
      </div>

      {/* Stat pills */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {overviewData.map(d => (
          <div
            key={d.name}
            className="rounded-xl p-3 text-center"
            style={{ background: `${d.fill}18`, border: `1px solid ${d.fill}44` }}
          >
            <p className="text-2xl font-black" style={{ color: d.fill }}>{d.count}</p>
            <p className="text-xs text-gray-400 mt-1 leading-tight">{d.name}</p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={overviewData} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {overviewData.map((d, i) => (
              <Cell key={i} fill={d.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
