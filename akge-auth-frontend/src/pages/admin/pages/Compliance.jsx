import React, { useState } from 'react';
import useAdminStore from '../store/useAdminStore';

const REQ_STYLE = {
  pending:  { bg: 'bg-yellow-50 border-yellow-200', badge: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Pending' },
  approved: { bg: 'bg-green-50 border-green-200',   badge: 'bg-green-100 text-green-700 border-green-200',   label: 'Approved' },
  rejected: { bg: 'bg-red-50 border-red-200',       badge: 'bg-red-100 text-red-600 border-red-200',         label: 'Rejected' },
};

const CONSENT_STYLE = {
  granted: 'bg-green-100 text-green-700 border-green-200',
  revoked: 'bg-red-100 text-red-600 border-red-200',
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
};

export default function Compliance() {
  const { consents, requests, auditLogs, retentionPolicy, updateRequest, updateRetentionPolicy } = useAdminStore();
  const [tab, setTab] = useState('requests');
  const [auditFilter, setAuditFilter] = useState('');
  const [policySaved, setPolicySaved] = useState(false);
  const [localPolicy, setLocalPolicy] = useState({ ...retentionPolicy });

  const handleSavePolicy = () => {
    updateRetentionPolicy(localPolicy);
    setPolicySaved(true);
    setTimeout(() => setPolicySaved(false), 2000);
  };

  const filteredLogs = auditLogs.filter(l =>
    auditFilter === '' || l.actor.includes(auditFilter) || l.target.includes(auditFilter) || l.action.toLowerCase().includes(auditFilter.toLowerCase())
  );

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-800">DPDP Compliance</h1>
          <p className="text-slate-400 text-sm mt-0.5">Data Protection and Privacy management</p>
        </div>
        {pendingCount > 0 && (
          <span className="px-3 py-1.5 rounded-xl bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm font-bold">
            ⏳ {pendingCount} pending request{pendingCount > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {[
          { id: 'requests',  label: 'Data Requests' },
          { id: 'consents',  label: 'Consent Status' },
          { id: 'policy',    label: 'Retention Policy' },
          { id: 'audit',     label: 'Audit Logs' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 text-sm font-semibold transition-all border-b-2 ${tab === t.id ? 'border-red-500 text-red-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Data Requests */}
      {tab === 'requests' && (
        <div className="space-y-3">
          {requests.map(r => {
            const s = REQ_STYLE[r.status];
            return (
              <div key={r.id} className={`rounded-2xl p-5 border ${s.bg}`}>
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold border capitalize ${s.badge}`}>{s.label}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border capitalize ${r.type === 'access' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-red-100 text-red-600 border-red-200'}`}>{r.type}</span>
                    </div>
                    <p className="text-slate-800 font-semibold text-sm">{r.userName}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{r.reason}</p>
                    <p className="text-slate-400 text-xs mt-1">{r.date}</p>
                  </div>
                  {r.status === 'pending' && (
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => updateRequest(r.id, 'approved')}
                        className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-all">
                        ✅ Approve
                      </button>
                      <button onClick={() => updateRequest(r.id, 'rejected')}
                        className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all">
                        ❌ Reject
                      </button>
                      {r.type === 'access' && (
                        <button className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition-all">
                          📥 Export Data
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Consent Status */}
      {tab === 'consents' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['User', 'Consent Status', 'Scope', 'Date', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {consents.map(c => (
                <tr key={c.userId} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-slate-800 font-semibold text-sm">{c.userName}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border capitalize ${CONSENT_STYLE[c.status]}`}>{c.status}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-sm capitalize">{c.scope}</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{c.date}</td>
                  <td className="px-4 py-3">
                    <button className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition-all">
                      📥 Export
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Retention Policy */}
      {tab === 'policy' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm max-w-lg">
          <h3 className="text-base font-bold text-slate-800 mb-4">Data Retention Policy</h3>
          <div className="space-y-4">
            <div>
              <label className="text-slate-600 text-sm font-semibold block mb-1.5">Retention Period (days)</label>
              <input type="number" value={localPolicy.days} onChange={e => setLocalPolicy(p => ({ ...p, days: Number(e.target.value) }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:border-red-400 transition-colors" />
            </div>
            <div>
              <label className="text-slate-600 text-sm font-semibold block mb-1.5">Notify Before Deletion (days)</label>
              <input type="number" value={localPolicy.notifyBefore} onChange={e => setLocalPolicy(p => ({ ...p, notifyBefore: Number(e.target.value) }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:border-red-400 transition-colors" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-slate-700 font-semibold text-sm">Auto-Delete Expired Data</p>
                <p className="text-slate-400 text-xs mt-0.5">Automatically delete data after retention period</p>
              </div>
              <button onClick={() => setLocalPolicy(p => ({ ...p, autoDelete: !p.autoDelete }))}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${localPolicy.autoDelete ? 'bg-red-500' : 'bg-slate-300'}`}>
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${localPolicy.autoDelete ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
          <button onClick={handleSavePolicy}
            className={`mt-5 w-full py-3 rounded-xl font-bold text-sm transition-all ${policySaved ? 'bg-green-50 border border-green-200 text-green-600' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
            {policySaved ? '✅ Policy Saved!' : '💾 Save Policy'}
          </button>
        </div>
      )}

      {/* Audit Logs */}
      {tab === 'audit' && (
        <div className="space-y-4">
          <input value={auditFilter} onChange={e => setAuditFilter(e.target.value)} placeholder="Filter by user, action, or target…"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:border-red-400 transition-colors bg-white" />
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {['Actor', 'Action', 'Target', 'Module', 'Date'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map(l => (
                  <tr key={l.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-slate-700 text-sm font-medium">{l.actor}</td>
                    <td className="px-4 py-3 text-slate-600 text-sm">{l.action}</td>
                    <td className="px-4 py-3 text-slate-500 text-sm">{l.target}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold capitalize">{l.module}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{l.date}</td>
                  </tr>
                ))}
                {filteredLogs.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400 text-sm">No logs match your filter</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
