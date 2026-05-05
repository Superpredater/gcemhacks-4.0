import React from 'react';
import useGapStore from '../store/useGapStore';

const sevStyle = {
  gap:     { bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.4)',  text: '#fca5a5', dot: 'bg-red-500',    badge: 'Critical' },
  partial: { bg: 'rgba(234,179,8,0.10)',  border: 'rgba(234,179,8,0.4)',  text: '#fde047', dot: 'bg-yellow-500', badge: 'Partial' },
};

export default function GapDetectionEngine() {
  const { gapData, selectedConcept, selectConcept } = useGapStore();
  const gaps    = gapData.filter(c => c.isGap);
  const partial = gapData.filter(c => c.isPartial);

  const renderList = (items, type) =>
    items.map(c => {
      const s = sevStyle[type];
      const isActive = selectedConcept?.id === c.id;
      return (
        <button key={c.id} onClick={() => selectConcept(c)}
          className="w-full text-left rounded-xl p-3 transition-all duration-200 hover:scale-[1.01]"
          style={{
            background: isActive ? `${s.text}22` : s.bg,
            border: `1px solid ${isActive ? s.text : s.border}`,
            boxShadow: isActive ? `0 0 12px ${s.text}30` : 'none',
          }}>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full shrink-0 ${s.dot}`} />
              <span className="text-white font-semibold text-sm">{c.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                style={{ background: `${s.text}22`, color: s.text, border: `1px solid ${s.text}44` }}>
                {s.badge}
              </span>
              <span className="font-black text-base" style={{ color: s.text }}>{c.mastery}%</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-700"
                style={{ width: `${c.mastery}%`, background: s.text }} />
            </div>
            <span className="text-xs text-gray-500 shrink-0">{c.affectedStudents?.length ?? 0} students</span>
          </div>
        </button>
      );
    });

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white">Gap Detection Engine</h3>
          <p className="text-gray-400 text-xs mt-0.5">Mastery &lt;50% = gap · Click to select</p>
        </div>
        <div className="flex gap-2">
          <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold">{gaps.length} gaps</span>
          <span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 text-xs font-bold">{partial.length} partial</span>
        </div>
      </div>

      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {renderList(gaps, 'gap')}
        {renderList(partial, 'partial')}
      </div>
    </div>
  );
}
