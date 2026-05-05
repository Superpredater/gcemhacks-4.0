import React from 'react';
import { concepts } from '../data/prereqData';
import useGapStore from '../store/useGapStore';

function col(v) {
  if (v >= 70) return '#22c55e';
  if (v >= 50) return '#eab308';
  return '#ef4444';
}

export default function SimulationPanel() {
  const {
    simConceptId, simSessions, simMasteries, isSimulating,
    setSimConceptId, setSimSessions, runSimulation, resetSimulation, gapData,
  } = useGapStore();

  const target = concepts.find(c => c.id === simConceptId);
  const currentMastery = gapData.find(c => c.id === simConceptId)?.mastery ?? target?.mastery ?? 0;
  const simMastery = simMasteries[simConceptId];
  const gain = simMastery ? simMastery - (target?.mastery ?? 0) : 0;

  // Count how many concepts improved
  const improvedCount = Object.keys(simMasteries).length;

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="text-base font-bold text-white mb-1">3D Simulation</h3>
      <p className="text-gray-400 text-xs mb-4">
        Select concept + sessions → graph nodes animate to new mastery
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-gray-400 text-xs font-semibold mb-1.5 uppercase tracking-wide">Target Concept</label>
          <select value={simConceptId} onChange={e => { setSimConceptId(e.target.value); resetSimulation(); }}
            className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-blue-400 transition-colors">
            {concepts.map(c => (
              <option key={c.id} value={c.id} style={{ background: '#1e293b' }}>
                {c.name} — {c.mastery}%
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-xs font-semibold mb-1.5 uppercase tracking-wide">
            Sessions: <span className="text-blue-400">{simSessions}</span>
          </label>
          <input type="range" min={1} max={12} value={simSessions}
            onChange={e => { setSimSessions(Number(e.target.value)); resetSimulation(); }}
            className="w-full accent-blue-500 mt-1" />
          <div className="flex justify-between text-xs text-gray-500 mt-1"><span>1</span><span>12</span></div>
        </div>
      </div>

      {/* Result preview */}
      <div className="rounded-xl p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 mb-4">
        <p className="text-gray-400 text-xs mb-3">
          Projected outcome for <span className="text-white font-semibold">{target?.name}</span>
        </p>
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Before</p>
            <p className="text-3xl font-black" style={{ color: col(target?.mastery ?? 0) }}>{target?.mastery ?? 0}%</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-xl text-gray-500">→</span>
            {simMastery && <span className="text-green-400 font-bold text-sm">+{gain}%</span>}
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">After</p>
            <p className="text-3xl font-black" style={{ color: col(simMastery ?? target?.mastery ?? 0) }}>
              {simMastery ?? target?.mastery ?? 0}%
            </p>
          </div>
        </div>

        {simMastery && (
          <div className="space-y-1.5">
            {[{ label: 'Current', val: target?.mastery ?? 0 }, { label: 'Projected', val: simMastery }].map(r => (
              <div key={r.label}>
                <div className="flex justify-between text-xs text-gray-400 mb-1"><span>{r.label}</span><span>{r.val}%</span></div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${r.val}%`, background: col(r.val) }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {improvedCount > 0 && (
          <div className="mt-3 p-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-300 text-xs text-center">
            ✅ {improvedCount} concepts updated in graph · {improvedCount - 1} cascade improvements
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button onClick={runSimulation} disabled={isSimulating}
          className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-60">
          {isSimulating ? '⏳ Simulating…' : '🎯 Run Simulation'}
        </button>
        {improvedCount > 0 && (
          <button onClick={resetSimulation}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white font-semibold text-sm transition-all border border-white/10">
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
