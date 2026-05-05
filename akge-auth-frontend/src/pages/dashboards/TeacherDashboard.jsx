import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import DashboardLayout from '../../components/DashboardLayout';

const tabs = [
  { id: 'monitoring',    label: '📊 Class Monitoring' },
  { id: 'diagnostics',   label: '🔍 Diagnostics' },
  { id: 'tools',         label: '⚡ Teaching Tools' },
  { id: 'ai',            label: '🧠 AI Assistant' },
  { id: 'micro',         label: '📈 Micro Insights' },
  { id: 'interventions', label: '🎯 Interventions' },
  { id: 'content',       label: '📚 Content' },
  { id: 'system',        label: '⚙️ System' },
];

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('monitoring');
  const [toggles, setToggles] = useState({
    adaptiveDifficulty: true,
    peerCollaboration: false,
    spacedRepetition: true,
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSetting = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <DashboardLayout role="teacher" userId={user?.userId} onLogout={handleLogout}>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/20 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome, {user?.userId}! 👩‍🏫</h2>
          <p className="text-gray-300">Manage your class, track student progress, and leverage AI-powered teaching tools.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-white/10 overflow-x-auto pb-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${activeTab === tab.id ? 'border-blue-400 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-300'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === 'monitoring'     && <MonitoringTab />}
          {activeTab === 'diagnostics'    && <DiagnosticsTab />}
          {activeTab === 'tools'          && <ToolsTab />}
          {activeTab === 'ai'             && <AITab />}
          {activeTab === 'micro'          && <MicroTab />}
          {activeTab === 'interventions'  && <InterventionsTab />}
          {activeTab === 'content'        && <ContentTab />}
          {activeTab === 'system'         && <SystemTab toggles={toggles} onToggle={toggleSetting} />}
        </div>
      </div>
    </DashboardLayout>
  );
}

// ─── MONITORING TAB ──────────────────────────────────────────────────────────
function MonitoringTab() {
  const masteryDist = [
    { range: '90–100%', count: 8,  color: 'bg-green-500' },
    { range: '80–89%',  count: 12, color: 'bg-emerald-400' },
    { range: '70–79%',  count: 7,  color: 'bg-yellow-400' },
    { range: '60–69%',  count: 3,  color: 'bg-orange-400' },
    { range: '<60%',    count: 2,  color: 'bg-red-500' },
  ];
  const maxCount = 12;

  const weakConcepts = [
    { name: 'Quadratic Equations', pct: 44 },
    { name: 'Trigonometry',        pct: 38 },
    { name: 'Calculus Basics',     pct: 31 },
    { name: 'Complex Numbers',     pct: 28 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Average Mastery"      value="72%" icon="📊" color="from-blue-500 to-blue-600" />
        <StatCard title="Students Above 80%"   value="20"  icon="🌟" color="from-green-500 to-emerald-600" />
        <StatCard title="Needs Support"        value="5"   icon="⚠️" color="from-red-500 to-rose-600" />
      </div>

      {/* Mastery Distribution */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Mastery Distribution</h3>
        <div className="space-y-3">
          {masteryDist.map(row => (
            <div key={row.range} className="flex items-center gap-4">
              <span className="text-gray-300 text-sm w-20 shrink-0">{row.range}</span>
              <div className="flex-1 bg-white/10 rounded-full h-6 overflow-hidden">
                <div
                  className={`${row.color} h-6 rounded-full flex items-center justify-end pr-2 transition-all duration-700`}
                  style={{ width: `${(row.count / maxCount) * 100}%` }}
                >
                  <span className="text-white text-xs font-bold">{row.count}</span>
                </div>
              </div>
              <span className="text-gray-400 text-sm w-20 shrink-0">{row.count} students</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weak Concept Clusters */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Weak Concept Clusters</h3>
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-white/10">
                <th className="text-left pb-2">Concept</th>
                <th className="text-right pb-2">Weakness %</th>
              </tr>
            </thead>
            <tbody>
              {weakConcepts.map(c => (
                <tr key={c.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 text-white">{c.name}</td>
                  <td className="py-3 text-right">
                    <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-300 text-sm font-medium">{c.pct}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Performers */}
        <div className="space-y-4">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-3">🏆 Top Performers</h3>
            {[{ name: 'Alice', score: 98 }, { name: 'Bob', score: 96 }, { name: 'Carol', score: 94 }].map(s => (
              <div key={s.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-gray-200">{s.name}</span>
                <span className="text-green-400 font-bold">{s.score}%</span>
              </div>
            ))}
          </div>
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-3">🆘 Needs Support</h3>
            {[{ name: 'David', score: 58 }, { name: 'Emma', score: 62 }].map(s => (
              <div key={s.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-gray-200">{s.name}</span>
                <span className="text-red-400 font-bold">{s.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DIAGNOSTICS TAB ─────────────────────────────────────────────────────────
function DiagnosticsTab() {
  const heatmapConcepts = [
    { name: 'Arithmetic',          status: 'ok'       },
    { name: 'Fractions',           status: 'ok'       },
    { name: 'Decimals',            status: 'ok'       },
    { name: 'Algebra Basics',      status: 'warning'  },
    { name: 'Linear Equations',    status: 'ok'       },
    { name: 'Inequalities',        status: 'warning'  },
    { name: 'Quadratic Eq.',       status: 'critical' },
    { name: 'Polynomials',         status: 'warning'  },
    { name: 'Trigonometry',        status: 'critical' },
    { name: 'Calculus Basics',     status: 'critical' },
    { name: 'Complex Numbers',     status: 'critical' },
    { name: 'Statistics',          status: 'ok'       },
  ];

  const colorMap = {
    critical: 'bg-red-500/70 border-red-400 text-red-100',
    warning:  'bg-yellow-500/50 border-yellow-400 text-yellow-100',
    ok:       'bg-green-500/40 border-green-400 text-green-100',
  };

  const chains = [
    { steps: ['Arithmetic', 'Algebra Basics', 'Quadratic Equations'], failing: 'Quadratic Equations' },
    { steps: ['Fractions', 'Trigonometry Ratios', 'Trigonometry'], failing: 'Trigonometry' },
    { steps: ['Algebra Basics', 'Limits', 'Calculus Basics'], failing: 'Calculus Basics' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="backdrop-blur-xl bg-red-500/10 border border-red-500/30 rounded-2xl p-5 text-center">
          <p className="text-4xl font-bold text-red-400">4</p>
          <p className="text-gray-300 mt-1">Critical Gaps</p>
        </div>
        <div className="backdrop-blur-xl bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5 text-center">
          <p className="text-4xl font-bold text-yellow-400">3</p>
          <p className="text-gray-300 mt-1">Warning Areas</p>
        </div>
        <div className="backdrop-blur-xl bg-green-500/10 border border-green-500/30 rounded-2xl p-5 text-center">
          <p className="text-4xl font-bold text-green-400">5</p>
          <p className="text-gray-300 mt-1">Healthy Concepts</p>
        </div>
      </div>

      {/* Heatmap */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-2">Root Cause Heatmap</h3>
        <div className="flex gap-4 mb-4 text-sm">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500 inline-block"></span><span className="text-gray-300">Critical</span></span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-500 inline-block"></span><span className="text-gray-300">Warning</span></span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500 inline-block"></span><span className="text-gray-300">OK</span></span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {heatmapConcepts.map(c => (
            <div key={c.name} className={`border rounded-xl p-3 text-center text-xs font-medium ${colorMap[c.status]}`}>
              {c.name}
            </div>
          ))}
        </div>
      </div>

      {/* Dependency Failure Chains */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Concept Dependency Failure Chains</h3>
        <div className="space-y-4">
          {chains.map((chain, idx) => (
            <div key={idx} className="flex items-center gap-2 flex-wrap">
              {chain.steps.map((step, si) => (
                <React.Fragment key={step}>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${step === chain.failing ? 'bg-red-500/30 border-red-400 text-red-200' : 'bg-white/10 border-white/20 text-gray-300'}`}>
                    {step}
                    {step === chain.failing && <span className="ml-1 text-red-400 font-bold">(FAILING)</span>}
                  </span>
                  {si < chain.steps.length - 1 && <span className="text-gray-500 text-lg">→</span>}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TOOLS TAB ───────────────────────────────────────────────────────────────
function ToolsTab() {
  const [lessonGenerated, setLessonGenerated] = useState(false);
  const [assignmentGenerated, setAssignmentGenerated] = useState(false);

  const lessonSteps = [
    'Review prerequisite: Algebra Fundamentals (10 min)',
    'Introduce parabola concept with visual graph (15 min)',
    'Demonstrate factoring method with examples (20 min)',
    'Guided practice: 5 problems in pairs (15 min)',
    'Exit ticket: 2 independent problems (5 min)',
  ];

  const questions = [
    { q: 'Solve: x² - 5x + 6 = 0', concept: 'Quadratic Equations', difficulty: 'Medium' },
    { q: 'Find sin(30°) + cos(60°)', concept: 'Trigonometry', difficulty: 'Easy' },
    { q: 'Differentiate f(x) = 3x² + 2x', concept: 'Calculus Basics', difficulty: 'Hard' },
  ];

  const diffColor = { Easy: 'bg-green-500/20 text-green-300', Medium: 'bg-yellow-500/20 text-yellow-300', Hard: 'bg-red-500/20 text-red-300' };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Auto Lesson Generator */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-1">📝 Auto Lesson Generator</h3>
          <p className="text-gray-400 text-sm mb-4">AI-generated lesson plan targeting weak concepts</p>
          <button
            onClick={() => setLessonGenerated(true)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 mb-4"
          >
            Generate Lesson Plan
          </button>
          {lessonGenerated && (
            <div className="space-y-2">
              <p className="text-blue-300 font-semibold text-sm mb-2">📚 Lesson: Quadratic Equations</p>
              {lessonSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <span className="w-6 h-6 rounded-full bg-blue-500/40 text-blue-200 text-xs flex items-center justify-center shrink-0 font-bold">{i + 1}</span>
                  <span className="text-gray-300 text-sm">{step}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Adaptive Assignment Builder */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-1">🎯 Adaptive Assignment Builder</h3>
          <p className="text-gray-400 text-sm mb-4">Auto-generates questions targeting student weak spots</p>
          <button
            onClick={() => setAssignmentGenerated(true)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 mb-4"
          >
            Generate Assignment
          </button>
          {assignmentGenerated && (
            <div className="space-y-3">
              {questions.map((q, i) => (
                <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">{q.concept}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${diffColor[q.difficulty]}`}>{q.difficulty}</span>
                  </div>
                  <p className="text-gray-200 text-sm">{q.q}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">⚡ Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-6 py-3 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 hover:bg-blue-500/30 transition-all duration-300 font-medium">📅 Schedule Revision</button>
          <button className="px-6 py-3 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30 transition-all duration-300 font-medium">📝 Create Quiz</button>
          <button className="px-6 py-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30 transition-all duration-300 font-medium">🔔 Send Alert</button>
        </div>
      </div>
    </div>
  );
}

// ─── AI TAB ──────────────────────────────────────────────────────────────────
function AITab() {
  const suggestions = [
    {
      text: 'Re-teach Quadratic Equations using visual parabola analogy',
      confidence: 94,
      icon: '📐',
      color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30',
    },
    {
      text: 'Students struggling due to missing Algebra Fundamentals concept',
      confidence: 87,
      icon: '🔗',
      color: 'from-orange-500/20 to-red-500/20 border-orange-500/30',
    },
    {
      text: 'Morning sessions show 15% better retention — schedule complex topics early',
      confidence: 91,
      icon: '🌅',
      color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Status Bar */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse inline-block"></span>
          <span className="text-white font-medium">AI Status: <span className="text-green-400">Active</span></span>
        </div>
        <span className="text-gray-400 text-sm">Last updated: 2 mins ago</span>
      </div>

      {/* Suggestion Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">🧠 AI Teaching Suggestions</h3>
        {suggestions.map((s, i) => (
          <div key={i} className={`backdrop-blur-xl bg-gradient-to-br ${s.color} border rounded-2xl p-6`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="text-3xl">{s.icon}</span>
                <div>
                  <p className="text-white font-medium text-base leading-relaxed">{s.text}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-gray-400 text-sm">Confidence:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-white/10 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full"
                          style={{ width: `${s.confidence}%` }}
                        />
                      </div>
                      <span className="text-blue-300 font-bold text-sm">{s.confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="shrink-0 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium border border-white/20 hover:border-white/40 transition-all duration-300">
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MICRO INSIGHTS TAB ──────────────────────────────────────────────────────
function MicroTab() {
  const groups = [
    { name: 'Fast Learners',    count: 8,  color: 'bg-green-500/20 border-green-500/40 text-green-300',  dot: 'bg-green-400' },
    { name: 'Confused Cluster', count: 12, color: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300', dot: 'bg-yellow-400' },
    { name: 'Slow Learners',    count: 5,  color: 'bg-red-500/20 border-red-500/40 text-red-300',        dot: 'bg-red-400' },
  ];

  const timeToUnderstand = [
    { concept: 'Algebra',      days: 3 },
    { concept: 'Geometry',     days: 5 },
    { concept: 'Calculus',     days: 8 },
    { concept: 'Trigonometry', days: 7 },
  ];
  const maxDays = 8;

  const weeklyVelocity = [
    { week: 'Wk 1', progress: 45 },
    { week: 'Wk 2', progress: 58 },
    { week: 'Wk 3', progress: 52 },
    { week: 'Wk 4', progress: 71 },
    { week: 'Wk 5', progress: 68 },
    { week: 'Wk 6', progress: 80 },
  ];

  return (
    <div className="space-y-6">
      {/* Student Grouping */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">👥 Student Grouping</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {groups.map(g => (
            <div key={g.name} className={`border rounded-xl p-5 ${g.color}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-3 h-3 rounded-full ${g.dot}`}></span>
                <span className="font-semibold">{g.name}</span>
              </div>
              <p className="text-3xl font-bold">{g.count}</p>
              <p className="text-sm opacity-70 mt-1">students</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Time-to-Understand */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">⏱️ Time-to-Understand per Concept</h3>
          <div className="space-y-3">
            {timeToUnderstand.map(row => (
              <div key={row.concept} className="flex items-center gap-4">
                <span className="text-gray-300 text-sm w-24 shrink-0">{row.concept}</span>
                <div className="flex-1 bg-white/10 rounded-full h-5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-400 to-purple-400 h-5 rounded-full flex items-center justify-end pr-2 transition-all duration-700"
                    style={{ width: `${(row.days / maxDays) * 100}%` }}
                  >
                    <span className="text-white text-xs font-bold">{row.days}d</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Velocity */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">📈 Learning Velocity (Weekly)</h3>
          <div className="flex items-end gap-2 h-32">
            {weeklyVelocity.map(w => (
              <div key={w.week} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-gray-400 text-xs">{w.progress}%</span>
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-700"
                  style={{ height: `${(w.progress / 100) * 100}px` }}
                />
                <span className="text-gray-400 text-xs">{w.week}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── INTERVENTIONS TAB ───────────────────────────────────────────────────────
function InterventionsTab() {
  const triggers = [
    {
      rule: '40% class weak → Recommend revision session',
      status: 'TRIGGERED',
      badge: 'bg-red-500/20 border-red-500/40 text-red-300',
    },
    {
      rule: '3 consecutive fails → Alert parent',
      status: 'Active',
      badge: 'bg-green-500/20 border-green-500/40 text-green-300',
    },
  ];

  const sessions = [
    { date: 'Mon, Jan 27', time: '10:00 AM', topic: 'Quadratic Equations Revision', students: 8 },
    { date: 'Wed, Jan 29', time: '2:00 PM',  topic: 'Trigonometry Fundamentals',   students: 5 },
  ];

  return (
    <div className="space-y-6">
      {/* Trigger Rules */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">⚡ Active Trigger Rules</h3>
        <div className="space-y-3">
          {triggers.map((t, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <span className="text-gray-200">{t.rule}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${t.badge}`}>{t.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Sessions */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">📅 Scheduled Remedial Sessions</h3>
        <div className="space-y-3">
          {sessions.map((s, i) => (
            <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white font-semibold">{s.topic}</p>
                  <p className="text-gray-400 text-sm mt-1">{s.date} at {s.time}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm">{s.students} students</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Trigger Buttons */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">🚀 Quick Triggers</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-6 py-3 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 hover:bg-blue-500/30 transition-all duration-300 font-medium">📅 Schedule Revision Now</button>
          <button className="px-6 py-3 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-300 hover:bg-orange-500/30 transition-all duration-300 font-medium">📨 Send Parent Alerts</button>
          <button className="px-6 py-3 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30 transition-all duration-300 font-medium">🗺️ Generate Remedial Plan</button>
        </div>
      </div>
    </div>
  );
}

// ─── CONTENT TAB ─────────────────────────────────────────────────────────────
function ContentTab() {
  const recentQuestions = [
    { text: 'Solve x² - 7x + 12 = 0 by factoring.',                    difficulty: 'Medium', concept: 'Quadratic Equations' },
    { text: 'What is the value of tan(45°)?',                           difficulty: 'Easy',   concept: 'Trigonometry' },
    { text: 'Find the derivative of f(x) = x³ - 4x² + 2x using first principles.', difficulty: 'Hard', concept: 'Calculus' },
  ];

  const diffColor = {
    Easy:   'bg-green-500/20 text-green-300 border-green-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    Hard:   'bg-red-500/20 text-red-300 border-red-500/30',
  };

  return (
    <div className="space-y-6">
      {/* Question Bank Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Questions" value="245" icon="📚" color="from-blue-500 to-blue-600" />
        <StatCard title="Easy"            value="65"  icon="🟢" color="from-green-500 to-emerald-600" />
        <StatCard title="Medium"          value="120" icon="🟡" color="from-yellow-500 to-orange-500" />
        <StatCard title="Hard"            value="60"  icon="🔴" color="from-red-500 to-rose-600" />
      </div>

      {/* Recent Questions */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">📋 Recent Questions</h3>
        <div className="space-y-3">
          {recentQuestions.map((q, i) => (
            <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-gray-200 text-sm">{q.text}</p>
                  <p className="text-gray-500 text-xs mt-1">{q.concept}</p>
                </div>
                <span className={`shrink-0 px-2 py-1 rounded-full text-xs font-medium border ${diffColor[q.difficulty]}`}>{q.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">🛠️ Question Bank Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-6 py-3 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 hover:bg-blue-500/30 transition-all duration-300 font-medium">➕ Add Question</button>
          <button className="px-6 py-3 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30 transition-all duration-300 font-medium">🏷️ Tag Questions</button>
          <button className="px-6 py-3 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-300 hover:bg-orange-500/30 transition-all duration-300 font-medium">⚖️ Set Difficulty</button>
        </div>
      </div>
    </div>
  );
}

// ─── SYSTEM TAB ──────────────────────────────────────────────────────────────
function SystemTab({ toggles, onToggle }) {
  const archetypes = ['Visual Learner', 'Analytical Thinker', 'Collaborative Learner', 'Self-Paced Learner'];
  const [selectedArchetype, setSelectedArchetype] = useState('Analytical Thinker');

  const settings = [
    { key: 'adaptiveDifficulty', label: 'Adaptive Difficulty',  desc: 'Automatically adjust question difficulty based on performance' },
    { key: 'peerCollaboration',  label: 'Peer Collaboration',   desc: 'Enable group activities and peer-to-peer learning features' },
    { key: 'spacedRepetition',   label: 'Spaced Repetition',    desc: 'Schedule concept reviews using spaced repetition algorithm' },
  ];

  return (
    <div className="space-y-6">
      {/* Learning Archetype Override */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-1">🧬 Learning Archetype Override</h3>
        <p className="text-gray-400 text-sm mb-4">Override the AI-detected learning archetype for this class</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {archetypes.map(a => (
            <button
              key={a}
              onClick={() => setSelectedArchetype(a)}
              className={`p-3 rounded-xl border text-sm font-medium transition-all duration-300 ${selectedArchetype === a ? 'bg-blue-500/30 border-blue-400 text-blue-200' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-gray-300'}`}
            >
              {a}
            </button>
          ))}
        </div>
        <p className="text-gray-400 text-sm mt-3">
          Current: <span className="text-blue-300 font-medium">{selectedArchetype}</span>
        </p>
      </div>

      {/* Subject Settings */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-1">⚙️ Subject Settings</h3>
        <p className="text-gray-400 text-sm mb-4">Configure adaptive learning features for your subject</p>
        <div className="space-y-4">
          {settings.map(s => (
            <div key={s.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <div>
                <p className="text-white font-medium">{s.label}</p>
                <p className="text-gray-400 text-sm mt-0.5">{s.desc}</p>
              </div>
              <button
                onClick={() => onToggle(s.key)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 shrink-0 ${toggles[s.key] ? 'bg-blue-500' : 'bg-white/20'}`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${toggles[s.key] ? 'left-7' : 'left-1'}`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SHARED STAT CARD ────────────────────────────────────────────────────────
function StatCard({ title, value, icon, color }) {
  return (
    <div className={`backdrop-blur-xl bg-gradient-to-br ${color}/20 border border-white/20 rounded-xl p-6 hover:border-white/40 transition-all duration-300 hover:scale-105`}>
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-gray-300 text-sm mb-1">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
