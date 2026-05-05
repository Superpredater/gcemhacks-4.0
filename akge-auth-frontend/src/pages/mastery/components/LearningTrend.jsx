import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Area, AreaChart,
} from 'recharts';
import { learningTrend } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="backdrop-blur-xl bg-slate-900/90 border border-white/20 rounded-xl p-3 text-sm">
      <p className="text-gray-400">{label}</p>
      <p className="text-blue-400 font-bold text-lg">{payload[0].value}%</p>
    </div>
  );
};

export default function LearningTrend() {
  const latest = learningTrend[learningTrend.length - 1].mastery;
  const first  = learningTrend[0].mastery;
  const delta  = latest - first;

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Learning Trend</h3>
          <p className="text-gray-400 text-sm mt-1">Class mastery over 8 weeks</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-blue-400">{latest}%</p>
          <p className={`text-sm font-semibold ${delta >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {delta >= 0 ? '↑' : '↓'} {Math.abs(delta)}% overall
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={learningTrend}>
          <defs>
            <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis domain={[50, 85]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={70} stroke="#22c55e" strokeDasharray="4 4" label={{ value: 'Target', fill: '#22c55e', fontSize: 11 }} />
          <Area
            type="monotone"
            dataKey="mastery"
            stroke="#3b82f6"
            strokeWidth={2.5}
            fill="url(#trendGrad)"
            dot={{ fill: '#3b82f6', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#60a5fa' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
