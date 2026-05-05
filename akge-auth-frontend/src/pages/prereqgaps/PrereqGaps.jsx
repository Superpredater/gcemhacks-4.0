import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import DashboardLayout from '../../components/DashboardLayout';
import useGapStore from './store/useGapStore';

// 2D components
import GapDetectionEngine    from './components/GapDetectionEngine';
import GapSeverityRanking    from './components/GapSeverityRanking';
import GapDetailsPanel       from './components/GapDetailsPanel';
import StudentBreakdown      from './components/StudentBreakdown';
import CascadeView           from './components/CascadeView';
import TrendTracking         from './components/TrendTracking';
import RiskAlerts            from './components/RiskAlerts';
import ClusterInsights       from './components/ClusterInsights';
import RemediationPath       from './components/RemediationPath';
import AssignmentGenerator   from './components/AssignmentGenerator';
import TeachingRecommendations from './components/TeachingRecommendations';
import DrillDownPanel        from './components/DrillDownPanel';
import SimulationPanel       from './components/SimulationPanel';
import GapHistogram          from './components/GapHistogram';

// 3D — kept for simulate tab only
const PrereqGraph = React.lazy(() => import('./components/PrereqGraph'));

// ─── Nav ──────────────────────────────────────────────────────────────────────
const NAV = [
  { id: 'overview',    label: '🔍 Detection' },
  { id: 'graph',       label: '📊 Histogram' },
  { id: 'details',     label: '📋 Details' },
  { id: 'students',    label: '👥 Students' },
  { id: 'cascade',     label: '🌊 Cascade' },
  { id: 'trend',       label: '📈 Trend' },
  { id: 'alerts',      label: '🚨 Alerts' },
  { id: 'clusters',    label: '🔗 Clusters' },
  { id: 'remediation', label: '🗺️ Remediation' },
  { id: 'simulate',    label: '⚡ Simulate' },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PrereqGaps() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { gapData, selectedConcept, activeTab, setActiveTab } = useGapStore();

  const handleLogout = () => { logout(); navigate('/login'); };

  const gaps    = gapData.filter(c => c.isGap);
  const partial = gapData.filter(c => c.isPartial);
  const totalAffected = [...new Set(gaps.flatMap(c => c.affectedStudents?.map(s => s.id) ?? []))].length;

  return (
    <DashboardLayout role="teacher" userId={user?.userId} onLogout={handleLogout}>
      <div className="space-y-5">

        {/* Page header */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-orange-500/15 to-red-500/15 border border-white/20 rounded-2xl p-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <button onClick={() => navigate('/teacher/dashboard')} className="text-gray-400 hover:text-white transition-colors text-sm">
                  ← Dashboard
                </button>
                <span className="text-gray-600">/</span>
                <span className="text-gray-300 text-sm">Prerequisite Gaps</span>
              </div>
              <h1 className="text-3xl font-black text-white">Prerequisite Gaps Dashboard</h1>
              <p className="text-gray-300 mt-1">
                Dynamic gap detection · 3D dependency graph · Cascade analysis · Simulation
              </p>
            </div>
            {selectedConcept && (
              <div className="px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-semibold">
                Selected: {selectedConcept.name}
              </div>
            )}
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            {[
              { label: 'Critical Gaps',    value: gaps.length,    color: '#ef4444' },
              { label: 'Partial Gaps',     value: partial.length, color: '#eab308' },
              { label: 'Students Affected',value: totalAffected,  color: '#f97316' },
              { label: 'Top Priority',     value: gapData[0]?.name ?? '—', color: '#60a5fa', isText: true },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3 bg-white/5 border border-white/10 text-center">
                <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                <p className="font-black" style={{ color: s.color, fontSize: s.isText ? '0.85rem' : '1.5rem' }}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-1 overflow-x-auto pb-1 border-b border-white/10">
          {NAV.map(n => (
            <button key={n.id} onClick={() => setActiveTab(n.id)}
              className={`px-4 py-2.5 rounded-t-lg font-medium text-sm whitespace-nowrap transition-all duration-200 border-b-2 ${
                activeTab === n.id
                  ? 'border-orange-400 text-orange-400 bg-orange-500/10'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}>
              {n.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ─────────────────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <GapDetectionEngine />
            <GapSeverityRanking />
          </div>
        )}

        {/* ── HISTOGRAM ────────────────────────────────────────────────────── */}
        {activeTab === 'graph' && (
          <div className="space-y-5">
            <GapHistogram />

            {/* Side panels update when bar is clicked */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <GapDetailsPanel />
              <StudentBreakdown />
              <CascadeView />
            </div>
          </div>
        )}

        {/* ── DETAILS ──────────────────────────────────────────────────────── */}
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="space-y-5">
              <GapDetectionEngine />
              <GapDetailsPanel />
            </div>
            <div className="space-y-5">
              <StudentBreakdown />
              <CascadeView />
            </div>
          </div>
        )}

        {/* ── STUDENTS ─────────────────────────────────────────────────────── */}
        {activeTab === 'students' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <StudentBreakdown />
            <ClusterInsights />
          </div>
        )}

        {/* ── CASCADE ──────────────────────────────────────────────────────── */}
        {activeTab === 'cascade' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <CascadeView />
            <RiskAlerts />
          </div>
        )}

        {/* ── TREND ────────────────────────────────────────────────────────── */}
        {activeTab === 'trend' && (
          <TrendTracking />
        )}

        {/* ── ALERTS ───────────────────────────────────────────────────────── */}
        {activeTab === 'alerts' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <RiskAlerts />
            <ClusterInsights />
          </div>
        )}

        {/* ── CLUSTERS ─────────────────────────────────────────────────────── */}
        {activeTab === 'clusters' && (
          <ClusterInsights />
        )}

        {/* ── REMEDIATION ──────────────────────────────────────────────────── */}
        {activeTab === 'remediation' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <RemediationPath />
            <div className="space-y-5">
              <AssignmentGenerator />
              <TeachingRecommendations />
            </div>
          </div>
        )}

        {/* ── SIMULATE ─────────────────────────────────────────────────────── */}
        {activeTab === 'simulate' && (
          <div className="space-y-5">
            <SimulationPanel />

            {/* Live graph updates after simulation */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-lg font-bold text-white">Live Graph — Simulation State</h3>
                <p className="text-gray-400 text-sm mt-0.5">
                  Node colors update in real-time after running simulation
                </p>
              </div>
              <div style={{ height: '420px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
                  </div>
                }>
                  <PrereqGraph />
                </Suspense>
              </div>
            </div>

            {/* Drill-down after simulation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <DrillDownPanel />
              <RemediationPath />
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
