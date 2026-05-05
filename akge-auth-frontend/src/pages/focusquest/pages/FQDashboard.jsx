import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import useFQStore from '../store/useFQStore';
import { weeklyFocusTrend, fqConcepts } from '../data/fqData';

const card = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

export default function FQDashboard() {
  const navigate = useNavigate();
  const { focusScore, streak, totalXP, sessionsPlayed, getOverallMastery, concepts } = useFQStore();
  const overall = getOverallMastery();
  const nextConcept = concepts.find(c => c.unlocked && c.mastery < 80);
  const recentZones = concepts.filter(c => c.mastery > 0).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div {...card} className="rounded-2xl p-6 border border-white/10"
        style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.15))' }}>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Welcome to Focus Quest 🎯</h1>
            <p className="text-purple-200 mt-1 text-sm">Your calm, focused learning journey continues</p>
            {nextConcept && (
              <p className="text-white/60 text-sm mt-2">
                Next recommended: <span className="text-purple-300 font-semibold">{nextConcept.zone}</span>
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-4xl font-black text-purple-300">{focusScore}%</p>
            <p className="text-white/50 text-sm">Focus Score</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Overall Mastery', value: `${overall}%`, icon: '📊', color: '#3b82f6' },
          { label: 'Focus Score',     value: `${focusScore}%`, icon: '🎯', color: '#8b5cf6' },
          { label: 'Streak',          value: `${streak}d`,  icon: '🔥', color: '#f97316' },
          { label: 'Total XP',        value: totalXP,       icon: '⚡', color: '#eab308' },
        ].map((s, i) => (
          <motion.div key={s.label} {...card} transition={{ delay: i * 0.08 }}
            className="rounded-2xl p-5 border border-white/10"
            style={{ background: `${s.color}18` }}>
            <span className="text-2xl">{s.icon}</span>
            <p className="text-3xl font-black mt-2" style={{ color: s.color }}>{s.value}</p>
            <p className="text-white/40 text-xs mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Focus trend */}
        <motion.div {...card} transition={{ delay: 0.2 }} className="rounded-2xl p-6 border border-white/10"
          style={{ background: 'rgba(255,255,255,0.04)' }}>
          <h3 className="text-base font-bold text-white mb-4">Weekly Focus & Mastery Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyFocusTrend}>
              <defs>
                <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="masteryGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[55, 90]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10 }}
                labelStyle={{ color: '#94a3b8' }} />
              <Area type="monotone" dataKey="focus" stroke="#8b5cf6" strokeWidth={2} fill="url(#focusGrad)" name="Focus" dot={{ r: 3, fill: '#8b5cf6', strokeWidth: 0 }} />
              <Area type="monotone" dataKey="mastery" stroke="#3b82f6" strokeWidth={2} fill="url(#masteryGrad2)" name="Mastery" dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent zones */}
        <motion.div {...card} transition={{ delay: 0.3 }} className="rounded-2xl p-6 border border-white/10"
          style={{ background: 'rgba(255,255,255,0.04)' }}>
          <h3 className="text-base font-bold text-white mb-4">Recent Zones</h3>
          <div className="space-y-3">
            {recentZones.map(c => (
              <button key={c.id} onClick={() => navigate(`/student/fq/game/${c.id}`)}
                className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all text-left"
                style={{ background: `${c.color}12` }}>
                <span className="text-2xl">{c.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm">{c.zone}</p>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mt-1.5 overflow-hidden">
                    <div className="h-1.5 rounded-full transition-all duration-700" style={{ width: `${c.mastery}%`, background: c.color }} />
                  </div>
                </div>
                <span className="text-sm font-bold shrink-0" style={{ color: c.color }}>{c.mastery}%</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.button {...card} transition={{ delay: 0.4 }}
        onClick={() => navigate('/student/fq/map')}
        className="w-full py-4 rounded-2xl font-black text-lg text-white transition-all hover:scale-[1.01]"
        style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', boxShadow: '0 0 24px rgba(139,92,246,0.4)' }}>
        🗺️ Continue Learning Journey
      </motion.button>
    </div>
  );
}
