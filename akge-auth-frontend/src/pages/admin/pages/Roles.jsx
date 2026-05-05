import React, { useState } from 'react';
import useAdminStore from '../store/useAdminStore';
import { MODULES, ACTIONS } from '../data/adminData';

export default function Roles() {
  const { roles, selectedRoleId, setSelectedRole, togglePermission, addRole, resetRole, users, updateUser } = useAdminStore();
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleColor, setNewRoleColor] = useState('#6366f1');
  const [saved, setSaved] = useState(false);
  const [assignUserId, setAssignUserId] = useState('');
  const [assignRoleId, setAssignRoleId] = useState('');

  const selectedRole = roles.find(r => r.id === selectedRoleId);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAddRole = () => {
    if (!newRoleName.trim()) return;
    addRole(newRoleName.trim(), newRoleColor);
    setNewRoleName('');
  };

  const handleAssign = () => {
    if (!assignUserId || !assignRoleId) return;
    const role = roles.find(r => r.id === assignRoleId);
    if (role) updateUser(Number(assignUserId), { role: role.name.toLowerCase() });
    setAssignUserId('');
    setAssignRoleId('');
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-slate-800">Roles & Permissions</h1>
        <p className="text-slate-400 text-sm mt-0.5">Manage role-based access control (RBAC)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Role list */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-3">Roles</h3>
          <div className="space-y-2 mb-4">
            {roles.map(r => (
              <button key={r.id} onClick={() => setSelectedRole(r.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all border text-left ${selectedRoleId === r.id ? 'bg-slate-50 border-slate-300' : 'border-transparent hover:bg-slate-50'}`}>
                <span className="w-3 h-3 rounded-full shrink-0" style={{ background: r.color }} />
                <span className={`text-sm font-semibold ${selectedRoleId === r.id ? 'text-slate-800' : 'text-slate-500'}`}>{r.name}</span>
              </button>
            ))}
          </div>
          {/* Add role */}
          <div className="border-t border-slate-100 pt-3 space-y-2">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">New Role</p>
            <input value={newRoleName} onChange={e => setNewRoleName(e.target.value)} placeholder="Role name"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-700 text-xs focus:outline-none focus:border-red-400 transition-colors" />
            <div className="flex gap-2">
              <input type="color" value={newRoleColor} onChange={e => setNewRoleColor(e.target.value)}
                className="w-10 h-8 rounded-lg border border-slate-200 cursor-pointer" />
              <button onClick={handleAddRole}
                className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all">
                ➕ Add
              </button>
            </div>
          </div>
        </div>

        {/* Permission matrix */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          {selectedRole ? (
            <>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full" style={{ background: selectedRole.color }} />
                  <h3 className="text-base font-bold text-slate-800">{selectedRole.name} — Permission Matrix</h3>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => resetRole(selectedRole.id)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-all border border-slate-200">
                    ↩ Reset
                  </button>
                  <button onClick={handleSave}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${saved ? 'bg-green-50 border border-green-200 text-green-600' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
                    {saved ? '✅ Saved!' : '💾 Save Changes'}
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-2 px-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Module</th>
                      {ACTIONS.map(a => (
                        <th key={a} className="text-center py-2 px-4 text-xs font-bold text-slate-500 uppercase tracking-wide capitalize">{a}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MODULES.map(mod => (
                      <tr key={mod} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 text-slate-700 font-semibold text-sm capitalize">{mod}</td>
                        {ACTIONS.map(action => {
                          const checked = selectedRole.permissions[mod]?.[action] ?? false;
                          return (
                            <td key={action} className="py-3 px-4 text-center">
                              <button onClick={() => togglePermission(selectedRole.id, mod, action)}
                                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center mx-auto transition-all ${checked ? 'bg-red-500 border-red-500 text-white' : 'border-slate-300 hover:border-red-400'}`}>
                                {checked && <span className="text-xs font-bold">✓</span>}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-40 text-slate-400">Select a role to edit permissions</div>
          )}
        </div>
      </div>

      {/* Assign role to user */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-700 mb-3">Assign Role to User</h3>
        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wide block mb-1">User</label>
            <select value={assignUserId} onChange={e => setAssignUserId(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none bg-white min-w-48">
              <option value="">Select user…</option>
              {useAdminStore.getState().users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wide block mb-1">Role</label>
            <select value={assignRoleId} onChange={e => setAssignRoleId(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none bg-white min-w-40">
              <option value="">Select role…</option>
              {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
          <button onClick={handleAssign}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-all">
            Assign Role
          </button>
        </div>
      </div>
    </div>
  );
}
