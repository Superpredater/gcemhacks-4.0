import React from 'react';
import { scores } from '../data/studentData';

function scoreColor(s) {
  if (s >= 70) return '#22c55e';
  if (s >= 50) return '#eab308';
  return '#ef4444';
}

const mockQuestions = {
  c5: [
    { text: 'Solve x² - 7x + 12 = 0', failRate: 72, errorType: 'conceptual' },
    { text: 'Complete the square: x² + 6x + 5 = 0', failRate: 65, errorType: 'procedural' },
  ],
  c6: [
    { text: 'Find sin(135°)', failRate: 78, errorType: 'conceptual' },
    { text: 'Prove sin²θ + cos²θ = 1', failRate: 65, errorType: 'conceptual' },
  ],
  c7: [
    { text: 'Differentiate f(x) = x³ - 4x²', failRate: 75, errorType: 'procedural' },
    { text: 'Find lim(x→0) sin(x)/x', failRate: 80, errorType: 'conceptual' },
  ],
};

const errorColor = { conceptual: '#ef4444', procedural: '#eab308', careless: '#3b82f6' };

export default function DrillDownPanel({ concept, studentId, onClose }) {
  if (!concept) return null;

  const studentScore = scores[studentId]?.[concept.id] ?? {};
  const questions = mockQuestions[concept.id] ?? [];

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-lg font-bold text-white">{concept.name}</h3>
          <p className="text-gray-400 text-sm mt-0.5">Drill-down: scores · questions · errors</p>
        </div>
        <button onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-all flex items-center justify-center">
          ✕
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Mastery',   value: studentScore.mastery,   color: scoreColor(studentScore.mastery ?? 0) },
          { label: 'Accuracy',  value: studentScore.accuracy,  color: '#22c55e' },
          { label: 'Retention', value: studentScore.retention, color: '#a855f7' },
          { label: 'Speed',     value: studentScore.speed,     color: '#f59e0b' },
        ].map(m => (
          <div key={m.label} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
            <p className="text-xs text-gray-400 mb-1">{m.label}</p>
            <p className="text-2xl font-black" style={{ color: m.color }}>{m.value ?? '—'}%</p>
          </div>
        ))}
      </div>

      {questions.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-3">Problematic Questions</p>
          <div className="space-y-2">
            {questions.map((q, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-gray-200 text-sm flex-1">{q.text}</p>
                  <div className="text-right shrink-0">
                    <p className="text-red-400 text-sm font-bold">{q.failRate}% fail</p>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: `${errorColor[q.errorType]}22`, color: errorColor[q.errorType] }}>
                      {q.errorType}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {questions.length === 0 && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
          <p className="text-green-300 text-sm">✅ No problematic questions detected for this concept.</p>
        </div>
      )}
    </div>
  );
}
