import React, { useState } from 'react';

const groups = [
  { key: 'advanced', label: 'Advanced',  icon: '🚀', color: { bg: 'rgba(34,197,94,0.1)',  border: 'rgba(34,197,94,0.3)',  text: '#86efac', badge: 'bg-green-500/20 text-green-300' } },
  { key: 'average',  label: 'Average',   icon: '📘', color: { bg: 'rgba(234,179,8,0.1)',  border: 'rgba(234,179,8,0.3)',  text: '#fde047', badge: 'bg-yellow-500/20 text-yellow-300' } },
  { key: 'atRisk',   label: 'At-Risk',   icon: '⚠️', color: { bg: 'rgba(239,68,68,0.1)',  border: 'rgba(239,68,68,0.3)',  text: '#fca5a5', badge: 'bg-red-500/20 text-red-300' } },
];

export default function StudentSegmentation({ segmentation }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-1">Student Segmentation</h3>
      <p className="text-gray-400 text-sm mb-4">Click a group to see students</p>

      <div className="space-y-3">
        {groups.map(g => {
          const list = segmentation[g.key] || [];
          const isOpen = expanded === g.key;
          return (
            <div key={g.key} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${g.color.border}` }}>
              <button
                onClick={() => setExpanded(isOpen ? null : g.key)}
                className="w-full flex items-center justify-between p-4 transition-colors hover:bg-white/5"
                style={{ background: g.color.bg }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{g.icon}</span>
                  <span className="font-semibold text-white">{g.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${g.color.badge}`}>
                    {list.length} students
                  </span>
                  <span className="text-gray-400 text-sm">{isOpen ? '▲' : '▼'}</span>
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-2 space-y-2" style={{ background: g.color.bg }}>
                  {list.map(s => (
                    <div key={s.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-gray-200 text-sm">{s.name}</span>
                      <span className="font-bold text-sm" style={{ color: g.color.text }}>{s.avg}%</span>
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
