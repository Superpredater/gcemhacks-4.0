import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useParentStore from '../store/useParentStore';

const alertStyle = {
  critical: { bg: 'bg-red-50 border-red-200',    icon: '🚨', badge: 'bg-red-100 text-red-600 border-red-200',    label: 'Critical' },
  warning:  { bg: 'bg-orange-50 border-orange-200', icon: '⚠️', badge: 'bg-orange-100 text-orange-600 border-orange-200', label: 'Warning' },
  info:     { bg: 'bg-blue-50 border-blue-200',   icon: 'ℹ️', badge: 'bg-blue-100 text-blue-600 border-blue-200',   label: 'Info' },
  success:  { bg: 'bg-green-50 border-green-200', icon: '✅', badge: 'bg-green-100 text-green-600 border-green-200', label: 'Success' },
};

export default function Alerts() {
  const navigate = useNavigate();
  const { alerts, markAlertRead, markAllRead, dismissAlert, getUnreadCount } = useParentStore();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? alerts
    : filter === 'unread' ? alerts.filter(a => !a.read)
    : alerts.filter(a => a.type === filter);

  const unread = getUnreadCount();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800">Alerts</h1>
            <p className="text-slate-500 mt-1 text-sm">Performance alerts and important notifications</p>
          </div>
          <div className="flex items-center gap-3">
            {unread > 0 && (
              <span className="px-3 py-1.5 rounded-xl bg-red-100 border border-red-200 text-red-600 text-sm font-bold">
                {unread} unread
              </span>
            )}
            {unread > 0 && (
              <button onClick={markAllRead}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
                Mark all read
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {['all', 'unread', 'critical', 'warning', 'info', 'success'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border capitalize ${
              filter === f ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
            }`}>
            {f}
          </button>
        ))}
      </div>

      {/* Alert list */}
      <div className="space-y-3">
        {filtered.map(a => {
          const s = alertStyle[a.type] ?? alertStyle.info;
          return (
            <div key={a.id} className={`rounded-2xl border transition-all duration-200 ${s.bg} ${!a.read ? 'ring-1 ring-blue-200' : ''}`}>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">{s.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className={`text-slate-800 font-semibold text-sm ${!a.read ? 'font-bold' : ''}`}>{a.title}</p>
                        {!a.read && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
                      </div>
                      <p className="text-slate-500 text-xs">{a.desc}</p>
                      <p className="text-slate-400 text-xs mt-1">{a.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${s.badge}`}>{s.label}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 ml-8">
                  {!a.read && (
                    <button onClick={() => markAlertRead(a.id)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 text-xs font-semibold hover:bg-slate-50 transition-all">
                      Mark read
                    </button>
                  )}
                  <button onClick={() => navigate(`/parent/${a.module}`)}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition-all">
                    View details →
                  </button>
                  <button onClick={() => dismissAlert(a.id)}
                    className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-400 text-xs font-semibold hover:bg-slate-100 transition-all">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
            <span className="text-4xl">✅</span>
            <p className="text-slate-600 font-bold mt-3">No alerts in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
