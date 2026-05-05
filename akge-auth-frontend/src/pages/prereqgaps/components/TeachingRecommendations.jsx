import React, { useMemo } from 'react';
import useGapStore from '../store/useGapStore';

const strategies = {
  c5: { strategy: 'Visual Analogy',   desc: 'Use parabola graph to show roots visually before algebra', effectiveness: 88 },
  c6: { strategy: 'Mnemonic + Drill', desc: 'SOH-CAH-TOA mnemonic + 10-min daily drill for 1 week',    effectiveness: 82 },
  c7: { strategy: 'Scaffolded Steps', desc: 'Break into: limits → slope → derivative — one per session', effectiveness: 85 },
  c3: { strategy: 'Error Analysis',   desc: 'Show common mistakes, ask students to spot and fix errors', effectiveness: 79 },
  c4: { strategy: 'Worked Examples',  desc: 'Step-by-step worked examples with guided practice',         effectiveness: 81 },
  default: { strategy: 'Direct Instruction', desc: 'Explicit teaching with immediate practice and feedback', effectiveness: 75 },
};

export default function TeachingRecommendations() {
  const { selectedConcept } = useGapStore();

  const rec = useMemo(() => {
    if (!selectedConcept) return null;
    return strategies[selectedConcept.id] ?? strategies.default;
  }, [selectedConcept]);

  if (!selectedConcept || !rec) {
    return (
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="text-base font-bold text-white mb-2">Teaching Recommendations</h3>
        <p className="text-gray-500 text-sm">Select a concept to get teaching strategy</p>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="text-base font-bold text-white mb-1">Teaching Recommendations</h3>
      <p className="text-gray-400 text-xs mb-4">Best strategy for: {selectedConcept.name}</p>

      <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-bold">
            {rec.strategy}
          </span>
          <div className="text-right">
            <p className="text-2xl font-black text-green-400">{rec.effectiveness}%</p>
            <p className="text-gray-500 text-xs">effectiveness</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm">{rec.desc}</p>
        <div className="mt-3 w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <div className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-700"
            style={{ width: `${rec.effectiveness}%` }} />
        </div>
      </div>

      {/* Additional tips */}
      <div className="space-y-2">
        {[
          { icon: '⏱️', tip: 'Allocate 15 min at start of class for prerequisite review' },
          { icon: '👥', tip: 'Use peer tutoring — pair strong students with struggling ones' },
          { icon: '📊', tip: 'Check understanding with exit tickets after each session' },
        ].map((t, i) => (
          <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10">
            <span className="text-sm shrink-0">{t.icon}</span>
            <p className="text-gray-300 text-xs">{t.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
