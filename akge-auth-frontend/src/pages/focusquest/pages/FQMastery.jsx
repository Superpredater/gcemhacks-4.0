import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';
import useFQStore from '../store/useFQStore';
import { weeklyFocusTrend } from '../data/fqData';

function masteryColor(m) {
  if (m >= 80) return '#22c55e';
  if (m >= 60) return '#3b82f6';
  if (m >= 40) return '#eab308';
  return '#ef4444';
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '10px 14px' }}>
      <p style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 13 }}>{d.zone}</p>
      <p style={{ color: masteryColor(d.mastery), fontWeight: 800, fontSize: 16 }}>{d.mastery}%</p>
    </div>
  );
};

export default function FQMastery() {
  const navigate = useNavigate();
  const { concepts, focusScore, getOverallMastery } = useFQStore();
  const overall = getOverallMastery();
  const strengths = concepts.filter(c => c.mastery >= 75 && c.unlocked).sort((a, b) => b.mastery - a.mastery);
  const weaknesses = concepts.filter(c => c.mastery < 60 && c.unlocked).sort((a, b) => a.mastery - b.mastery);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 border border-white/10"
        style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.1))' }}>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Mastery Score 📊</h1>
            <p className="text-white/50 mt-1 text-sm">Your concept mastery powered by Focus Quest</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-black text-blue-400">{overall}%</p>
            <p className="text-white/40 text-sm">Overall Mastery</p>
            <p className="text-purple-300 text-sm font-semibold mt-1">🎯 Focus: {focusScore}%</p>
          </div>
        </div>
      </motion.div>

      {/* Zone mastery chart */}
      <div className="rounded-2xl p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white">Zone Mastery</h3>
          <button onClick={() => navigate('/student/fq/map')}
            className="px-4 py-2 rounded-xl text-xs font-semibold border border-white/20 text-white/60 hover:bg-white/10 transition-all">
            Practice Weak Zones →
          </button>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={concepts.filter(c => c.unlocked)} barCategoryGap="18%"
            onClick={d => d?.activePayload?.[0] && navigate(`/student/fq/game/${d.activePayload[0].payload.id}`)}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="zone" tick={{ fill: '#64748b', fontSize: 9 }} axisLine={false} tickLine={false}
              angle={-15} textAnchor="end" height={44} />
            <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
            <ReferenceLine y={50} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Needs work', fill: '#ef4444', fontSize: 9 }} />
            <ReferenceLine y={80} stroke="#22c55e" strokeDasharray="4 4" label={{ value: 'Mastered', fill: '#22c55e', fontSize: 9 }} />
            <Bar dataKey="mastery" radius={[5, 5, 0, 0]} cursor="pointer" maxBarSize={50}>
              {concepts.filter(c => c.unlocked).map((c, i) => <Cell key={i} fill={masteryColor(c.mastery)} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Trend + Strengths/Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <h3 className="text-base font-bold text-white mb-4">Focus & Mastery Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyFocusTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[55, 90]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10 }}
                labelStyle={{ color: '#94a3b8' }} />
              <ReferenceLine y={70} stroke="#22c55e" strokeDasharray="4 4" />
              <Line type="monotone" dataKey="focus" stroke="#8b5cf6" strokeWidth={2.5} name="Focus"
                dot={{ r: 3, fill: '#8b5cf6', strokeWidth: 0 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="mastery" stroke="#3b82f6" strokeWidth={2.5} name="Mastery"
                dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl p-5 border border-green-500/20" style={{ background: 'rgba(34,197,94,0.08)' }}>
            <h3 className="text-sm font-bold text-white mb-3">💪 Strong Zones</h3>
            {strengths.slice(0, 3).map(c => (
              <div key={c.id} className="flex items-center justify-between py-1.5">
                <span className="text-white/70 text-sm">{c.emoji} {c.zone}</span>
                <span className="text-green-400 font-bold text-sm">{c.mastery}%</span>
              </div>
            ))}
            {strengths.length === 0 && <p className="text-white/30 text-sm">Keep practicing to build strengths!</p>}
          </div>
          <div className="rounded-2xl p-5 border border-red-500/20" style={{ background: 'rgba(239,68,68,0.08)' }}>
            <h3 className="text-sm font-bold text-white mb-3">⚠️ Needs Focus</h3>
            {weaknesses.slice(0, 3).map(c => (
              <div key={c.id} className="flex items-center justify-between py-1.5">
                <span className="text-white/70 text-sm">{c.emoji} {c.zone}</span>
                <span className="text-red-400 font-bold text-sm">{c.mastery}%</span>
              </div>
            ))}
            {weaknesses.length === 0 && <p className="text-green-400 text-sm">🎉 All zones strong!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
