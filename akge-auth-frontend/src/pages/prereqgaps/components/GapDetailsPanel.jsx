import React from 'react';
import useGapStore from '../store/useGapStore';

function masteryColor(m) {
  if (m >= 70) return '#22c55e';
  if (m >= 50) return '#eab308';
  return '#ef4444';
}

export default function GapDetailsPanel() {
  const { selectedConcept, clearSelection } = useGapStore();

  if (!selectedConcept) {
    return (
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-center min-h-40">
        <div className="text-center">
          <p className="text-4xl mb-2">🕸️</p>
          <p className="text-gray-400 text-sm">Click a node in the graph or a gap in the list to see details</p>
        </div>
      </div>
    );
  }

  const c = selectedConcept;
  const color = masteryColor(c.mastery);

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white">{c.name}</h3>
          <p className="text-gray-400 text-xs mt-0.5">Gap Details Panel</p>
        </div>
        <button onClick={clearSelection}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-all flex items-center justify-center text-xs">
          ✕
        </button>
      </div>

      {/* Mastery gauge */}
      <div className="rounded-xl p-4 mb-4 text-center"
        style={{ background: `${color}15`, border: `1px solid ${color}44` }}>
        <p className="text-4xl font-black" style={{ color }}>{c.mastery}%</p>
        <p className="text-gray-400 text-xs mt-1">Class Mastery</p>
        <div className="mt-3 w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
          <div className="h-2.5 rounded-full transition-all duration-700" style={{ width: `${c.mastery}%`, background: color }} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-xs text-gray-400 mb-1">Impact Score</p>
          <p className="text-xl font-black text-orange-400">{c.impactScore}</p>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-xs text-gray-400 mb-1">Students Affected</p>
          <p className="text-xl font-black text-red-400">{c.affectedStudents?.length ?? 0}</p>
        </div>
      </div>

      {/* Prerequisite issues */}
      {c.prereqs?.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">Prerequisite Issues</p>
          <div className="space-y-1.5">
            {c.prereqs.map(p => (
              <div key={p.id} className="flex items-center justify-between p-2.5 rounded-lg"
                style={{ background: p.isGap ? 'rgba(239,68,68,0.10)' : 'rgba(255,255,255,0.05)', border: `1px solid ${p.isGap ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.1)'}` }}>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${p.isGap ? 'bg-red-500' : 'bg-green-500'}`} />
                  <span className="text-gray-200 text-xs">{p.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">w:{p.weight?.toFixed(1)}</span>
                  <span className="text-xs font-bold" style={{ color: masteryColor(p.mastery) }}>{p.mastery}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
