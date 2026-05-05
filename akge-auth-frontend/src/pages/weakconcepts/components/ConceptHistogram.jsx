import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine, LabelList,
} from 'recharts';
import { concepts, dependencies } from '../data/weakData';

// ─── helpers ─────────────────────────────────────────────────────────────────
function barColor(mastery) {
  if (mastery >= 70) return '#22c55e';
  if (mastery >= 50) return '#eab308';
  return '#ef4444';
}

function severity(mastery) {
  if (mastery >= 70) return 'Strong';
  if (mastery >= 50) return 'Partial';
  return 'Gap';
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const color = barColor(d.mastery);
  const prereqs = dependencies.filter(dep => dep.to === d.id);
  const dependents = dependencies.filter(dep => dep.from === d.id);
  return (
    <div style={{
      background: 'rgba(15,23,42,0.97)',
      border: `1px solid ${color}`,
      borderRadius: 14,
      padding: '14px 18px',
      backdropFilter: 'blur(16px)',
      minWidth: 200,
      boxShadow: `0 8px 32px ${color}20`,
    }}>
      <p style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 14, marginBottom: 8 }}>{d.name}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
        <span style={{ color, fontWeight: 900, fontSize: 22 }}>{d.mastery}%</span>
        <span style={{
          fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
          background: `${color}22`, color, border: `1px solid ${color}44`,
        }}>{severity(d.mastery)}</span>
      </div>
      <p style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>
        Impact score: <span style={{ color: '#f59e0b', fontWeight: 700 }}>{d.impact}/10</span>
      </p>
      <p style={{ color: '#64748b', fontSize: 11, marginBottom: 2 }}>
        Prerequisites: <span style={{ color: '#94a3b8' }}>{prereqs.length}</span>
      </p>
      <p style={{ color: '#64748b', fontSize: 11 }}>
        Dependents: <span style={{ color: '#94a3b8' }}>{dependents.length}</span>
      </p>
    </div>
  );
};

// ─── Custom bar label ─────────────────────────────────────────────────────────
const CustomLabel = ({ x, y, width, value }) => {
  if (!value) return null;
  return (
    <text x={x + width / 2} y={y - 6} textAnchor="middle" fill="#94a3b8" fontSize={11} fontWeight={600}>
      {value}%
    </text>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ConceptHistogram({ onConceptClick, simMasteries = {} }) {
  const [sortBy, setSortBy] = useState('mastery'); // mastery | name | impact

  const data = concepts
    .map(c => ({
      ...c,
      mastery: simMasteries[c.id] ?? c.mastery,
      originalMastery: c.mastery,
      simGain: simMasteries[c.id] ? simMasteries[c.id] - c.mastery : 0,
    }))
    .sort((a, b) => {
      if (sortBy === 'mastery') return a.mastery - b.mastery;
      if (sortBy === 'impact')  return b.impact - a.impact;
      return a.name.localeCompare(b.name);
    });

  const gaps    = data.filter(c => c.mastery < 50).length;
  const partial = data.filter(c => c.mastery >= 50 && c.mastery < 70).length;
  const strong  = data.filter(c => c.mastery >= 70).length;
  const classAvg = Math.round(data.reduce((s, c) => s + c.mastery, 0) / data.length);

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
        <div>
          <h3 className="text-lg font-bold text-white">Concept Mastery Histogram</h3>
          <p className="text-gray-400 text-sm mt-0.5">
            Class mastery per concept · Click a bar to drill down
          </p>
        </div>

        {/* Sort controls */}
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-xs font-semibold">Sort:</span>
          {[
            { key: 'mastery', label: 'Mastery' },
            { key: 'impact',  label: 'Impact' },
            { key: 'name',    label: 'A–Z' },
          ].map(s => (
            <button key={s.key} onClick={() => setSortBy(s.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                sortBy === s.key
                  ? 'bg-blue-500/30 border-blue-400 text-blue-300'
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
        {Object.keys(simMasteries).length > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30">
            <span className="text-purple-300 text-xs font-semibold">
              ✨ Simulation active — {Object.keys(simMasteries).length} concepts updated
            </span>
          </div>
        )}
      </div>

      {/* Histogram */}
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 28, right: 16, bottom: 8, left: 0 }}
          barCategoryGap="18%"
          onClick={d => d?.activePayload?.[0] && onConceptClick?.(d.activePayload[0].payload)}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />

          <XAxis
            dataKey="name"
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            interval={0}
            angle={-20}
            textAnchor="end"
            height={48}
          />

          <YAxis
            domain={[0, 100]}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `${v}%`}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)', radius: 6 }} />

          {/* Class average reference line */}
          <ReferenceLine
            y={classAvg}
            stroke="#3b82f6"
            strokeDasharray="6 3"
            strokeWidth={1.5}
            label={{ value: `Avg ${classAvg}%`, fill: '#3b82f6', fontSize: 11, position: 'insideTopRight' }}
          />

          {/* Gap threshold */}
          <ReferenceLine
            y={50}
            stroke="#ef4444"
            strokeDasharray="4 4"
            strokeWidth={1}
            label={{ value: 'Gap threshold', fill: '#ef4444', fontSize: 10, position: 'insideTopLeft' }}
          />

          {/* Target line */}
          <ReferenceLine
            y={70}
            stroke="#22c55e"
            strokeDasharray="4 4"
            strokeWidth={1}
            label={{ value: 'Target 70%', fill: '#22c55e', fontSize: 10, position: 'insideTopRight' }}
          />

          <Bar dataKey="mastery" radius={[6, 6, 0, 0]} cursor="pointer" maxBarSize={52}>
            <LabelList content={<CustomLabel />} />
            {data.map((c, i) => (
              <Cell
                key={i}
                fill={barColor(c.mastery)}
                fillOpacity={0.85}
                stroke={barColor(c.mastery)}
                strokeWidth={c.simGain > 0 ? 2 : 0}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Bottom legend */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
        <div className="flex gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-8 h-0.5 bg-red-500 inline-block rounded" style={{ borderTop: '2px dashed #ef4444', background: 'none' }} />
            Gap threshold (50%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-8 h-0.5 bg-green-500 inline-block rounded" style={{ borderTop: '2px dashed #22c55e', background: 'none' }} />
            Target (70%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-8 h-0.5 bg-blue-500 inline-block rounded" style={{ borderTop: '2px dashed #3b82f6', background: 'none' }} />
            Class avg
          </span>
        </div>
        <p className="text-gray-600 text-xs">Click any bar to drill down</p>
      </div>
    </div>
  );
}
