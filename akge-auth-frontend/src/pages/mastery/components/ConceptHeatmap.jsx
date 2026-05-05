import React from 'react';

function heatColor(mastery) {
  if (mastery >= 70) return { bg: 'rgba(34,197,94,0.2)',  border: 'rgba(34,197,94,0.5)',  text: '#86efac' };
  if (mastery >= 50) return { bg: 'rgba(234,179,8,0.2)',  border: 'rgba(234,179,8,0.5)',  text: '#fde047' };
  return               { bg: 'rgba(239,68,68,0.2)',   border: 'rgba(239,68,68,0.5)',   text: '#fca5a5' };
}

export default function ConceptHeatmap({ heatmapData, onConceptClick }) {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Concept-wise Heatmap</h3>
          <p className="text-gray-400 text-sm mt-1">Click a concept to drill down</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500 inline-block" />Strong</span>
          <span className="flex items-center gap-1 text-gray-300"><span className="w-3 h-3 rounded bg-yellow-500 inline-block" />Average</span>
          <span className="flex items-center gap-1 text-gray-300"><span className="w-3 h-3 rounded bg-red-500 inline-block" />Weak</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {heatmapData.map(c => {
          const col = heatColor(c.avg);
          return (
            <button
              key={c.id}
              onClick={() => onConceptClick(c)}
              className="rounded-xl p-4 text-left transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{ background: col.bg, border: `1px solid ${col.border}` }}
            >
              <p className="text-white font-semibold text-sm leading-tight mb-2">{c.name}</p>
              <p className="text-2xl font-black" style={{ color: col.text }}>{c.avg}%</p>
              <p className="text-xs mt-1" style={{ color: col.text }}>
                {c.weakCount} weak
              </p>
              {c.isWeak && (
                <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-bold bg-red-500/30 text-red-300 border border-red-500/40">
                  ⚠ Critical
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
