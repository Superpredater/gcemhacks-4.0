import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useFQStore from '../store/useFQStore';

const XP_LEVELS = [0, 300, 700, 1300, 2000, 3000, 4200, 5600, 7200, 9000];

export default function FQAchievements() {
  const { achievements, totalXP, streak, sessionsPlayed, completeSession, conceptId } = useFQStore();
  const [filter, setFilter] = useState('all');

  const unlocked = achievements.filter(a => a.unlocked);
  const locked   = achievements.filter(a => !a.unlocked);
  const level = XP_LEVELS.findIndex((v, i) => totalXP >= v && (XP_LEVELS[i + 1] === undefined || totalXP < XP_LEVELS[i + 1]));
  const nextLevelXP = XP_LEVELS[level + 1] ?? 9999;
  const prevLevelXP = XP_LEVELS[level] ?? 0;
  const levelPct = Math.round(((totalXP - prevLevelXP) / (nextLevelXP - prevLevelXP)) * 100);

  const filtered = filter === 'all' ? achievements : filter === 'unlocked' ? unlocked : locked;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 border border-white/10"
        style={{ background: 'linear-gradient(135deg, rgba(234,179,8,0.15), rgba(249,115,22,0.1))' }}>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Achievements 🏆</h1>
            <p className="text-white/50 mt-1 text-sm">{unlocked.length} of {achievements.length} badges earned</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black text-yellow-400">Lv.{level + 1}</p>
            <p className="text-white/40 text-sm">{totalXP} XP</p>
          </div>
        </div>

        {/* Level bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-white/40 mb-1.5">
            <span>Level {level + 1}</span>
            <span>{totalXP} / {nextLevelXP} XP</span>
            <span>Level {level + 2}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <motion.div className="h-3 rounded-full" animate={{ width: `${levelPct}%` }} transition={{ duration: 0.8 }}
              style={{ background: 'linear-gradient(90deg, #eab308, #f97316)', boxShadow: '0 0 8px rgba(234,179,8,0.5)' }} />
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Badges',   value: unlocked.length, icon: '🏅', color: '#eab308' },
          { label: 'Sessions', value: sessionsPlayed,   icon: '🎯', color: '#8b5cf6' },
          { label: 'Streak',   value: `${streak}d`,    icon: '🔥', color: '#ef4444' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-4 text-center border border-white/10" style={{ background: `${s.color}12` }}>
            <span className="text-2xl">{s.icon}</span>
            <p className="text-2xl font-black mt-1" style={{ color: s.color }}>{s.value}</p>
            <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {['all', 'unlocked', 'locked'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-xl text-xs font-semibold transition-all border capitalize"
            style={{
              background: filter === f ? 'rgba(234,179,8,0.2)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${filter === f ? 'rgba(234,179,8,0.5)' : 'rgba(255,255,255,0.1)'}`,
              color: filter === f ? '#fde047' : '#64748b',
            }}>
            {f} {f === 'unlocked' ? `(${unlocked.length})` : f === 'locked' ? `(${locked.length})` : `(${achievements.length})`}
          </button>
        ))}
      </div>

      {/* Badge grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((a, i) => (
          <motion.div key={a.id}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
            className="rounded-2xl p-5 text-center border transition-all"
            style={{
              background: a.unlocked ? 'rgba(234,179,8,0.1)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${a.unlocked ? 'rgba(234,179,8,0.4)' : 'rgba(255,255,255,0.08)'}`,
              opacity: a.unlocked ? 1 : 0.5,
              boxShadow: a.unlocked ? '0 0 16px rgba(234,179,8,0.15)' : 'none',
            }}>
            <span className="text-4xl block mb-2" style={{ filter: a.unlocked ? 'none' : 'grayscale(1)' }}>{a.icon}</span>
            <p className={`text-sm font-bold ${a.unlocked ? 'text-white' : 'text-white/30'}`}>{a.title}</p>
            <p className="text-white/30 text-xs mt-1 leading-tight">{a.desc}</p>
            <p className={`text-xs font-bold mt-2 ${a.unlocked ? 'text-yellow-400' : 'text-white/20'}`}>
              {a.unlocked ? `+${a.xp} XP ✓` : `${a.xp} XP 🔒`}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Demo unlock */}
      {locked.length > 0 && (
        <div className="rounded-2xl p-4 border border-white/10" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <p className="text-white/30 text-xs mb-3">Demo: Unlock achievements</p>
          <div className="flex flex-wrap gap-2">
            {locked.slice(0, 3).map(a => (
              <button key={a.id}
                onClick={() => useFQStore.getState().completeSession({ conceptId: 'fq1', focusGained: 85, masteryGain: 5, xpGained: 50, perfect: a.id === 'fqa6', noHints: a.id === 'fqa3' })}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 transition-all"
                style={{ background: 'rgba(234,179,8,0.08)' }}>
                🔓 Unlock "{a.title}"
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
