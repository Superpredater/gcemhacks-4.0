import React from 'react';
import { assignmentSuggestions } from '../data/weakData';

const diffStyle = {
  Easy:   'bg-green-500/20 text-green-300 border-green-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Hard:   'bg-red-500/20 text-red-300 border-red-500/30',
};

const typeIcon = {
  'Practice Set':    '📝',
  'Visual Worksheet':'🖼️',
  'Worked Examples': '📖',
  'Peer Activity':   '👥',
  'Video + Quiz':    '🎬',
};

export default function AssignmentSuggestions() {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-1">Auto Assignment Suggestions</h3>
      <p className="text-gray-400 text-sm mb-4">AI-recommended practice sets for weak concepts</p>

      <div className="space-y-3">
        {assignmentSuggestions.map((a, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-start gap-2">
                <span className="text-xl shrink-0">{typeIcon[a.type] ?? '📋'}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{a.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{a.concept} · {a.type}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${diffStyle[a.difficulty]}`}>
                  {a.difficulty}
                </span>
                <p className="text-green-400 text-xs font-bold mt-1">{a.estimatedGain}</p>
              </div>
            </div>
            <button className="mt-2 px-4 py-1.5 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold hover:bg-blue-500/30 transition-colors">
              Assign to Class →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
