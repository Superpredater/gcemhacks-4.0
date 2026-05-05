import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine, LabelList,
  Legend,
} from 'recharts';
import { concepts, dependencies } from '../data/prereqData';
import useGapStore from '../store/useGapStore';

// ─── helpers ─────────────────────────────────────────────────────────────────
function barColor(mastery) {
  if (mastery >= 70) return '#22c55e';
  if (mastery >= 50) return '#eab308';
  return '#ef4444';
}
function severityLabel(mastery) {
  if (mastery >= 70) return 'Strong';
  if (mastery >= 50) return 'Partial';
  return 'Gap';
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const color = barColor(d.mastery);
  const prereqCount  = dependencies.filter(dep => dep.to   === d.id).length;
  const dependentCount = dependencies.filter(dep => dep.from === d.id).length;
  return (
    <div style={{
      background: 'rgba(15,23,42,0.97)',
      border: `1px solid ${color}`,
      borderRadius: 14,
      padding: '14px 18px',
      backdropFilter: 'blur(16px)',
      minWidth: 210,
      boxShadow: `0 8px 32px ${color}20`,
    }}>
      <p style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 14, marginBottom: 8 }}>{d.name}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
        <span style={{ color, fontWeight: 900, fontSize: 22 }}>{d.mastery}%</span>
        <span style={{
          fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
          background: `${color}22`, color, border: `1px solid ${color}44`,
        }}>{severityLabel(d.mastery)}</span>
      </div>
      <p style={{ color: '#64748b', fontSize: 11, marginBottom: 3 }}>
        Impact score: <span style={{ color: '#f59e0b', fontWeight: 700 }}>{d.importance}/10</span>
      </p>
      <p style={{ color: '#64748b', fontSize: 11, marginBottom: 3 }}>
        Prerequisites: <span style={{ color: '#94a3b8' }}>{prereqCount}</span>
      </p>
      <p style={{ color: '#64748b', fontSize: 11, marginBottom: 3 }}>
        Dependents: <span style={{ color: '#94a3b8' }}>{dependentCount}</span>
      </p>
      {d.simGain > 0 && (
        <p style={{ color: '#22c55e', fontSize: 11, fontWeight: 700, marginTop: 4 }}>
          ✨ Simulated gain: +{d.simGain}%
        </p>
      )}
      <p style={{ color: '#475569', fontSize: 10, marginTop: 6 }}>Click to select concept</p>
    </div>
  );
};

// ─── Custom bar label ─────────────────────────────────────────────────────────
const CustomLabel = ({ x, y, width, value }) => {
  if (!value) return null;
  return (
    <text x={x + width / 2} y={y - 6} textAnchor="middle"
      fill="#94a3b8" fontSize={11} fontWeight={600}>
      {value}%
    </text>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function GapHistogram() {
  const { gapData, selectedConcept, selectConcept } = useGapStore();
  const [sortBy, setSortBy] = useState('mastery');

  // Merge live gapData (which includes simMasteries) with static concept metadata
  const data = gapData
    .map(c => {
      const orig = concepts.find(x => x.id === c.id);
      return {
        ...c,
        importance: orig?.importance ?? 5,
        simGain: c.mastery !== orig?.mastery ? c.mastery - (orig?.mastery ?? c.mastery) : 0,
      };
    })
    .sort((a, b) => {
      if (sortBy === 'mastery')    return a.mastery - b.mastery;
      if (sortBy === 'impact')     return b.importance - a.importance;
      if (sortBy === 'impactScore') return b.impactScore - a.impactScore;
      return a.name.localeCompare(b.name);
    });

  const gaps    = data.filter(c => c.isGap).length;
  const partial = data.filter(c => c.isPartial).length;
  const strong  = data.filter(c => !c.isGap && !c.isPartial).length;
  const classAvg = Math.round(data.reduce((s, c) => s + c.mastery, 0) / (data.length || 1));
  const simActive = data.some(c => c.simGain > 0);

  const handleClick = (d) => {
    if (d?.activePayload?.[0]) selectConcept(d.activePayload[0].payload);
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
        <div>
          <h3 className="text-lg font-bold text-white">Prerequisite Gap Histogram</h3>
          <p className="text-gray-400 text-sm mt-0.5">
            Class mastery per concept · Click a bar to select &amp; update all panels
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-gray-500 text-xs font-semibold">Sort:</span>
          {[
            { key: 'mastery',     label: 'Mastery' },
            { key: 'impactScore', label: 'Impact' },
            { key: 'name',        label: 'A–Z' },
          ].map(s => (
            <button key={s.key} onClick={() => setSortBy(s.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                sortBy === s.key
                  ? 'bg-orange-500/30 border-orange-400 text-orange-300'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-gray-200 hover:bg-white/10'
              }`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary pills */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/15 border border-red-500/30">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="text-red-300 text-xs font-semibold">{gaps} Gaps (&lt;50%)</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-yellow-500/15 border border-yellow-500/30">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <span className="text-yellow-300 text-xs font-semibold">{partial} Partial (50–69%)</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-500/15 border border-green-500/30">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="text-green-300 text-xs font-semibold">{strong} Strong (≥70%)</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30">
          <span className="text-blue-300 text-xs font-semibold">Class avg: {classAvg}%</span>
        </div>
        {simActive && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30">
            <span className="text-purple-300 text-xs font-semibold">✨ Simulation active</span>
          </div>
        )}
        {selectedConcept && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500/15 border border-orange-500/30">
            <span className="text-orange-300 text-xs font-semibold">Selected: {selectedConcept.name}</span>
          </div>
        )}
      </div>

      {/* Histogram */}
      <ResponsiveContainer width="100%" height={340}>
        <BarChart
          data={data}
          margin={{ top: 28, right: 16, bottom: 12, left: 0 }}
          barCategoryGap="18%"
          onClick={handleClick}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />

          <XAxis
            dataKey="name"
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            interval={0}
            angle={-18}
            textAnchor="end"
            height={52}
          />

          <YAxis
            domain={[0, 100]}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `${v}%`}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)', radius: 6 }} />

          {/* Reference lines */}
          <ReferenceLine y={50} stroke="#ef4444" strokeDasharray="5 3" strokeWidth={1.5}
            label={{ value: 'Gap threshold 50%', fill: '#ef4444', fontSize: 10, position: 'insideTopLeft' }} />
          <ReferenceLine y={70} stroke="#22c55e" strokeDasharray="5 3" strokeWidth={1.5}
            label={{ value: 'Target 70%', fill: '#22c55e', fontSize: 10, position: 'insideTopRight' }} />
          <ReferenceLine y={classAvg} stroke="#3b82f6" strokeDasharray="6 3" strokeWidth={1.5}
            label={{ value: `Avg ${classAvg}%`, fill: '#3b82f6', fontSize: 10, position: 'insideBottomRight' }} />

          <Bar dataKey="mastery" radius={[6, 6, 0, 0]} cursor="pointer" maxBarSize={56}>
            <LabelList content={<CustomLabel />} />
            {data.map((c, i) => (
              <Cell
                key={i}
                fill={barColor(c.mastery)}
                fillOpacity={selectedConcept?.id === c.id ? 1 : 0.8}
                stroke={selectedConcept?.id === c.id ? '#ffffff' : barColor(c.mastery)}
                strokeWidth={selectedConcept?.id === c.id ? 2 : 0}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend row */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10 flex-wrap gap-3">
        <div className="flex gap-5 text-xs text-gray-500 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-6 border-t-2 border-dashed border-red-500" />
            Gap (50%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-6 border-t-2 border-dashed border-green-500" />
            Target (70%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-6 border-t-2 border-dashed border-blue-500" />
            Class avg
          </span>
        </div>
        <p className="text-gray-600 text-xs">Click any bar → updates Details, Students &amp; Cascade panels</p>
      </div>
    </div>
  );
}
