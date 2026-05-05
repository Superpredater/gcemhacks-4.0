import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import useMgmtStore from '../store/useMgmtStore';
import { usageOverTime, errorDistribution } from '../data/mgmtData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="backdrop-blur-xl bg-slate-900/95 border border-white/20 rounded-xl p-3 text-sm">
      <p className="text-white font-bold mb-1">{label}</p>
      {payload.map(p => <p key={p.dataKey} style={{ color: p.color }} className="font-semibold">{p.name}: {p.value}{p.dataKey === 'responseMs' ? 'ms' : ''}</p>)}
    </div>
  );
};

const alertStyle = {
  critical: { bg: 'bg-red-500/10 border-red-500/30', icon: '🚨', text: 'text-red-300' },
  warning:  { bg: 'bg-yellow-500/10 border-yellow-500/30', icon: '⚠️', text: 'text-yellow-300' },
  info:     { bg: 'bg-blue-500/10 border-blue-500/30', icon: 'ℹ️', text: 'text-blue-300' },
};

export default function Monitoring() {
  const navigate = useNavigate();
  const { systemMetrics, alerts, dismissAlert, refreshMetrics } = useMgmtStore();

  // Auto-refresh every 5s
  useEffect(() => {
    const t = setInterval(refreshMetrics, 5000);
    return () => clearInterval(t);
  }, []);

  const statusColor = (val, warn, crit) => val >= crit ? '#ef4444' : val >= warn ? '#eab308' : '#22c55e';

  return (
    <div className="space-y-6">
      <div className="backdrop-blur-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-white/20 rounded-2xl p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">System Monitoring</h1>
            <p className="text-slate-400 mt-1 text-sm">Live system health and performance metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Live
            </span>
            <button onClick={() => navigate('/management/scalability')}
              className="px-5 py-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 font-semibold text-sm hover:bg-blue-500/30 transition-all">
              🚀 Scalability →
            </button>
          </div>
        </div>
      </div>

      {/* Live metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: 'Uptime',             value: `${systemMetrics.uptime}%`,          color: '#22c55e', icon: '✅' },
          { label: 'Response Time',      value: `${systemMetrics.responseTime}ms`,   color: statusColor(systemMetrics.responseTime, 280, 350), icon: '⚡' },
          { label: 'Error Rate',         value: `${systemMetrics.errorRate}%`,       color: '#22c55e', icon: '🛡️' },
          { label: 'Active Connections', value: systemMetrics.activeConnections,     color: '#3b82f6', icon: '👥' },
          { label: 'CPU Usage',          value: `${systemMetrics.cpuUsage}%`,        color: statusColor(systemMetrics.cpuUsage, 70, 85), icon: '💻' },
          { label: 'Memory Usage',       value: `${systemMetrics.memoryUsage}%`,     color: statusColor(systemMetrics.memoryUsage, 75, 90), icon: '🧠' },
        ].map(s => (
          <div key={s.label} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
            <span className="text-xl">{s.icon}</span>
            <p className="text-2xl font-black mt-2" style={{ color: s.color }}>{s.value}</p>
            <p className="text-slate-400 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage over time */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-4">Usage Over Time (Today)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={usageOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={800} stroke="#eab308" strokeDasharray="4 4" label={{ value: 'Peak', fill: '#eab308', fontSize: 10 }} />
              <Line type="monotone" dataKey="users" name="Users" stroke="#3b82f6" strokeWidth={2.5}
                dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="responseMs" name="Response (ms)" stroke="#f59e0b" strokeWidth={1.5}
                dot={false} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Error distribution */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-4">Error Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={errorDistribution} layout="vertical" barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="type" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} width={90} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <Bar dataKey="count" name="Count" radius={[0, 5, 5, 0]} maxBarSize={20}>
                {errorDistribution.map((d, i) => (
                  <Cell key={i} fill={d.severity === 'high' ? '#ef4444' : d.severity === 'medium' ? '#eab308' : '#3b82f6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-4">System Alerts</h3>
        {alerts.length === 0 ? (
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-300 text-sm text-center">✅ No active alerts</div>
        ) : (
          <div className="space-y-3">
            {alerts.map(a => {
              const s = alertStyle[a.type] ?? alertStyle.info;
              return (
                <div key={a.id} className={`flex items-center justify-between p-4 rounded-xl border ${s.bg}`}>
                  <div className="flex items-center gap-3">
                    <span>{s.icon}</span>
                    <div>
                      <p className={`text-sm font-semibold ${s.text}`}>{a.msg}</p>
                      <p className="text-slate-500 text-xs">{a.time}</p>
                    </div>
                  </div>
                  <button onClick={() => dismissAlert(a.id)}
                    className="text-slate-500 hover:text-white transition-colors text-sm px-3 py-1 rounded-lg hover:bg-white/10">
                    Dismiss
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
