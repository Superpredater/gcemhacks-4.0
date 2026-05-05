import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import useAdminStore from '../store/useAdminStore';
import { usageTimeline, errorsByType } from '../data/adminData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 text-sm shadow-lg">
      <p className="text-slate-700 font-bold mb-1">{label}</p>
      {payload.map(p => <p key={p.dataKey} style={{ color: p.color }} className="font-semibold">{p.name}: {p.value}</p>)}
    </div>
  );
};

const alertStyle = {
  critical: { bg: 'bg-red-50 border-red-200',    icon: '🚨', text: 'text-red-600',    badge: 'bg-red-100 text-red-600 border-red-200' },
  warning:  { bg: 'bg-yellow-50 border-yellow-200', icon: '⚠️', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  info:     { bg: 'bg-blue-50 border-blue-200',   icon: 'ℹ️', text: 'text-blue-600',   badge: 'bg-blue-100 text-blue-600 border-blue-200' },
};

const incidentSeverity = {
  high:   'bg-red-100 text-red-600 border-red-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low:    'bg-blue-100 text-blue-600 border-blue-200',
};

export default function Health() {
  const navigate = useNavigate();
  const { healthMetrics, alerts, incidents, dismissAlert, refreshHealth } = useAdminStore();

  useEffect(() => {
    const t = setInterval(refreshHealth, 5000);
    return () => clearInterval(t);
  }, []);

  const statusColor = (val, warn, crit) => val >= crit ? '#ef4444' : val >= warn ? '#eab308' : '#22c55e';

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-800">System Health</h1>
          <p className="text-slate-400 text-sm mt-0.5">Live system metrics and incident tracking</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-50 border border-green-200 text-green-600 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live — refreshes every 5s
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: 'Uptime',             value: `${healthMetrics.uptime}%`,          color: '#22c55e', icon: '✅', sub: 'Last 30 days' },
          { label: 'Response Time',      value: `${healthMetrics.responseTime}ms`,   color: statusColor(healthMetrics.responseTime, 280, 350), icon: '⚡', sub: 'Average' },
          { label: 'Error Rate',         value: `${healthMetrics.errorRate}%`,       color: '#22c55e', icon: '🛡️', sub: 'Current' },
          { label: 'Active Users',       value: healthMetrics.activeUsers,           color: '#3b82f6', icon: '👥', sub: 'Right now' },
          { label: 'CPU Usage',          value: `${healthMetrics.cpuUsage}%`,        color: statusColor(healthMetrics.cpuUsage, 70, 85), icon: '💻', sub: 'Current' },
          { label: 'Memory Usage',       value: `${healthMetrics.memoryUsage}%`,     color: statusColor(healthMetrics.memoryUsage, 75, 90), icon: '🧠', sub: 'Current' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xl">{s.icon}</span>
              <span className="text-xs text-slate-400">{s.sub}</span>
            </div>
            <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-slate-400 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Usage timeline */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-4">Usage Over Time (Today)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={usageTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={800} stroke="#eab308" strokeDasharray="4 4" label={{ value: 'Peak', fill: '#eab308', fontSize: 10 }} />
              <Line type="monotone" dataKey="users" name="Users" stroke="#3b82f6" strokeWidth={2.5}
                dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="errors" name="Errors" stroke="#ef4444" strokeWidth={1.5}
                dot={false} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Error distribution */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-4">Error Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={errorsByType} layout="vertical" barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="type" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} width={90} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
              <Bar dataKey="count" name="Count" radius={[0, 5, 5, 0]} maxBarSize={20}>
                {errorsByType.map((d, i) => (
                  <Cell key={i} fill={d.severity === 'high' ? '#ef4444' : d.severity === 'medium' ? '#eab308' : '#3b82f6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <h3 className="text-base font-bold text-slate-800 mb-4">Active Alerts</h3>
        {alerts.length === 0 ? (
          <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-600 text-sm text-center">✅ No active alerts</div>
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
                      <p className="text-slate-400 text-xs">{a.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold border capitalize ${s.badge}`}>{a.type}</span>
                    <button onClick={() => dismissAlert(a.id)}
                      className="text-slate-400 hover:text-slate-600 transition-colors text-sm px-3 py-1 rounded-lg hover:bg-slate-100">
                      Dismiss
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Incident log */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-800">Incident Log</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {['Incident', 'Severity', 'Status', 'Date', 'Duration'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {incidents.map(inc => (
              <tr key={inc.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-slate-700 font-medium text-sm">{inc.title}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border capitalize ${incidentSeverity[inc.severity]}`}>{inc.severity}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold border bg-green-100 text-green-700 border-green-200 capitalize">{inc.status}</span>
                </td>
                <td className="px-4 py-3 text-slate-400 text-xs">{inc.date}</td>
                <td className="px-4 py-3 text-slate-500 text-sm">{inc.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
