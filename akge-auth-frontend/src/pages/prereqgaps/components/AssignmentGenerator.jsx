import React, { useMemo } from 'react';
import useGapStore from '../store/useGapStore';

const assignmentTemplates = {
  c5: [
    { type: 'Practice Set',    title: '20 factoring problems (graded difficulty)',    difficulty: 'Medium', gain: '+12%' },
    { type: 'Worked Examples', title: '10 quadratic formula problems with steps',     difficulty: 'Hard',   gain: '+8%' },
  ],
  c6: [
    { type: 'Visual Worksheet', title: 'Unit circle labeling + ratio identification', difficulty: 'Easy',   gain: '+10%' },
    { type: 'Practice Set',     title: '15 trig ratio problems',                      difficulty: 'Medium', gain: '+9%' },
  ],
  c7: [
    { type: 'Worked Examples', title: '10 derivative problems with step-by-step',    difficulty: 'Hard',   gain: '+8%' },
    { type: 'Video + Quiz',    title: 'Limits concept video + 5 questions',          difficulty: 'Medium', gain: '+7%' },
  ],
  c3: [
    { type: 'Peer Activity',   title: 'Pair weak + strong students for algebra',     difficulty: 'Easy',   gain: '+9%' },
    { type: 'Practice Set',    title: '15 simplification problems',                  difficulty: 'Easy',   gain: '+8%' },
  ],
  default: [
    { type: 'Practice Set',    title: 'Targeted practice set for weak concept',      difficulty: 'Medium', gain: '+7%' },
    { type: 'Revision Sheet',  title: 'Concept summary + 10 review questions',       difficulty: 'Easy',   gain: '+6%' },
  ],
};

const diffStyle = {
  Easy:   'bg-green-500/20 text-green-300 border-green-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Hard:   'bg-red-500/20 text-red-300 border-red-500/30',
};

const typeIcon = { 'Practice Set':'📝', 'Visual Worksheet':'🖼️', 'Worked Examples':'📖', 'Peer Activity':'👥', 'Video + Quiz':'🎬', 'Revision Sheet':'📋' };

export default function AssignmentGenerator() {
  const { selectedConcept } = useGapStore();

  const assignments = useMemo(() => {
    if (!selectedConcept) return [];
    return assignmentTemplates[selectedConcept.id] ?? assignmentTemplates.default;
  }, [selectedConcept]);

  if (!selectedConcept) {
    return (
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="text-base font-bold text-white mb-2">Assignment Generator</h3>
        <p className="text-gray-500 text-sm">Select a concept to generate assignments</p>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white">Assignment Generator</h3>
          <p className="text-gray-400 text-xs mt-0.5">For: {selectedConcept.name}</p>
        </div>
        <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold">
          {assignments.length} suggestions
        </span>
      </div>

      <div className="space-y-3">
        {assignments.map((a, i) => (
          <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-start gap-2">
                <span className="text-lg shrink-0">{typeIcon[a.type] ?? '📋'}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{a.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{a.type}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${diffStyle[a.difficulty]}`}>{a.difficulty}</span>
                <p className="text-green-400 text-xs font-bold mt-1">{a.gain}</p>
              </div>
            </div>
            <button className="w-full py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold hover:bg-blue-500/30 transition-colors">
              Assign to Class →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
