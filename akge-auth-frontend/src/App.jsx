import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import TeacherDashboard from './pages/dashboards/TeacherDashboard';
import ManagementDashboard from './pages/dashboards/ManagementDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import MasteryDistribution from './pages/mastery/MasteryDistribution';
import WeakConcepts from './pages/weakconcepts/WeakConcepts';
import StudentPerformance from './pages/studentperformance/StudentPerformance';
import PrereqGaps from './pages/prereqgaps/PrereqGaps';
import LearningPatterns from './pages/teacher/LearningPatterns';
import Recommendations from './pages/teacher/Recommendations';
import QuestionBank from './pages/teacher/QuestionBank';
import TeacherSettings from './pages/teacher/Settings';
import TeacherModules from './pages/teachermodules/TeacherModules';
import StudentLayout from './pages/student/StudentLayout';
import StudentDashboardPage from './pages/student/pages/Dashboard';
import LearningPathPage from './pages/student/pages/LearningPath';
import ConceptsPage from './pages/student/pages/Concepts';
import AssessmentPage from './pages/student/pages/Assessment';
import MasteryPage from './pages/student/pages/Mastery';
import AchievementsPage from './pages/student/pages/Achievements';
import MapPage from './pages/game/MapPage';
import GamePage from './pages/game/GamePage';
import LeaderboardPage from './pages/game/Leaderboard';
import ParentLayout from './pages/parent/ParentLayout';
import ParentDashboardPage from './pages/parent/pages/Dashboard';
import LearningActivityPage from './pages/parent/pages/LearningActivity';
import ParentMasteryPage from './pages/parent/pages/Mastery';
import WeakAreasPage from './pages/parent/pages/WeakAreas';
import AlertsPage from './pages/parent/pages/Alerts';
import ParentSettingsPage from './pages/parent/pages/Settings';
import FQLayout from './pages/focusquest/FQLayout';
import FQDashboard from './pages/focusquest/pages/FQDashboard';
import FQMap from './pages/focusquest/pages/FQMap';
import FQGame from './pages/focusquest/pages/FQGame';
import FQMastery from './pages/focusquest/pages/FQMastery';
import FQAchievements from './pages/focusquest/pages/FQAchievements';
import NeuralSync from './pages/neuralsync/NeuralSync';
import MgmtLayout from './pages/management/MgmtLayout';
import MgmtDashboard from './pages/management/pages/MgmtDashboard';
import GrowthPage from './pages/management/pages/Growth';
import SubjectsPage from './pages/management/pages/Subjects';
import MonitoringPage from './pages/management/pages/Monitoring';
import ScalabilityPage from './pages/management/pages/Scalability';
import AdminLayout from './pages/admin/AdminLayout';
import AdminUsersPage from './pages/admin/pages/Users';
import AdminRolesPage from './pages/admin/pages/Roles';
import AdminCompliancePage from './pages/admin/pages/Compliance';
import AdminHealthPage from './pages/admin/pages/Health';

// Error boundary to catch crashes without white screen
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('App Error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#0f172a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: 'sans-serif',
        }}>
          <div style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
            <h2 style={{ color: '#f87171', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              Something went wrong
            </h2>
            <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = '/login';
              }}
              style={{
                padding: '0.75rem 2rem',
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                border: 'none',
                borderRadius: '10px',
                color: '#fff',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              🔄 Reload App
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard Routes */}
          <Route
            path="/teacher/dashboard"
            element={
              <ProtectedRoute requiredRole="teacher">
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/mastery"
            element={
              <ProtectedRoute requiredRole="teacher">
                <MasteryDistribution />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/weak-concepts"
            element={
              <ProtectedRoute requiredRole="teacher">
                <WeakConcepts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/student-performance"
            element={
              <ProtectedRoute requiredRole="teacher">
                <StudentPerformance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/prereq-gaps"
            element={
              <ProtectedRoute requiredRole="teacher">
                <PrereqGaps />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/learning-patterns"
            element={
              <ProtectedRoute requiredRole="teacher">
                <LearningPatterns />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/recommendations"
            element={
              <ProtectedRoute requiredRole="teacher">
                <Recommendations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/question-bank"
            element={
              <ProtectedRoute requiredRole="teacher">
                <QuestionBank />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/settings"
            element={
              <ProtectedRoute requiredRole="teacher">
                <TeacherSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/modules"
            element={
              <ProtectedRoute requiredRole="teacher">
                <TeacherModules />
              </ProtectedRoute>
            }
          />

          {/* ── Student module routes ── */}
          <Route path="/student" element={
            <ProtectedRoute requiredRole="student">
              <StudentLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard"    element={<StudentDashboardPage />} />
            <Route path="learning-path" element={<LearningPathPage />} />
            <Route path="concepts"     element={<ConceptsPage />} />
            <Route path="assessment"   element={<AssessmentPage />} />
            <Route path="mastery"      element={<MasteryPage />} />
            <Route path="achievements" element={<AchievementsPage />} />
          </Route>

          {/* ── Focus Quest routes ── */}
          <Route path="/student/fq" element={
            <ProtectedRoute requiredRole="student"><FQLayout /></ProtectedRoute>
          }>
            <Route path="dashboard"    element={<FQDashboard />} />
            <Route path="map"          element={<FQMap />} />
            <Route path="mastery"      element={<FQMastery />} />
            <Route path="achievements" element={<FQAchievements />} />
          </Route>
          <Route path="/student/fq/game/:conceptId" element={
            <ProtectedRoute requiredRole="student"><FQGame /></ProtectedRoute>
          } />
          <Route path="/student/neural-sync" element={
            <ProtectedRoute requiredRole="student"><NeuralSync /></ProtectedRoute>
          } />

          {/* ── Management module routes ── */}
          <Route path="/management" element={
            <ProtectedRoute requiredRole="management"><MgmtLayout /></ProtectedRoute>
          }>
            <Route path="dashboard"   element={<MgmtDashboard />} />
            <Route path="growth"      element={<GrowthPage />} />
            <Route path="subjects"    element={<SubjectsPage />} />
            <Route path="monitoring"  element={<MonitoringPage />} />
            <Route path="scalability" element={<ScalabilityPage />} />
          </Route>

          {/* ── Admin module routes ── */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>
          }>
            <Route path="users"      element={<AdminUsersPage />} />
            <Route path="roles"      element={<AdminRolesPage />} />
            <Route path="compliance" element={<AdminCompliancePage />} />
            <Route path="health"     element={<AdminHealthPage />} />
          </Route>

          {/* ── Gamified routes (full-screen, no student layout) ── */}
          <Route path="/student/map" element={
            <ProtectedRoute requiredRole="student"><MapPage /></ProtectedRoute>
          } />
          <Route path="/student/game/:conceptId" element={
            <ProtectedRoute requiredRole="student"><GamePage /></ProtectedRoute>
          } />
          <Route path="/student/leaderboard" element={
            <ProtectedRoute requiredRole="student"><LeaderboardPage /></ProtectedRoute>
          } />

          {/* ── Parent module routes ── */}
          <Route path="/parent" element={
            <ProtectedRoute requiredRole="parent"><ParentLayout /></ProtectedRoute>
          }>
            <Route path="dashboard"  element={<ParentDashboardPage />} />
            <Route path="learning"   element={<LearningActivityPage />} />
            <Route path="mastery"    element={<ParentMasteryPage />} />
            <Route path="weak-areas" element={<WeakAreasPage />} />
            <Route path="alerts"     element={<AlertsPage />} />
            <Route path="settings"   element={<ParentSettingsPage />} />
          </Route>

          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
