import React, { useState } from 'react';
import useAdminStore from '../store/useAdminStore';
import { ROLES } from '../data/adminData';

const STATUS_STYLE = {
  active:    'bg-green-100 text-green-700 border-green-200',
  inactive:  'bg-slate-100 text-slate-500 border-slate-200',
  suspended: 'bg-red-100 text-red-600 border-red-200',
};
const ROLE_STYLE = {
  admin:      'bg-red-50 text-red-600 border-red-200',
  teacher:    'bg-blue-50 text-blue-600 border-blue-200',
  student:    'bg-green-50 text-green-600 border-green-200',
  parent:     'bg-yellow-50 text-yellow-600 border-yellow-200',
  management: 'bg-purple-50 text-purple-600 border-purple-200',
  investor:   'bg-indigo-50 text-indigo-600 border-indigo-200',
  board:      'bg-pink-50 text-pink-600 border-pink-200',
};

const EMPTY_FORM = { name: '', email: '', role: 'student', status: 'active' };

export default function Users() {
  const { users, selectedUsers, addUser, updateUser, deleteUser, toggleUserStatus, toggleSelectUser, selectAllUsers, clearSelection, bulkUpdateRole, bulkUpdateStatus } = useAdminStore();

  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState('');
  const [page, setPage] = useState(1);
  const [activityUser, setActivityUser] = useState(null);
  const PER_PAGE = 8;

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole   = filterRole === 'all' || u.role === filterRole;
    const matchStatus = filterStatus === 'all' || u.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const openAdd = () => { setForm(EMPTY_FORM); setEditUser(null); setFormError(''); setShowModal(true); };
  const openEdit = (u) => { setForm({ name: u.name, email: u.email, role: u.role, status: u.status }); setEditUser(u); setFormError(''); setShowModal(true); };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim()) { setFormError('Name and email are required.'); return; }
    if (!/\S+@\S+\.\S+/.test(form.email)) { setFormError('Enter a valid email address.'); return; }
    if (editUser) updateUser(editUser.id, form);
    else addUser(form);
    setShowModal(false);
  };

  const allPageIds = paginated.map(u => u.id);
  const allSelected = allPageIds.every(id => selectedUsers.includes(id)) && allPageIds.length > 0;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-800">User Management</h1>
          <p className="text-slate-400 text-sm mt-0.5">{users.length} total users</p>
        </div>
        <button onClick={openAdd}
          className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all shadow-md">
          ➕ Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search name or email…"
          className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:border-red-400 transition-colors flex-1 min-w-48 bg-white" />
        <select value={filterRole} onChange={e => { setFilterRole(e.target.value); setPage(1); }}
          className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm focus:outline-none bg-white">
          <option value="all">All Roles</option>
          {ROLES.map(r => <option key={r} value={r} className="capitalize">{r}</option>)}
        </select>
        <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
          className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm focus:outline-none bg-white">
          <option value="all">All Status</option>
          {['active','inactive','suspended'].map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
        </select>
      </div>

      {/* Bulk actions */}
      {selectedUsers.length > 0 && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200">
          <span className="text-blue-700 text-sm font-semibold">{selectedUsers.length} selected</span>
          <select onChange={e => e.target.value && bulkUpdateRole(e.target.value)} defaultValue=""
            className="px-3 py-1.5 rounded-lg border border-blue-200 text-blue-700 text-xs bg-white">
            <option value="">Change Role…</option>
            {ROLES.map(r => <option key={r} value={r} className="capitalize">{r}</option>)}
          </select>
          <select onChange={e => e.target.value && bulkUpdateStatus(e.target.value)} defaultValue=""
            className="px-3 py-1.5 rounded-lg border border-blue-200 text-blue-700 text-xs bg-white">
            <option value="">Change Status…</option>
            {['active','inactive','suspended'].map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
          </select>
          <button onClick={clearSelection} className="text-blue-500 text-xs hover:text-blue-700 ml-auto">Clear ✕</button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-4 py-3 text-left">
                <input type="checkbox" checked={allSelected} onChange={() => allSelected ? clearSelection() : selectAllUsers(allPageIds)}
                  className="w-4 h-4 accent-red-500" />
              </th>
              {['User', 'Role', 'Status', 'Last Login', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map(u => (
              <tr key={u.id} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${selectedUsers.includes(u.id) ? 'bg-blue-50' : ''}`}>
                <td className="px-4 py-3">
                  <input type="checkbox" checked={selectedUsers.includes(u.id)} onChange={() => toggleSelectUser(u.id)}
                    className="w-4 h-4 accent-red-500" />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{u.avatar}</span>
                    <div>
                      <p className="text-slate-800 font-semibold text-sm">{u.name}</p>
                      <p className="text-slate-400 text-xs">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border capitalize ${ROLE_STYLE[u.role] ?? 'bg-slate-100 text-slate-600 border-slate-200'}`}>{u.role}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border capitalize ${STATUS_STYLE[u.status]}`}>{u.status}</span>
                </td>
                <td className="px-4 py-3 text-slate-400 text-xs">{u.lastLogin}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => openEdit(u)} className="px-2.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition-all">Edit</button>
                    <button onClick={() => toggleUserStatus(u.id)} className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${u.status === 'active' ? 'bg-yellow-50 border-yellow-200 text-yellow-600 hover:bg-yellow-100' : 'bg-green-50 border-green-200 text-green-600 hover:bg-green-100'}`}>
                      {u.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button onClick={() => setActivityUser(u)} className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 text-xs font-semibold hover:bg-slate-100 transition-all">Log</button>
                    <button onClick={() => deleteUser(u.id)} className="px-2.5 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-500 text-xs font-semibold hover:bg-red-100 transition-all">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400 text-sm">No users match your filter</td></tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
            <span className="text-slate-400 text-xs">{filtered.length} results</span>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${page === p ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-black text-slate-800 mb-4">{editUser ? 'Edit User' : 'Add New User'}</h3>
            {formError && <p className="text-red-500 text-sm mb-3 p-2 bg-red-50 rounded-lg border border-red-200">{formError}</p>}
            <div className="space-y-3">
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:border-red-400 transition-colors" />
              <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="Email address"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:border-red-400 transition-colors" />
              <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none">
                {ROLES.map(r => <option key={r} value={r} className="capitalize">{r}</option>)}
              </select>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none">
                {['active','inactive','suspended'].map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
              </select>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handleSubmit} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-all">
                {editUser ? '💾 Save Changes' : '➕ Add User'}
              </button>
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-sm transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activity log modal */}
      {activityUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setActivityUser(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-black text-slate-800 mb-4">Activity Log — {activityUser.name}</h3>
            <div className="space-y-2">
              {[
                { action: 'Logged in', time: activityUser.lastLogin },
                { action: 'Completed Algebra quiz (82%)', time: '2026-05-04 15:30' },
                { action: 'Revised Fractions module', time: '2026-05-04 14:00' },
                { action: 'Earned "Streak Master" badge', time: '2026-05-03 10:00' },
              ].map((a, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-700 text-sm">{a.action}</span>
                  <span className="text-slate-400 text-xs">{a.time}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setActivityUser(null)} className="mt-4 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-sm transition-all">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
