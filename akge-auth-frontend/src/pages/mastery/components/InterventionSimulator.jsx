import React, { useState } from 'react';
import { concepts } from '../data/mockData';

function simulate(mastery, sessions) {
  // Each session gives diminishing returns
  let result = mastery;
  for (let i = 0; i < sessions; i++) {
    const gap = 100 - result;
    result += gap * 0.12; // 12% of remaining gap per session
  }
  return Math.min(Math.round(result), 98);
}

function masteryColor(v) {
  if (v >= 70) return '#22c55e';
  if (v >= 50) return '#eab308';
  return '#ef4444';
}

export default function InterventionSimulator() {
  const [selectedId, setSelectedId] = useState('c5');
  const [sessions, setSessions] = useState(3);

  const concept = concepts.find(c => c.id === selectedId);
  const before  = concept?.mastery ?? 0;
  const after   = simulate(before, sessions);
  const gain    = after - before;

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-1">Intervention Simulator</h3>
      <p className="text-gray-400 text-sm mb-5">Predict improvement from targeted revision sessions</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Concept selector */}
        <div>
          <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wide">Select Concept</label>
          <select
            value={selectedId}
            onChange={e => setSelectedId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-blue-400 transition-colors"
          >
            {concepts.map(c => (
              <option key={c.id} value={c.id} style={{ background: '#1e293b' }}>
                {c.name} — {c.mastery}%
              </option>
            ))}
          </select>
        </div>

        {/* Sessions slider */}
        <div>
          <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wide">
            Revision Sessions: <span className="text-blue-400">{sessions}</span>
          </label>
          <input
            type="range"
            min={1}
            max={10}
            value={sessions}
            onChange={e => setSessions(Number(e.target.value))}
            className="w-full accent-blue-500 mt-2"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 session</span>
            <span>10 sessions</span>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="rounded-2xl p-5 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
        <p className="text-gray-400 text-sm mb-4 font-medium">Projected Outcome for <span className="text-white">{concept?.name}</span></p>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Before</p>
            <p className="text-3xl font-black" style={{ color: masteryColor(before) }}>{before}%</p>
          </div>
          <div className="text-center flex flex-col items-center justify-center">
            <div className="text-2xl">→</div>
            <p className="text-green-400 font-bold text-sm mt-1">+{gain}%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">After</p>
            <p className="text-3xl font-black" style={{ color: masteryColor(after) }}>{after}%</p>
          </div>
        </div>

        {/* Progress bar comparison */}
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Current</span><span>{before}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
              <div className="h-2.5 rounded-full transition-all duration-700" style={{ width: `${before}%`, background: masteryColor(before) }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Projected</span><span>{after}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
              <div className="h-2.5 rounded-full transition-all duration-700" style={{ width: `${after}%`, background: masteryColor(after) }} />
            </div>
          </div>
        </div>

        {after >= 70 && before < 70 && (
          <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-300 text-sm font-medium text-center">
            ✅ {sessions} sessions will bring this concept to Strong mastery!
          </div>
        )}
      </div>
    </div>
  );
}
