import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import useModuleStore from '../store/useModuleStore';
import { concepts } from '../data/moduleData';

const diffColor = { Easy: '#22c55e', Medium: '#eab308', Hard: '#ef4444' };

export default function DifficultySystem() {
  const { questions, difficultyMap, setDifficulty, bulkSetDifficulty, autoAdjust, selectedQuestions, toggleSelectQ } = useModuleStore();
  const [bulkDiff, setBulkDiff] = useState('Medium');

  // Success rate vs difficulty histogram
  const diffStats = ['Easy', 'Medium', 'Hard'].map(d => {
    const qs = questions.filter(q => (difficultyMap[q.id] ?? q.difficulty) === d);
    const avg = qs.length ? Math.round(qs.reduce((s, q) => s + q.successRate, 0) / qs.length) : 0;
    return { difficulty: d, avgSuccess: avg, count: qs.length };
  });

  // Per-question success rate histogram
  const successData = [...questions]
    .sort((a, b) => a.successRate - b.successRate)
    .map(q => ({
      id: q.id,
      name: q.text.slice(0, 22) + '…',
      successRate: q.successRate,
      difficulty: difficultyMap[q.id] ?? q.difficulty,
    }));

  return (
    <div className="space-y-6">
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-base font-bold text-white mb-1">Avg Success Rate by Difficulty</h3>
          <p className="text-gray-400 text-xs mb-4">Higher success = concept may need harder questions</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={diffStats} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="difficulty" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10 }}
                labelStyle={{ color: '#f1f5f9' }} itemStyle={{ color: '#60a5fa' }} />
              <ReferenceLine y={70} stroke="#22c55e" strokeDasharray="4 4" label={{ value: 'Target', fill: '#22c55e', fontSize: 10 }} />
              <Bar dataKey="avgSuccess" radius={[5, 5, 0, 0]} maxBarSize={60}>
                {diffStats.map((d, i) => <Cell key={i} fill={diffColor[d.difficulty]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-base font-bold text-white mb-1">Question Success Rate Histogram</h3>
          <p className="text-gray-400 text-xs mb-4">Color = current difficulty assignment</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={successData} barCategoryGap="10%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" tick={false} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10 }}
                labelStyle={{ color: '#f1f5f9' }} itemStyle={{ color: '#60a5fa' }}
                formatter={(v, n, p) => [`${v}%`, `${p.payload.difficulty}`]} />
              <ReferenceLine y={50} stroke="#ef4444" strokeDasharray="4 4" />
              <Bar dataKey="successRate" radius={[3, 3, 0, 0]}>
                {successData.map((d, i) => <Cell key={i} fill={diffColor[d.difficulty]} fillOpacity={0.8} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bulk actions */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <h3 className="text-base font-bold text-white">Bulk Difficulty Update</h3>
          <div className="flex items-center gap-3">
            <select value={bulkDiff} onChange={e => setBulkDiff(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none">
              {['Easy','Medium','Hard'].map(d => <option key={d} value={d} style={{ background: '#1e293b' }}>{d}</option>)}
            </select>
            <button onClick={() => bulkSetDifficulty(selectedQuestions.length > 0 ? selectedQuestions : questions.map(q => q.id), bulkDiff)}
              className="px-4 py-2 rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-300 text-sm font-semibold hover:bg-orange-500/30 transition-all">
              Apply to {selectedQuestions.length > 0 ? `${selectedQuestions.length} selected` : 'all'}
            </button>
            <button onClick={autoAdjust}
              className="px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-semibold hover:bg-purple-500/30 transition-all">
              🤖 Auto-Adjust
            </button>
          </div>
        </div>
        <p className="text-gray-500 text-xs">Auto-Adjust sets difficulty based on success rate: &gt;80% → Hard, 55–80% → Medium, &lt;55% → Easy</p>
      </div>

      {/* Per-question difficulty table */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="text-base font-bold text-white mb-4">Per-Question Difficulty</h3>
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {questions.map(q => {
            const diff = difficultyMap[q.id] ?? q.difficulty;
            const isSelected = selectedQuestions.includes(q.id);
            return (
              <div key={q.id} className={`flex items-center gap-3 p-3 rounded-xl transition-all border ${
                isSelected ? 'bg-blue-500/10 border-blue-500/30' : 'bg-white/5 border-white/10 hover:bg-white/8'
              }`}>
                <input type="checkbox" checked={isSelected} onChange={() => toggleSelectQ(q.id)}
                  className="w-4 h-4 accent-blue-500 shrink-0" />
                <p className="text-gray-200 text-sm flex-1 min-w-0 truncate">{q.text}</p>
                <span className="text-xs text-gray-500 shrink-0">{q.successRate}% success</span>
                <select value={diff} onChange={e => setDifficulty(q.id, e.target.value)}
                  className="shrink-0 px-2 py-1 rounded-lg text-xs font-semibold focus:outline-none transition-colors"
                  style={{ background: `${diffColor[diff]}22`, color: diffColor[diff], border: `1px solid ${diffColor[diff]}44` }}>
                  {['Easy','Medium','Hard'].map(d => <option key={d} value={d} style={{ background: '#1e293b' }}>{d}</option>)}
                </select>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
