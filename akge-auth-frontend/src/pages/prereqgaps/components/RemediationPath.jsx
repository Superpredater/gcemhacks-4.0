import React, { useMemo } from 'react';
import { concepts, dependencies } from '../data/prereqData';
import useGapStore from '../store/useGapStore';

const priorityStyle = {
  critical: { color: '#ef4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.35)', badge: 'bg-red-500/20 text-red-300' },
  high:     { color: '#f97316', bg: 'rgba(249,115,22,0.10)', border: 'rgba(249,115,22,0.35)', badge: 'bg-orange-500/20 text-orange-300' },
  medium:   { color: '#eab308', bg: 'rgba(234,179,8,0.10)',  border: 'rgba(234,179,8,0.35)',  badge: 'bg-yellow-500/20 text-yellow-300' },
};

export default function RemediationPath() {
  const { gapData, selectedConcept } = useGapStore();

  const path = useMemo(() => {
    const gaps = gapData.filter(c => c.isGap || c.isPartial);
    // Topological sort: fix prerequisites first
    const visited = new Set();
    const result = [];

    const visit = (conceptId) => {
      if (visited.has(conceptId)) return;
      visited.add(conceptId);
      const prereqs = dependencies.filter(d => d.to === conceptId).map(d => d.from);
      prereqs.forEach(visit);
      const c = gaps.find(g => g.id === conceptId);
      if (c) result.push(c);
    };

    // Start from selected or all gaps
    const startIds = selectedConcept ? [selectedConcept.id] : gaps.map(c => c.id);
    startIds.forEach(id => visit(id));

    return result.slice(0, 6).map((c, i) => ({
      step: i + 1,
      concept: c.name,
      mastery: c.mastery,
      action: c.mastery < 30
        ? `Re-teach ${c.name} from fundamentals — 3 sessions`
        : c.mastery < 50
        ? `Targeted practice for ${c.name} — 2 sessions`
        : `Review and reinforce ${c.name} — 1 session`,
      duration: c.mastery < 30 ? '3 weeks' : c.mastery < 50 ? '2 weeks' : '1 week',
      priority: c.mastery < 30 ? 'critical' : c.mastery < 50 ? 'high' : 'medium',
    }));
  }, [gapData, selectedConcept]);

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white">Remediation Path Generator</h3>
          <p className="text-gray-400 text-xs mt-0.5">
            {selectedConcept ? `Path for: ${selectedConcept.name}` : 'Auto-generated from all gaps'}
          </p>
        </div>
        <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold">
          {path.length} steps
        </span>
      </div>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-white/10" />
        <div className="space-y-3">
          {path.map(step => {
            const s = priorityStyle[step.priority];
            return (
              <div key={step.step} className="flex gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shrink-0 z-10"
                  style={{ background: s.bg, border: `2px solid ${s.color}`, color: s.color }}>
                  {step.step}
                </div>
                <div className="flex-1 rounded-xl p-3" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-white font-semibold text-sm">{step.concept}</p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-gray-400 text-xs">{step.duration}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold capitalize ${s.badge}`}>{step.priority}</span>
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
