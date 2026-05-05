import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import DashboardLayout from '../../components/DashboardLayout';

const allRecs = [
  { priority: 'critical', icon: '🔴', action: 'Re-teach Algebra Basics',           reason: 'Root cause of 3 downstream failures',  impact: '+18%', category: 'revision',    done: false },
  { priority: 'critical', icon: '🔴', action: 'Assign Trigonometry practice set',   reason: '72% class weakness detected',           impact: '+15%', category: 'practice',    done: false },
  { priority: 'high',     icon: '🟡', action: 'Schedule Calculus revision session', reason: 'Prerequisite gaps from Algebra',         impact: '+12%', category: 'revision',    done: false },
  { priority: 'high',     icon: '🟡', action: 'Peer tutoring: Alice → David',       reason: 'Fast learner can support at-risk peer',  impact: '+10%', category: 'peer',        done: false },
  { priority: 'medium',   icon: '🟢', action: 'Assign enrichment to top 3',         reason: 'Advanced students need challenge',       impact: 'Enrichment', category: 'next', done: false },
  { priority: 'medium',   icon: '🟢', action: 'Daily 20-min review sessions',       reason: 'Improve consistency score',              impact: '+consistency', category: 'habit', done: false },
];

const priorityStyle = {
  critical: { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.4)', badge: 'bg-red-500/20 text-red-300' },
  high:     { bg: 'rgba(234,179,8,0.10)', border: 'rgba(234,179,8,0.4)', badge: 'bg-yellow-500/20 text-yellow-300' },
  medium:   { bg: 'rgba(34,197,94,0.10)', border: 'rgba(34,197,94,0.35)', badge: 'bg-green-500/20 text-green-300' },
};

export default function Recommendations() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [recs, setRecs] = useState(allRecs);
  const handleLogout = () => { logout(); navigate('/login'); };

  const toggleDone = (i) => setRecs(prev => prev.map((r, idx) => idx === i ? { ...r, done: !r.done } : r));

  const done = recs.filter(r => r.done).length;

  return (
    <DashboardLayout role="teacher" userId={user?.userId} onLogout={handleLogout}>
      <div className="space-y-6">
        <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-white/20 rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-black text-white">Recommendations</h1>
              <p className="text-gray-300 mt-1">AI-suggested actions to improve class performance</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-green-400">{done}/{recs.length}</p>
              <p className="text-gray-400 text-sm">completed</p>
            </div>
          </div>
          <div className="mt-4 w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-700" style={{ width: `${(done / recs.length) * 100}%` }} />
          </div>
        </div>

        <div className="space-y-3">
          {recs.map((r, i) => {
            const s = priorityStyle[r.priority];
            return (
              <div key={i} className={`rounded-2xl p-4 flex items-start gap-4 transition-all duration-200 ${r.done ? 'opacity-50' : ''}`}
                style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                <span className="text-xl shrink-0 mt-0.5">{r.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className={`text-white font-semibold ${r.done ? 'line-through' : ''}`}>{r.action}</p>
                    <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-bold capitalize ${s.badge}`}>{r.priority}</span>
                  </div>
                  <p className="text-gray-400 text-xs mb-1">{r.reason}</p>
                  <p className="text-green-400 text-xs font-medium">📈 {r.impact}</p>
                </div>
                <button onClick={() => toggleDone(i)}
                  className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    r.done ? 'bg-green-500 border-green-500 text-white' : 'border-white/20 text-gray-500 hover:border-green-400 hover:text-green-400'
                  }`}>
                  {r.done ? '✓' : '○'}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={() => navigate('/teacher/weak-concepts')} className="px-5 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 transition-all font-semibold text-sm">⚠️ Weak Concepts</button>
          <button onClick={() => navigate('/teacher/prereq-gaps')} className="px-5 py-2.5 rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-300 hover:bg-orange-500/30 transition-all font-semibold text-sm">🕸️ Prereq Gaps</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
