import React, { useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import DashboardLayout from '../../components/DashboardLayout';
import { useWeakData } from './hooks/useWeakData';
import { students } from './data/weakData';

// 2D components
import WeakConceptDetection  from './components/WeakConceptDetection';
import InterventionROI       from './components/InterventionROI';
import StudentSegmentation   from './components/StudentSegmentation';
import ErrorTaxonomy         from './components/ErrorTaxonomy';
import QuestionAnalysis      from './components/QuestionAnalysis';
import TrendVelocity         from './components/TrendVelocity';
import CascadeAlerts         from './components/CascadeAlerts';
import LearningPatterns      from './components/LearningPatterns';
import RemediationPlan       from './components/RemediationPlan';
import AssignmentSuggestions from './components/AssignmentSuggestions';
import TeachingStrategies    from './components/TeachingStrategies';
import DrillDown             from './components/DrillDown';
import InterventionSim       from './components/InterventionSim';
import ConceptHistogram      from './components/ConceptHistogram';

// 3D graph — lazy loaded (kept for simulate tab only)
const CausalGraph = React.lazy(() => import('./components/CausalGraph'));

// ─── Nav ──────────────────────────────────────────────────────────────────────
const NAV = [
  { id: 'overview',    label: '🔴 Detection' },
  { id: 'graph',       label: '📊 Histogram' },
  { id: 'students',    label: '👥 Students' },
  { id: 'errors',      label: '🧠 Errors' },
  { id: 'questions',   label: '❓ Questions' },
  { id: 'trend',       label: '📈 Trend' },
  { id: 'alerts',      label: '🚨 Alerts' },
  { id: 'patterns',    label: '🔍 Patterns' },
  { id: 'remediation', label: '🗺️ Remediation' },
  { id: 'simulate',    label: '⚡ Simulate' },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function WeakConcepts() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState('overview');
  const [drillConcept, setDrillConcept] = useState(null);
  const [simMasteries, setSimMasteries] = useState({});

  const { weakConcepts, roiRanking, segmentation, getDrillDown, clusters } = useWeakData();

  const handleLogout = () => { logout(); navigate('/login'); };

  const handleConceptSelect = (concept) => {
    setDrillConcept(concept);
  };

  const drillStudents = drillConcept ? getDrillDown(drillConcept.id) : [];

  return (
    <DashboardLayout role="teacher" userId={user?.userId} onLogout={handleLogout}>
      <div className="space-y-6">

        {/* Page header */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-red-500/15 to-orange-500/15 border border-white/20 rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <button onClick={() => navigate('/teacher/dashboard')} className="text-gray-400 hover:text-white transition-colors text-sm">
                  ← Dashboard
                </button>
                <span className="text-gray-600">/</span>
                <span className="text-gray-300 text-sm">Weak Concepts</span>
              </div>
              <h1 className="text-3xl font-black text-white">Weak Concepts Dashboard</h1>
              <p className="text-gray-300 mt-1">
                Deep diagnostic analysis · Causal dependency graph · Intervention planning
              </p>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-4xl font-black text-red-400">{weakConcepts.length}</p>
              <p className="text-gray-400 text-sm">Concepts flagged</p>
              <p className="text-gray-500 text-xs mt-1">{students.length} students analysed</p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            {[
              { label: 'Critical',   value: weakConcepts.filter(c => c.severity === 'critical').length, color: '#ef4444' },
              { label: 'Moderate',   value: weakConcepts.filter(c => c.severity === 'moderate').length, color: '#eab308' },
              { label: 'High Risk Students', value: segmentation.highRisk.length, color: '#f97316' },
              { label: 'Top Priority', value: roiRanking[0]?.name ?? '—', color: '#60a5fa', isText: true },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3 bg-white/5 border border-white/10 text-center">
                <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                <p className="font-black text-xl" style={{ color: s.color }}>
                  {s.isText ? <span className="text-sm">{s.value}</span> : s.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-1 overflow-x-auto pb-1 border-b border-white/10">
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => setActiveSection(n.id)}
              className={`px-4 py-2.5 rounded-t-lg font-medium text-sm whitespace-nowrap transition-all duration-200 border-b-2 ${
                activeSection === n.id
                  ? 'border-red-400 text-red-400 bg-red-500/10'
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
              <WeakConceptDetection weakConcepts={weakConcepts} onSelect={handleConceptSelect} />
              <InterventionROI roiRanking={roiRanking} />
            </div>
            {drillConcept && (
              <DrillDown
                concept={drillConcept}
                studentScores={drillStudents}
                onClose={() => setDrillConcept(null)}
              />
            )}
          </div>
        )}

        {/* ── HISTOGRAM ────────────────────────────────────────────────────── */}
        {activeSection === 'graph' && (
          <div className="space-y-5">
            <ConceptHistogram
              simMasteries={simMasteries}
              onConceptClick={handleConceptSelect}
            />
            {drillConcept && (
              <DrillDown
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

        {/* ── ERRORS ───────────────────────────────────────────────────────── */}
        {activeSection === 'errors' && (
          <ErrorTaxonomy />
        )}

        {/* ── QUESTIONS ────────────────────────────────────────────────────── */}
        {activeSection === 'questions' && (
          <QuestionAnalysis />
        )}

        {/* ── TREND ────────────────────────────────────────────────────────── */}
        {activeSection === 'trend' && (
          <TrendVelocity />
        )}

        {/* ── ALERTS ───────────────────────────────────────────────────────── */}
        {activeSection === 'alerts' && (
          <CascadeAlerts />
        )}

        {/* ── PATTERNS ─────────────────────────────────────────────────────── */}
        {activeSection === 'patterns' && (
          <LearningPatterns clusters={clusters} />
        )}

        {/* ── REMEDIATION ──────────────────────────────────────────────────── */}
        {activeSection === 'remediation' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RemediationPlan />
            <div className="space-y-6">
              <AssignmentSuggestions />
              <TeachingStrategies />
            </div>
          </div>
        )}

        {/* ── SIMULATE ─────────────────────────────────────────────────────── */}
        {activeSection === 'simulate' && (
          <div className="space-y-5">
            <InterventionSim onSimUpdate={setSimMasteries} />

            {/* Linked graph preview */}
            {Object.keys(simMasteries).length > 0 && (
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white">Graph — Simulated State</h3>
                  <p className="text-gray-400 text-sm mt-0.5">
                    Node colors updated to reflect projected mastery after intervention
                  </p>
                </div>
                <div style={{ height: '420px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
                  <Suspense fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    </div>
                  }>
                    <CausalGraph simMasteries={simMasteries} onConceptSelect={handleConceptSelect} />
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
