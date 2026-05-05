import React from 'react';

export default function LearningPatterns({ clusters }) {
  const insights = [
    { pattern: 'Algebra → Quadratic → Calculus chain', students: 5, severity: 'critical', desc: '5 students weak across all 3 linked concepts' },
    { pattern: 'Trig + Calculus co-weakness',           students: 4, severity: 'high',     desc: '4 students show simultaneous weakness in both' },
    { pattern: 'Fractions → Algebra gap',               students: 3, severity: 'moderate', desc: '3 students have fraction gaps causing algebra issues' },
  ];

  const sevColor = {
    critical: 'bg-red-500/20 text-red-300 border-red-500/30',
    high:     'bg-orange-500/20 text-orange-300 border-orange-500/30',
    moderate: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-1">Learning Pattern Insights</h3>
      <p className="text-gray-400 text-sm mb-4">Common weak concept clusters across students</p>

      {/* Cluster heatmap */}
      <div className="mb-5">
        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-3">Co-occurrence Clusters</p>
        <div className="space-y-2">
          {clusters.map((cl, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-gray-500 text-xs w-4 shrink-0">{i + 1}</span>
              <div className="flex flex-wrap gap-1.5 flex-1">
                {cl.concepts.map(name => (
                  <span key={name} className="px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-medium">
                    {name}
                  </span>
                ))}
              </div>
              <span className="shrink-0 text-xs text-gray-400">{cl.count} students</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pattern insights */}
      <div className="space-y-3">
        {insights.map((ins, i) => (
          <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-start justify-between gap-2 mb-1">
              <p className="text-white text-sm font-medium">{ins.pattern}</p>
              <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-bold border ${sevColor[ins.severity]}`}>
                {ins.students} students
              </span>
            </div>
            <p className="text-gray-400 text-xs">{ins.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
