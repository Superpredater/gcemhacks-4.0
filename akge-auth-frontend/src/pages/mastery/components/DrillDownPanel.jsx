import React from 'react';

function scoreColor(score) {
  if (score >= 70) return '#22c55e';
  if (score >= 50) return '#eab308';
  return '#ef4444';
}

export default function DrillDownPanel({ concept, studentScores, onClose }) {
  if (!concept) return null;

  const avg = Math.round(studentScores.reduce((a, s) => a + s.score, 0) / studentScores.length);

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">{concept.name}</h3>
          <p className="text-gray-400 text-sm mt-1">Student scores — drill-down view</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-2xl font-black" style={{ color: scoreColor(avg) }}>{avg}%</p>
            <p className="text-gray-500 text-xs">Class avg</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-all flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Score bar */}
      <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Score distribution</span>
          <span>{studentScores.filter(s => s.score < 50).length} at-risk</span>
        </div>
        <div className="flex gap-1 h-3">
          {studentScores.map(s => (
            <div
              key={s.id}
              className="flex-1 rounded-sm"
              style={{ background: scoreColor(s.score) }}
              title={`${s.name}: ${s.score}%`}
            />
          ))}
        </div>
      </div>

      {/* Student list */}
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {studentScores.map((s, i) => (
          <div
            key={s.id}
            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xs w-5">{i + 1}</span>
              <span className="text-gray-200 text-sm">{s.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ width: `${s.score}%`, background: scoreColor(s.score) }}
                />
              </div>
              <span className="text-sm font-bold w-10 text-right" style={{ color: scoreColor(s.score) }}>
                {s.score}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
