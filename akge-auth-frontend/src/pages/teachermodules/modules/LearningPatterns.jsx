import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import useModuleStore from '../store/useModuleStore';
import { performanceTrend } from '../data/moduleData';
import { LineChart, Line, ReferenceLine } from 'recharts';

const PATTERN_COLORS = {
  'Fast Learner':    '#22c55e',
  'Slow Consistent': '#3b82f6',
  'Average':         '#eab308',
  'Inconsistent':    '#ef4444',
};

const INSIGHTS = {
  'Fast Learner':    { insight: 'These students grasp concepts quickly and need enrichment challenges.', suggestion: 'Assign advanced problems and peer tutoring roles.' },
  'Slow Consistent': { insight: 'Steady progress with regular effort. Respond well to structured practice.', suggestion: 'Maintain consistent practice schedules and spaced repetition.' },
  'Average':         { insight: 'Moderate performance with room for improvement.', suggestion: 'Targeted practice on weak concepts with regular feedback.' },
  'Inconsistent':    { insight: 'Variable performance — likely motivation or foundational issues.', suggestion: '1-on-1 sessions, identify root cause, set small achievable goals.' },
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="backdrop-blur-xl bg-slate-900/95 border border-white/20 rounded-xl p-3 text-sm">
      <p className="text-white font-bold">{d.pattern}</p>
      <p style={{ color: d.color }} className="font-semibold">{d.count} students</p>
      <p className="text-gray-400 text-xs mt-1">Click to see list</p>
    </div>
  );
};

export default function LearningPatterns() {
  const { patternData, selectedPattern, setSelectedPattern } = useModuleStore();

  const chartData = Object.entries(patternData).map(([pattern, list]) => ({
    pattern, count: list.length, color: PATTERN_COLORS[pattern] ?? '#6b7280',
  })).sort((a, b) => b.count - a.count);

  const trendData = performanceTrend;
  const selected = selectedPattern;
  const students = selected ? (patternData[selected] ?? []) : [];
  const info = selected ? INSIGHTS[selected] : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution histogram */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-1">Learning Pattern Distribution</h3>
          <p className="text-gray-400 text-sm mb-4">Click a bar to see students in that pattern</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData} barCategoryGap="25%"
              onClick={d => d?.activePayload?.[0] && setSelectedPattern(d.activePayload[0].payload.pattern)}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="pattern" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} cursor="pointer" maxBarSize={60}>
                {chartData.map((d, i) => (
                  <Cell key={i} fill={d.color} fillOpacity={selected === d.pattern ? 1 : 0.7}
                    stroke={selected === d.pattern ? '#fff' : 'none'} strokeWidth={selected === d.pattern ? 2 : 0} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Trend line */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-1">Class Performance Trend</h3>
          <p className="text-gray-400 text-sm mb-4">8-week average mastery trajectory</p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 85]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10 }}
                labelStyle={{ color: '#94a3b8' }} itemStyle={{ color: '#60a5fa' }} />
              <ReferenceLine y={70} stroke="#22c55e" strokeDasharray="4 4" label={{ value: 'Target', fill: '#22c55e', fontSize: 10 }} />
              <Line type="monotone" dataKey="avg" stroke="#3b82f6" strokeWidth={2.5}
                dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pattern pills */}
      <div className="flex flex-wrap gap-3">
        {chartData.map(d => (
          <button key={d.pattern} onClick={() => setSelectedPattern(selected === d.pattern ? null : d.pattern)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all border"
            style={{
              background: selected === d.pattern ? `${d.color}25` : 'rgba(255,255,255,0.05)',
              border: `1px solid ${selected === d.pattern ? d.color : 'rgba(255,255,255,0.1)'}`,
              color: selected === d.pattern ? d.color : '#9ca3af',
            }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
            {d.pattern} ({d.count})
          </button>
        ))}
        {selected && <button onClick={() => setSelectedPattern(null)}
          className="px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-white bg-white/5 border border-white/10 transition-all">
          Clear ✕
        </button>}
      </div>

      {/* Selected pattern detail */}
      {selected && info && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-1">{selected}</h3>
            <p className="text-gray-400 text-sm mb-4">{students.length} students in this pattern</p>
            <div className="space-y-2 max-h-52 overflow-y-auto">
              {students.map(s => (
                <div key={s.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-gray-200 text-sm">{s.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">streak {s.streak}d</span>
                    <span className="font-bold text-sm" style={{ color: PATTERN_COLORS[selected] }}>{s.avg}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-3">💡 Pattern Insights</h3>
            <div className="p-4 rounded-xl mb-3" style={{ background: `${PATTERN_COLORS[selected]}15`, border: `1px solid ${PATTERN_COLORS[selected]}40` }}>
              <p className="text-gray-200 text-sm">{info.insight}</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-blue-300 text-xs font-semibold mb-1">Teaching Suggestion</p>
              <p className="text-gray-200 text-sm">{info.suggestion}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
