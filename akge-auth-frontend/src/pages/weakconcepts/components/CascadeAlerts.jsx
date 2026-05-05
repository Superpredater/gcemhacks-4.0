import React from 'react';
import { cascadeAlerts } from '../data/weakData';

const riskStyle = {
  critical: { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.4)', badge: 'bg-red-500/20 text-red-300 border-red-500/30', icon: '🚨' },
  high:     { bg: 'rgba(249,115,22,0.10)', border: 'rgba(249,115,22,0.4)', badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30', icon: '⚠️' },
  moderate: { bg: 'rgba(234,179,8,0.10)',  border: 'rgba(234,179,8,0.4)',  badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', icon: '📊' },
};

export default function CascadeAlerts() {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-1">Predictive & Cascade Risk Alerts</h3>
      <p className="text-gray-400 text-sm mb-4">Dependency-based failure propagation warnings</p>

      <div className="space-y-3">
        {cascadeAlerts.map((a, i) => {
          const s = riskStyle[a.risk];
          return (
            <div key={i} className="rounded-xl p-4" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{s.icon}</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-semibold text-sm">{a.from}</span>
                    <span className="text-gray-500 text-xs">→ causes failure in →</span>
                    <span className="text-white font-semibold text-sm">{a.to}</span>
                  </div>
                </div>
                <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-bold border capitalize ${s.badge}`}>
                  {a.risk}
                </span>
              </div>
              <p className="text-gray-400 text-xs ml-7 mb-2">{a.desc}</p>
              <div className="ml-7 flex items-center gap-3">
                <div className="flex-1 bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${a.pct}%`,
                      background: a.risk === 'critical' ? '#ef4444' : a.risk === 'high' ? '#f97316' : '#eab308',
                    }}
                  />
                </div>
                <span className="text-xs font-bold text-gray-300 shrink-0">{a.pct}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
