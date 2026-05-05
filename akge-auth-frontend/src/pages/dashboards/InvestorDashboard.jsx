import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import DashboardLayout from '../../components/DashboardLayout';

export default function InvestorDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('insights');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const businessInsights = {
    platformUsers: 2450,
    activeUsers: 1856,
    monthlyGrowth: '+12%',
    retentionRate: 87,
    usageStats: [
      { metric: 'Daily Active Users', value: 856, trend: '+8%' },
      { metric: 'Weekly Active Users', value: 1450, trend: '+10%' },
      { metric: 'Monthly Active Users', value: 2100, trend: '+12%' },
      { metric: 'Session Duration (avg)', value: '45 min', trend: '+5%' },
    ],
    adoptionMetrics: [
      { month: 'Aug', adoption: 45 },
      { month: 'Sep', adoption: 52 },
      { month: 'Oct', adoption: 61 },
      { month: 'Nov', adoption: 72 },
      { month: 'Dec', adoption: 85 },
    ],
  };

  const impactMetrics = {
    learningImprovement: 18,
    engagementLevel: 82,
    completionRate: 91,
    improvementTrends: [
      { concept: 'Mathematics', improvement: 22, students: 450 },
      { concept: 'Science', improvement: 16, students: 420 },
      { concept: 'English', improvement: 19, students: 380 },
    ],
  };

  const roiView = {
    institutionalAdoption: 85,
    scalabilityScore: 92,
    costPerStudent: '$12.50',
    roi: '340%',
    adoptionByInstitution: [
      { institution: 'Central High School', adoption: 95, students: 450 },
      { institution: 'North Academy', adoption: 88, students: 380 },
      { institution: 'East Learning Center', adoption: 78, students: 320 },
      { institution: 'West University', adoption: 92, students: 520 },
    ],
  };

  return (
    <DashboardLayout role="investor" userId={user?.userId} onLogout={handleLogout}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Investor Dashboard</h1>
            <p className="text-gray-400 mt-2">Business Insights & ROI Analytics</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-400">{roiView.roi}</p>
            <p className="text-gray-400">Current ROI</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-white/10 overflow-x-auto">
          {[
            { id: 'insights', label: '💼 Business Insights', icon: '💼' },
            { id: 'impact', label: '📊 Impact Metrics', icon: '📊' },
            { id: 'roi', label: '💰 ROI & Scalability', icon: '💰' },
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

        {/* Business Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Platform Users</p>
                <p className="text-3xl font-bold text-blue-400">{businessInsights.platformUsers}</p>
                <p className="text-xs text-gray-500 mt-2">Total registered</p>
              </div>
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Active Users</p>
                <p className="text-3xl font-bold text-green-400">{businessInsights.activeUsers}</p>
                <p className="text-xs text-gray-500 mt-2">This month</p>
              </div>
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Monthly Growth</p>
                <p className="text-3xl font-bold text-cyan-400">{businessInsights.monthlyGrowth}</p>
                <p className="text-xs text-gray-500 mt-2">User adoption</p>
              </div>
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Retention Rate</p>
                <p className="text-3xl font-bold text-purple-400">{businessInsights.retentionRate}%</p>
                <p className="text-xs text-gray-500 mt-2">User retention</p>
              </div>
            </div>

            {/* Usage Statistics */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">📊 Usage Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businessInsights.usageStats.map((stat, idx) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-white">{stat.metric}</p>
                      <span className="text-green-400 text-sm font-medium">{stat.trend}</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-400">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* User Adoption Trends */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">📈 User Adoption Trends</h3>
              <div className="flex items-end justify-around h-48 gap-2 p-4 bg-white/5 rounded-lg">
                {businessInsights.adoptionMetrics.map((data, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <div
                      className="w-12 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-cyan-500"
                      style={{ height: `${(data.adoption / 100) * 150}px` }}
                    />
                    <p className="text-xs text-gray-400">{data.month}</p>
                    <p className="text-xs font-bold text-blue-300">{data.adoption}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Impact Metrics Tab */}
        {activeTab === 'impact' && (
          <div className="space-y-6">
            {/* Learning Improvement */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="backdrop-blur-xl bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Learning Improvement</p>
                <p className="text-3xl font-bold text-green-400">{impactMetrics.learningImprovement}%</p>
                <p className="text-xs text-gray-500 mt-2">Average improvement</p>
              </div>
              <div className="backdrop-blur-xl bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Engagement Level</p>
                <p className="text-3xl font-bold text-blue-400">{impactMetrics.engagementLevel}%</p>
                <p className="text-xs text-gray-500 mt-2">User engagement</p>
              </div>
              <div className="backdrop-blur-xl bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Completion Rate</p>
                <p className="text-3xl font-bold text-purple-400">{impactMetrics.completionRate}%</p>
                <p className="text-xs text-gray-500 mt-2">Course completion</p>
              </div>
            </div>

            {/* Learning Improvement Trends */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">📚 Learning Improvement by Subject</h3>
              <div className="space-y-4">
                {impactMetrics.improvementTrends.map((trend, idx) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-white">{trend.concept}</p>
                        <p className="text-xs text-gray-400">{trend.students} students</p>
                      </div>
                      <p className="text-2xl font-bold text-green-400">{trend.improvement}%</p>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                        style={{ width: `${trend.improvement}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement Metrics */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">🎯 Engagement Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="text-sm text-gray-400 mb-2">Daily Active Users</p>
                  <p className="text-2xl font-bold text-blue-400">856</p>
                  <p className="text-xs text-gray-400 mt-1">↑ 8% from last week</p>
                </div>
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <p className="text-sm text-gray-400 mb-2">Average Session Duration</p>
                  <p className="text-2xl font-bold text-green-400">45 min</p>
                  <p className="text-xs text-gray-400 mt-1">↑ 5% from last week</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ROI & Scalability Tab */}
        {activeTab === 'roi' && (
          <div className="space-y-6">
            {/* ROI Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="backdrop-blur-xl bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">ROI</p>
                <p className="text-3xl font-bold text-green-400">{roiView.roi}</p>
                <p className="text-xs text-gray-500 mt-2">Return on investment</p>
              </div>
              <div className="backdrop-blur-xl bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Cost per Student</p>
                <p className="text-3xl font-bold text-blue-400">{roiView.costPerStudent}</p>
                <p className="text-xs text-gray-500 mt-2">Monthly cost</p>
              </div>
              <div className="backdrop-blur-xl bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Institutional Adoption</p>
                <p className="text-3xl font-bold text-purple-400">{roiView.institutionalAdoption}%</p>
                <p className="text-xs text-gray-500 mt-2">Adoption rate</p>
              </div>
              <div className="backdrop-blur-xl bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Scalability Score</p>
                <p className="text-3xl font-bold text-cyan-400">{roiView.scalabilityScore}%</p>
                <p className="text-xs text-gray-500 mt-2">System capacity</p>
              </div>
            </div>

            {/* Institutional Adoption Data */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">🏢 Adoption by Institution</h3>
              <div className="space-y-4">
                {roiView.adoptionByInstitution.map((inst, idx) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-white">{inst.institution}</p>
                        <p className="text-xs text-gray-400">{inst.students} students</p>
                      </div>
                      <p className="text-2xl font-bold text-blue-400">{inst.adoption}%</p>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                        style={{ width: `${inst.adoption}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scalability Indicators */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">📈 Scalability Indicators</h3>
              <div className="space-y-3">
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <p className="font-medium text-white mb-1">✓ Excellent Scalability</p>
                  <p className="text-sm text-gray-400">System can handle 5x current load without degradation.</p>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="font-medium text-white mb-1">📊 Growth Projection</p>
                  <p className="text-sm text-gray-400">At current growth rate, will reach 10,000 users in 12 months.</p>
                </div>
                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <p className="font-medium text-white mb-1">💰 Revenue Potential</p>
                  <p className="text-sm text-gray-400">Projected annual revenue: $2.5M at current adoption rate.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
