import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import DashboardLayout from '../../components/DashboardLayout';

import LearningPatterns  from './modules/LearningPatterns';
import Recommendations   from './modules/Recommendations';
import QuestionBank      from './modules/QuestionBank';
import ConceptTagging    from './modules/ConceptTagging';
import DifficultySystem  from './modules/DifficultySystem';
import LearningArchetype from './modules/LearningArchetype';
import SubjectSettings   from './modules/SubjectSettings';
import SystemSettings    from './modules/SystemSettings';

const MODULES = [
  { id: 'patterns',    label: '📈 Learning Patterns',   desc: 'Detect fast/slow/inconsistent learners' },
  { id: 'recs',        label: '💡 Recommendations',     desc: 'AI-generated action items' },
  { id: 'qbank',       label: '📚 Question Bank',       desc: 'Full CRUD question management' },
  { id: 'tagging',     label: '🏷️ Concept Tagging',     desc: 'Tag questions to concepts' },
  { id: 'difficulty',  label: '⚖️ Difficulty System',   desc: 'Assign & auto-adjust difficulty' },
  { id: 'archetype',   label: '🎭 Learning Archetype',  desc: 'Classify student learning styles' },
  { id: 'subjects',    label: '📖 Subject Settings',    desc: 'Configure subjects & concepts' },
  { id: 'settings',    label: '⚙️ System Settings',     desc: 'Thresholds, notifications, roles' },
];

export default function TeacherModules() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeModule, setActiveModule] = useState('patterns');
  const handleLogout = () => { logout(); navigate('/login'); };

  const renderModule = () => {
    switch (activeModule) {
      case 'patterns':   return <LearningPatterns />;
      case 'recs':       return <Recommendations />;
      case 'qbank':      return <QuestionBank />;
      case 'tagging':    return <ConceptTagging />;
      case 'difficulty': return <DifficultySystem />;
      case 'archetype':  return <LearningArchetype />;
      case 'subjects':   return <SubjectSettings />;
      case 'settings':   return <SystemSettings />;
      default:           return null;
    }
  };

  const current = MODULES.find(m => m.id === activeModule);

  return (
    <DashboardLayout role="teacher" userId={user?.userId} onLogout={handleLogout}>
      <div className="space-y-5">

        {/* Page header */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/15 to-purple-500/15 border border-white/20 rounded-2xl p-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <button onClick={() => navigate('/teacher/dashboard')} className="text-gray-400 hover:text-white transition-colors text-sm">
                  ← Dashboard
                </button>
                <span className="text-gray-600">/</span>
                <span className="text-gray-300 text-sm">Teacher Modules</span>
                <span className="text-gray-600">/</span>
                <span className="text-white text-sm font-semibold">{current?.label}</span>
              </div>
              <h1 className="text-3xl font-black text-white">Teacher Control Center</h1>
              <p className="text-gray-300 mt-1">8 fully functional modules — all charts, all buttons work</p>
            </div>
          </div>

          {/* Module grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-5">
            {MODULES.map(m => (
              <button key={m.id} onClick={() => setActiveModule(m.id)}
                className={`text-left p-3 rounded-xl transition-all duration-200 border ${
                  activeModule === m.id
                    ? 'bg-blue-500/25 border-blue-400 shadow-sm shadow-blue-500/20'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}>
                <p className={`text-sm font-semibold ${activeModule === m.id ? 'text-blue-300' : 'text-gray-200'}`}>
                  {m.label}
                </p>
                <p className="text-gray-500 text-xs mt-0.5 leading-tight">{m.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Module content */}
        <div>
          {renderModule()}
        </div>

      </div>
    </DashboardLayout>
  );
}
