import React from 'react';
import { misconceptions } from '../data/mockData';

export default function MisconceptionInsights() {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-1">Misconception Insights</h3>
      <p className="text-gray-400 text-sm mb-4">Common error patterns detected across the class</p>

      <div className="space-y-3">
        {misconceptions.map((m, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
            <div className="flex items-start justify-between gap-3 mb-2">
              <p className="text-white font-semibold text-sm">{m.concept}</p>
              <div className="shrink-0 text-right">
                <p className="text-orange-400 font-bold text-sm">{m.frequency}%</p>
                <p className="text-gray-500 text-xs">affected</p>
              </div>
            </div>
            <p className="text-gray-400 text-xs mb-3">🔍 {m.pattern}</p>
            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-700"
                style={{ width: `${m.frequency}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
