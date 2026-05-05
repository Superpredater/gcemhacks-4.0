import React, { useState } from 'react';
import { students, scores, questions } from '../data/prereqData';
import useGapStore from '../store/useGapStore';

function scoreColor(s) {
  if (s >= 70) return '#22c55e';
  if (s >= 50) return '#eab308';
  return '#ef4444';
}
const errorColor = { conceptual: '#ef4444', procedural: '#eab308', careless: '#3b82f6' };

export default function DrillDownPanel() {
  const { selectedConcept } = useGapStore();
  const [view, setView] = useState('students'); // students | questions

  if (!selectedConcept) {
    return (
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="text-base font-bold text-white mb-2">Drill-down Panel</h3>
        <p className="text-gray-500 text-sm">Select a concept to drill down</p>
      </div>
    );
  }

  const conceptId = selectedConcept.id;
  const studentScores = students.map(s => ({ ...s, score: scores[s.id]?.[conceptId] ?? 0 }))
    .sort((a, b) => a.score - b.score);
  const qs = questions[conceptId] ?? [];

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white">Drill-down: {selectedConcept.name}</h3>
          <p className="text-gray-400 text-xs mt-0.5">Students · Questions · Errors</p>
        </div>
        <div className="flex gap-1">
          {['students', 'questions'].map(v => (
            <button key={v} onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border capitalize ${
                view === v ? 'bg-blue-500/30 border-blue-400 text-blue-300' : 'bg-white/5 border-white/10 text-gray-400 hover:text-gray-200'
              }`}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === 'students' && (
        <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
          {studentScores.map((s, i) => (
            <div key={s.id} className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-white/5 transition-colors">
              <span className="text-gray-600 text-xs w-4">{i + 1}</span>
              <span className="text-sm">{s.avatar}</span>
              <span className="text-gray-200 text-sm flex-1">{s.name}</span>
              <div className="w-20 bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div className="h-1.5 rounded-full" style={{ width: `${s.score}%`, background: scoreColor(s.score) }} />
              </div>
              <span className="text-xs font-bold w-9 text-right" style={{ color: scoreColor(s.score) }}>{s.score}%</span>
            </div>
          ))}
        </div>
      )}

      {view === 'questions' && (
        <div className="space-y-2">
          {qs.length === 0 ? (
            <p className="text-gray-500 text-sm">No question data for this concept</p>
          ) : qs.map(q => (
            <div key={q.id} className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-gray-200 text-sm flex-1">{q.text}</p>
                <div className="text-right shrink-0">
                  <p className="text-red-400 text-sm font-bold">{q.failRate}% fail</p>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: `${errorColor[q.errorType]}22`, color: errorColor[q.errorType] }}>
                    {q.errorType}
                  </span>
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div className="h-1.5 rounded-full bg-red-500" style={{ width: `${q.failRate}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
