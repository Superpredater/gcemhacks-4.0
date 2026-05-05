import React from 'react';
import { archetypes } from '../data/studentData';

const archetypeStyle = {
  'Fast Learner':       { color: '#22c55e', bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.35)',  traits: ['Quick concept grasp', 'High accuracy', 'Needs enrichment'] },
  'Steady Achiever':    { color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.35)', traits: ['Consistent progress', 'Regular practice', 'Responds to feedback'] },
  'Struggling Learner': { color: '#f97316', bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.35)', traits: ['Needs foundational review', 'Benefits from 1-on-1', 'Slow but steady'] },
  'Inconsistent':       { color: '#eab308', bg: 'rgba(234,179,8,0.10)',  border: 'rgba(234,179,8,0.35)',  traits: ['Variable performance', 'Needs consistency plan', 'Motivation issues'] },
  'At-Risk':            { color: '#ef4444', bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.4)',   traits: ['Critical intervention needed', 'Multiple weak areas', 'Immediate support'] },
};

export default function LearningArchetype({ studentId }) {
  const archetype = archetypes[studentId] ?? archetypes[1];
  const style = archetypeStyle[archetype.type] ?? archetypeStyle['Steady Achiever'];

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-4">Learning Archetype</h3>

      <div className="rounded-2xl p-5 text-center mb-4" style={{ background: style.bg, border: `1px solid ${style.border}` }}>
        <span className="text-5xl">{archetype.icon}</span>
        <p className="text-xl font-black mt-3" style={{ color: style.color }}>{archetype.type}</p>
        <p className="text-gray-300 text-sm mt-2">{archetype.desc}</p>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">Key Traits</p>
        {style.traits.map((t, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: style.color }} />
            <span className="text-gray-300 text-sm">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
