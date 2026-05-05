import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, ReferenceLine } from 'recharts';
import useStudentStore from '../store/useStudentStore';
import { weeklyProgress } from '../data/studentData';

function masteryColor(m) {
  if (m >= 80) return '#22c55e';
  if (m >= 60) return '#3b82f6';
  if (m >= 50) return '#eab308';
  return '#ef4444';
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const color = masteryColor(d.mastery);
  return (
    <div className="backdrop-blur-xl bg-slate-900/95 border border-white/20 rounded-xl p-3 text-sm">
      <p className="text-white font-bold">{d.name}</p>
      <p style={{ color }} className="font-semibold">{d.mastery}%</p>
      <p className="text-gray-400 text-xs capitalize">{d.status?.replace('-', ' ')}</p>
    </div>
  );
};

export default function Mastery() {
  const navigate = useNavigate();
  const { concepts } = useStudentStore();

  const overall = Math.round(concepts.reduce((s, c) => s + c.mastery, 0) / concepts.length);
  const strengths = concepts.filter(c => c.mastery >= 75).sort((a, b) => b.mastery - a.mastery);
  const weaknesses = concepts.filter(c => c.mastery < 60).sort((a, b) => a.mastery - b.mastery);

  const insight = overall >= 75
    ? `🚀 Excellent! You're mastering ${strengths.length} concepts. Focus on ${weaknesses[0]?.name ?? 'remaining topics'} next.`
    : overall >= 60
    ? `📈 Good progress! ${weaknesses.length} concepts need attention. Keep practicing daily.`
    : `💪 Keep going! Consistent practice will improve your scores. Start with ${weaknesses[0]?.name ?? 'basics'}.`;

  return (
    <div className="space-y-6">
      <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/15 border border-white/20 rounded-2xl p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Mastery Score</h1>
            <p className="text-gray-300 mt-1">{insight}</p>
          </div>
          <div className="text-right">
            <p className="text-5xl font-black" style={{ color: masteryColor(overall) }}>{overall}%</p>
            <p className="text-gray-400 text-sm">Overall Mastery</p>
          </div>
        </div>
      </div>

      {/* Concept bar chart */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Concept-wise Mastery</h3>
          <button onClick={() => navigate('/student/concepts')}
            className="px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold hover:bg-blue-500/30 transition-all">
            Practice Weak Concepts →
          </button>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={concepts} barCategoryGap="18%"
            onClick={d => d?.activePayload?.[0] && navigate('/student/concepts')}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false}
              angle={-15} textAnchor="end" height={44} />
            <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
            <ReferenceLine y={50} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Weak', fill: '#ef4444', fontSize: 10 }} />
            <ReferenceLine y={80} stroke="#22c55e" strokeDasharray="4 4" label={{ value: 'Mastered', fill: '#22c55e', fontSize: 10 }} />
            <Bar dataKey="mastery" radius={[5, 5, 0, 0]} cursor="pointer" maxBarSize={50}>
              {concepts.map((c, i) => <Cell key={i} fill={masteryColor(c.mastery)} fillOpacity={0.85} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Trend + Strengths/Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Improvement Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[55, 80]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10 }}
                labelStyle={{ color: '#94a3b8' }} itemStyle={{ color: '#60a5fa' }} />
              <ReferenceLine y={70} stroke="#22c55e" strokeDasharray="4 4" label={{ value: 'Target', fill: '#22c55e', fontSize: 10 }} />
              <Line type="monotone" dataKey="mastery" stroke="#3b82f6" strokeWidth={2.5}
                dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {/* Strengths */}
          <div className="backdrop-blur-xl bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
            <h3 className="text-base font-bold text-white mb-3">💪 Strengths</h3>
            <div className="space-y-2">
              {strengths.slice(0, 3).map(c => (
                <div key={c.id} className="flex items-center justify-between">
                  <span className="text-gray-200 text-sm">{c.name}</span>
                  <span className="text-green-400 font-bold text-sm">{c.mastery}%</span>
                </div>
              ))}
              {strengths.length === 0 && <p className="text-gray-500 text-sm">Keep practicing to build strengths!</p>}
            </div>
          </div>

          {/* Weaknesses */}
          <div className="backdrop-blur-xl bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
            <h3 className="text-base font-bold text-white mb-3">⚠️ Needs Work</h3>
            <div className="space-y-2">
              {weaknesses.slice(0, 3).map(c => (
                <div key={c.id} className="flex items-center justify-between">
                  <span className="text-gray-200 text-sm">{c.name}</span>
                  <span className="text-red-400 font-bold text-sm">{c.mastery}%</span>
                </div>
              ))}
              {weaknesses.length === 0 && <p className="text-green-300 text-sm">🎉 No weak concepts!</p>}
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => navigate('/student/achievements')}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold transition-all hover:shadow-lg hover:shadow-yellow-500/30">
        🏆 View Achievements →
      </button>
    </div>
  );
}
