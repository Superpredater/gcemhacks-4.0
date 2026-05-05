import React from 'react';

function sevColor(mastery) {
  if (mastery < 30) return { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.4)', text: '#fca5a5', badge: 'Critical' };
  if (mastery < 50) return { bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.4)', text: '#fdba74', badge: 'Moderate' };
  return               { bg: 'rgba(234,179,8,0.10)',  border: 'rgba(234,179,8,0.4)',  text: '#fde047', badge: 'Mild' };
}

export default function WeaknessMap({ weaknessMap, onSelect }) {
  if (weaknessMap.length === 0) {
    return (
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-2">Weakness Map</h3>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
          <span className="text-2xl">✅</span>
          <p className="text-green-300 font-medium">No weak concepts — all above 70%!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Weakness Map</h3>
          <p className="text-gray-400 text-sm mt-0.5">Ranked by severity — click to drill down</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold">
          {weaknessMap.length} concepts
        </span>
      </div>

      <div className="space-y-2">
        {weaknessMap.map((c, i) => {
          const col = sevColor(c.mastery);
          return (
            <button
              key={c.id}
              onClick={() => onSelect?.(c)}
              className="w-full text-left rounded-xl p-3 transition-all duration-200 hover:scale-[1.01]"
              style={{ background: col.bg, border: `1px solid ${col.border}` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-xs w-5">#{i + 1}</span>
                  <span className="text-white font-semibold text-sm">{c.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                    style={{ background: `${col.text}22`, color: col.text, border: `1px solid ${col.text}44` }}>
                    {col.badge}
                  </span>
                  <span className="font-black text-lg" style={{ color: col.text }}>{c.mastery}%</span>
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="h-2 rounded-full transition-all duration-700"
                  style={{ width: `${c.mastery}%`, background: col.text }} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
