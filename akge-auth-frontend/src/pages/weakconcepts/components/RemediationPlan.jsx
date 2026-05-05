import React from 'react';
import { remediationPlan } from '../data/weakData';

const priorityStyle = {
  critical: { color: '#ef4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.35)', badge: 'bg-red-500/20 text-red-300' },
  high:     { color: '#f97316', bg: 'rgba(249,115,22,0.10)', border: 'rgba(249,115,22,0.35)', badge: 'bg-orange-500/20 text-orange-300' },
  medium:   { color: '#eab308', bg: 'rgba(234,179,8,0.10)',  border: 'rgba(234,179,8,0.35)',  badge: 'bg-yellow-500/20 text-yellow-300' },
};

export default function RemediationPlan() {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-1">Adaptive Remediation Plan</h3>
      <p className="text-gray-400 text-sm mb-5">Step-by-step recovery path — follow in order</p>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-white/10" />

        <div className="space-y-4">
          {remediationPlan.map((step, i) => {
            const s = priorityStyle[step.priority];
            return (
              <div key={step.step} className="flex gap-4 relative">
                {/* Step circle */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shrink-0 z-10"
                  style={{ background: s.bg, border: `2px solid ${s.color}`, color: s.color }}
                >
                  {step.step}
                </div>

                {/* Content */}
                <div
                  className="flex-1 rounded-xl p-4"
                  style={{ background: s.bg, border: `1px solid ${s.border}` }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-white font-semibold text-sm">{step.concept}</p>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-gray-400 text-xs">{step.duration}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold capitalize ${s.badge}`}>
                        {step.priority}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs">{step.action}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
