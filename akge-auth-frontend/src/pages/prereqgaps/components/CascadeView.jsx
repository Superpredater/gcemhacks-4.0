import React from 'react';
import useGapStore from '../store/useGapStore';

function masteryColor(m) {
  if (m >= 70) return '#22c55e';
  if (m >= 50) return '#eab308';
  return '#ef4444';
}

export default function CascadeView() {
  const { selectedConcept, selectConcept, gapData } = useGapStore();

  if (!selectedConcept) {
    return (
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="text-base font-bold text-white mb-2">Cascade View</h3>
        <p className="text-gray-500 text-sm">Select a concept to see downstream impact</p>
      </div>
    );
  }

  const dependents = selectedConcept.dependents ?? [];

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="text-base font-bold text-white mb-1">Cascade View</h3>
      <p className="text-gray-400 text-xs mb-4">
        Concepts affected if <span className="text-white font-semibold">{selectedConcept.name}</span> gap is not fixed
      </p>

      {dependents.length === 0 ? (
        <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
          <p className="text-green-300 text-sm">✅ No downstream dependencies</p>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Source */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30">
            <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
            <span className="text-white font-semibold text-sm">{selectedConcept.name}</span>
            <span className="text-red-400 font-bold text-sm ml-auto">{selectedConcept.mastery}%</span>
          </div>

          {/* Arrow */}
          <div className="flex justify-center text-gray-600 text-lg">↓</div>

          {/* Dependents */}
          {dependents.map((dep, i) => {
            const full = gapData.find(c => c.id === dep.id) ?? dep;
            const color = masteryColor(full.mastery);
            return (
              <button key={dep.id} onClick={() => selectConcept(full)}
                className="w-full flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.01]"
                style={{ background: `${color}12`, border: `1px solid ${color}44` }}>
                <span className="w-3 h-3 rounded-full shrink-0" style={{ background: color }} />
                <div className="flex-1 text-left">
                  <p className="text-white text-sm font-medium">{dep.name}</p>
                  <p className="text-gray-500 text-xs">Dependency weight: {dep.weight?.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-base" style={{ color }}>{full.mastery}%</p>
                  {full.isGap && <p className="text-red-400 text-xs">⚠ Also a gap</p>}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
