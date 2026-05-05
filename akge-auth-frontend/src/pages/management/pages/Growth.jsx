import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell, Legend } from 'recharts';
import { growthTrend, segmentGrowth } from '../data/mgmtData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="backdrop-blur-xl bg-slate-900/95 border border-white/20 rounded-xl p-3 text-sm">
      <p className="text-white font-bold mb-1">{label}</p>
      {payload.map(p => <p key={p.dataKey} style={{ color: p.color }} className="font-semibold">{p.name}: {p.value}{p.dataKey === 'mastery' ? '%' : p.dataKey === 'improvement' ? '%' : ''}</p>)}
    </div>
  );
};

export default function Growth() {
  const navigate = useNavigate();
  const forecast = growthTrend.slice(-2);
  const actual   = growthTrend.slice(0, -2);
  const velocity = ((growthTrend[5].mastery - growthTrend[0].mastery) / 5).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/15 to-blue-500/15 border border-white/20 rounded-2xl p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Growth Index</h1>
            <p className="text-slate-400 mt-1 text-sm">Performance growth trends and forecasts</p>
          </div>
          <button onClick={() => navigate('/management/subjects')}
            className="px-5 py-2.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 font-semibold text-sm hover:bg-purple-500/30 transition-all">
            📚 Subject Breakdown →
          </button>
        </div>
      </div>

      {/* Velocity stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Growth Velocity',   value: `+${velocity}%/mo`, color: '#22c55e', icon: '🚀' },
          { label: 'Avg Improvement',   value: '+2.4%',            color: '#3b82f6', icon: '📈' },
          { label: 'Forecast (Feb)',     value: '77%',              color: '#f59e0b', icon: '🔮' },
        ].map(s => (
          <div key={s.label} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
            <span className="text-2xl">{s.icon}</span>
            <p className="text-3xl font-black mt-2" style={{ color: s.color }}>{s.value}</p>
            <p className="text-slate-400 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Growth trend line */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white">Mastery Growth Trend</h3>
          <div className="flex gap-3 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-blue-400 inline-block" />Actual</span>
            <span className="flex items-center gap-1.5 text-slate-400"><span className="w-3 h-0.5 bg-yellow-400 inline-block border-dashed" />Forecast</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={growthTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis domain={[58, 82]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine x="Jan" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" label={{ value: 'Forecast →', fill: '#64748b', fontSize: 10 }} />
            <Line type="monotone" dataKey="mastery" name="Mastery" stroke="#3b82f6" strokeWidth={2.5}
              dot={(props) => {
                const isForecast = props.payload.month === 'Feb' || props.payload.month === 'Mar';
                return <circle key={props.index} cx={props.cx} cy={props.cy} r={4} fill={isForecast ? '#f59e0b' : '#3b82f6'} strokeWidth={0} />;
              }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Segment comparison */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-4">Growth by Segment</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={segmentGrowth} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="segment" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
            <Bar dataKey="growth" name="Growth %" fill="#22c55e" radius={[5, 5, 0, 0]} maxBarSize={50}>
              {segmentGrowth.map((_, i) => <Cell key={i} fill={['#22c55e','#3b82f6','#8b5cf6','#f59e0b'][i]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Segment table */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-4">Segment Details</h3>
        <div className="space-y-3">
          {segmentGrowth.map((s, i) => (
            <div key={s.segment} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full" style={{ background: ['#22c55e','#3b82f6','#8b5cf6','#f59e0b'][i] }} />
                <span className="text-white font-semibold text-sm">{s.segment}</span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <span className="text-slate-400">{s.students} students</span>
                <span className="text-blue-400 font-bold">{s.mastery}% mastery</span>
                <span className="text-green-400 font-bold">+{s.growth}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
