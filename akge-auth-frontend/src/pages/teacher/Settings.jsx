import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import DashboardLayout from '../../components/DashboardLayout';

export default function Settings() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const handleLogout = () => { logout(); navigate('/login'); };

  const [settings, setSettings] = useState({
    adaptiveDifficulty: true,
    peerCollaboration: false,
    spacedRepetition: true,
    emailAlerts: true,
    weeklyReport: false,
    darkMode: true,
  });

  const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  const sections = [
    {
      title: '🧠 Learning Settings',
      items: [
        { key: 'adaptiveDifficulty', label: 'Adaptive Difficulty', desc: 'Auto-adjust question difficulty based on performance' },
        { key: 'peerCollaboration',  label: 'Peer Collaboration',  desc: 'Enable group activities and peer-to-peer learning' },
        { key: 'spacedRepetition',   label: 'Spaced Repetition',   desc: 'Schedule concept reviews using spaced repetition' },
      ],
    },
    {
      title: '🔔 Notifications',
      items: [
        { key: 'emailAlerts',  label: 'Email Alerts',   desc: 'Receive email notifications for student alerts' },
        { key: 'weeklyReport', label: 'Weekly Report',  desc: 'Get a weekly summary of class performance' },
      ],
    },
    {
      title: '🎨 Appearance',
      items: [
        { key: 'darkMode', label: 'Dark Mode', desc: 'Use dark theme across the platform' },
      ],
    },
  ];

  return (
    <DashboardLayout role="teacher" userId={user?.userId} onLogout={handleLogout}>
      <div className="space-y-6">
        <div className="backdrop-blur-xl bg-gradient-to-br from-slate-500/20 to-gray-500/20 border border-white/20 rounded-2xl p-6">
          <h1 className="text-3xl font-black text-white">Settings</h1>
          <p className="text-gray-300 mt-1">Configure your teaching preferences</p>
        </div>

        {sections.map(section => (
          <div key={section.title} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">{section.title}</h3>
            <div className="space-y-3">
              {section.items.map(item => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                  <div>
                    <p className="text-white font-semibold text-sm">{item.label}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
                  </div>
                  <button onClick={() => toggle(item.key)}
                    className={`relative w-12 h-6 rounded-full transition-all duration-300 shrink-0 ${settings[item.key] ? 'bg-blue-500' : 'bg-white/20'}`}>
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${settings[item.key] ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold transition-all duration-300">
          💾 Save Settings
        </button>
      </div>
    </DashboardLayout>
  );
}
