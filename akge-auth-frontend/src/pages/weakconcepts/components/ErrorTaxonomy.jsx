import React, { useState, useEffect, useRef } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip, Legend,
} from 'recharts';
import { errorTypes, concepts } from '../data/weakData';

// ─── Constants ────────────────────────────────────────────────────────────────
const COLORS = {
  conceptual: '#ef4444',
  procedural: '#eab308',
  careless:   '#3b82f6',
};
const LABELS = {
  conceptual: 'Conceptual',
  procedural: 'Procedural',
  careless:   'Careless',
};

// Class average across all concepts
const classAvgErrors = (() => {
  const all = Object.values(errorTypes);
  return {
    conceptual: Math.round(all.reduce((s, e) => s + e.conceptual, 0) / all.length),
    procedural: Math.round(all.reduce((s, e) => s + e.procedural, 0) / all.length),
    careless:   Math.round(all.reduce((s, e) => s + e.careless,   0) / all.length),
  };
})();

// ─── Tooltips ─────────────────────────────────────────────────────────────────
const AllConceptsTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(15,23,42,0.96)', border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: 12, padding: '10px 14px', backdropFilter: 'blur(14px)',
    }}>
      <p style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
          <span style={{ color: '#94a3b8', fontSize: 12 }}>{p.name}:</span>
          <span style={{ color: p.color, fontWeight: 700, fontSize: 12 }}>{p.value}%</span>
        </div>
      ))}
    </div>
  );
};

const SingleTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const axis  = payload[0]?.payload?.axis ?? '';
  if (!axis) return null;
  const color = COLORS[axis.toLowerCase()] ?? '#8b5cf6';
  return (
    <div style={{
      background: 'rgba(15,23,42,0.96)', border: `1px solid ${color}`,
      borderRadius: 10, padding: '8px 12px', backdropFilter: 'blur(12px)',
    }}>
      <p style={{ color, fontWeight: 700, fontSize: 13 }}>{axis}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color, fontSize: 13, fontWeight: 800 }}>
          {p.name}: {p.value}%
        </p>
      ))}
    </div>
  );
};

// ─── Animated wrapper — remounts chart on key change ─────────────────────────
function AnimatedChart({ chartKey, children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 40);
    return () => clearTimeout(t);
  }, [chartKey]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.96)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
      }}
    >
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ErrorTaxonomy() {
  const allConcepts = concepts.filter(c => errorTypes[c.id]);
  const [selected, setSelected] = useState(null); // null = All Concepts

  const radarData = allConcepts.map(c => ({
    concept:    c.name,
    Conceptual: errorTypes[c.id].conceptual,
    Procedural: errorTypes[c.id].procedural,
    Careless:   errorTypes[c.id].careless,
  }));

  const selectedConcept = concepts.find(c => c.id === selected);
  const e = selected ? errorTypes[selected] : null;

  const singleData = e
    ? [
        { axis: 'Conceptual', value: e.conceptual, avg: classAvgErrors.conceptual },
        { axis: 'Procedural', value: e.procedural, avg: classAvgErrors.procedural },
        { axis: 'Careless',   value: e.careless,   avg: classAvgErrors.careless   },
      ]
    : null;

  const dominant = e
    ? Object.entries(e).sort((a, b) => b[1] - a[1])[0]
    : null;

  const getInsight = (id) => {
    const err = errorTypes[id];
    if (!err) return null;
    if (err.conceptual > 45) return '💡 Primarily conceptual — re-teach from first principles';
    if (err.procedural > 40) return '💡 Primarily procedural — more worked examples needed';
    if (err.careless   > 45) return '💡 Primarily careless — focus on checking and exam technique';
    return '💡 Mixed errors — combine concept review with targeted practice';
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-lg font-bold text-white">Misconception & Error Taxonomy</h3>
          <p className="text-gray-400 text-sm mt-0.5">Spider graph — error type distribution per concept</p>
        </div>
        {selected && dominant && (
          <div
            className="shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold"
            style={{
              background: `${COLORS[dominant[0]]}20`,
              border: `1px solid ${COLORS[dominant[0]]}50`,
              color: COLORS[dominant[0]],
            }}
          >
            {LABELS[dominant[0]]} dominant · {dominant[1]}%
          </div>
        )}
      </div>

      {/* Concept selector */}
      <div className="flex flex-wrap gap-2 mt-4 mb-5">
        <button
          onClick={() => setSelected(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border ${
            selected === null
              ? 'bg-purple-500/30 border-purple-400 text-purple-300 shadow-lg shadow-purple-500/20'
              : 'bg-white/5 border-white/10 text-gray-400 hover:text-gray-200 hover:bg-white/10'
          }`}
        >
          All Concepts
        </button>
        {allConcepts.map(c => {
          const err = errorTypes[c.id];
          const dom = Object.entries(err).sort((a, b) => b[1] - a[1])[0];
          const isActive = selected === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border"
              style={{
                background: isActive ? `${COLORS[dom[0]]}25` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${isActive ? COLORS[dom[0]] : 'rgba(255,255,255,0.1)'}`,
                color: isActive ? COLORS[dom[0]] : '#9ca3af',
                boxShadow: isActive ? `0 0 12px ${COLORS[dom[0]]}30` : 'none',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      {/* ── ALL CONCEPTS MODE ─────────────────────────────────────────────── */}
      {selected === null && (
        <AnimatedChart chartKey="all">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Spider */}
            <div className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={340}>
                <RadarChart data={radarData} margin={{ top: 24, right: 36, bottom: 24, left: 36 }}>
                  <PolarGrid stroke="rgba(255,255,255,0.07)" gridType="polygon" />
                  <PolarAngleAxis
                    dataKey="concept"
                    tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                    tickLine={false}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: '#374151', fontSize: 9 }}
                    tickCount={5}
                    axisLine={false}
                  />
                  <Radar name="Conceptual" dataKey="Conceptual"
                    stroke={COLORS.conceptual} fill={COLORS.conceptual}
                    fillOpacity={0.15} strokeWidth={2}
                    dot={{ r: 3, fill: COLORS.conceptual, strokeWidth: 0 }}
                    isAnimationActive animationBegin={0} animationDuration={800}
                  />
                  <Radar name="Procedural" dataKey="Procedural"
                    stroke={COLORS.procedural} fill={COLORS.procedural}
                    fillOpacity={0.15} strokeWidth={2}
                    dot={{ r: 3, fill: COLORS.procedural, strokeWidth: 0 }}
                    isAnimationActive animationBegin={100} animationDuration={800}
                  />
                  <Radar name="Careless" dataKey="Careless"
                    stroke={COLORS.careless} fill={COLORS.careless}
                    fillOpacity={0.15} strokeWidth={2}
                    dot={{ r: 3, fill: COLORS.careless, strokeWidth: 0 }}
                    isAnimationActive animationBegin={200} animationDuration={800}
                  />
                  <Tooltip content={<AllConceptsTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: 14 }}
                    formatter={v => <span style={{ color: '#cbd5e1', fontSize: 12 }}>{v}</span>}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Summary list */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">Error Summary</p>
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {allConcepts.map(c => {
                  const err = errorTypes[c.id];
                  const dom = Object.entries(err).sort((a, b) => b[1] - a[1])[0];
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelected(c.id)}
                      className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-xs font-semibold">{c.name}</span>
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: `${COLORS[dom[0]]}22`,
                            color: COLORS[dom[0]],
                            border: `1px solid ${COLORS[dom[0]]}44`,
                          }}
                        >
                          {LABELS[dom[0]]} {dom[1]}%
                        </span>
                      </div>
                      {/* Stacked bar */}
                      <div className="flex gap-0.5 h-2 rounded-full overflow-hidden">
                        {Object.entries(err).map(([k, v]) => (
                          <div key={k} style={{ flex: v, background: COLORS[k] }} />
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </AnimatedChart>
      )}

      {/* ── SINGLE CONCEPT MODE ───────────────────────────────────────────── */}
      {selected !== null && singleData && (
        <AnimatedChart chartKey={selected}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

            {/* Spider — concept vs class average */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3 text-center">
                {selectedConcept?.name} vs Class Average
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart
                  key={selected}           /* force full remount on concept change */
                  data={singleData}
                  margin={{ top: 24, right: 36, bottom: 24, left: 36 }}
                >
                  <PolarGrid stroke="rgba(255,255,255,0.07)" gridType="polygon" />
                  <PolarAngleAxis
                    dataKey="axis"
                    tick={({ x, y, cx, cy, payload }) => {
                      // Guard: payload or value may be undefined
                      if (!payload || !payload.value) return null;
                      const dx = x - cx;
                      const dy = y - cy;
                      const len = Math.sqrt(dx * dx + dy * dy) || 1;
                      const lx = x + (dx / len) * 18;
                      const ly = y + (dy / len) * 18;
                      const color = COLORS[payload.value.toLowerCase()] ?? '#94a3b8';
                      return (
                        <text x={lx} y={ly} textAnchor="middle" dominantBaseline="central"
                          fill={color} fontSize={13} fontWeight={800}>
                          {payload.value}
                        </text>
                      );
                    }}
                    tickLine={false}
                  />
                  <PolarRadiusAxis
                    angle={90} domain={[0, 100]}
                    tick={{ fill: '#374151', fontSize: 9 }}
                    tickCount={5} axisLine={false}
                  />
                  {/* Class average — dashed grey */}
                  <Radar
                    name="Class Avg"
                    dataKey="avg"
                    stroke="rgba(148,163,184,0.6)"
                    fill="rgba(148,163,184,0.08)"
                    strokeWidth={1.5}
                    strokeDasharray="5 3"
                    dot={false}
                    isAnimationActive animationBegin={0} animationDuration={600}
                  />
                  {/* Selected concept — solid colored */}
                  <Radar
                    name={selectedConcept?.name}
                    dataKey="value"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.22}
                    strokeWidth={2.5}
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      // Guard: payload or axis may be undefined during animation frames
                      if (!payload || !payload.axis) return null;
                      const color = COLORS[payload.axis.toLowerCase()] ?? '#8b5cf6';
                      return (
                        <circle
                          key={`dot-${payload.axis}`}
                          cx={cx} cy={cy} r={5}
                          fill={color} stroke="#0f172a" strokeWidth={1.5}
                        />
                      );
                    }}
                    isAnimationActive animationBegin={80} animationDuration={700}
                  />
                  <Tooltip content={<SingleTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: 12 }}
                    formatter={v => <span style={{ color: '#cbd5e1', fontSize: 11 }}>{v}</span>}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Right panel */}
            <div className="space-y-4">
              {/* Concept name + mastery */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-white font-black text-lg">{selectedConcept?.name}</p>
                <p className="text-gray-400 text-xs mt-0.5">
                  Mastery: <span className="text-white font-bold">{selectedConcept?.mastery}%</span>
                </p>
              </div>

              {/* Error bars with vs-average delta */}
              <div className="space-y-3">
                {singleData.map(d => {
                  const color = COLORS[d.axis.toLowerCase()] ?? '#8b5cf6';
                  const delta = d.value - d.avg;
                  return (
                    <div key={d.axis}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-300 font-semibold">{d.axis}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-xs">avg {d.avg}%</span>
                          <span
                            className="text-xs font-bold px-1.5 py-0.5 rounded"
                            style={{
                              background: delta > 5 ? 'rgba(239,68,68,0.2)' : delta < -5 ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.1)',
                              color: delta > 5 ? '#fca5a5' : delta < -5 ? '#86efac' : '#94a3b8',
                            }}
                          >
                            {delta > 0 ? `+${delta}` : delta}%
                          </span>
                          <span className="font-black" style={{ color }}>{d.value}%</span>
                        </div>
                      </div>
                      <div className="relative w-full bg-white/10 rounded-full h-3 overflow-hidden">
                        {/* Average marker */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-white/40 z-10"
                          style={{ left: `${d.avg}%` }}
                        />
                        {/* Value bar */}
                        <div
                          className="h-3 rounded-full transition-all duration-700"
                          style={{ width: `${d.value}%`, background: color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dominant badge */}
              {dominant && (
                <div
                  className="p-3 rounded-xl text-center"
                  style={{
                    background: `${COLORS[dominant[0]]}18`,
                    border: `1px solid ${COLORS[dominant[0]]}44`,
                  }}
                >
                  <p className="text-xs text-gray-400 mb-1">Dominant Error Type</p>
                  <p className="font-black text-xl" style={{ color: COLORS[dominant[0]] }}>
                    {LABELS[dominant[0]]}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: COLORS[dominant[0]] }}>
                    {dominant[1]}% of all errors
                  </p>
                </div>
              )}

              {/* Insight */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-300">{getInsight(selected)}</p>
              </div>

              {/* Navigate to next concept */}
              <div className="flex gap-2">
                {(() => {
                  const idx = allConcepts.findIndex(c => c.id === selected);
                  const prev = allConcepts[idx - 1];
                  const next = allConcepts[idx + 1];
                  return (
                    <>
                      {prev && (
                        <button
                          onClick={() => setSelected(prev.id)}
                          className="flex-1 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-xs font-semibold"
                        >
                          ← {prev.name}
                        </button>
                      )}
                      {next && (
                        <button
                          onClick={() => setSelected(next.id)}
                          className="flex-1 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-xs font-semibold"
                        >
                          {next.name} →
                        </button>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </AnimatedChart>
      )}
    </div>
  );
}
