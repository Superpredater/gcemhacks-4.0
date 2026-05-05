import React, { useState } from 'react';
import { students, scores } from '../data/prereqData';
import useGapStore from '../store/useGapStore';

const groups = [
  { key: 'critical',   label: 'Critical',   threshold: 30, color: '#ef4444', bg: 'rgba(239,68,68,0.10)',  border: 'rgba(239,68,68,0.35)' },
  { key: 'moderate',   label: 'Moderate',   threshold: 50, color: '#f97316', bg: 'rgba(249,115,22,0.10)', border: 'rgba(249,115,22,0.35)' },
  { key: 'mild',       label: 'Mild',       threshold: 70, color: '#eab308', bg: 'rgba(234,179,8,0.10)',  border: 'rgba(234,179,8,0.35)' },
];

export default function StudentBreakdown() {
  const { selectedConcept } = useGapStore();
  const [open, setOpen] = useState(null);

  if (!selectedConcept) {
    return (
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="text-base font-bold text-white mb-2">Student Breakdown</h3>
        <p className="text-gray-500 text-sm">Select a concept to see affected students</p>
      </div>
    );
  }

  const conceptId = selectedConcept.id;
  const studentData = students.map(s => ({
    ...s, score: scores[s.id]?.[conceptId] ?? 0,
  }));

  const critical  = studentData.filter(s => s.score < 30);
  const moderate  = studentData.filter(s => s.score >= 30 && s.score < 50);
  const mild      = studentData.filter(s => s.score >= 50 && s.score < 70);

  const groupData = [
    { ...groups[0], students: critical },
    { ...groups[1], students: moderate },
    { ...groups[2], students: mild },
  ];

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="text-base font-bold text-white mb-1">Student Breakdown</h3>
      <p className="text-gray-400 text-xs mb-4">{selectedConcept.name} — click group to expand</p>

      <div className="space-y-2">
        {groupData.map(g => {
          const isOpen = open === g.key;
          return (
            <div key={g.key} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${g.border}` }}>
              <button onClick={() => setOpen(isOpen ? null : g.key)}
                className="w-full flex items-center justify-between p-3 transition-colors hover:bg-white/5"
                style={{ background: g.bg }}>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: g.color }} />
                  <span className="text-white font-semibold text-sm">{g.label}</span>
                  <span className="text-xs text-gray-400">(&lt;{g.threshold}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: `${g.color}22`, color: g.color }}>{g.students.length}</span>
                  <span className="text-gray-400 text-xs">{isOpen ? '▲' : '▼'}</span>
                </div>
              </button>
              {isOpen && (
                <div className="px-3 pb-3 pt-1 space-y-1" style={{ background: g.bg }}>
                  {g.students.length === 0
                    ? <p className="text-gray-500 text-xs py-2">No students in this group</p>
                    : g.students.map(s => (
                      <div key={s.id} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{s.avatar}</span>
                          <span className="text-gray-200 text-xs">{s.name}</span>
                        </div>
                        <span className="font-bold text-xs" style={{ color: g.color }}>{s.score}%</span>
                      </div>
                    ))
                  }
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
