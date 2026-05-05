import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import useModuleStore from '../store/useModuleStore';
import { concepts } from '../data/moduleData';

const COLORS = ['#3b82f6','#22c55e','#eab308','#ef4444','#a855f7','#f97316','#06b6d4','#ec4899','#84cc16','#f59e0b'];

export default function SubjectSettings() {
  const { subjectConfig, updateSubject, saveSubjectConfig } = useModuleStore();
  const [saved, setSaved] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(subjectConfig[0]?.id ?? null);
  const [newSubjectName, setNewSubjectName] = useState('');

  const subject = subjectConfig.find(s => s.id === selectedSubject);

  // Weight chart for selected subject
  const weightData = subject
    ? subject.concepts.map((cId, i) => ({
        name: concepts.find(c => c.id === cId)?.name ?? cId,
        weight: concepts.find(c => c.id === cId)?.weight ?? 5,
        color: COLORS[i % COLORS.length],
      }))
    : [];

  const handleSave = () => {
    saveSubjectConfig(subjectConfig);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleConcept = (cId) => {
    if (!subject) return;
    const has = subject.concepts.includes(cId);
    updateSubject(subject.id, {
      concepts: has ? subject.concepts.filter(x => x !== cId) : [...subject.concepts, cId],
    });
  };

  const addSubject = () => {
    if (!newSubjectName.trim()) return;
    saveSubjectConfig([...subjectConfig, { id: `s_${Date.now()}`, name: newSubjectName.trim(), concepts: [], difficultyRule: 'adaptive' }]);
    setNewSubjectName('');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject list */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-base font-bold text-white mb-4">Subjects</h3>
          <div className="space-y-2 mb-4">
            {subjectConfig.map(s => (
              <button key={s.id} onClick={() => setSelectedSubject(s.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all border text-sm font-medium ${
                  selectedSubject === s.id
                    ? 'bg-blue-500/20 border-blue-400 text-blue-300'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                }`}>
                {s.name}
                <span className="text-gray-500 text-xs ml-2">({s.concepts.length} concepts)</span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newSubjectName} onChange={e => setNewSubjectName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addSubject()}
              placeholder="New subject…"
              className="flex-1 px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors" />
            <button onClick={addSubject}
              className="px-3 py-2 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold hover:bg-blue-500/30 transition-all">
              ➕
            </button>
          </div>
        </div>

        {/* Subject config */}
        <div className="lg:col-span-2 space-y-5">
          {subject ? (
            <>
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="text-base font-bold text-white mb-4">{subject.name} — Configuration</h3>
                <div className="mb-4">
                  <label className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2 block">Difficulty Rule</label>
                  <div className="flex gap-2">
                    {['adaptive', 'fixed'].map(r => (
                      <button key={r} onClick={() => updateSubject(subject.id, { difficultyRule: r })}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border capitalize ${
                          subject.difficultyRule === r
                            ? 'bg-blue-500/30 border-blue-400 text-blue-300'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:text-gray-200'
                        }`}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2 block">Mapped Concepts</label>
                  <div className="flex flex-wrap gap-2">
                    {concepts.map(c => (
                      <button key={c.id} onClick={() => toggleConcept(c.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                          subject.concepts.includes(c.id)
                            ? 'bg-green-500/20 border-green-400 text-green-300'
                            : 'bg-white/5 border-white/10 text-gray-500 hover:text-gray-300'
                        }`}>
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Weight chart */}
              {weightData.length > 0 && (
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
                  <h3 className="text-base font-bold text-white mb-3">Concept Weight Distribution</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={weightData} barCategoryGap="20%">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false}
                        angle={-15} textAnchor="end" height={40} />
                      <YAxis domain={[0, 12]} tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10 }}
                        labelStyle={{ color: '#f1f5f9' }} itemStyle={{ color: '#60a5fa' }} />
                      <Bar dataKey="weight" radius={[5, 5, 0, 0]} maxBarSize={50}>
                        {weightData.map((d, i) => <Cell key={i} fill={d.color} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </>
          ) : (
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <p className="text-gray-500">Select a subject to configure</p>
            </div>
          )}
        </div>
      </div>

      <button onClick={handleSave}
        className={`w-full py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
          saved
            ? 'bg-green-500/30 border border-green-500/50 text-green-300'
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white hover:shadow-lg hover:shadow-blue-500/30'
        }`}>
        {saved ? '✅ Saved!' : '💾 Save Subject Settings'}
      </button>
    </div>
  );
}
