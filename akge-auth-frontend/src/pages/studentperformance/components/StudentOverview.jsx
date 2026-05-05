import React from 'react';

const statusStyle = {
  good:     { bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.4)',  text: '#86efac', badge: 'bg-green-500/20 text-green-300 border-green-500/30',  label: 'Good' },
  average:  { bg: 'rgba(234,179,8,0.10)',  border: 'rgba(234,179,8,0.4)',  text: '#fde047', badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', label: 'Average' },
  'at-risk':{ bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.4)',  text: '#fca5a5', badge: 'bg-red-500/20 text-red-300 border-red-500/30',          label: 'At-Risk' },
};

export default function StudentOverview({ student, overallMastery, lastScore, velocity, status, rank, totalStudents, percentile }) {
  const s = statusStyle[status] ?? statusStyle.average;

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      {/* Student identity */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/20 flex items-center justify-center text-3xl">
            {student.avatar}
          </div>
          <div>
            <h3 className="text-xl font-black text-white">{student.name}</h3>
            <p className="text-gray-400 text-sm">Grade {student.grade}</p>
          </div>
        </div>
        <span className={`px-3 py-1.5 rounded-xl text-sm font-bold border ${s.badge}`}>
          {s.label}
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="rounded-xl p-4 text-center" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
          <p className="text-xs text-gray-400 mb-1">Overall Mastery</p>
          <p className="text-3xl font-black" style={{ color: s.text }}>{overallMastery}%</p>
        </div>
        <div className="rounded-xl p-4 text-center bg-white/5 border border-white/10">
          <p className="text-xs text-gray-400 mb-1">Last Test Score</p>
          <p className="text-3xl font-black text-blue-400">{lastScore}%</p>
        </div>
        <div className="rounded-xl p-4 text-center bg-white/5 border border-white/10">
          <p className="text-xs text-gray-400 mb-1">Weekly Velocity</p>
          <p className={`text-3xl font-black ${velocity >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {velocity >= 0 ? '+' : ''}{velocity}%
          </p>
        </div>
      </div>

      {/* Rank */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏆</span>
          <div>
            <p className="text-white font-semibold text-sm">Class Rank</p>
            <p className="text-gray-400 text-xs">out of {totalStudents} students</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-yellow-400">#{rank}</p>
          <p className="text-xs text-gray-400">{percentile}th percentile</p>
        </div>
      </div>
    </div>
  );
}
