import React, { useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import DashboardLayout from '../../components/DashboardLayout';
import { useMasteryData } from './hooks/useMasteryData';
import { students } from './data/mockData';

// 2D components
import MasteryOverview       from './components/MasteryOverview';
import ConceptHeatmap        from './components/ConceptHeatmap';
import StudentSegmentation   from './components/StudentSegmentation';
import LearningTrend         from './components/LearningTrend';
import RiskAlerts            from './components/RiskAlerts';
import DrillDownPanel        from './components/DrillDownPanel';
import MisconceptionInsights from './components/MisconceptionInsights';
import RecommendationsPanel  from './components/RecommendationsPanel';
import InterventionSimulator from './components/InterventionSimulator';
import MasteryHistogram      from './components/MasteryHistogram';

// 3D graph — kept for simulate tab only (no longer used in graph tab)
const ConceptGraph = React.lazy(() => import('./components/ConceptGraph'));

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ id, title, children }) {
  return (
    <section id={id}>
      {title && (
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 px-1">{title}</h2>
      )}
      {children}
    </section>
  );
}

// ─── Nav tabs ─────────────────────────────────────────────────────────────────
const NAV = [
  { id: 'overview',      label: '📊 Overview' },
  { id: 'graph',         label: '📊 Histogram' },
  { id: 'heatmap',       label: '🌡️ Heatmap' },
  { id: 'students',      label: '👥 Students' },
  { id: 'trend',         label: '📈 Trend' },
  { id: 'alerts',        label: '🚨 Alerts' },
  { id: 'insights',      label: '🧠 Insights' },
  { id: 'simulate',      label: '⚡ Simulate' },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MasteryDistribution() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState('overview');
  const [drillConcept, setDrillConcept] = useState(null);

  const { classAverage, overviewData, segmentation, heatmapData, getDrillDown } = useMasteryData();

  const handleLogout = () => { logout(); navigate('/login'); };

  const handleConceptClick = (concept) => {
    setDrillConcept(concept);
    setActiveSection('heatmap');
  };

  const drillStudents = drillConcept ? getDrillDown(drillConcept.id) : [];

  return (
    <DashboardLayout role="teacher" userId={user?.userId} onLogout={handleLogout}>
      <div className="space-y-6">

        {/* Page header */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/20 rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <button
                  onClick={() => navigate('/teacher/dashboard')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  ← Dashboard
                </button>
                <span className="text-gray-600">/</span>
                <span className="text-gray-300 text-sm">Mastery Distribution</span>
              </div>
              <h1 className="text-3xl font-black text-white">Mastery Distribution</h1>
              <p className="text-gray-300 mt-1">Deep analysis of class-wide concept mastery, dependencies, and intervention planning</p>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-4xl font-black text-blue-400">{classAverage}%</p>
              <p className="text-gray-400 text-sm">Class Average</p>
              <p className="text-gray-500 text-xs mt-1">{students.length} students · {heatmapData.length} concepts</p>
            </div>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1 border-b border-white/10">
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => setActiveSection(n.id)}
              className={`px-4 py-2.5 rounded-t-lg font-medium text-sm whitespace-nowrap transition-all duration-200 border-b-2 ${
                activeSection === n.id
                  ? 'border-blue-400 text-blue-400 bg-blue-500/10'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              {n.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ─────────────────────────────────────────────────────── */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MasteryOverview
                overviewData={overviewData}
                classAverage={classAverage}
                totalStudents={students.length}
              />
              <LearningTrend />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RiskAlerts />
              <RecommendationsPanel />
            </div>
          </div>
        )}

        {/* ── HISTOGRAM ────────────────────────────────────────────────────── */}
        {activeSection === 'graph' && (
          <div className="space-y-4">
            <MasteryHistogram
              heatmapData={heatmapData}
              classAverage={classAverage}
              onConceptClick={handleConceptClick}
            />
            {drillConcept && (
              <DrillDownPanel
                concept={drillConcept}
                studentScores={drillStudents}
                onClose={() => setDrillConcept(null)}
              />
            )}
          </div>
        )}

        {/* ── HEATMAP ──────────────────────────────────────────────────────── */}
        {activeSection === 'heatmap' && (
          <div className="space-y-6">
            <ConceptHeatmap heatmapData={heatmapData} onConceptClick={handleConceptClick} />
            {drillConcept && (
              <DrillDownPanel
                concept={drillConcept}
                studentScores={drillStudents}
                onClose={() => setDrillConcept(null)}
              />
            )}
          </div>
        )}

        {/* ── STUDENTS ─────────────────────────────────────────────────────── */}
        {activeSection === 'students' && (
          <StudentSegmentation segmentation={segmentation} />
        )}

        {/* ── TREND ────────────────────────────────────────────────────────── */}
        {activeSection === 'trend' && (
          <LearningTrend />
        )}

        {/* ── ALERTS ───────────────────────────────────────────────────────── */}
        {activeSection === 'alerts' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RiskAlerts />
            <MisconceptionInsights />
          </div>
        )}

        {/* ── INSIGHTS ─────────────────────────────────────────────────────── */}
        {activeSection === 'insights' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MisconceptionInsights />
            <RecommendationsPanel />
          </div>
        )}

        {/* ── SIMULATE ─────────────────────────────────────────────────────── */}
        {activeSection === 'simulate' && (
          <InterventionSimulator />
        )}

      </div>
    </DashboardLayout>
  );
}
