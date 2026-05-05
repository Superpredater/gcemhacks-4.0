import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStudentStore from '../store/useStudentStore';

const diffColor = { Easy: '#22c55e', Medium: '#eab308', Hard: '#ef4444' };

function masteryColor(m) {
  if (m >= 80) return '#22c55e';
  if (m >= 60) return '#3b82f6';
  if (m >= 50) return '#eab308';
  return '#ef4444';
}

export default function Concepts() {
  const navigate = useNavigate();
  const { concepts, updateMastery, checkAndUnlock } = useStudentStore();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [practicing, setPracticing] = useState(null);

  const filtered = concepts.filter(c => {
    const matchFilter = filter === 'all' || c.status === filter || (filter === 'weak' && c.mastery < 50);
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleRevise = (c) => {
    updateMastery(c.id, 5);
    if (c.mastery + 5 >= 80) checkAndUnlock('a4');
  };

  const handlePractice = (c) => {
    setPracticing(c.id);
    setTimeout(() => {
      updateMastery(c.id, 3);
      setPracticing(null);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/15 to-blue-500/15 border border-white/20 rounded-2xl p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Concepts</h1>
            <p className="text-gray-300 mt-1">Master each concept to unlock the next level</p>
          </div>
          <button onClick={() => navigate('/student/assessment')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-sm hover:scale-105 transition-all shadow-lg shadow-green-500/30">
            📝 Test Your Knowledge
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search concepts…"
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors flex-1 min-w-48" />
        {['all', 'mastered', 'in-progress', 'weak', 'locked'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border capitalize ${
              filter === f ? 'bg-blue-500/30 border-blue-400 text-blue-300' : 'bg-white/5 border-white/10 text-gray-400 hover:text-gray-200'
            }`}>
            {f}
          </button>
        ))}
      </div>

      {/* Concept grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(c => {
          const color = masteryColor(c.mastery);
          const isLocked = c.status === 'locked';
          const isPracticing = practicing === c.id;
          return (
            <div key={c.id} className={`backdrop-blur-xl rounded-2xl p-5 transition-all duration-200 ${isLocked ? 'opacity-60' : 'hover:scale-[1.01]'}`}
              style={{ background: `${color}12`, border: `1px solid ${color}44` }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-white font-bold">{c.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: `${diffColor[c.difficulty]}22`, color: diffColor[c.difficulty] }}>
                      {c.difficulty}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">{c.status.replace('-', ' ')}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black" style={{ color }}>{c.mastery}%</p>
                  {c.mastery >= 80 && <p className="text-green-400 text-xs">✅ Mastered</p>}
                  {c.mastery < 50 && !isLocked && <p className="text-red-400 text-xs">⚠ Needs work</p>}
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden mb-4">
                <div className="h-2.5 rounded-full transition-all duration-700" style={{ width: `${c.mastery}%`, background: color }} />
              </div>

              {/* Actions */}
              {!isLocked && (
                <div className="flex gap-2">
                  <button onClick={() => handleRevise(c)}
                    className="flex-1 py-2 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold hover:bg-blue-500/30 transition-all">
                    📖 Revise (+5%)
                  </button>
                  <button onClick={() => handlePractice(c)} disabled={isPracticing}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all border ${
                      isPracticing
                        ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300 animate-pulse'
                        : 'bg-green-500/20 border-green-500/30 text-green-300 hover:bg-green-500/30'
                    }`}>
                    {isPracticing ? '⏳ Practicing…' : '✏️ Practice (+3%)'}
                  </button>
                </div>
              )}
              {isLocked && (
                <div className="text-center py-2 text-gray-500 text-xs">🔒 Complete previous topics to unlock</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
