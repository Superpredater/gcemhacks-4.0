import React from 'react';
import { questions, errorTypes } from '../data/weakData';

function scoreColor(s) {
  if (s >= 70) return '#22c55e';
  if (s >= 50) return '#eab308';
  return '#ef4444';
}

export default function DrillDown({ concept, studentScores, onClose }) {
  if (!concept) return null;

  const qs = questions[concept.id] ?? [];
  const errors = errorTypes[concept.id];
  const avg = Math.round(studentScores.reduce((a, s) => a + s.score, 0) / studentScores.length);
  const atRisk = studentScores.filter(s => s.score < 50);

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-lg font-bold text-white">{concept.name}</h3>
          <p className="text-gray-400 text-sm mt-0.5">Drill-down: students · questions · errors · root cause</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-2xl font-black" style={{ color: scoreColor(avg) }}>{avg}%</p>
            <p className="text-gray-500 text-xs">class avg</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-all flex items-center justify-center"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Student scores */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-3">
            Student Scores ({atRisk.length} at-risk)
          </p>
          <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
            {studentScores.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-white/5 transition-colors">
                <span className="text-gray-600 text-xs w-4">{i + 1}</span>
                <span className="text-gray-200 text-sm flex-1">{s.name}</span>
                <div className="w-20 bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div className="h-1.5 rounded-full" style={{ width: `${s.score}%`, background: scoreColor(s.score) }} />
                </div>
                <span className="text-xs font-bold w-9 text-right" style={{ color: scoreColor(s.score) }}>{s.score}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Questions + errors */}
        <div className="space-y-4">
          {qs.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-3">Problematic Questions</p>
              <div className="space-y-2">
                {qs.slice(0, 3).map((q, i) => (
                  <div key={q.id} className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-gray-300 text-xs flex-1">{q.text}</p>
                      <span className="text-red-400 text-xs font-bold shrink-0">{q.failRate}% fail</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {errors && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-3">Error Breakdown</p>
              <div className="space-y-2">
                {Object.entries(errors).map(([type, pct]) => (
                  <div key={type}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-300 capitalize">{type}</span>
                      <span className="font-bold text-gray-200">{pct}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${pct}%`,
                          background: type === 'conceptual' ? '#ef4444' : type === 'procedural' ? '#eab308' : '#3b82f6',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Root cause */}
          <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
            <p className="text-xs text-orange-300 font-semibold mb-1">🔍 Root Cause</p>
            <p className="text-xs text-gray-300">
              {errors?.conceptual > 45
                ? 'Students lack conceptual understanding — re-teach from first principles'
                : errors?.procedural > 40
                ? 'Students understand concept but make procedural errors — more practice needed'
                : 'Mixed errors — combine concept review with targeted practice'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
