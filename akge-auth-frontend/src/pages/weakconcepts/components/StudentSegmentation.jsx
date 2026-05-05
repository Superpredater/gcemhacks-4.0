import React, { useState } from 'react';

const groups = [
  { key: 'highRisk',    label: 'High Risk',    icon: '🚨', color: { bg: 'rgba(239,68,68,0.10)',  border: 'rgba(239,68,68,0.35)',  text: '#fca5a5', badge: 'bg-red-500/20 text-red-300' } },
  { key: 'moderate',   label: 'Moderate',     icon: '⚠️', color: { bg: 'rgba(234,179,8,0.10)',  border: 'rgba(234,179,8,0.35)',  text: '#fde047', badge: 'bg-yellow-500/20 text-yellow-300' } },
  { key: 'recoverable',label: 'Recoverable',  icon: '📈', color: { bg: 'rgba(34,197,94,0.08)',  border: 'rgba(34,197,94,0.3)',   text: '#86efac', badge: 'bg-green-500/20 text-green-300' } },
];

export default function StudentSegmentation({ segmentation }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-1">Student Segmentation</h3>
      <p className="text-gray-400 text-sm mb-4">Grouped by risk level based on weak concept count</p>

      <div className="space-y-3">
        {groups.map(g => {
          const list = segmentation[g.key] ?? [];
          const isOpen = open === g.key;
          return (
            <div key={g.key} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${g.color.border}` }}>
              <button
                onClick={() => setOpen(isOpen ? null : g.key)}
                className="w-full flex items-center justify-between p-4 transition-colors hover:bg-white/5"
                style={{ background: g.color.bg }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{g.icon}</span>
                  <div className="text-left">
                    <p className="text-white font-semibold">{g.label}</p>
                    <p className="text-gray-400 text-xs">
                      {g.key === 'highRisk' ? 'avg <45% or 7+ weak concepts' :
                       g.key === 'moderate' ? 'avg <65% or 4+ weak concepts' :
                       'avg ≥65%, <4 weak concepts'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${g.color.badge}`}>
                    {list.length} students
                  </span>
                  <span className="text-gray-400 text-sm">{isOpen ? '▲' : '▼'}</span>
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-2 space-y-1.5" style={{ background: g.color.bg }}>
                  {list.map(s => (
                    <div key={s.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-gray-200 text-sm">{s.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 text-xs">{s.weakConceptCount} weak</span>
                        <span className="font-bold text-sm" style={{ color: g.color.text }}>{s.avg}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
