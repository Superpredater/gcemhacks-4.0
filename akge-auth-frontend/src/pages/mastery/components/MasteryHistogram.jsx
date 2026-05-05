import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine, LabelList,
  ComposedChart, Line,
} from 'recharts';
import { concepts } from '../data/mockData';

// ─── helpers ─────────────────────────────────────────────────────────────────
function barColor(mastery) {
  if (mastery >= 80) return '#22c55e';
  if (mastery >= 60) return '#3b82f6';
  if (mastery >= 50) return '#eab308';
  return '#ef4444';
}
function tier(mastery) {
  if (mastery >= 80) return 'High';
  if (mastery >= 60) return 'Medium';
  if (mastery >= 50) return 'Low-Med';
  return 'Low';
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const color = barColor(d.mastery);
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
        <span style={{ color, fontWeight: 900, fontSize: 24 }}>{d.mastery}%</span>
        <span style={{
          fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
          background: `${color}22`, color, border: `1px solid ${color}44`,
        }}>{tier(d.mastery)}</span>
      </div>
      <p style={{ color: '#64748b', fontSize: 11 }}>
        Weak students: <span style={{ color: '#fca5a5', fontWeight: 700 }}>{d.weakCount}</span>
      </p>
      <p style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>
        Weak %: <span style={{ color: '#fca5a5', fontWeight: 700 }}>{d.weakPct}%</span>
      </p>
      {d.isWeak && (
        <p style={{ color: '#ef4444', fontSize: 11, fontWeight: 700, marginTop: 6 }}>
          ⚠ Critical — &gt;40% students below 50%
        </p>
      )}
      <p style={{ color: '#475569', fontSize: 10, marginTop: 6 }}>Click to drill down</p>
    </div>
  );
};

// ─── Custom bar label ─────────────────────────────────────────────────────────
const CustomLabel = ({ x, y, width, value }) => {
  if (!value) return null;
  return (
    <text x={x + width / 2} y={y - 6}
      textAnchor="middle" fill="#94a3b8" fontSize={11} fontWeight={600}>
      {value}%
    </text>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MasteryHistogram({ heatmapData, classAverage, onConceptClick }) {
  const [sortBy, setSortBy] = useState('mastery');
  const [showWeakLine, setShowWeakLine] = useState(true);

  const data = [...heatmapData]
    .sort((a, b) => {
      if (sortBy === 'mastery') return a.mastery - b.mastery;
      if (sortBy === 'weak')    return b.weakPct - a.weakPct;
      return a.name.localeCompare(b.name);
    });

  const high   = data.filter(c => c.mastery >= 80).length;
  const medium = data.filter(c => c.mastery >= 60 && c.mastery < 80).length;
  const low    = data.filter(c => c.mastery < 60).length;
  const critical = data.filter(c => c.isWeak).length;

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
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-gray-500 text-xs font-semibold">Sort:</span>
          {[
            { key: 'mastery', label: 'Mastery ↑' },
            { key: 'weak',    label: 'Weak % ↓' },
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
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-500/15 border border-green-500/30">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="text-green-300 text-xs font-semibold">{high} High (≥80%)</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span className="text-blue-300 text-xs font-semibold">{medium} Medium (60–79%)</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/15 border border-red-500/30">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="text-red-300 text-xs font-semibold">{low} Low (&lt;60%)</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500/15 border border-orange-500/30">
          <span className="text-orange-300 text-xs font-semibold">⚠ {critical} Critical gaps</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30">
          <span className="text-indigo-300 text-xs font-semibold">Class avg: {classAverage}%</span>
        </div>
      </div>

      {/* Main histogram */}
      <ResponsiveContainer width="100%" height={340}>
        <BarChart
          data={data}
          margin={{ top: 28, right: 16, bottom: 12, left: 0 }}
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
            label={{ value: 'Weak threshold 50%', fill: '#ef4444', fontSize: 10, position: 'insideTopLeft' }} />
          <ReferenceLine y={70} stroke="#22c55e" strokeDasharray="5 3" strokeWidth={1.5}
            label={{ value: 'Target 70%', fill: '#22c55e', fontSize: 10, position: 'insideTopRight' }} />
          <ReferenceLine y={classAverage} stroke="#6366f1" strokeDasharray="6 3" strokeWidth={2}
            label={{ value: `Avg ${classAverage}%`, fill: '#818cf8', fontSize: 10, position: 'insideBottomRight' }} />

          <Bar dataKey="mastery" radius={[6, 6, 0, 0]} cursor="pointer" maxBarSize={56}>
            <LabelList content={<CustomLabel />} />
            {data.map((c, i) => (
              <Cell
                key={i}
                fill={barColor(c.mastery)}
                fillOpacity={0.85}
                stroke={c.isWeak ? '#ef4444' : barColor(c.mastery)}
                strokeWidth={c.isWeak ? 2 : 0}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Weak % secondary chart */}
      <div className="mt-6 pt-5 border-t border-white/10">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-gray-300">% Students Below 50% per Concept</p>
          <button
            onClick={() => setShowWeakLine(v => !v)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
              showWeakLine
                ? 'bg-red-500/20 border-red-400 text-red-300'
                : 'bg-white/5 border-white/10 text-gray-400'
            }`}
          >
            {showWeakLine ? 'Hide' : 'Show'} Weak %
          </button>
        </div>

        {showWeakLine && (
          <ResponsiveContainer width="100%" height={120}>
            <BarChart
              data={data}
              margin={{ top: 4, right: 16, bottom: 8, left: 0 }}
              barCategoryGap="18%"
              onClick={d => d?.activePayload?.[0] && onConceptClick?.(d.activePayload[0].payload)}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 9 }} axisLine={false} tickLine={false}
                interval={0} angle={-18} textAnchor="end" height={40} />
              <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 9 }} axisLine={false} tickLine={false}
                tickFormatter={v => `${v}%`} />
              <Tooltip
                formatter={(v, n) => [`${v}%`, 'Students below 50%']}
                contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(239,68,68,0.5)', borderRadius: 10 }}
                labelStyle={{ color: '#f1f5f9', fontWeight: 700 }}
                itemStyle={{ color: '#fca5a5' }}
              />
              <ReferenceLine y={40} stroke="#f97316" strokeDasharray="4 3" strokeWidth={1}
                label={{ value: 'Alert 40%', fill: '#f97316', fontSize: 9, position: 'insideTopLeft' }} />
              <Bar dataKey="weakPct" radius={[4, 4, 0, 0]} cursor="pointer" maxBarSize={56}>
                {data.map((c, i) => (
                  <Cell key={i} fill={c.weakPct > 40 ? '#ef4444' : '#f97316'} fillOpacity={0.7} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10 flex-wrap gap-3">
        <div className="flex gap-4 text-xs text-gray-500 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-6 border-t-2 border-dashed border-red-500" />
            Weak (50%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-6 border-t-2 border-dashed border-green-500" />
            Target (70%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-6 border-t-2 border-dashed border-indigo-500" />
            Class avg
          </span>
        </div>
        <p className="text-gray-600 text-xs">Click any bar to drill down</p>
      </div>
    </div>
  );
}
