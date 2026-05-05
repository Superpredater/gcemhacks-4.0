import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, AreaChart, Area } from 'recharts';
import { userGrowthHistogram, loadDistribution, scalabilityData } from '../data/mgmtData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="backdrop-blur-xl bg-slate-900/95 border border-white/20 rounded-xl p-3 text-sm">
      <p className="text-white font-bold mb-1">{label}</p>
      {payload.map(p => <p key={p.dataKey} style={{ color: p.color }} className="font-semibold">{p.name}: {p.value.toLocaleString()}{p.dataKey === 'load' ? '%' : ''}</p>)}
    </div>
  );
};

export default function Scalability() {
  const navigate = useNavigate();
  const { currentCapacity, currentLoad, projectedPeak, safeThreshold } = scalabilityData;
  const loadPct = Math.round((currentLoad / currentCapacity) * 100);
  const peakPct  = Math.round((projectedPeak / currentCapacity) * 100);
  const headroom = currentCapacity - projectedPeak;

  const peakHour = loadDistribution.reduce((max, d) => d.load > max.load ? d : max, loadDistribution[0]);

  return (
    <div className="space-y-6">
      <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/15 border border-white/20 rounded-2xl p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Scalability</h1>
            <p className="text-slate-400 mt-1 text-sm">Capacity planning and usage pattern analysis</p>
          </div>
          <button onClick={() => navigate('/management/monitoring')}
            className="px-5 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 font-semibold text-sm hover:bg-red-500/30 transition-all">
            ⚡ System Monitoring →
          </button>
        </div>
      </div>

      {/* Capacity stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Current Load',    value: currentLoad.toLocaleString(),    sub: `${loadPct}% capacity`, color: '#3b82f6', icon: '👥' },
          { label: 'Max Capacity',    value: currentCapacity.toLocaleString(), sub: 'concurrent users',    color: '#22c55e', icon: '🏗️' },
          { label: 'Projected Peak',  value: projectedPeak.toLocaleString(),  sub: `${peakPct}% capacity`, color: '#f59e0b', icon: '🔮' },
          { label: 'Headroom',        value: headroom.toLocaleString(),        sub: 'users available',      color: '#22c55e', icon: '✅' },
        ].map(s => (
          <div key={s.label} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
            <span className="text-2xl">{s.icon}</span>
            <p className="text-2xl font-black mt-2" style={{ color: s.color }}>{s.value}</p>
            <p className="text-slate-400 text-xs mt-0.5">{s.label}</p>
            <p className="text-slate-600 text-xs">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Capacity gauge */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-4">Capacity Utilization</h3>
        <div className="space-y-3">
          {[
            { label: 'Current Load',   pct: loadPct,  color: '#3b82f6' },
            { label: 'Projected Peak', pct: peakPct,  color: '#f59e0b' },
            { label: 'Safe Threshold', pct: Math.round((safeThreshold / currentCapacity) * 100), color: '#22c55e' },
          ].map(row => (
            <div key={row.label}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400 font-medium">{row.label}</span>
                <span className="font-bold" style={{ color: row.color }}>{row.pct}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <div className="h-3 rounded-full transition-all duration-700" style={{ width: `${row.pct}%`, background: row.color }} />
              </div>
            </div>
          ))}
        </div>
        {peakPct < 80 ? (
          <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-300 text-sm">
            ✅ System is well within capacity. No immediate scaling needed.
          </div>
        ) : (
          <div className="mt-4 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm">
            ⚠️ Projected peak approaching safe threshold. Plan infrastructure upgrade for Q3.
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User growth histogram */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">User Growth Histogram</h3>
            <span className="text-xs text-slate-500 px-2 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">Feb–Mar = Forecast</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={userGrowthHistogram} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <ReferenceLine y={currentCapacity} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Capacity', fill: '#ef4444', fontSize: 10 }} />
              <Bar dataKey="users" name="Total Users" radius={[4, 4, 0, 0]} maxBarSize={40}>
                {userGrowthHistogram.map((d, i) => (
                  <Cell key={i} fill={d.month === 'Feb' || d.month === 'Mar' ? '#f59e0b' : '#3b82f6'} fillOpacity={0.85} />
                ))}
              </Bar>
              <Bar dataKey="newUsers" name="New Users" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={40} fillOpacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Load distribution */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Load Distribution (Daily)</h3>
            <span className="text-xs text-slate-400">Peak: {peakHour.hour} ({peakHour.load}%)</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={loadDistribution}>
              <defs>
                <linearGradient id="loadGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="hour" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 110]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={80} stroke="#eab308" strokeDasharray="4 4" label={{ value: 'Warning', fill: '#eab308', fontSize: 10 }} />
              <Area type="monotone" dataKey="load" name="Load" stroke="#3b82f6" strokeWidth={2.5}
                fill="url(#loadGrad)" dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
