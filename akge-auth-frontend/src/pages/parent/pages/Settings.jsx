import React, { useState } from 'react';
import useParentStore from '../store/useParentStore';

const Toggle = ({ value, onChange, label, desc }) => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors">
    <div>
      <p className="text-slate-700 font-semibold text-sm">{label}</p>
      {desc && <p className="text-slate-400 text-xs mt-0.5">{desc}</p>}
    </div>
    <button onClick={() => onChange(!value)}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 shrink-0 ${value ? 'bg-blue-500' : 'bg-slate-300'}`}>
      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${value ? 'left-7' : 'left-1'}`} />
    </button>
  </div>
);

export default function Settings() {
  const { settings, updateSettings, resetSettings } = useParentStore();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 rounded-2xl p-6">
        <h1 className="text-2xl font-black text-slate-800">Privacy & Settings</h1>
        <p className="text-slate-500 mt-1 text-sm">Manage notifications, data visibility, and privacy controls</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-4">🔔 Notifications</h3>
          <div className="space-y-3">
            <Toggle value={settings.emailAlerts} onChange={v => updateSettings({ emailAlerts: v })}
              label="Email Alerts" desc="Receive email notifications for important alerts" />
            <Toggle value={settings.smsAlerts} onChange={v => updateSettings({ smsAlerts: v })}
              label="SMS Alerts" desc="Receive text messages for critical alerts" />
            <Toggle value={settings.weeklyReport} onChange={v => updateSettings({ weeklyReport: v })}
              label="Weekly Report" desc="Get a weekly summary of Sarah's performance" />
            <Toggle value={settings.lowPerformance} onChange={v => updateSettings({ lowPerformance: v })}
              label="Low Performance Alerts" desc="Alert when mastery drops below threshold" />
            <Toggle value={settings.missedSessions} onChange={v => updateSettings({ missedSessions: v })}
              label="Missed Session Alerts" desc="Alert when Sarah misses scheduled sessions" />
            <Toggle value={settings.achievements} onChange={v => updateSettings({ achievements: v })}
              label="Achievement Notifications" desc="Celebrate Sarah's milestones with you" />
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-4">🔒 Privacy Controls</h3>
          <div className="space-y-3">
            <Toggle value={settings.shareWithTeacher} onChange={v => updateSettings({ shareWithTeacher: v })}
              label="Share Data with Teacher" desc="Allow teacher to see Sarah's detailed progress" />
            <Toggle value={settings.allowAnalytics} onChange={v => updateSettings({ allowAnalytics: v })}
              label="Allow Analytics" desc="Help improve the platform with anonymized data" />

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-slate-700 font-semibold text-sm mb-2">Data Visibility</p>
              <p className="text-slate-400 text-xs mb-3">Control what data is visible to others</p>
              <div className="flex gap-2">
                {['full', 'limited', 'minimal'].map(v => (
                  <button key={v} onClick={() => updateSettings({ dataVisibility: v })}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all border capitalize ${
                      settings.dataVisibility === v
                        ? 'bg-blue-50 border-blue-200 text-blue-600'
                        : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
                    }`}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* DPDP compliance */}
          <div className="mt-4 p-4 rounded-xl bg-green-50 border border-green-100">
            <p className="text-green-700 font-semibold text-sm mb-1">✅ DPDP Act Compliant</p>
            <p className="text-slate-500 text-xs">Your data rights are protected. You can request data access, correction, or deletion at any time.</p>
            <div className="flex gap-2 mt-3">
              <button className="px-3 py-1.5 rounded-lg bg-white border border-green-200 text-green-600 text-xs font-semibold hover:bg-green-50 transition-all">
                📥 Download Data
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-white border border-red-200 text-red-500 text-xs font-semibold hover:bg-red-50 transition-all">
                🗑️ Delete Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Current config */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <h3 className="text-base font-bold text-slate-800 mb-3">Current Configuration</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Email Alerts',   value: settings.emailAlerts ? 'ON' : 'OFF',   color: settings.emailAlerts ? 'text-green-600' : 'text-slate-400' },
            { label: 'Weekly Report',  value: settings.weeklyReport ? 'ON' : 'OFF',  color: settings.weeklyReport ? 'text-green-600' : 'text-slate-400' },
            { label: 'Data Visibility',value: settings.dataVisibility,               color: 'text-blue-600' },
            { label: 'Teacher Share',  value: settings.shareWithTeacher ? 'ON' : 'OFF', color: settings.shareWithTeacher ? 'text-green-600' : 'text-slate-400' },
          ].map(s => (
            <div key={s.label} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-slate-400 text-xs mb-1">{s.label}</p>
              <p className={`font-black text-base capitalize ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={handleSave}
          className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
            saved
              ? 'bg-green-50 border border-green-200 text-green-600'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
          }`}>
          {saved ? '✅ Settings Saved!' : '💾 Save Settings'}
        </button>
        <button onClick={resetSettings}
          className="px-6 py-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-700 font-semibold text-sm transition-all border border-slate-200">
          ↩ Reset
        </button>
      </div>
    </div>
  );
}
