import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import DashboardLayout from '../../components/DashboardLayout';

const initialQuestions = [
  { id: 1, text: 'Solve x² - 7x + 12 = 0 by factoring',          concept: 'Quadratic Eq.',   difficulty: 'Medium', failRate: 72 },
  { id: 2, text: 'Find sin(135°) without a calculator',            concept: 'Trigonometry',    difficulty: 'Hard',   failRate: 78 },
  { id: 3, text: 'Differentiate f(x) = x³ - 4x² + 2x',           concept: 'Calculus Basics', difficulty: 'Hard',   failRate: 75 },
  { id: 4, text: 'Simplify: 3(x+2) - 2(x-1)',                     concept: 'Algebra Basics',  difficulty: 'Easy',   failRate: 48 },
  { id: 5, text: 'Find the limit: lim(x→0) sin(x)/x',             concept: 'Calculus Basics', difficulty: 'Hard',   failRate: 80 },
  { id: 6, text: 'Solve for x: 2x + 5 = 3x - 7',                  concept: 'Algebra Basics',  difficulty: 'Easy',   failRate: 42 },
];

const diffStyle = { Easy: 'bg-green-500/20 text-green-300', Medium: 'bg-yellow-500/20 text-yellow-300', Hard: 'bg-red-500/20 text-red-300' };

export default function QuestionBank() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [questions, setQuestions] = useState(initialQuestions);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const handleLogout = () => { logout(); navigate('/login'); };

  const concepts = ['All', ...new Set(initialQuestions.map(q => q.concept))];
  const filtered = questions.filter(q =>
    (filter === 'All' || q.concept === filter) &&
    (search === '' || q.text.toLowerCase().includes(search.toLowerCase()))
  );

  const deleteQ = (id) => setQuestions(prev => prev.filter(q => q.id !== id));

  return (
    <DashboardLayout role="teacher" userId={user?.userId} onLogout={handleLogout}>
      <div className="space-y-6">
        <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-black text-white">Question Bank</h1>
              <p className="text-gray-300 mt-1">Manage and organize your question library</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-blue-400">{questions.length}</p>
              <p className="text-gray-400 text-sm">questions</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search questions…"
            className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors flex-1 min-w-48" />
          <div className="flex gap-2 flex-wrap">
            {concepts.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  filter === c ? 'bg-blue-500/30 border-blue-400 text-blue-300' : 'bg-white/5 border-white/10 text-gray-400 hover:text-gray-200'
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Questions list */}
        <div className="space-y-3">
          {filtered.map(q => (
            <div key={q.id} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/8 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-white font-medium">{q.text}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">{q.concept}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${diffStyle[q.difficulty]}`}>{q.difficulty}</span>
                    <span className="text-xs text-red-400 font-medium">{q.failRate}% fail rate</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold hover:bg-blue-500/30 transition-colors">Edit</button>
                  <button onClick={() => deleteQ(q.id)} className="px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold hover:bg-red-500/30 transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500">No questions match your filter</div>
          )}
        </div>

        <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30">
          ➕ Add New Question
        </button>
      </div>
    </DashboardLayout>
  );
}
