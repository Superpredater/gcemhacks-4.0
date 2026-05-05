import React from 'react';
import useGapStore from '../store/useGapStore';

export default function RiskAlerts() {
  const { gapData, selectConcept } = useGapStore();
  const gaps = gapData.filter(c => c.isGap);

  const alerts = [
    ...gaps.filter(c => c.impactScore > 40).map(c => ({
      type: 'critical', icon: '🚨',
      title: `${c.name} gap causing cascade failures`,
      desc: `${c.affectedStudents?.length ?? 0} students affected · Impact score: ${c.impactScore}`,
      action: 'Immediate intervention required',
      concept: c,
    })),
    ...gaps.filter(c => c.dependents?.length > 2).map(c => ({
      type: 'high', icon: '⚠️',
      title: `${c.name} blocks ${c.dependents.length} downstream concepts`,
      desc: `Fixing this gap will improve ${c.dependents.map(d => d.name).join(', ')}`,
      action: 'Prioritize in remediation plan',
      concept: c,
    })),
    {
      type: 'warning', icon: '📊',
      title: `${gaps.length} prerequisite gaps detected`,
      desc: 'Class-wide foundational issues need systematic addressing',
      action: 'Run remediation path generator',
      concept: null,
    },
  ].slice(0, 5);

  const typeStyle = {
    critical: { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.4)', badge: 'bg-red-500/20 text-red-300 border-red-500/30' },
    high:     { bg: 'rgba(249,115,22,0.10)', border: 'rgba(249,115,22,0.4)', badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
    warning:  { bg: 'rgba(234,179,8,0.10)',  border: 'rgba(234,179,8,0.4)',  badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="text-base font-bold text-white mb-1">Predictive Risk Alerts</h3>
      <p className="text-gray-400 text-xs mb-4">Auto-generated from current gap data</p>

      <div className="space-y-3">
        {alerts.map((a, i) => {
          const s = typeStyle[a.type];
          return (
            <div key={i} className="rounded-xl p-3 cursor-pointer transition-all hover:scale-[1.01]"
              style={{ background: s.bg, border: `1px solid ${s.border}` }}
              onClick={() => a.concept && selectConcept(a.concept)}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-start gap-2">
                  <span className="text-base">{a.icon}</span>
                  <p className="text-white font-semibold text-sm">{a.title}</p>
                </div>
                <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-bold border capitalize ${s.badge}`}>{a.type}</span>
              </div>
              <p className="text-gray-400 text-xs ml-6 mb-1">{a.desc}</p>
              <p className="text-xs ml-6 px-2 py-0.5 rounded-full bg-white/10 text-gray-300 inline-block">💡 {a.action}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
