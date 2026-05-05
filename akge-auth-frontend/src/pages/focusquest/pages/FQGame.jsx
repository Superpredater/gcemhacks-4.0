import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useFQStore from '../store/useFQStore';
import { challenges, fqConcepts } from '../data/fqData';

// ─── Focus Meter ──────────────────────────────────────────────────────────────
function FocusMeter({ value }) {
  const color = value >= 80 ? '#22c55e' : value >= 60 ? '#8b5cf6' : value >= 40 ? '#3b82f6' : '#eab308';
  return (
    <div className="flex items-center gap-3">
      <span className="text-white/60 text-xs font-semibold">FOCUS</span>
      <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
        <motion.div className="h-3 rounded-full" animate={{ width: `${value}%` }} transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ background: `linear-gradient(90deg, ${color}, ${color}cc)`, boxShadow: `0 0 8px ${color}60` }} />
      </div>
      <span className="font-black text-sm" style={{ color }}>{value}%</span>
    </div>
  );
}

// ─── Break Suggestion ─────────────────────────────────────────────────────────
function BreakCard({ onContinue, onBreak }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl p-8 text-center border border-white/10 max-w-md mx-auto"
      style={{ background: 'rgba(255,255,255,0.05)' }}>
      <span className="text-5xl">🌿</span>
      <h3 className="text-white font-black text-xl mt-4 mb-2">Great work! Take a breath.</h3>
      <p className="text-white/50 text-sm mb-6">You've completed 3 challenges. A short break helps your brain absorb what you've learned.</p>
      <div className="flex gap-3 justify-center">
        <button onClick={onBreak}
          className="px-6 py-3 rounded-xl font-semibold text-sm border border-white/20 text-white/70 hover:bg-white/10 transition-all">
          🌊 Take a 2-min break
        </button>
        <button onClick={onContinue}
          className="px-6 py-3 rounded-xl font-bold text-sm text-white"
          style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}>
          ▶ Keep going
        </button>
      </div>
    </motion.div>
  );
}

// ─── Result Screen ────────────────────────────────────────────────────────────
function ResultScreen({ focusGained, masteryGain, correct, total, conceptId, onRetry, onMap, onContinue }) {
  const concept = fqConcepts.find(c => c.id === conceptId);
  const pct = Math.round((correct / total) * 100);
  const grade = pct >= 80 ? { label: 'Deep Focus Achieved!', icon: '🧘', color: '#8b5cf6' }
    : pct >= 60 ? { label: 'Good Session!', icon: '🌟', color: '#3b82f6' }
    : { label: 'Keep Exploring!', icon: '🌱', color: '#22c55e' };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}>
      <motion.div initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', bounce: 0.4 }}
        className="max-w-md w-full rounded-2xl p-8 text-center border border-white/10"
        style={{ background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(20px)', boxShadow: `0 0 40px ${grade.color}30` }}>

        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', bounce: 0.6 }}
          className="text-6xl block mb-4">{grade.icon}</motion.span>

        <h2 className="font-black text-2xl mb-1" style={{ color: grade.color }}>{grade.label}</h2>
        <p className="text-white/50 text-sm mb-6">{concept?.zone}</p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Focus Gained', value: `+${focusGained}%`, color: '#8b5cf6' },
            { label: 'Mastery +',   value: `+${masteryGain}%`, color: '#22c55e' },
            { label: 'Correct',     value: `${correct}/${total}`, color: '#3b82f6' },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-3 border border-white/10" style={{ background: `${s.color}15` }}>
              <p className="font-black text-xl" style={{ color: s.color }}>{s.value}</p>
              <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <button onClick={onContinue}
            className="w-full py-3 rounded-xl font-bold text-white text-sm"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', boxShadow: '0 0 16px rgba(139,92,246,0.4)' }}>
            ▶ Continue Journey
          </button>
          <div className="flex gap-2">
            <button onClick={onRetry}
              className="flex-1 py-2.5 rounded-xl font-semibold text-sm border border-white/20 text-white/70 hover:bg-white/10 transition-all">
              🔄 Retry Zone
            </button>
            <button onClick={onMap}
              className="flex-1 py-2.5 rounded-xl font-semibold text-sm border border-white/20 text-white/70 hover:bg-white/10 transition-all">
              🗺️ Back to Map
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Game ────────────────────────────────────────────────────────────────
export default function FQGame() {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const { completeSession, focusScore } = useFQStore();

  const concept = fqConcepts.find(c => c.id === conceptId);
  const qs = challenges[conceptId] ?? challenges['fq1'];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong'
  const [hint, setHint] = useState(false);
  const [focusMeter, setFocusMeter] = useState(focusScore);
  const [combo, setCombo] = useState(0);
  const [showBreak, setShowBreak] = useState(false);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const timerRef = useRef(null);

  // Adaptive: tier determines time limit
  const q = qs[current];
  const timeLimit = q?.tier === 'deep' ? 30 : q?.tier === 'focus' ? 45 : 60;

  useEffect(() => {
    if (done || showBreak || feedback) return;
    setTimeLeft(timeLimit);
    timerRef.current = setInterval(() => {
      setTimeLeft(v => {
        if (v <= 1) { clearInterval(timerRef.current); handleAnswer(-1); return 0; }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [current, done, showBreak]);

  const handleAnswer = (optIdx) => {
    if (feedback) return;
    clearInterval(timerRef.current);
    const isCorrect = optIdx === q.correct;
    setAnswers(prev => ({ ...prev, [q.id]: optIdx }));
    setFeedback(isCorrect ? 'correct' : 'wrong');
    setHint(false);

    // Update focus meter
    if (isCorrect) {
      setCombo(v => v + 1);
      setFocusMeter(v => Math.min(100, v + (combo >= 2 ? 8 : 5)));
    } else {
      setCombo(0);
      setFocusMeter(v => Math.max(0, v - 3));
    }

    setTimeout(() => {
      setFeedback(null);
      const next = current + 1;
      if (next >= qs.length) {
        finishSession({ ...answers, [q.id]: optIdx });
      } else {
        // Suggest break after 3 challenges
        if (next === 3) { setShowBreak(true); }
        else { setCurrent(next); }
      }
    }, isCorrect ? 700 : 1200);
  };

  const finishSession = (finalAnswers) => {
    const correct = qs.filter(q => finalAnswers[q.id] === q.correct).length;
    const pct = Math.round((correct / qs.length) * 100);
    const focusGained = Math.round((focusMeter - focusScore) + pct * 0.2);
    const masteryGain = Math.round(pct * 0.25);
    const xpGained = Math.round(pct * 1.5 + combo * 10);
    const perfect = correct === qs.length;
    const noHints = !Object.values(answers).includes(undefined);

    completeSession({ conceptId, focusGained: Math.max(0, focusGained), masteryGain, xpGained, perfect, noHints });
    setDone(true);
  };

  const handleRetry = () => {
    setCurrent(0); setAnswers({}); setFeedback(null); setHint(false);
    setCombo(0); setShowBreak(false); setDone(false); setFocusMeter(focusScore);
  };

  if (!concept) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f172a' }}>
      <div className="text-center text-white">
        <p className="text-4xl mb-4">❓</p>
        <p className="font-bold text-lg">Zone not found</p>
        <button onClick={() => navigate('/student/fq/map')} className="mt-4 px-6 py-2.5 rounded-xl font-bold text-white" style={{ background: '#8b5cf6' }}>Back to Map</button>
      </div>
    </div>
  );

  if (done) {
    const correct = qs.filter(q => answers[q.id] === q.correct).length;
    const pct = Math.round((correct / qs.length) * 100);
    return (
      <ResultScreen
        focusGained={Math.max(0, Math.round(focusMeter - focusScore + pct * 0.2))}
        masteryGain={Math.round(pct * 0.25)}
        correct={correct} total={qs.length} conceptId={conceptId}
        onRetry={handleRetry}
        onMap={() => navigate('/student/fq/map')}
        onContinue={() => navigate('/student/fq/map')}
      />
    );
  }

  const timerPct = (timeLeft / timeLimit) * 100;
  const tierColor = q?.tier === 'deep' ? '#ef4444' : q?.tier === 'focus' ? '#8b5cf6' : '#22c55e';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}>

      {/* Break suggestion */}
      {showBreak && (
        <BreakCard
          onContinue={() => { setShowBreak(false); setCurrent(3); }}
          onBreak={() => { setShowBreak(false); navigate('/student/fq/map'); }}
        />
      )}

      {!showBreak && (
        <div className="w-full max-w-lg space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <button onClick={() => navigate('/student/fq/map')}
              className="px-4 py-2 rounded-xl text-white/50 hover:text-white text-sm font-semibold border border-white/10 hover:bg-white/10 transition-all">
              ← Map
            </button>
            <div className="text-center">
              <p className="text-white font-black text-sm">{concept.emoji} {concept.zone}</p>
              <p className="text-white/40 text-xs">{current + 1} / {qs.length}</p>
            </div>
            <div className="flex items-center gap-2">
              {combo > 1 && (
                <motion.span key={combo} initial={{ scale: 1.5 }} animate={{ scale: 1 }}
                  className="text-xs font-black" style={{ color: '#f59e0b' }}>
                  🔥 ×{combo}
                </motion.span>
              )}
              <span className="text-xs font-bold px-2 py-1 rounded-full border"
                style={{ background: `${tierColor}20`, color: tierColor, borderColor: `${tierColor}44` }}>
                {q?.tier}
              </span>
            </div>
          </div>

          {/* Focus meter */}
          <FocusMeter value={focusMeter} />

          {/* Timer bar */}
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <motion.div className="h-2 rounded-full" animate={{ width: `${timerPct}%` }} transition={{ duration: 0.3 }}
              style={{ background: timerPct > 50 ? '#22c55e' : timerPct > 25 ? '#eab308' : '#ef4444' }} />
          </div>

          {/* Progress dots */}
          <div className="flex gap-2 justify-center">
            {qs.map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: i < current ? '#22c55e' : i === current ? concept.color : 'rgba(255,255,255,0.15)',
                  boxShadow: i === current ? `0 0 6px ${concept.color}` : 'none',
                }} />
            ))}
          </div>

          {/* Question card */}
          <AnimatePresence mode="wait">
            <motion.div key={current}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              className="rounded-2xl p-6 border border-white/10"
              style={{
                background: feedback === 'correct' ? 'rgba(34,197,94,0.08)' : feedback === 'wrong' ? 'rgba(239,68,68,0.08)' : 'rgba(255,255,255,0.05)',
                borderColor: feedback === 'correct' ? 'rgba(34,197,94,0.4)' : feedback === 'wrong' ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.1)',
                boxShadow: feedback === 'correct' ? '0 0 20px rgba(34,197,94,0.2)' : 'none',
                transition: 'all 0.3s ease',
              }}>

              <p className="text-white font-bold text-lg mb-5 leading-relaxed">{q?.text}</p>

              <div className="grid grid-cols-2 gap-3">
                {q?.options.map((opt, i) => {
                  let bg = 'rgba(255,255,255,0.05)';
                  let border = 'rgba(255,255,255,0.1)';
                  let color = '#cbd5e1';
                  if (feedback && i === q.correct) { bg = 'rgba(34,197,94,0.15)'; border = '#22c55e'; color = '#86efac'; }
                  if (feedback === 'wrong' && i === answers[q.id] && i !== q.correct) { bg = 'rgba(239,68,68,0.15)'; border = '#ef4444'; color = '#fca5a5'; }

                  return (
                    <motion.button key={i} whileHover={!feedback ? { scale: 1.02 } : {}} whileTap={!feedback ? { scale: 0.97 } : {}}
                      onClick={() => !feedback && handleAnswer(i)}
                      className="p-4 rounded-xl text-left text-sm font-medium transition-all duration-200"
                      style={{ background: bg, border: `1px solid ${border}`, color, cursor: feedback ? 'default' : 'pointer' }}>
                      <span className="text-white/30 mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </motion.button>
                  );
                })}
              </div>

              {/* Calm feedback */}
              <AnimatePresence>
                {feedback && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="mt-4 p-3 rounded-xl text-sm font-semibold text-center"
                    style={{
                      background: feedback === 'correct' ? 'rgba(34,197,94,0.12)' : 'rgba(59,130,246,0.12)',
                      color: feedback === 'correct' ? '#86efac' : '#93c5fd',
                    }}>
                    {feedback === 'correct'
                      ? '✨ Excellent! Your focus grows stronger.'
                      : `💡 Gentle hint: ${q?.hint}`}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          {/* Hint button */}
          {!feedback && !hint && (
            <button onClick={() => setHint(true)}
              className="w-full py-2.5 rounded-xl text-white/40 hover:text-white/70 text-sm font-medium border border-white/10 hover:bg-white/5 transition-all">
              💭 Show hint
            </button>
          )}
          {hint && !feedback && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="p-3 rounded-xl text-sm text-center border border-blue-500/20"
              style={{ background: 'rgba(59,130,246,0.1)', color: '#93c5fd' }}>
              💡 {q?.hint}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
