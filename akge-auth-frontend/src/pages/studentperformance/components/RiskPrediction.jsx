import React from 'react';

const riskStyle = {
  low:      { color: '#22c55e', bg: 'rgba(34,197,94,0.10)',  border: 'rgba(34,197,94,0.35)',  icon: '✅', label: 'Low Risk' },
  moderate: { color: '#eab308', bg: 'rgba(234,179,8,0.10)',  border: 'rgba(234,179,8,0.35)',  icon: '⚠️', label: 'Moderate Risk' },
  high:     { color: '#f97316', bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.4)',  icon: '🔶', label: 'High Risk' },
  critical: { color: '#ef4444', bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.4)',   icon: '🚨', label: 'Critical Risk' },
};

export default function RiskPrediction({ riskLevel, riskWarnings, overallMastery }) {
  const s = riskStyle[riskLevel] ?? riskStyle.low;

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-4">Risk Prediction</h3>

      {/* Risk gauge */}
      <div className="rounded-xl p-5 mb-4 text-center" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
        <span className="text-4xl">{s.icon}</span>
        <p className="text-xl font-black mt-2" style={{ color: s.color }}>{s.label}</p>
        <p className="text-gray-400 text-sm mt-1">Based on mastery: {overallMastery}%</p>

        {/* Risk meter */}
        <div className="mt-4 w-full bg-white/10 rounded-full h-3 overflow-hidden">
          <div className="h-3 rounded-full transition-all duration-700"
            style={{
              width: `${riskLevel === 'critical' ? 95 : riskLevel === 'high' ? 70 : riskLevel === 'moderate' ? 45 : 20}%`,
              background: s.color,
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Safe</span><span>Critical</span>
        </div>
      </div>

      {/* Warnings */}
      <div className="space-y-2">
        {riskWarnings.map((w, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-sm" style={{ color: s.color }}>
              {riskLevel === 'low' ? '✓' : '•'}
            </span>
            <span className="text-gray-300 text-sm">{w}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
