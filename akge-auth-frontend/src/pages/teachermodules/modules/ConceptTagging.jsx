import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import useModuleStore from '../store/useModuleStore';

const TAG_COLORS = ['#3b82f6','#22c55e','#eab308','#ef4444','#a855f7','#f97316','#06b6d4','#ec4899','#84cc16','#f59e0b'];

export default function ConceptTagging() {
  const { tags, questions, questionTagMap, selectedTag, setSelectedTag, addTag, deleteTag, assignTag } = useModuleStore();
  const [newTagName, setNewTagName] = useState('');

  // Chart: questions per tag
  const chartData = tags.map((t, i) => ({
    name: t.name,
    id: t.id,
    count: Object.values(questionTagMap).filter(v => v === t.id).length,
    color: TAG_COLORS[i % TAG_COLORS.length],
  })).sort((a, b) => b.count - a.count);

  const filteredQuestions = selectedTag
    ? questions.filter(q => questionTagMap[q.id] === selectedTag)
    : questions;

  const handleAddTag = () => {
    if (!newTagName.trim()) return;
    addTag(newTagName.trim());
    setNewTagName('');
  };

  return (
    <div className="space-y-6">
      {/* Chart */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-1">Questions per Concept</h3>
        <p className="text-gray-400 text-sm mb-4">Click a bar to filter questions by concept</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} barCategoryGap="20%"
            onClick={d => d?.activePayload?.[0] && setSelectedTag(
              selectedTag === d.activePayload[0].payload.id ? null : d.activePayload[0].payload.id
            )}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false}
              angle={-15} textAnchor="end" height={40} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10 }}
              labelStyle={{ color: '#f1f5f9' }} itemStyle={{ color: '#60a5fa' }} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
            <Bar dataKey="count" radius={[5, 5, 0, 0]} cursor="pointer" maxBarSize={50}>
              {chartData.map((d, i) => (
                <Cell key={i} fill={d.color} fillOpacity={selectedTag === d.id ? 1 : 0.7}
                  stroke={selectedTag === d.id ? '#fff' : 'none'} strokeWidth={selectedTag === d.id ? 2 : 0} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tag management */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-base font-bold text-white mb-4">Manage Tags</h3>
          <div className="flex gap-2 mb-4">
            <input value={newTagName} onChange={e => setNewTagName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddTag()}
              placeholder="New tag name…"
              className="flex-1 px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors" />
            <button onClick={handleAddTag}
              className="px-3 py-2 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-semibold hover:bg-blue-500/30 transition-all">
              ➕
            </button>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {tags.map((t, i) => (
              <div key={t.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ background: TAG_COLORS[i % TAG_COLORS.length] }} />
                  <button onClick={() => setSelectedTag(selectedTag === t.id ? null : t.id)}
                    className={`text-sm font-medium transition-colors ${selectedTag === t.id ? 'text-blue-300' : 'text-gray-200 hover:text-white'}`}>
                    {t.name}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{Object.values(questionTagMap).filter(v => v === t.id).length}q</span>
                  <button onClick={() => deleteTag(t.id)}
                    className="text-gray-600 hover:text-red-400 transition-colors text-xs">✕</button>
                </div>
              </div>
            ))}
          </div>
          {selectedTag && (
            <button onClick={() => setSelectedTag(null)}
              className="mt-3 w-full py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-xs hover:text-white transition-all">
              Clear filter ✕
            </button>
          )}
        </div>

        {/* Questions with tag assignment */}
        <div className="lg:col-span-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-base font-bold text-white mb-1">
            {selectedTag ? `Questions tagged: ${tags.find(t => t.id === selectedTag)?.name}` : 'All Questions'}
          </h3>
          <p className="text-gray-400 text-xs mb-4">{filteredQuestions.length} questions · Use dropdown to reassign tag</p>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {filteredQuestions.map(q => (
              <div key={q.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                <p className="text-gray-200 text-sm flex-1 min-w-0 truncate">{q.text}</p>
                <select value={questionTagMap[q.id] ?? q.concept}
                  onChange={e => assignTag(q.id, e.target.value)}
                  className="shrink-0 px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-white text-xs focus:outline-none focus:border-blue-400 transition-colors">
                  {tags.map(t => <option key={t.id} value={t.id} style={{ background: '#1e293b' }}>{t.name}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
