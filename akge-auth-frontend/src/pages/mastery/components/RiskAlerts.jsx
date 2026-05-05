import React from 'react';
import { riskAlerts } from '../data/mockData';

const typeStyle = {
  critical: { bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.4)',  icon: '🚨', badge: 'bg-red-500/20 text-red-300',    label: 'Critical' },
  warning:  { bg: 'rgba(234,179,8,0.12)',  border: 'rgba(234,179,8,0.4)',  icon: '⚠️', badge: 'bg-yellow-500/20 text-yellow-300', label: 'Warning' },
  info:     { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.4)', icon: 'ℹ️', badge: 'bg-blue-500/20 text-blue-300',    label: 'Info' },
};

export default function RiskAlerts() {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-1">Risk Alerts</h3>
      <p className="text-gray-400 text-sm mb-4">Automated warnings based on class data</p>

      <div className="space-y-3">
        {riskAlerts.map(alert => {
          const s = typeStyle[alert.type];
          return (
            <div
              key={alert.id}
              className="rounded-xl p-4"
              style={{ background: s.bg, border: `1px solid ${s.border}` }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-start gap-2">
                  <span className="text-lg mt-0.5">{s.icon}</span>
                  <p className="text-white font-semibold text-sm">{alert.title}</p>
                </div>
                <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-bold ${s.badge}`}>{s.label}</span>
              </div>
              <p className="text-gray-400 text-xs ml-7 mb-2">{alert.desc}</p>
              <div className="ml-7">
                <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300 border border-white/10">
                  💡 {alert.action}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
