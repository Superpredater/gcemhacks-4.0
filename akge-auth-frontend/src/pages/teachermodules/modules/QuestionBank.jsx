import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import useModuleStore from '../store/useModuleStore';
import { concepts } from '../data/moduleData';

const diffColor = { Easy: '#22c55e', Medium: '#eab308', Hard: '#ef4444' };

const EMPTY_FORM = { text: '', concept: 'c1', difficulty: 'Medium' };

export default function QuestionBank() {
  const {
    questions, qSearch, qFilterConcept, qFilterDiff,
    setQSearch, setQFilterConcept, setQFilterDiff,
    addQuestion, editQuestion, deleteQuestion,
    selectedQuestions, toggleSelectQ,
    difficultyMap, bulkSetDifficulty,
  } = useModuleStore();

  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Filtered list
  const filtered = questions.filter(q => {
    const matchSearch = q.text.toLowerCase().includes(qSearch.toLowerCase());
    const matchConcept = qFilterConcept === 'all' || q.concept === qFilterConcept;
    const matchDiff = qFilterDiff === 'all' || (difficultyMap[q.id] ?? q.difficulty) === qFilterDiff;
    return matchSearch && matchConcept && matchDiff;
  });

  // Chart data
  const diffDist = ['Easy', 'Medium', 'Hard'].map(d => ({
    difficulty: d,
    count: questions.filter(q => (difficultyMap[q.id] ?? q.difficulty) === d).length,
  }));

  const successBuckets = [
    { range: '0–30%',  count: questions.filter(q => q.successRate <= 30).length },
    { range: '31–50%', count: questions.filter(q => q.successRate > 30 && q.successRate <= 50).length },
    { range: '51–70%', count: questions.filter(q => q.successRate > 50 && q.successRate <= 70).length },
    { range: '71–90%', count: questions.filter(q => q.successRate > 70 && q.successRate <= 90).length },
    { range: '91–100%',count: questions.filter(q => q.successRate > 90).length },
  ];

  const handleSubmit = () => {
    if (!form.text.trim()) return;
    if (editId) { editQuestion(editId, form); setEditId(null); }
    else addQuestion(form);
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  const startEdit = (q) => {
    setForm({ text: q.text, concept: q.concept, difficulty: q.difficulty });
    setEditId(q.id);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-base font-bold text-white mb-3">Difficulty Distribution</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={diffDist} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="difficulty" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10 }}
                labelStyle={{ color: '#f1f5f9' }} itemStyle={{ color: '#60a5fa' }} />
              <Bar dataKey="count" radius={[5, 5, 0, 0]} maxBarSize={50}>
                {diffDist.map((d, i) => <Cell key={i} fill={diffColor[d.difficulty]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-base font-bold text-white mb-3">Success Rate Histogram</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={successBuckets} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="range" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10 }}
                labelStyle={{ color: '#f1f5f9' }} itemStyle={{ color: '#60a5fa' }} />
              <Bar dataKey="count" radius={[5, 5, 0, 0]} fill="#3b82f6" maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <input value={qSearch} onChange={e => setQSearch(e.target.value)} placeholder="Search questions…"
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors flex-1 min-w-48" />
        <select value={qFilterConcept} onChange={e => setQFilterConcept(e.target.value)}
          className="px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none">
          <option value="all" style={{ background: '#1e293b' }}>All Concepts</option>
          {concepts.map(c => <option key={c.id} value={c.id} style={{ background: '#1e293b' }}>{c.name}</option>)}
        </select>
        <select value={qFilterDiff} onChange={e => setQFilterDiff(e.target.value)}
          className="px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none">
          <option value="all" style={{ background: '#1e293b' }}>All Difficulties</option>
          {['Easy','Medium','Hard'].map(d => <option key={d} value={d} style={{ background: '#1e293b' }}>{d}</option>)}
        </select>
        {selectedQuestions.length > 0 && (
          <>
            <button onClick={() => bulkSetDifficulty(selectedQuestions, 'Easy')}
              className="px-3 py-2 rounded-xl bg-green-500/20 border border-green-500/30 text-green-300 text-xs font-semibold hover:bg-green-500/30 transition-all">
              Bulk → Easy
            </button>
            <button onClick={() => bulkSetDifficulty(selectedQuestions, 'Hard')}
              className="px-3 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold hover:bg-red-500/30 transition-all">
              Bulk → Hard
            </button>
          </>
        )}
        <button onClick={() => { setShowForm(v => !v); setEditId(null); setForm(EMPTY_FORM); }}
          className="px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-semibold hover:bg-blue-500/30 transition-all">
          {showForm ? '✕ Cancel' : '➕ Add Question'}
        </button>
      </div>

      {/* Add/Edit form */}
      {showForm && (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-base font-bold text-white mb-4">{editId ? 'Edit Question' : 'Add New Question'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <input value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
              placeholder="Question text…" className="md:col-span-3 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors" />
            <select value={form.concept} onChange={e => setForm(f => ({ ...f, concept: e.target.value }))}
              className="px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none">
              {concepts.map(c => <option key={c.id} value={c.id} style={{ background: '#1e293b' }}>{c.name}</option>)}
            </select>
            <select value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value }))}
              className="px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none">
              {['Easy','Medium','Hard'].map(d => <option key={d} value={d} style={{ background: '#1e293b' }}>{d}</option>)}
            </select>
            <button onClick={handleSubmit}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-sm hover:from-blue-600 hover:to-indigo-700 transition-all">
              {editId ? '💾 Save Changes' : '➕ Add'}
            </button>
          </div>
        </div>
      )}

      {/* Question list */}
      <div className="space-y-2">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">{filtered.length} questions</p>
        {filtered.map(q => {
          const diff = difficultyMap[q.id] ?? q.difficulty;
          const conceptName = concepts.find(c => c.id === q.concept)?.name ?? q.concept;
          const isSelected = selectedQuestions.includes(q.id);
          return (
            <div key={q.id} className={`flex items-start gap-3 p-4 rounded-xl transition-all border ${
              isSelected ? 'bg-blue-500/10 border-blue-500/30' : 'bg-white/5 border-white/10 hover:bg-white/8'
            }`}>
              <input type="checkbox" checked={isSelected} onChange={() => toggleSelectQ(q.id)}
                className="mt-1 w-4 h-4 accent-blue-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-gray-200 text-sm">{q.text}</p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">{conceptName}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: `${diffColor[diff]}22`, color: diffColor[diff] }}>{diff}</span>
                  <span className="text-xs text-gray-500">✓ {q.successRate}% success</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(q)} className="px-2.5 py-1.5 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold hover:bg-blue-500/30 transition-all">Edit</button>
                <button onClick={() => deleteQuestion(q.id)} className="px-2.5 py-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold hover:bg-red-500/30 transition-all">Delete</button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <p className="text-center py-8 text-gray-500">No questions match your filter</p>}
      </div>
    </div>
  );
}
