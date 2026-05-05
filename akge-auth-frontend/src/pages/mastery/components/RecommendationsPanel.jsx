import React from 'react';
import { recommendations } from '../data/mockData';

const priorityStyle = {
  high:   { border: 'rgba(239,68,68,0.4)',  bg: 'rgba(239,68,68,0.08)',  badge: 'bg-red-500/20 text-red-300' },
  medium: { border: 'rgba(234,179,8,0.4)',  bg: 'rgba(234,179,8,0.08)',  badge: 'bg-yellow-500/20 text-yellow-300' },
  low:    { border: 'rgba(34,197,94,0.4)',  bg: 'rgba(34,197,94,0.08)',  badge: 'bg-green-500/20 text-green-300' },
};

export default function RecommendationsPanel() {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-1">Recommendations</h3>
      <p className="text-gray-400 text-sm mb-4">AI-suggested actions to improve class performance</p>

      <div className="space-y-3">
        {recommendations.map((r, i) => {
          const s = priorityStyle[r.priority];
          return (
            <div
              key={i}
              className="rounded-xl p-4 flex items-start gap-3"
              style={{ background: s.bg, border: `1px solid ${s.border}` }}
            >
              <span className="text-xl shrink-0 mt-0.5">{r.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-white font-semibold text-sm">{r.action}</p>
                  <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-bold capitalize ${s.badge}`}>
                    {r.priority}
                  </span>
                </div>
                <p className="text-gray-400 text-xs mb-1">{r.reason}</p>
                <p className="text-green-400 text-xs font-medium">📈 {r.impact}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
