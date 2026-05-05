import React from 'react';

const typeStyle = {
  revision:    { color: '#3b82f6', bg: 'rgba(59,130,246,0.10)',  border: 'rgba(59,130,246,0.3)' },
  practice:    { color: '#22c55e', bg: 'rgba(34,197,94,0.10)',   border: 'rgba(34,197,94,0.3)' },
  next:        { color: '#a855f7', bg: 'rgba(168,85,247,0.10)',  border: 'rgba(168,85,247,0.3)' },
  consistency: { color: '#f59e0b', bg: 'rgba(245,158,11,0.10)',  border: 'rgba(245,158,11,0.3)' },
};

export default function Recommendations({ recommendations }) {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-1">Recommendations</h3>
      <p className="text-gray-400 text-sm mb-4">AI-suggested actions for this student</p>

      <div className="space-y-3">
        {recommendations.map((r, i) => {
          const s = typeStyle[r.type] ?? typeStyle.practice;
          return (
            <div key={i} className="rounded-xl p-4 flex items-start gap-3"
              style={{ background: s.bg, border: `1px solid ${s.border}` }}>
              <span className="text-xl shrink-0 mt-0.5">{r.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-white font-semibold text-sm">{r.action}</p>
                  <span className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: `${s.color}22`, color: s.color, border: `1px solid ${s.color}44` }}>
                    {r.impact}
                  </span>
                </div>
                <p className="text-gray-400 text-xs">{r.reason}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
