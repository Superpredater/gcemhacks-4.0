import React, { useState } from 'react';
import { concepts } from '../data/studentData';

function simulate(mastery, sessions) {
  let r = mastery;
  for (let i = 0; i < sessions; i++) r += (100 - r) * 0.13;
  return Math.min(Math.round(r), 98);
}

function col(v) {
  if (v >= 70) return '#22c55e';
  if (v >= 50) return '#eab308';
  return '#ef4444';
}

export default function SimulationPanel({ radarMetrics, onSimUpdate }) {
  const [conceptId, setConceptId] = useState('c5');
  const [sessions, setSessions] = useState(4);

  const concept = concepts.find(c => c.id === conceptId);
  const before  = radarMetrics.mastery;
  const after   = simulate(before, sessions);
  const gain    = after - before;

  const simMetrics = {
    mastery:   simulate(radarMetrics.mastery,   sessions),
    accuracy:  simulate(radarMetrics.accuracy,  Math.round(sessions * 0.8)),
    retention: simulate(radarMetrics.retention, Math.round(sessions * 0.7)),
    speed:     simulate(radarMetrics.speed,     Math.round(sessions * 0.6)),
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-1">Intervention Simulation</h3>
      <p className="text-gray-400 text-sm mb-5">
        Predict improvement · Click <span className="text-blue-400 font-semibold">Apply to Radar</span> to animate the 3D graph
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wide">Target Concept</label>
          <select value={conceptId} onChange={e => { setConceptId(e.target.value); onSimUpdate?.(null); }}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-blue-400 transition-colors">
            {concepts.map(c => (
              <option key={c.id} value={c.id} style={{ background: '#1e293b' }}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wide">
            Sessions: <span className="text-blue-400">{sessions}</span>
          </label>
          <input type="range" min={1} max={12} value={sessions}
            onChange={e => { setSessions(Number(e.target.value)); onSimUpdate?.(null); }}
            className="w-full accent-blue-500 mt-2" />
          <div className="flex justify-between text-xs text-gray-500 mt-1"><span>1</span><span>12</span></div>
        </div>
      </div>

      {/* Result */}
      <div className="rounded-2xl p-5 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 mb-4">
        <p className="text-gray-400 text-sm mb-4">
          Projected outcome for <span className="text-white font-semibold">{concept?.name}</span>
        </p>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Before</p>
            <p className="text-4xl font-black" style={{ color: col(before) }}>{before}%</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl text-gray-500">→</span>
            <span className="text-green-400 font-bold text-sm mt-1">+{gain}%</span>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">After</p>
            <p className="text-4xl font-black" style={{ color: col(after) }}>{after}%</p>
          </div>
        </div>
        {[{ label: 'Current', val: before }, { label: 'Projected', val: after }].map(row => (
          <div key={row.label} className="mb-2">
            <div className="flex justify-between text-xs text-gray-400 mb-1"><span>{row.label}</span><span>{row.val}%</span></div>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div className="h-3 rounded-full transition-all duration-700" style={{ width: `${row.val}%`, background: col(row.val) }} />
            </div>
          </div>
        ))}
        {after >= 70 && before < 70 && (
          <div className="mt-3 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-300 text-sm font-medium text-center">
            ✅ {sessions} sessions will bring mastery to Strong level!
          </div>
        )}
      </div>

      <button onClick={() => onSimUpdate?.(simMetrics)}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30">
        🎯 Apply to 3D Radar — Animate Improvement
      </button>
    </div>
  );
}
