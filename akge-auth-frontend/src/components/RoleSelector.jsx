import React from 'react';

const ROLES = [
  { value: 'student', label: 'Student', icon: '👨‍🎓' },
  { value: 'parent', label: 'Parent', icon: '👨‍👩‍👧' },
  { value: 'teacher', label: 'Teacher', icon: '👨‍🏫' },
  { value: 'management', label: 'Management', icon: '👔' },
  { value: 'admin', label: 'Admin', icon: '⚙️' },
  { value: 'investor', label: 'Investor', icon: '💼' },
  { value: 'board', label: 'Board Member', icon: '🏛️' },
];

export default function RoleSelector({ value, onChange }) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-200">
        Select Your Role
      </label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {ROLES.map((role) => (
          <button
            key={role.value}
            onClick={() => onChange(role.value)}
            className={`
              relative p-3 rounded-lg transition-all duration-300 transform
              ${value === role.value
                ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50 scale-105'
                : 'bg-white/10 hover:bg-white/20 hover:scale-105'
              }
              border border-white/20 hover:border-white/40
              text-center group
            `}
          >
            <div className="text-2xl mb-1">{role.icon}</div>
            <div className={`text-xs font-medium ${
              value === role.value ? 'text-white' : 'text-gray-300'
            }`}>
              {role.label}
            </div>
            {value === role.value && (
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-400/20 to-transparent pointer-events-none" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
