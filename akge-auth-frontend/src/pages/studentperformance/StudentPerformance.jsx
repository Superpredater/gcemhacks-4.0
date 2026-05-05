import React, { useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import DashboardLayout from '../../components/DashboardLayout';
import { useStudentData, students } from './hooks/useStudentData';

// 2D components
import StudentOverview       from './components/StudentOverview';
import ConceptPerformance    from './components/ConceptPerformance';
import PerformanceTrend      from './components/PerformanceTrend';
import WeaknessMap           from './components/WeaknessMap';
import ErrorPatternAnalysis  from './components/ErrorPatternAnalysis';
import DrillDownPanel        from './components/DrillDownPanel';
import RiskPrediction        from './components/RiskPrediction';
import ConsistencyScore      from './components/ConsistencyScore';
import TimeVsPerformance     from './components/TimeVsPerformance';
import ConfidenceAccuracy    from './components/ConfidenceAccuracy';
import ClassComparison       from './components/ClassComparison';
import LearningArchetype     from './components/LearningArchetype';
import Recommendations       from './components/Recommendations';
import InterventionTracking  from './components/InterventionTracking';
import SimulationPanel       from './components/SimulationPanel';

// 3D — lazy loaded
const MasteryRadar3D = React.lazy(() => import('./components/MasteryRadar3D'));

// ─── Nav ──────────────────────────────────────────────────────────────────────
const NAV = [
  { id: 'overview',      label: '📊 Overview' },
  { id: 'radar',         label: '🕸️ 3D Radar' },
  { id: 'concepts',      label: '📚 Concepts' },
  { id: 'trend',         label: '📈 Trend' },
  { id: 'weakness',      label: '⚠️ Weakness' },
  { id: 'errors',        label: '🧠 Errors' },
  { id: 'risk',          label: '🚨 Risk' },
  { id: 'analytics',     label: '📉 Analytics' },
  { id: 'profile',       label: '🎭 Profile' },
  { id: 'actions',       label: '🎯 Actions' },
  { id: 'simulate',      label: '⚡ Simulate' },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function StudentPerformance() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedStudentId, setSelectedStudentId] = useState(1);
  const [drillConcept, setDrillConcept] = useState(null);
  const [simMetrics, setSimMetrics] = useState(null);

  const data = useStudentData(selectedStudentId);
  const handleLogout = () => { logout(); navigate('/login'); };

  if (!data) return null;

  return (
    <DashboardLayout role="teacher" userId={user?.userId} onLogout={handleLogout}>
      <div className="space-y-6">

        {/* Page header */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/15 to-purple-500/15 border border-white/20 rounded-2xl p-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <button onClick={() => navigate('/teacher/dashboard')} className="text-gray-400 hover:text-white transition-colors text-sm">
                  ← Dashboard
                </button>
                <span className="text-gray-600">/</span>
                <span className="text-gray-300 text-sm">Student Performance</span>
              </div>
              <h1 className="text-3xl font-black text-white">Student Performance</h1>
              <p className="text-gray-300 mt-1">Deep individual analysis · 3D mastery radar · Intervention planning</p>
            </div>

            {/* Student selector */}
            <div className="flex items-center gap-3">
              <label className="text-gray-400 text-sm font-medium">Student:</label>
              <select
                value={selectedStudentId}
                onChange={e => { setSelectedStudentId(Number(e.target.value)); setDrillConcept(null); setSimMetrics(null); }}
                className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-blue-400 transition-colors"
              >
                {students.map(s => (
                  <option key={s.id} value={s.id} style={{ background: '#1e293b' }}>
                    {s.avatar} {s.name} ({s.grade})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-5">
            {[
              { label: 'Mastery',     value: `${data.overallMastery}%`, color: data.status === 'good' ? '#22c55e' : data.status === 'average' ? '#eab308' : '#ef4444' },
              { label: 'Last Score',  value: `${data.lastScore}%`,      color: '#3b82f6' },
              { label: 'Velocity',    value: `${data.velocity >= 0 ? '+' : ''}${data.velocity}%/wk`, color: data.velocity >= 0 ? '#22c55e' : '#ef4444' },
              { label: 'Class Rank',  value: `#${data.rank}`,           color: '#f59e0b' },
              { label: 'Consistency', value: `${data.consistency}`,     color: '#a855f7' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3 bg-white/5 border border-white/10 text-center">
                <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                <p className="font-black text-xl" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-1 overflow-x-auto pb-1 border-b border-white/10">
          {NAV.map(n => (
            <button key={n.id} onClick={() => setActiveSection(n.id)}
              className={`px-4 py-2.5 rounded-t-lg font-medium text-sm whitespace-nowrap transition-all duration-200 border-b-2 ${
                activeSection === n.id
                  ? 'border-blue-400 text-blue-400 bg-blue-500/10'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}>
              {n.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ─────────────────────────────────────────────────────── */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StudentOverview
                student={data.student}
                overallMastery={data.overallMastery}
                lastScore={data.lastScore}
                velocity={data.velocity}
                status={data.status}
                rank={data.rank}
                totalStudents={data.totalStudents}
                percentile={data.percentile}
              />
              <RiskPrediction riskLevel={data.riskLevel} riskWarnings={data.riskWarnings} overallMastery={data.overallMastery} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LearningArchetype studentId={selectedStudentId} />
              <Recommendations recommendations={data.recommendations} />
            </div>
          </div>
        )}

        {/* ── 3D RADAR ─────────────────────────────────────────────────────── */}
        {activeSection === 'radar' && (
          <div className="space-y-5">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-white/10 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="text-lg font-bold text-white">3D Mastery Radar — {data.student.name}</h3>
                  <p className="text-gray-400 text-sm mt-0.5">
                    Drag to rotate · Scroll to zoom · Hover vertex for value
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap text-xs">
                  {[
                    { label: `Mastery ${data.radarMetrics.mastery}%`,   color: '#3b82f6' },
                    { label: `Accuracy ${data.radarMetrics.accuracy}%`, color: '#22c55e' },
                    { label: `Retention ${data.radarMetrics.retention}%`, color: '#a855f7' },
                    { label: `Speed ${data.radarMetrics.speed}%`,       color: '#f59e0b' },
                  ].map(m => (
                    <span key={m.label} className="px-2 py-1 rounded-full border text-xs font-semibold"
                      style={{ background: `${m.color}20`, color: m.color, border: `1px solid ${m.color}40` }}>
                      {m.label}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ height: '480px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-10 h-10 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                      <p className="text-gray-400 text-sm">Loading 3D radar…</p>
                    </div>
                  </div>
                }>
                  <MasteryRadar3D metrics={data.radarMetrics} simMetrics={simMetrics} />
                </Suspense>
              </div>
            </div>
          </div>
        )}

        {/* ── CONCEPTS ─────────────────────────────────────────────────────── */}
        {activeSection === 'concepts' && (
          <div className="space-y-6">
            <ConceptPerformance conceptMastery={data.conceptMastery} onConceptClick={setDrillConcept} />
            {drillConcept && (
              <DrillDownPanel concept={drillConcept} studentId={selectedStudentId} onClose={() => setDrillConcept(null)} />
            )}
          </div>
        )}

        {/* ── TREND ────────────────────────────────────────────────────────── */}
        {activeSection === 'trend' && (
          <PerformanceTrend trend={data.trend} velocity={data.velocity} />
        )}

        {/* ── WEAKNESS ─────────────────────────────────────────────────────── */}
        {activeSection === 'weakness' && (
          <div className="space-y-6">
            <WeaknessMap weaknessMap={data.weaknessMap} onSelect={setDrillConcept} />
            {drillConcept && (
              <DrillDownPanel concept={drillConcept} studentId={selectedStudentId} onClose={() => setDrillConcept(null)} />
            )}
          </div>
        )}

        {/* ── ERRORS ───────────────────────────────────────────────────────── */}
        {activeSection === 'errors' && (
          <ErrorPatternAnalysis errorPattern={data.errorPattern} />
        )}

        {/* ── RISK ─────────────────────────────────────────────────────────── */}
        {activeSection === 'risk' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RiskPrediction riskLevel={data.riskLevel} riskWarnings={data.riskWarnings} overallMastery={data.overallMastery} />
            <ConsistencyScore consistency={data.consistency} trend={data.trend} />
          </div>
        )}

        {/* ── ANALYTICS ────────────────────────────────────────────────────── */}
        {activeSection === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TimeVsPerformance studentId={selectedStudentId} timePerf={data.timePerf} />
              <ConfidenceAccuracy studentId={selectedStudentId} />
            </div>
            <ClassComparison
              studentId={selectedStudentId}
              rank={data.rank}
              percentile={data.percentile}
              overallMastery={data.overallMastery}
            />
          </div>
        )}

        {/* ── PROFILE ──────────────────────────────────────────────────────── */}
        {activeSection === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LearningArchetype studentId={selectedStudentId} />
            <InterventionTracking studentId={selectedStudentId} />
          </div>
        )}

        {/* ── ACTIONS ──────────────────────────────────────────────────────── */}
        {activeSection === 'actions' && (
          <Recommendations recommendations={data.recommendations} />
        )}

        {/* ── SIMULATE ─────────────────────────────────────────────────────── */}
        {activeSection === 'simulate' && (
          <div className="space-y-5">
            <SimulationPanel radarMetrics={data.radarMetrics} onSimUpdate={setSimMetrics} />

            {simMetrics && (
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white">3D Radar — Simulated State</h3>
                  <p className="text-gray-400 text-sm mt-0.5">Green overlay shows projected improvement after intervention</p>
                </div>
                <div style={{ height: '420px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
                  <Suspense fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    </div>
                  }>
                    <MasteryRadar3D metrics={data.radarMetrics} simMetrics={simMetrics} />
                  </Suspense>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
