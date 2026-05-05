import React from 'react';
import { interventions } from '../data/studentData';

export default function InterventionTracking({ studentId }) {
  const history = interventions[studentId] ?? [];

  if (history.length === 0) {
    return (
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-2">Intervention Tracking</h3>
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
          <p className="text-green-300 text-sm">No interventions needed — student is on track.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-1">Intervention Tracking</h3>
      <p className="text-gray-400 text-sm mb-4">Improvement after each intervention</p>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-white/10" />
        <div className="space-y-4">
          {history.map((item, i) => {
            const gain = item.after - item.before;
            return (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-blue-300 text-xs font-black shrink-0 z-10">
                  {i + 1}
                </div>
                <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="text-white font-semibold text-sm">{item.action}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{item.date}</p>
                    </div>
                    <span className="text-green-400 font-black text-lg shrink-0">+{gain}%</span>
                  </div>
                  {/* Before/after bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 w-12">Before</span>
                      <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                        <div className="h-2 rounded-full bg-red-500/70" style={{ width: `${item.before}%` }} />
                      </div>
                      <span className="text-xs text-red-400 font-bold w-8 text-right">{item.before}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 w-12">After</span>
                      <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                        <div className="h-2 rounded-full bg-green-500 transition-all duration-700" style={{ width: `${item.after}%` }} />
                      </div>
                      <span className="text-xs text-green-400 font-bold w-8 text-right">{item.after}%</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
