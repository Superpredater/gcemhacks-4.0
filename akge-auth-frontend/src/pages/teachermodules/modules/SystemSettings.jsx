import React, { useState } from 'react';
import useModuleStore from '../store/useModuleStore';

const Toggle = ({ value, onChange, label, desc }) => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
    <div>
      <p className="text-white font-semibold text-sm">{label}</p>
      {desc && <p className="text-gray-400 text-xs mt-0.5">{desc}</p>}
    </div>
    <button onClick={() => onChange(!value)}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 shrink-0 ${value ? 'bg-blue-500' : 'bg-white/20'}`}>
      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${value ? 'left-7' : 'left-1'}`} />
    </button>
  </div>
);

const Slider = ({ value, onChange, label, min, max, unit }) => (
  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
    <div className="flex justify-between mb-2">
      <p className="text-white font-semibold text-sm">{label}</p>
      <span className="text-blue-400 font-bold text-sm">{value}{unit}</span>
    </div>
    <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))}
      className="w-full accent-blue-500" />
    <div className="flex justify-between text-xs text-gray-500 mt-1">
      <span>{min}{unit}</span><span>{max}{unit}</span>
    </div>
  </div>
);

export default function SystemSettings() {
  const { settings, updateSettings, resetSettings } = useModuleStore();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Thresholds */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-4">📊 Threshold Settings</h3>
          <div className="space-y-4">
            <Slider value={settings.weakThreshold} onChange={v => updateSettings({ weakThreshold: v })}
              label="Weak Concept Threshold" min={20} max={80} unit="%" />
            <Slider value={settings.riskThreshold} onChange={v => updateSettings({ riskThreshold: v })}
              label="At-Risk Student Threshold" min={20} max={70} unit="%" />
          </div>
          <div className="mt-4 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-blue-300 text-xs">
              Concepts below <span className="font-bold">{settings.weakThreshold}%</span> mastery are flagged as weak.
              Students below <span className="font-bold">{settings.riskThreshold}%</span> average are flagged at-risk.
            </p>
          </div>
        </div>

        {/* Notifications */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-4">🔔 Notifications</h3>
          <div className="space-y-3">
            <Toggle value={settings.emailAlerts} onChange={v => updateSettings({ emailAlerts: v })}
              label="Email Alerts" desc="Receive email notifications for student alerts" />
            <Toggle value={settings.weeklyReport} onChange={v => updateSettings({ weeklyReport: v })}
              label="Weekly Report" desc="Get a weekly summary of class performance" />
          </div>
        </div>

        {/* Learning Settings */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-4">🧠 Learning Settings</h3>
          <div className="space-y-3">
            <Toggle value={settings.adaptiveDiff} onChange={v => updateSettings({ adaptiveDiff: v })}
              label="Adaptive Difficulty" desc="Auto-adjust question difficulty based on performance" />
            <Toggle value={settings.peerCollab} onChange={v => updateSettings({ peerCollab: v })}
              label="Peer Collaboration" desc="Enable group activities and peer-to-peer learning" />
            <Toggle value={settings.spacedRep} onChange={v => updateSettings({ spacedRep: v })}
              label="Spaced Repetition" desc="Schedule concept reviews using spaced repetition" />
          </div>
        </div>

        {/* Role & Appearance */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-4">🎨 Appearance & Role</h3>
          <div className="space-y-4">
            <Toggle value={settings.darkMode} onChange={v => updateSettings({ darkMode: v })}
              label="Dark Mode" desc="Use dark theme across the platform" />
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white font-semibold text-sm mb-2">Role</p>
              <div className="flex gap-2">
                {['teacher', 'admin', 'management'].map(r => (
                  <button key={r} onClick={() => updateSettings({ role: r })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border capitalize ${
                      settings.role === r
                        ? 'bg-blue-500/30 border-blue-400 text-blue-300'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-gray-200'
                    }`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current config summary */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="text-base font-bold text-white mb-3">Current Configuration</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Weak Threshold', value: `${settings.weakThreshold}%`, color: '#ef4444' },
            { label: 'Risk Threshold', value: `${settings.riskThreshold}%`, color: '#f97316' },
            { label: 'Role', value: settings.role, color: '#3b82f6' },
            { label: 'Adaptive Diff', value: settings.adaptiveDiff ? 'ON' : 'OFF', color: settings.adaptiveDiff ? '#22c55e' : '#6b7280' },
          ].map(s => (
            <div key={s.label} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-xs text-gray-400 mb-1">{s.label}</p>
              <p className="font-black text-base capitalize" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={handleSave}
          className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
            saved
              ? 'bg-green-500/30 border border-green-500/50 text-green-300'
              : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white hover:shadow-lg hover:shadow-blue-500/30'
          }`}>
          {saved ? '✅ Settings Saved!' : '💾 Save Settings'}
        </button>
        <button onClick={resetSettings}
          className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white font-semibold text-sm transition-all border border-white/10">
          ↩ Reset
        </button>
      </div>
    </div>
  );
}
