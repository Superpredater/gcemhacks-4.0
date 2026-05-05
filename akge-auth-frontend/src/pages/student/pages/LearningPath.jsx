import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStudentStore from '../store/useStudentStore';
import { learningPath, concepts } from '../data/studentData';

const statusStyle = {
  completed:   { bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.4)',  icon: '✅', badge: 'bg-green-500/20 text-green-300',  label: 'Completed' },
  'in-progress':{ bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.4)', icon: '▶️', badge: 'bg-blue-500/20 text-blue-300',    label: 'In Progress' },
  available:   { bg: 'rgba(234,179,8,0.10)',  border: 'rgba(234,179,8,0.4)',  icon: '🔓', badge: 'bg-yellow-500/20 text-yellow-300', label: 'Available' },
  locked:      { bg: 'rgba(100,116,139,0.10)', border: 'rgba(100,116,139,0.3)', icon: '🔒', badge: 'bg-gray-500/20 text-gray-400',   label: 'Locked' },
};

export default function LearningPath() {
  const navigate = useNavigate();
  const { concepts: liveConcepts, activeLpId, setActiveLp } = useStudentStore();

  const getConceptMastery = (cId) => liveConcepts.find(c => c.id === cId)?.mastery ?? 0;

  return (
    <div className="space-y-6">
      <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/15 to-blue-500/15 border border-white/20 rounded-2xl p-6">
        <h1 className="text-3xl font-black text-white">Learning Path</h1>
        <p className="text-gray-300 mt-1">Your personalized progression through Mathematics</p>
      </div>

      {/* Progress overview */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Completed', value: learningPath.filter(l => l.status === 'completed').length, color: '#22c55e' },
          { label: 'In Progress', value: learningPath.filter(l => l.status === 'in-progress').length, color: '#3b82f6' },
          { label: 'Remaining', value: learningPath.filter(l => l.status === 'locked').length, color: '#64748b' },
        ].map(s => (
          <div key={s.label} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-gray-400 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Path steps */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/10" />
        <div className="space-y-4">
          {learningPath.map((lp, i) => {
            const s = statusStyle[lp.status];
            const isActive = activeLpId === lp.id;
            const avgMastery = Math.round(lp.concepts.reduce((sum, cId) => sum + getConceptMastery(cId), 0) / lp.concepts.length);
            const isRecommended = lp.status === 'in-progress' || lp.status === 'available';

            return (
              <div key={lp.id} className="flex gap-4">
                {/* Step circle */}
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shrink-0 z-10 border-2"
                  style={{ background: s.bg, borderColor: s.border }}>
                  {s.icon}
                </div>

                {/* Content */}
                <button
                  onClick={() => { if (lp.status !== 'locked') { setActiveLp(lp.id); navigate('/student/concepts'); } }}
                  disabled={lp.status === 'locked'}
                  className={`flex-1 text-left rounded-2xl p-5 transition-all duration-200 ${
                    lp.status !== 'locked' ? 'hover:scale-[1.01] cursor-pointer' : 'cursor-not-allowed opacity-60'
                  } ${isActive ? 'ring-2 ring-blue-400' : ''}`}
                  style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-white font-bold">{lp.title}</p>
                        {isRecommended && (
                          <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
                            ⭐ Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-xs">{lp.concepts.length} concepts · +{lp.xpReward} XP reward</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${s.badge}`}>{s.label}</span>
                      {lp.status !== 'locked' && (
                        <p className="text-2xl font-black mt-1" style={{ color: avgMastery >= 70 ? '#22c55e' : avgMastery >= 50 ? '#eab308' : '#ef4444' }}>
                          {avgMastery}%
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Concept pills */}
                  <div className="flex flex-wrap gap-2">
                    {lp.concepts.map(cId => {
                      const c = concepts.find(x => x.id === cId);
                      const mastery = getConceptMastery(cId);
                      return (
                        <span key={cId} className="px-2 py-1 rounded-lg text-xs font-medium"
                          style={{
                            background: mastery >= 70 ? 'rgba(34,197,94,0.15)' : mastery >= 50 ? 'rgba(234,179,8,0.15)' : 'rgba(239,68,68,0.15)',
                            color: mastery >= 70 ? '#86efac' : mastery >= 50 ? '#fde047' : '#fca5a5',
                          }}>
                          {c?.name} {lp.status !== 'locked' ? `${mastery}%` : ''}
                        </span>
                      );
                    })}
                  </div>

                  {/* Progress bar */}
                  {lp.status !== 'locked' && (
                    <div className="mt-3 w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div className="h-2 rounded-full transition-all duration-700"
                        style={{ width: `${avgMastery}%`, background: avgMastery >= 70 ? '#22c55e' : avgMastery >= 50 ? '#eab308' : '#ef4444' }} />
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
