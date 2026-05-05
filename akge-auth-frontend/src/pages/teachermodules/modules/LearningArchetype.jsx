import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import useModuleStore from '../store/useModuleStore';

const ARCHETYPE_COLORS = {
  'Fast Consistent':  '#22c55e',
  'Fast Careless':    '#eab308',
  'Slow Consistent':  '#3b82f6',
  'Average':          '#a855f7',
  'Struggling':       '#ef4444',
};

const ARCHETYPE_DESC = {
  'Fast Consistent':  { icon: '🚀', desc: 'High performance with consistent effort. Ready for advanced challenges.', action: 'Assign enrichment problems and leadership roles.' },
  'Fast Careless':    { icon: '⚡', desc: 'High ability but inconsistent effort. Needs focus on accuracy.', action: 'Introduce timed accuracy challenges and self-checking habits.' },
  'Slow Consistent':  { icon: '📘', desc: 'Steady progress with regular effort. Benefits from structured practice.', action: 'Maintain consistent schedules with spaced repetition.' },
  'Average':          { icon: '📊', desc: 'Moderate performance. Room for improvement with targeted support.', action: 'Targeted practice on weak concepts with regular feedback.' },
  'Struggling':       { icon: '🆘', desc: 'Critical intervention needed. Multiple weak areas detected.', action: 'Immediate 1-on-1 sessions, foundational review, parent contact.' },
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="backdrop-blur-xl bg-slate-900/95 border border-white/20 rounded-xl p-3 text-sm">
      <p className="text-white font-bold">{d.archetype}</p>
      <p style={{ color: d.color }} className="font-semibold">{d.count} students</p>
      <p className="text-gray-400 text-xs mt-1">Click to see list</p>
    </div>
  );
};

export default function LearningArchetype() {
  const { archetypes, selectedArchetype, setSelectedArchetype } = useModuleStore();

  const chartData = Object.entries(archetypes).map(([archetype, list]) => ({
    archetype, count: list.length, color: ARCHETYPE_COLORS[archetype] ?? '#6b7280',
  })).sort((a, b) => b.count - a.count);

  const selected = selectedArchetype;
  const students = selected ? (archetypes[selected] ?? []) : [];
  const info = selected ? ARCHETYPE_DESC[selected] : null;

  return (
    <div className="space-y-6">
      {/* Bar chart */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-1">Learning Archetype Distribution</h3>
        <p className="text-gray-400 text-sm mb-4">Click a bar to see students in that archetype</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} barCategoryGap="25%"
            onClick={d => d?.activePayload?.[0] && setSelectedArchetype(
              selected === d.activePayload[0].payload.archetype ? null : d.activePayload[0].payload.archetype
            )}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="archetype" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} cursor="pointer" maxBarSize={70}>
              {chartData.map((d, i) => (
                <Cell key={i} fill={d.color} fillOpacity={selected === d.archetype ? 1 : 0.7}
                  stroke={selected === d.archetype ? '#fff' : 'none'} strokeWidth={selected === d.archetype ? 2 : 0} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Archetype pills */}
      <div className="flex flex-wrap gap-3">
        {chartData.map(d => (
          <button key={d.archetype} onClick={() => setSelectedArchetype(selected === d.archetype ? null : d.archetype)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all border"
            style={{
              background: selected === d.archetype ? `${d.color}25` : 'rgba(255,255,255,0.05)',
              border: `1px solid ${selected === d.archetype ? d.color : 'rgba(255,255,255,0.1)'}`,
              color: selected === d.archetype ? d.color : '#9ca3af',
            }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
            {d.archetype} ({d.count})
          </button>
        ))}
      </div>

      {/* Detail panel */}
      {selected && info && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{info.icon}</span>
              <div>
                <h3 className="text-lg font-bold text-white">{selected}</h3>
                <p className="text-gray-400 text-sm">{students.length} students</p>
              </div>
            </div>
            <div className="space-y-2 max-h-52 overflow-y-auto">
              {students.map(s => (
                <div key={s.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-gray-200 text-sm">{s.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">streak {s.streak}d</span>
                    <span className="font-bold text-sm" style={{ color: ARCHETYPE_COLORS[selected] }}>{s.avg}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-3">📋 Archetype Profile</h3>
            <div className="p-4 rounded-xl mb-3" style={{ background: `${ARCHETYPE_COLORS[selected]}15`, border: `1px solid ${ARCHETYPE_COLORS[selected]}40` }}>
              <p className="text-gray-200 text-sm">{info.desc}</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-blue-300 text-xs font-semibold mb-1">Recommended Action</p>
              <p className="text-gray-200 text-sm">{info.action}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
