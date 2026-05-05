import React from 'react';

const severityStyle = {
  critical: { bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.4)',  badge: 'bg-red-500/20 text-red-300 border-red-500/30',    dot: 'bg-red-500' },
  moderate: { bg: 'rgba(234,179,8,0.10)',  border: 'rgba(234,179,8,0.4)',  badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', dot: 'bg-yellow-500' },
  mild:     { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.3)', badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',   dot: 'bg-blue-400' },
};

export default function WeakConceptDetection({ weakConcepts, onSelect }) {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Weak Concept Detection</h3>
          <p className="text-gray-400 text-sm mt-0.5">Concepts where &gt;40% students score below 50%</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-sm font-bold">
          {weakConcepts.length} flagged
        </span>
      </div>

      <div className="space-y-3">
        {weakConcepts.map(c => {
          const s = severityStyle[c.severity] || severityStyle.mild;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c)}
              className="w-full text-left rounded-xl p-4 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg"
              style={{ background: s.bg, border: `1px solid ${s.border}` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${s.dot}`} />
                  <div>
                    <p className="text-white font-semibold">{c.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {c.weakCount} of 12 students affected · Avg mastery: {c.avg}%
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-black text-red-400">{c.weakPct}%</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold capitalize ${s.badge}`}>
                    {c.severity}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-1.5 rounded-full transition-all duration-700"
                  style={{
                    width: `${c.weakPct}%`,
                    background: c.severity === 'critical' ? '#ef4444' : c.severity === 'moderate' ? '#eab308' : '#3b82f6',
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
