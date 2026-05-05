import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, ReferenceLine } from 'recharts';
import useParentStore from '../store/useParentStore';
import { weeklyProgress } from '../data/parentData';

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
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <p style={{ color: '#334155', fontWeight: 700, fontSize: 13 }}>{d.name}</p>
      <p style={{ color, fontWeight: 800, fontSize: 16 }}>{d.mastery}%</p>
      <p style={{ color: '#94a3b8', fontSize: 11, textTransform: 'capitalize' }}>{d.status}</p>
    </div>
  );
};

export default function Mastery() {
  const navigate = useNavigate();
  const { concepts, getOverallMastery } = useParentStore();

  const overall = getOverallMastery();
  const strengths = concepts.filter(c => c.mastery >= 75).sort((a, b) => b.mastery - a.mastery);
  const weaknesses = concepts.filter(c => c.mastery < 60).sort((a, b) => a.mastery - b.mastery);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800">Mastery Progress</h1>
            <p className="text-slate-500 mt-1 text-sm">Concept-wise performance and improvement trends</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-black text-blue-600">{overall}%</p>
            <p className="text-slate-400 text-sm">Overall Mastery</p>
          </div>
        </div>
      </div>

      {/* Concept bar chart */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-800">Concept-wise Mastery</h3>
          <button onClick={() => navigate('/parent/weak-areas')}
            className="px-4 py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-100 transition-all">
            View Weak Areas →
          </button>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={concepts} barCategoryGap="18%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false}
              angle={-15} textAnchor="end" height={44} />
            <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
            <ReferenceLine y={50} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Needs work', fill: '#ef4444', fontSize: 10 }} />
            <ReferenceLine y={80} stroke="#22c55e" strokeDasharray="4 4" label={{ value: 'Strong', fill: '#22c55e', fontSize: 10 }} />
            <Bar dataKey="mastery" radius={[5, 5, 0, 0]} maxBarSize={50}>
              {concepts.map((c, i) => <Cell key={i} fill={masteryColor(c.mastery)} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Trend + Strengths/Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-4">Improvement Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[55, 80]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10 }}
                labelStyle={{ color: '#64748b' }} itemStyle={{ color: '#3b82f6' }} />
              <ReferenceLine y={70} stroke="#22c55e" strokeDasharray="4 4" label={{ value: 'Target', fill: '#22c55e', fontSize: 10 }} />
              <Line type="monotone" dataKey="mastery" stroke="#3b82f6" strokeWidth={2.5}
                dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-slate-700 mb-3">💪 Strengths</h3>
            <div className="space-y-2">
              {strengths.slice(0, 3).map(c => (
                <div key={c.id} className="flex items-center justify-between">
                  <span className="text-slate-600 text-sm">{c.name}</span>
                  <span className="text-green-600 font-bold text-sm">{c.mastery}%</span>
                </div>
              ))}
              {strengths.length === 0 && <p className="text-slate-400 text-sm">Keep practicing to build strengths!</p>}
            </div>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-slate-700 mb-3">⚠️ Needs Attention</h3>
            <div className="space-y-2">
              {weaknesses.slice(0, 3).map(c => (
                <div key={c.id} className="flex items-center justify-between">
                  <span className="text-slate-600 text-sm">{c.name}</span>
                  <span className="text-red-500 font-bold text-sm">{c.mastery}%</span>
                </div>
              ))}
              {weaknesses.length === 0 && <p className="text-green-600 text-sm">🎉 No weak concepts!</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
