import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStudentStore from '../store/useStudentStore';
import { quizQuestions, concepts } from '../data/studentData';

export default function Assessment() {
  const navigate = useNavigate();
  const { assessmentAnswers, assessmentSubmitted, assessmentScore, setAnswer, submitAssessment, resetAssessment, checkAndUnlock } = useStudentStore();
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 min
  const [showReview, setShowReview] = useState(false);

  // Timer
  useEffect(() => {
    if (assessmentSubmitted || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft(v => v - 1), 1000);
    return () => clearInterval(t);
  }, [assessmentSubmitted, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && !assessmentSubmitted) submitAssessment();
  }, [timeLeft]);

  useEffect(() => {
    if (assessmentScore === 100) checkAndUnlock('a5');
  }, [assessmentScore]);

  const q = quizQuestions[current];
  const answered = Object.keys(assessmentAnswers).length;
  const progress = (answered / quizQuestions.length) * 100;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  const handleRetry = () => { resetAssessment(); setCurrent(0); setTimeLeft(300); setShowReview(false); };

  if (assessmentSubmitted) {
    const correct = quizQuestions.filter(q => assessmentAnswers[q.id] === q.correct).length;
    const grade = assessmentScore >= 80 ? { label: 'Excellent!', color: '#22c55e', icon: '🏆' }
      : assessmentScore >= 60 ? { label: 'Good Job!', color: '#3b82f6', icon: '👍' }
      : { label: 'Keep Practicing', color: '#eab308', icon: '💪' };

    return (
      <div className="space-y-6">
        {/* Result card */}
        <div className="backdrop-blur-xl rounded-2xl p-8 text-center"
          style={{ background: `${grade.color}15`, border: `1px solid ${grade.color}44` }}>
          <span className="text-6xl">{grade.icon}</span>
          <p className="text-2xl font-black mt-3" style={{ color: grade.color }}>{grade.label}</p>
          <p className="text-6xl font-black text-white mt-2">{assessmentScore}%</p>
          <p className="text-gray-400 mt-2">{correct} / {quizQuestions.length} correct</p>
          <div className="flex justify-center gap-4 mt-6">
            <button onClick={handleRetry}
              className="px-6 py-3 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 font-semibold hover:bg-blue-500/30 transition-all">
              🔄 Retry
            </button>
            <button onClick={() => setShowReview(v => !v)}
              className="px-6 py-3 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 font-semibold hover:bg-purple-500/30 transition-all">
              📋 {showReview ? 'Hide' : 'Review'} Answers
            </button>
            <button onClick={() => navigate('/student/mastery')}
              className="px-6 py-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-300 font-semibold hover:bg-green-500/30 transition-all">
              📊 View Mastery →
            </button>
          </div>
        </div>

        {/* Review */}
        {showReview && (
          <div className="space-y-3">
            {quizQuestions.map((q, i) => {
              const userAns = assessmentAnswers[q.id];
              const isCorrect = userAns === q.correct;
              const conceptName = concepts.find(c => c.id === q.concept)?.name ?? q.concept;
              return (
                <div key={q.id} className={`backdrop-blur-xl rounded-2xl p-5 border ${isCorrect ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-xl">{isCorrect ? '✅' : '❌'}</span>
                    <div>
                      <p className="text-white font-semibold">Q{i + 1}: {q.text}</p>
                      <p className="text-gray-500 text-xs mt-0.5">Concept: {conceptName}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5 ml-8">
                    {q.options.map((opt, oi) => (
                      <div key={oi} className={`px-3 py-2 rounded-lg text-sm ${
                        oi === q.correct ? 'bg-green-500/20 text-green-300 font-semibold' :
                        oi === userAns && !isCorrect ? 'bg-red-500/20 text-red-300' :
                        'text-gray-400'
                      }`}>
                        {oi === q.correct ? '✓ ' : oi === userAns && !isCorrect ? '✗ ' : '  '}{opt}
                      </div>
                    ))}
                    <p className="text-blue-300 text-xs mt-2">💡 {q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-2xl font-black text-white">Assessment</h1>
            <p className="text-gray-400 text-sm">Question {current + 1} of {quizQuestions.length}</p>
          </div>
          <div className={`text-2xl font-black ${timeLeft < 60 ? 'text-red-400 animate-pulse' : 'text-blue-400'}`}>
            ⏱ {mins}:{secs.toString().padStart(2, '0')}
          </div>
        </div>
        {/* Progress bar */}
        <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
          <div className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
            style={{ width: `${((current + 1) / quizQuestions.length) * 100}%` }} />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{answered} answered</span>
          <span>{quizQuestions.length - answered} remaining</span>
        </div>
      </div>

      {/* Question */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <p className="text-white font-bold text-lg mb-6">{q.text}</p>
        <div className="space-y-3">
          {q.options.map((opt, i) => {
            const selected = assessmentAnswers[q.id] === i;
            return (
              <button key={i} onClick={() => setAnswer(q.id, i)}
                className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-200 border font-medium ${
                  selected
                    ? 'bg-blue-500/25 border-blue-400 text-blue-300 scale-[1.01]'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                }`}>
                <span className="font-bold mr-3 text-gray-500">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button onClick={() => setCurrent(v => Math.max(0, v - 1))} disabled={current === 0}
          className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-gray-300 font-semibold text-sm hover:bg-white/20 transition-all disabled:opacity-40">
          ← Previous
        </button>

        <div className="flex gap-2">
          {quizQuestions.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                i === current ? 'bg-blue-500 text-white' :
                assessmentAnswers[quizQuestions[i].id] !== undefined ? 'bg-green-500/30 text-green-300 border border-green-500/40' :
                'bg-white/10 text-gray-400 border border-white/10'
              }`}>
              {i + 1}
            </button>
          ))}
        </div>

        {current < quizQuestions.length - 1 ? (
          <button onClick={() => setCurrent(v => v + 1)}
            className="px-5 py-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 font-semibold text-sm hover:bg-blue-500/30 transition-all">
            Next →
          </button>
        ) : (
          <button onClick={submitAssessment}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-green-500/30">
            Submit ✓
          </button>
        )}
      </div>
    </div>
  );
}
