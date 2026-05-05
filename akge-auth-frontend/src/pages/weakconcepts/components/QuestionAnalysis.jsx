import React, { useState } from 'react';
import { questions, concepts } from '../data/weakData';

function failColor(rate) {
  if (rate >= 75) return { text: '#ef4444', bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.4)' };
  if (rate >= 55) return { text: '#eab308', bg: 'rgba(234,179,8,0.12)', border: 'rgba(234,179,8,0.4)' };
  return { text: '#22c55e', bg: 'rgba(34,197,94,0.10)', border: 'rgba(34,197,94,0.3)' };
}

export default function QuestionAnalysis() {
  const conceptsWithQ = concepts.filter(c => questions[c.id]);
  const [selected, setSelected] = useState(conceptsWithQ[0]?.id ?? 'c5');
  const qs = questions[selected] ?? [];

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-1">Question-Level Analysis</h3>
      <p className="text-gray-400 text-sm mb-4">Problematic questions ranked by failure rate</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {conceptsWithQ.map(c => (
          <button
            key={c.id}
            onClick={() => setSelected(c.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border ${
              selected === c.id
                ? 'bg-red-500/20 border-red-400 text-red-300'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-gray-200 hover:bg-white/10'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {qs.sort((a, b) => b.failRate - a.failRate).map((q, i) => {
          const col = failColor(q.failRate);
          return (
            <div
              key={q.id}
              className="rounded-xl p-4"
              style={{ background: col.bg, border: `1px solid ${col.border}` }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 text-xs mt-0.5 w-4 shrink-0">Q{i + 1}</span>
                  <p className="text-gray-200 text-sm">{q.text}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xl font-black" style={{ color: col.text }}>{q.failRate}%</p>
                  <p className="text-gray-500 text-xs">fail rate</p>
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-1.5 rounded-full transition-all duration-700"
                  style={{ width: `${q.failRate}%`, background: col.text }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
