import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = { conceptual: '#ef4444', procedural: '#eab308', careless: '#3b82f6' };
const LABELS = { conceptual: 'Conceptual', procedural: 'Procedural', careless: 'Careless' };

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const axis  = payload[0]?.payload?.axis ?? '';
  if (!axis) return null;
  const color = COLORS[axis.toLowerCase()] ?? '#8b5cf6';
  return (
    <div style={{ background: 'rgba(15,23,42,0.95)', border: `1px solid ${color}`, borderRadius: 10, padding: '8px 12px', backdropFilter: 'blur(12px)' }}>
      <p style={{ color, fontWeight: 700, fontSize: 13 }}>{axis}</p>
      <p style={{ color: '#f1f5f9', fontSize: 14, fontWeight: 800 }}>{payload[0].value}%</p>
    </div>
  );
};

export default function ErrorPatternAnalysis({ errorPattern }) {
  const data = [
    { axis: 'Conceptual', value: errorPattern.conceptual },
    { axis: 'Procedural', value: errorPattern.procedural },
    { axis: 'Careless',   value: errorPattern.careless   },
  ];

  const dominant = Object.entries(errorPattern).sort((a, b) => b[1] - a[1])[0];

  const insight = dominant[0] === 'conceptual'
    ? '💡 Re-teach core concepts from first principles'
    : dominant[0] === 'procedural'
    ? '💡 More worked examples and step-by-step practice'
    : '💡 Focus on checking work and exam technique';

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Error Pattern Analysis</h3>
          <p className="text-gray-400 text-sm mt-0.5">Error type distribution</p>
        </div>
        <div className="px-3 py-1.5 rounded-xl text-xs font-bold"
          style={{ background: `${COLORS[dominant[0]]}20`, color: COLORS[dominant[0]], border: `1px solid ${COLORS[dominant[0]]}44` }}>
          {LABELS[dominant[0]]} dominant
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 items-center">
        <ResponsiveContainer width="100%" height={200}>
          <RadarChart data={data} margin={{ top: 16, right: 24, bottom: 16, left: 24 }}>
            <PolarGrid stroke="rgba(255,255,255,0.07)" gridType="polygon" />
            <PolarAngleAxis dataKey="axis"
              tick={({ x, y, cx, cy, payload }) => {
                if (!payload?.value) return null;
                const dx = x - cx; const dy = y - cy;
                const len = Math.sqrt(dx*dx + dy*dy) || 1;
                const color = COLORS[payload.value.toLowerCase()] ?? '#94a3b8';
                return <text x={x+(dx/len)*14} y={y+(dy/len)*14} textAnchor="middle" dominantBaseline="central" fill={color} fontSize={12} fontWeight={800}>{payload.value}</text>;
              }}
              tickLine={false}
            />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#374151', fontSize: 9 }} tickCount={4} axisLine={false} />
            <Radar name="Errors" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.22} strokeWidth={2.5}
              dot={(props) => {
                if (!props?.payload?.axis) return null;
                const color = COLORS[props.payload.axis.toLowerCase()] ?? '#8b5cf6';
                return <circle key={props.payload.axis} cx={props.cx} cy={props.cy} r={5} fill={color} stroke="#0f172a" strokeWidth={1.5} />;
              }}
              isAnimationActive animationDuration={800}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>

        <div className="space-y-3">
          {data.map(d => {
            const color = COLORS[d.axis.toLowerCase()] ?? '#8b5cf6';
            return (
              <div key={d.axis}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300 font-medium">{d.axis}</span>
                  <span className="font-bold" style={{ color }}>{d.value}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                  <div className="h-2.5 rounded-full transition-all duration-700" style={{ width: `${d.value}%`, background: color }} />
                </div>
              </div>
            );
          })}
          <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-gray-300">{insight}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
