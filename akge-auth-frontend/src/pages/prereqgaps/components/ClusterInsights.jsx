import React, { useMemo } from 'react';
import { students, concepts, scores } from '../data/prereqData';

export default function ClusterInsights() {
  const clusters = useMemo(() => {
    const clusterMap = {};
    students.forEach(s => {
      const weakIds = concepts.filter(c => (scores[s.id]?.[c.id] ?? 0) < 50).map(c => c.id);
      if (weakIds.length >= 2) {
        const key = weakIds.slice(0, 3).sort().join('+');
        if (!clusterMap[key]) clusterMap[key] = { ids: weakIds.slice(0, 3), students: [] };
        clusterMap[key].students.push(s);
      }
    });
    return Object.values(clusterMap).sort((a, b) => b.students.length - a.students.length).slice(0, 4);
  }, []);

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="text-base font-bold text-white mb-1">Cluster Insights</h3>
      <p className="text-gray-400 text-xs mb-4">Students grouped by similar gap patterns</p>

      <div className="space-y-3">
        {clusters.map((cl, i) => {
          const names = cl.ids.map(id => concepts.find(c => c.id === id)?.name ?? id);
          return (
            <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-start justify-between mb-2">
                <div className="flex flex-wrap gap-1.5">
                  {names.map(n => (
                    <span key={n} className="px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-medium">{n}</span>
                  ))}
                </div>
                <span className="shrink-0 ml-2 px-2 py-0.5 rounded-full bg-white/10 text-gray-300 text-xs font-bold">{cl.students.length} students</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {cl.students.map(s => (
                  <span key={s.id} className="text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded-full">{s.name.split(' ')[0]}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
