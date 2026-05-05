import React from 'react';
import { confidenceData } from '../data/studentData';

export default function ConfidenceAccuracy({ studentId }) {
  const data = confidenceData[studentId] ?? confidenceData[1];

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-1">Confidence vs Accuracy</h3>
      <p className="text-gray-400 text-sm mb-4">Mismatch = overconfident or underconfident</p>

      <div className="space-y-3">
        {data.map((d, i) => {
          const diff = d.confidence - d.accuracy;
          const mismatch = Math.abs(diff) > 10;
          const overconfident = diff > 10;
          return (
            <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm font-semibold">{d.concept}</span>
                {mismatch && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold border ${
                    overconfident
                      ? 'bg-orange-500/20 text-orange-300 border-orange-500/30'
                      : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                  }`}>
                    {overconfident ? '⚠ Overconfident' : '📉 Underconfident'}
                  </span>
                )}
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-20">Confidence</span>
                  <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="h-2 rounded-full bg-purple-500 transition-all duration-700" style={{ width: `${d.confidence}%` }} />
                  </div>
                  <span className="text-xs font-bold text-purple-400 w-8 text-right">{d.confidence}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-20">Accuracy</span>
                  <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="h-2 rounded-full bg-green-500 transition-all duration-700" style={{ width: `${d.accuracy}%` }} />
                  </div>
                  <span className="text-xs font-bold text-green-400 w-8 text-right">{d.accuracy}%</span>
                </div>
              </div>
              {mismatch && (
                <p className="text-xs text-gray-500 mt-2">
                  Gap: <span className={`font-bold ${overconfident ? 'text-orange-400' : 'text-blue-400'}`}>
                    {overconfident ? '+' : ''}{diff}%
                  </span>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
