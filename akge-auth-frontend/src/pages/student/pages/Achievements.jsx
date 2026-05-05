import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import useStudentStore from '../store/useStudentStore';

const XP_LEVELS = [0, 200, 500, 900, 1400, 2000, 2700, 3500, 4400, 5400];

export default function Achievements() {
  const { achievements, profile, checkAndUnlock } = useStudentStore();
  const [filter, setFilter] = useState('all');

  const unlocked = achievements.filter(a => a.unlocked);
  const locked   = achievements.filter(a => !a.unlocked);
  const totalXP  = unlocked.reduce((s, a) => s + a.xp, 0);

  const nextLevel = XP_LEVELS[profile.level] ?? 9999;
  const prevLevel = XP_LEVELS[profile.level - 1] ?? 0;
  const levelProgress = Math.round(((profile.xp - prevLevel) / (nextLevel - prevLevel)) * 100);

  const filtered = filter === 'all' ? achievements : filter === 'unlocked' ? unlocked : locked;

  // XP chart
  const xpData = [
    { label: 'Earned', value: totalXP, color: '#f59e0b' },
    { label: 'Remaining', value: Math.max(0, nextLevel - profile.xp), color: '#334155' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-yellow-500/15 to-orange-500/15 border border-white/20 rounded-2xl p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Achievements</h1>
            <p className="text-gray-300 mt-1">{unlocked.length} of {achievements.length} badges earned</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-black text-yellow-400">Lv.{profile.level}</p>
            <p className="text-gray-400 text-sm">{profile.xp} XP total</p>
          </div>
        </div>

        {/* Level progress */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1.5">
            <span>Level {profile.level}</span>
            <span>{profile.xp} / {nextLevel} XP</span>
            <span>Level {profile.level + 1}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
            <div className="h-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-700 flex items-center justify-end pr-2"
              style={{ width: `${levelProgress}%` }}>
              {levelProgress > 20 && <span className="text-xs font-bold text-white">{levelProgress}%</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Badges Earned', value: unlocked.length, color: '#f59e0b', icon: '🏅' },
          { label: 'Total XP',      value: profile.xp,      color: '#22c55e', icon: '⚡' },
          { label: 'Day Streak',    value: `${profile.streak}d`, color: '#ef4444', icon: '🔥' },
        ].map(s => (
          <div key={s.label} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <span className="text-2xl">{s.icon}</span>
            <p className="text-2xl font-black mt-1" style={{ color: s.color }}>{s.value}</p>
            <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* XP chart */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="text-base font-bold text-white mb-3">XP Progress to Next Level</h3>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={xpData} layout="vertical" barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
            <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="label" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={70} />
            <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10 }}
              labelStyle={{ color: '#f1f5f9' }} itemStyle={{ color: '#f59e0b' }} />
            <Bar dataKey="value" radius={[0, 5, 5, 0]} maxBarSize={28}>
              {xpData.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {['all', 'unlocked', 'locked'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border capitalize ${
              filter === f ? 'bg-yellow-500/30 border-yellow-400 text-yellow-300' : 'bg-white/5 border-white/10 text-gray-400 hover:text-gray-200'
            }`}>
            {f} {f === 'unlocked' ? `(${unlocked.length})` : f === 'locked' ? `(${locked.length})` : `(${achievements.length})`}
          </button>
        ))}
      </div>

      {/* Badge grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filtered.map(a => (
          <div key={a.id}
            className={`backdrop-blur-xl rounded-2xl p-4 text-center transition-all duration-200 border ${
              a.unlocked
                ? 'bg-yellow-500/10 border-yellow-500/30 hover:scale-105 cursor-default'
                : 'bg-white/5 border-white/10 opacity-50'
            }`}>
            <span className={`text-4xl block mb-2 ${!a.unlocked ? 'grayscale' : ''}`}>{a.icon}</span>
            <p className={`text-sm font-bold ${a.unlocked ? 'text-white' : 'text-gray-500'}`}>{a.title}</p>
            <p className="text-gray-500 text-xs mt-1 leading-tight">{a.desc}</p>
            <p className={`text-xs font-bold mt-2 ${a.unlocked ? 'text-yellow-400' : 'text-gray-600'}`}>
              {a.unlocked ? `+${a.xp} XP ✓` : `${a.xp} XP 🔒`}
            </p>
          </div>
        ))}
      </div>

      {/* Demo unlock button */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4">
        <p className="text-gray-400 text-xs mb-3">Demo: Manually unlock achievements</p>
        <div className="flex flex-wrap gap-2">
          {locked.slice(0, 3).map(a => (
            <button key={a.id} onClick={() => checkAndUnlock(a.id)}
              className="px-3 py-1.5 rounded-lg bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-xs font-semibold hover:bg-yellow-500/30 transition-all">
              🔓 Unlock "{a.title}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
