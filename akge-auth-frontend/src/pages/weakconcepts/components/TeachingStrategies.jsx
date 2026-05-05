import React from 'react';
import { teachingStrategies } from '../data/weakData';

export default function TeachingStrategies() {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-1">Teaching Recommendations</h3>
      <p className="text-gray-400 text-sm mb-4">Best strategy per weak concept based on error analysis</p>

      <div className="space-y-4">
        {teachingStrategies.map((t, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <p className="text-white font-semibold text-sm">{t.concept}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold">
                  {t.strategy}
                </span>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-black text-green-400">{t.effectiveness}%</p>
                <p className="text-gray-500 text-xs">effectiveness</p>
              </div>
            </div>
            <p className="text-gray-400 text-xs mt-2">{t.desc}</p>
            <div className="mt-3 w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-700"
                style={{ width: `${t.effectiveness}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
