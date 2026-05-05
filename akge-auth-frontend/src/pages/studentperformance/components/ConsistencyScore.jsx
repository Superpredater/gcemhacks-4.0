import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function ConsistencyScore({ consistency, trend }) {
  const color = consistency >= 80 ? '#22c55e' : consistency >= 60 ? '#eab308' : '#ef4444';
  const label = consistency >= 80 ? 'Highly Consistent' : consistency >= 60 ? 'Moderately Consistent' : 'Inconsistent';

  // Deviation from mean for each week
  const mean = trend.reduce((s, t) => s + t.score, 0) / (trend.length || 1);
  const deviationData = trend.map(t => ({
    week: t.week,
    score: t.score,
    deviation: +(t.score - mean).toFixed(1),
  }));

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-4">Consistency Score</h3>

      {/* Score display */}
      <div className="flex items-center gap-5 mb-5">
        <div className="relative w-24 h-24 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
            <circle cx="50" cy="50" r="42" fill="none" stroke={color}
              strokeWidth="10"
              strokeDasharray={`${(consistency / 100) * 264} 264`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-2xl font-black" style={{ color }}>{consistency}</p>
          </div>
        </div>
        <div>
          <p className="text-white font-bold text-base">{label}</p>
          <p className="text-gray-400 text-sm mt-1">Performance stability over 8 weeks</p>
          <p className="text-gray-500 text-xs mt-2">Mean score: {Math.round(mean)}%</p>
        </div>
      </div>

      {/* Deviation chart */}
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={deviationData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip formatter={(v) => [`${v > 0 ? '+' : ''}${v}%`, 'Deviation']}
            contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8 }}
            labelStyle={{ color: '#94a3b8' }} itemStyle={{ color: color }}
          />
          <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" />
          <Line type="monotone" dataKey="deviation" stroke={color} strokeWidth={2}
            dot={{ r: 3, fill: color, strokeWidth: 0 }} activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
