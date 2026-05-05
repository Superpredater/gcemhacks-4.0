import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';
import useMgmtStore from '../store/useMgmtStore';
import { weeklyActivity } from '../data/mgmtData';

function KPICard({ label, value, trend, icon, color }) {
  const isUp = trend >= 0;
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${isUp ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {isUp ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      </div>
      <p className="text-3xl font-black" style={{ color }}>{typeof value === 'number' && value > 999 ? value.toLocaleString() : value}{label === 'Avg Mastery' ? '%' : ''}</p>
      <p className="text-slate-400 text-xs mt-1">{label}</p>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="backdrop-blur-xl bg-slate-900/95 border border-white/20 rounded-xl p-3 text-sm">
      <p className="text-white font-bold mb-1">{label}</p>
      {payload.map(p => <p key={p.dataKey} style={{ color: p.color }} className="font-semibold">{p.name}: {p.value.toLocaleString()}</p>)}
    </div>
  );
};

export default function MgmtDashboard() {
  const navigate = useNavigate();
  const { kpis } = useMgmtStore();

  const risks = [
    { text: 'Trigonometry mastery below 50% in Grade 9', severity: 'high' },
    { text: 'Physics engagement dropped 8% this week', severity: 'medium' },
    { text: 'System response time elevated at peak hours', severity: 'low' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 border border-white/20 rounded-2xl p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Management Dashboard</h1>
            <p className="text-slate-400 mt-1 text-sm">Institution-wide performance overview</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/management/growth')}
              className="px-5 py-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 font-semibold text-sm hover:bg-blue-500/30 transition-all">
              📈 View Growth
            </button>
            <button onClick={() => navigate('/management/subjects')}
              className="px-5 py-2.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 font-semibold text-sm hover:bg-purple-500/30 transition-all">
              📚 View Subjects
            </button>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Total Students" value={kpis.totalStudents} trend={kpis.trends.totalStudents} icon="👥" color="#3b82f6" />
        <KPICard label="Total Teachers" value={kpis.totalTeachers} trend={kpis.trends.totalTeachers} icon="👨‍🏫" color="#8b5cf6" />
        <KPICard label="Avg Mastery"    value={kpis.averageMastery} trend={kpis.trends.averageMastery} icon="📊" color="#22c55e" />
        <KPICard label="Active Users"   value={kpis.activeUsers}   trend={kpis.trends.activeUsers}   icon="⚡" color="#f59e0b" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly activity bar chart */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-4">Weekly Activity Overview</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyActivity} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <Bar dataKey="students" name="Students" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={30} />
              <Bar dataKey="teachers" name="Teachers" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sessions trend */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-4">Daily Sessions Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="sessions" name="Sessions" stroke="#22c55e" strokeWidth={2.5}
                dot={{ r: 4, fill: '#22c55e', strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk alerts */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-4">⚠️ Risk Highlights</h3>
        <div className="space-y-3">
          {risks.map((r, i) => {
            const s = r.severity === 'high' ? 'bg-red-500/10 border-red-500/30 text-red-300'
              : r.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300'
              : 'bg-blue-500/10 border-blue-500/30 text-blue-300';
            return (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${s}`}>
                <span>{r.severity === 'high' ? '🔴' : r.severity === 'medium' ? '🟡' : '🔵'}</span>
                <p className="text-sm font-medium">{r.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
