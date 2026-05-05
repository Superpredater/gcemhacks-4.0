import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import DashboardLayout from '../../components/DashboardLayout';

export default function BoardDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const strategicOverview = {
    learningOutcomes: 78,
    institutionPerformance: 82,
    studentSatisfaction: 85,
    systemEffectiveness: 88,
    keyMetrics: [
      { metric: 'Average Student Mastery', value: '78%', trend: '+5%' },
      { metric: 'Course Completion Rate', value: '91%', trend: '+3%' },
      { metric: 'Student Retention', value: '87%', trend: '+2%' },
      { metric: 'Teacher Satisfaction', value: '84%', trend: '+4%' },
    ],
    institutionalPerformance: [
      { institution: 'Central High School', score: 85, students: 450 },
      { institution: 'North Academy', score: 82, students: 380 },
      { institution: 'East Learning Center', score: 79, students: 320 },
      { institution: 'West University', score: 88, students: 520 },
    ],
  };

  const decisionSupport = {
    policyInsights: [
      { policy: 'Adaptive Learning Implementation', impact: 'High', status: 'Successful', improvement: '+18%' },
      { policy: 'Peer Tutoring Program', impact: 'Medium', status: 'In Progress', improvement: '+12%' },
      { policy: 'Personalized Learning Paths', impact: 'High', status: 'Successful', improvement: '+15%' },
    ],
    comparativeAnalytics: [
      { metric: 'vs. National Average', value: '+12%', status: 'Above Average' },
      { metric: 'vs. Regional Average', value: '+8%', status: 'Above Average' },
      { metric: 'vs. Previous Year', value: '+5%', status: 'Improving' },
    ],
  };

  const governance = {
    complianceStatus: 'Compliant',
    auditStatus: 'Passed',
    lastAudit: '2024-01-10',
    complianceItems: [
      { item: 'DPDP Act Compliance', status: 'Compliant', lastChecked: '2024-01-15' },
      { item: 'Data Security Standards', status: 'Compliant', lastChecked: '2024-01-14' },
      { item: 'Accessibility Standards', status: 'Compliant', lastChecked: '2024-01-13' },
      { item: 'Financial Reporting', status: 'Compliant', lastChecked: '2024-01-12' },
    ],
    systemEffectiveness: [
      { metric: 'System Uptime', value: '99.8%', status: 'Excellent' },
      { metric: 'User Satisfaction', value: '87%', status: 'Good' },
      { metric: 'Data Integrity', value: '100%', status: 'Excellent' },
      { metric: 'Performance Score', value: '92%', status: 'Excellent' },
    ],
  };

  return (
    <DashboardLayout role="board" userId={user?.userId} onLogout={handleLogout}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Board Dashboard</h1>
            <p className="text-gray-400 mt-2">Strategic Overview & Governance</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-400">{strategicOverview.learningOutcomes}%</p>
            <p className="text-gray-400">Learning Outcomes</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-white/10 overflow-x-auto">
          {[
            { id: 'overview', label: '📊 Strategic Overview', icon: '📊' },
            { id: 'decision', label: '💡 Decision Support', icon: '💡' },
            { id: 'governance', label: '✅ Governance', icon: '✅' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Strategic Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Learning Outcomes</p>
                <p className="text-3xl font-bold text-blue-400">{strategicOverview.learningOutcomes}%</p>
                <p className="text-xs text-gray-500 mt-2">Student achievement</p>
              </div>
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Institution Performance</p>
                <p className="text-3xl font-bold text-green-400">{strategicOverview.institutionPerformance}%</p>
                <p className="text-xs text-gray-500 mt-2">Overall score</p>
              </div>
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Student Satisfaction</p>
                <p className="text-3xl font-bold text-purple-400">{strategicOverview.studentSatisfaction}%</p>
                <p className="text-xs text-gray-500 mt-2">Satisfaction rate</p>
              </div>
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">System Effectiveness</p>
                <p className="text-3xl font-bold text-cyan-400">{strategicOverview.systemEffectiveness}%</p>
                <p className="text-xs text-gray-500 mt-2">Effectiveness score</p>
              </div>
            </div>

            {/* Key Metrics Details */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">📈 Key Performance Indicators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {strategicOverview.keyMetrics.map((metric, idx) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-white">{metric.metric}</p>
                      <span className="text-green-400 text-sm font-medium">{metric.trend}</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-400">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Institutional Performance */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">🏢 Institutional Performance</h3>
              <div className="space-y-4">
                {strategicOverview.institutionalPerformance.map((inst, idx) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-white">{inst.institution}</p>
                        <p className="text-xs text-gray-400">{inst.students} students</p>
                      </div>
                      <p className="text-2xl font-bold text-blue-400">{inst.score}%</p>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                        style={{ width: `${inst.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Decision Support Tab */}
        {activeTab === 'decision' && (
          <div className="space-y-6">
            {/* Policy Insights */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">📋 Policy-Level Insights</h3>
              <div className="space-y-3">
                {decisionSupport.policyInsights.map((policy, idx) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-white">{policy.policy}</p>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          policy.status === 'Successful' ? 'bg-green-500/20 text-green-300' :
                          'bg-blue-500/20 text-blue-300'
                        }`}>
                          {policy.status}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          policy.impact === 'High' ? 'bg-red-500/20 text-red-300' :
                          'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {policy.impact} Impact
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">Improvement: <span className="text-green-400 font-medium">{policy.improvement}</span></p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparative Analytics */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">📊 Comparative Analytics</h3>
              <div className="space-y-3">
                {decisionSupport.comparativeAnalytics.map((comp, idx) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-white">{comp.metric}</p>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-400">{comp.value}</p>
                        <p className="text-xs text-gray-400">{comp.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Recommendations */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">💡 Strategic Recommendations</h3>
              <div className="space-y-3">
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <p className="font-medium text-white mb-1">✓ Continue Current Initiatives</p>
                  <p className="text-sm text-gray-400">Adaptive learning and personalized paths are showing strong results. Maintain investment.</p>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="font-medium text-white mb-1">📈 Expand Peer Tutoring</p>
                  <p className="text-sm text-gray-400">Program shows promise. Recommend scaling to all institutions.</p>
                </div>
                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <p className="font-medium text-white mb-1">🎯 Focus on Underperforming Areas</p>
                  <p className="text-sm text-gray-400">East Learning Center needs additional support. Allocate resources accordingly.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Governance Tab */}
        {activeTab === 'governance' && (
          <div className="space-y-6">
            {/* Compliance Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="backdrop-blur-xl bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Compliance Status</p>
                <p className="text-2xl font-bold text-green-400">{governance.complianceStatus}</p>
                <p className="text-xs text-gray-500 mt-2">All standards met</p>
              </div>
              <div className="backdrop-blur-xl bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Audit Status</p>
                <p className="text-2xl font-bold text-green-400">{governance.auditStatus}</p>
                <p className="text-xs text-gray-500 mt-2">Last: {governance.lastAudit}</p>
              </div>
              <div className="backdrop-blur-xl bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">System Effectiveness</p>
                <p className="text-2xl font-bold text-blue-400">92%</p>
                <p className="text-xs text-gray-500 mt-2">Overall score</p>
              </div>
            </div>

            {/* Compliance Checklist */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">✅ Compliance Checklist</h3>
              <div className="space-y-3">
                {governance.complianceItems.map((item, idx) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-lg border-l-4 border-green-400">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">{item.item}</p>
                        <p className="text-xs text-gray-400 mt-1">Last checked: {item.lastChecked}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Effectiveness Metrics */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">📊 System Effectiveness Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {governance.systemEffectiveness.map((metric, idx) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-sm text-gray-400 mb-2">{metric.metric}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-blue-400">{metric.value}</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        metric.status === 'Excellent' ? 'bg-green-500/20 text-green-300' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {metric.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Governance Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="backdrop-blur-xl bg-blue-500/20 border border-blue-500/30 rounded-2xl p-6 hover:bg-blue-500/30 transition-all text-center">
                <p className="text-2xl mb-2">📋</p>
                <p className="font-bold text-white">View Audit Report</p>
                <p className="text-xs text-gray-400 mt-1">Latest audit findings</p>
              </button>
              <button className="backdrop-blur-xl bg-green-500/20 border border-green-500/30 rounded-2xl p-6 hover:bg-green-500/30 transition-all text-center">
                <p className="text-2xl mb-2">✓</p>
                <p className="font-bold text-white">Compliance Report</p>
                <p className="text-xs text-gray-400 mt-1">Full compliance status</p>
              </button>
              <button className="backdrop-blur-xl bg-purple-500/20 border border-purple-500/30 rounded-2xl p-6 hover:bg-purple-500/30 transition-all text-center">
                <p className="text-2xl mb-2">📊</p>
                <p className="font-bold text-white">Board Report</p>
                <p className="text-xs text-gray-400 mt-1">Executive summary</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
