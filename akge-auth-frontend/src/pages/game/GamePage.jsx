import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from './store/useGameStore';
import { levels, questions as allQuestions } from './data/gameData';

const MODES = [
  { id: 'practice',  label: '📖 Practice',   desc: 'No timer, learn at your pace',    color: '#3b82f6', timeLimit: 0   },
  { id: 'speedrun',  label: '⚡ Speed Run',   desc: '10 seconds per question',         color: '#eab308', timeLimit: 10  },
  { id: 'challenge', label: '🔥 Challenge',   desc: '5 seconds, combo multiplier',     color: '#ef4444', timeLimit: 5   },
  { id: 'boss',      label: '💀 Boss Level',  desc: '3 lives, no mistakes allowed',    color: '#8b5cf6', timeLimit: 8   },
];

// ─── Mode Select ──────────────────────────────────────────────────────────────
function ModeSelect({ level, onSelect }) {
  return (
    <div style={{ minHeight: '100vh', background: '#050510', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 600, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 8 }}>SELECT MODE</p>
          <h1 style={{ color: '#f1f5f9', fontWeight: 900, fontSize: 32, textShadow: '0 0 20px #3b82f6' }}>{level?.concept}</h1>
          <p style={{ color: '#94a3b8', fontSize: 14, marginTop: 8 }}>Difficulty: {'⭐'.repeat(level?.difficulty ?? 1)}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {MODES.map(m => (
            <motion.button key={m.id} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(m)}
              style={{
                padding: '20px 16px', borderRadius: 16, cursor: 'pointer', textAlign: 'left',
                background: `${m.color}15`, border: `1px solid ${m.color}55`,
                boxShadow: `0 0 20px ${m.color}20`,
              }}>
              <p style={{ color: m.color, fontWeight: 800, fontSize: 18, marginBottom: 6 }}>{m.label}</p>
              <p style={{ color: '#94a3b8', fontSize: 13 }}>{m.desc}</p>
              {m.timeLimit > 0 && <p style={{ color: m.color, fontSize: 12, marginTop: 8, fontWeight: 600 }}>⏱ {m.timeLimit}s per question</p>}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Result Screen ────────────────────────────────────────────────────────────
function ResultScreen({ score, xpGained, correct, total, mode, levelId, onRetry, onMap, onNext }) {
  const grade = score >= 80 ? { label: 'PERFECT!', color: '#22c55e', icon: '🏆' }
    : score >= 60 ? { label: 'GREAT!', color: '#3b82f6', icon: '⭐' }
    : { label: 'KEEP GOING!', color: '#eab308', icon: '💪' };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ minHeight: '100vh', background: '#050510', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <motion.div initial={{ scale: 0.8, y: 30 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', bounce: 0.4 }}
        style={{ maxWidth: 480, width: '100%', textAlign: 'center', background: 'rgba(15,23,42,0.95)', border: `1px solid ${grade.color}55`, borderRadius: 24, padding: '2.5rem', backdropFilter: 'blur(20px)', boxShadow: `0 0 40px ${grade.color}30` }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', bounce: 0.6 }}>
          <span style={{ fontSize: 72 }}>{grade.icon}</span>
        </motion.div>
        <h2 style={{ color: grade.color, fontWeight: 900, fontSize: 36, margin: '12px 0', textShadow: `0 0 20px ${grade.color}` }}>{grade.label}</h2>
        <p style={{ color: '#f1f5f9', fontSize: 64, fontWeight: 900, lineHeight: 1 }}>{score}%</p>
        <p style={{ color: '#94a3b8', fontSize: 16, marginTop: 8 }}>{correct} / {total} correct</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, margin: '24px 0' }}>
          <div style={{ padding: '12px 20px', borderRadius: 12, background: 'rgba(234,179,8,0.15)', border: '1px solid rgba(234,179,8,0.4)' }}>
            <p style={{ color: '#fde047', fontWeight: 900, fontSize: 24 }}>+{xpGained}</p>
            <p style={{ color: '#94a3b8', fontSize: 12 }}>XP Earned</p>
          </div>
          <div style={{ padding: '12px 20px', borderRadius: 12, background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.4)' }}>
            <p style={{ color: '#86efac', fontWeight: 900, fontSize: 24 }}>+{Math.round(score * 0.3)}%</p>
            <p style={{ color: '#94a3b8', fontSize: 12 }}>Mastery</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onRetry}
            style={{ padding: '12px 24px', borderRadius: 12, background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.4)', color: '#60a5fa', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
            🔄 Retry
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onMap}
            style={{ padding: '12px 24px', borderRadius: 12, background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.4)', color: '#c084fc', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
            🗺️ Back to Map
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onNext}
            style={{ padding: '12px 24px', borderRadius: 12, background: 'linear-gradient(135deg,#22c55e,#16a34a)', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
            ▶ Next Level
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Game ────────────────────────────────────────────────────────────────
export default function GamePage() {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const { completeLevel, xp } = useGameStore();

  const level = levels.find(l => l.id === conceptId);
  const qs = allQuestions[conceptId] ?? allQuestions['l1'];

  const [mode, setMode] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong'
  const [timeLeft, setTimeLeft] = useState(0);
  const [combo, setCombo] = useState(0);
  const [lives, setLives] = useState(3);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);
  const [xpGained, setXpGained] = useState(0);
  const timerRef = useRef(null);

  // Timer
  useEffect(() => {
    if (!mode || mode.timeLimit === 0 || done) return;
    setTimeLeft(mode.timeLimit);
    timerRef.current = setInterval(() => {
      setTimeLeft(v => {
        if (v <= 1) {
          clearInterval(timerRef.current);
          handleAnswer(-1); // timeout = wrong
          return 0;
        }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [current, mode, done]);

  const handleAnswer = (optIdx) => {
    if (feedback) return;
    clearInterval(timerRef.current);
    const q = qs[current];
    const isCorrect = optIdx === q.correct;

    setAnswers(prev => ({ ...prev, [q.id]: optIdx }));
    setFeedback(isCorrect ? 'correct' : 'wrong');

    if (!isCorrect && mode?.id === 'boss') {
      setLives(v => v - 1);
    }
    if (isCorrect) setCombo(v => v + 1);
    else setCombo(0);

    setTimeout(() => {
      setFeedback(null);
      if (current + 1 >= qs.length || (!isCorrect && mode?.id === 'boss' && lives <= 1)) {
        finishGame({ ...answers, [q.id]: optIdx });
      } else {
        setCurrent(v => v + 1);
      }
    }, 800);
  };

  const finishGame = (finalAnswers) => {
    const correct = qs.filter(q => finalAnswers[q.id] === q.correct).length;
    const pct = Math.round((correct / qs.length) * 100);
    const baseXp = level?.xpReward ?? 100;
    const multiplier = mode?.id === 'challenge' ? 1.5 : mode?.id === 'boss' ? 2 : 1;
    const earned = Math.round(baseXp * (pct / 100) * multiplier);
    setScore(pct);
    setXpGained(earned);
    completeLevel(conceptId, pct, earned);
    setDone(true);
  };

  const handleRetry = () => {
    setCurrent(0); setAnswers({}); setFeedback(null);
    setCombo(0); setLives(3); setDone(false); setScore(0); setXpGained(0);
  };

  const handleNext = () => {
    const idx = levels.findIndex(l => l.id === conceptId);
    const next = levels[idx + 1];
    if (next) navigate(`/student/game/${next.id}`);
    else navigate('/student/map');
  };

  if (!level) return (
    <div style={{ minHeight: '100vh', background: '#050510', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', color: '#f1f5f9' }}>
        <p style={{ fontSize: 48 }}>❓</p>
        <p style={{ fontSize: 20, fontWeight: 700 }}>Level not found</p>
        <button onClick={() => navigate('/student/map')} style={{ marginTop: 16, padding: '10px 24px', borderRadius: 12, background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 700 }}>Back to Map</button>
      </div>
    </div>
  );

  if (!mode) return <ModeSelect level={level} onSelect={setMode} />;

  if (done) return (
    <ResultScreen
      score={score} xpGained={xpGained}
      correct={qs.filter(q => answers[q.id] === q.correct).length}
      total={qs.length} mode={mode} levelId={conceptId}
      onRetry={handleRetry}
      onMap={() => navigate('/student/map')}
      onNext={handleNext}
    />
  );

  const q = qs[current];
  const modeColor = mode.color;
  const timerPct = mode.timeLimit > 0 ? (timeLeft / mode.timeLimit) * 100 : 100;

  return (
    <div style={{ minHeight: '100vh', background: '#050510', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>

      {/* Header */}
      <div style={{ width: '100%', maxWidth: 640, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <button onClick={() => navigate('/student/map')}
          style={{ padding: '8px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#94a3b8', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
          ← Map
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: modeColor, fontWeight: 800, fontSize: 14 }}>{mode.label}</span>
          {mode.id === 'boss' && (
            <span style={{ color: '#ef4444', fontWeight: 800 }}>{'❤️'.repeat(lives)}{'🖤'.repeat(3 - lives)}</span>
          )}
          {combo > 1 && (
            <motion.span key={combo} initial={{ scale: 1.5 }} animate={{ scale: 1 }}
              style={{ color: '#f59e0b', fontWeight: 900, fontSize: 14 }}>
              🔥 x{combo} COMBO
            </motion.span>
          )}
        </div>
        <span style={{ color: '#64748b', fontSize: 13 }}>{current + 1}/{qs.length}</span>
      </div>

      {/* Timer bar */}
      {mode.timeLimit > 0 && (
        <div style={{ width: '100%', maxWidth: 640, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, marginBottom: 20, overflow: 'hidden' }}>
          <motion.div
            animate={{ width: `${timerPct}%` }}
            transition={{ duration: 0.3 }}
            style={{ height: '100%', borderRadius: 3, background: timerPct > 50 ? modeColor : timerPct > 25 ? '#eab308' : '#ef4444' }}
          />
        </div>
      )}

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        {qs.map((_, i) => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: '50%',
            background: i < current ? '#22c55e' : i === current ? modeColor : 'rgba(255,255,255,0.15)',
            boxShadow: i === current ? `0 0 8px ${modeColor}` : 'none',
          }} />
        ))}
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div key={current}
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
          style={{ width: '100%', maxWidth: 640, background: 'rgba(15,23,42,0.95)', border: `1px solid ${modeColor}44`, borderRadius: 20, padding: '2rem', backdropFilter: 'blur(20px)', boxShadow: `0 0 30px ${modeColor}20` }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <span style={{ padding: '4px 10px', borderRadius: 20, background: `${modeColor}22`, color: modeColor, fontSize: 12, fontWeight: 700 }}>{level.concept}</span>
            {mode.timeLimit > 0 && (
              <span style={{ color: timeLeft <= 3 ? '#ef4444' : '#94a3b8', fontWeight: 800, fontSize: 16, marginLeft: 'auto' }}>
                ⏱ {timeLeft}s
              </span>
            )}
          </div>

          <p style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 20, marginBottom: 24, lineHeight: 1.4 }}>{q.text}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {q.options.map((opt, i) => {
              let bg = 'rgba(255,255,255,0.05)';
              let border = 'rgba(255,255,255,0.1)';
              let color = '#cbd5e1';
              if (feedback && i === q.correct) { bg = 'rgba(34,197,94,0.2)'; border = '#22c55e'; color = '#86efac'; }
              if (feedback === 'wrong' && i === answers[q.id] && i !== q.correct) { bg = 'rgba(239,68,68,0.2)'; border = '#ef4444'; color = '#fca5a5'; }

              return (
                <motion.button key={i} whileHover={!feedback ? { scale: 1.02 } : {}} whileTap={!feedback ? { scale: 0.97 } : {}}
                  onClick={() => !feedback && handleAnswer(i)}
                  style={{ padding: '14px 16px', borderRadius: 12, cursor: feedback ? 'default' : 'pointer', textAlign: 'left', background: bg, border: `1px solid ${border}`, color, fontWeight: 600, fontSize: 14, transition: 'all 0.2s' }}>
                  <span style={{ color: '#64748b', marginRight: 8 }}>{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              );
            })}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ marginTop: 16, padding: '12px 16px', borderRadius: 12, background: feedback === 'correct' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', border: `1px solid ${feedback === 'correct' ? '#22c55e' : '#ef4444'}44`, color: feedback === 'correct' ? '#86efac' : '#fca5a5', fontWeight: 700, fontSize: 15, textAlign: 'center' }}>
                {feedback === 'correct' ? `✅ Correct! +${q.xp} XP` : `❌ Wrong! The answer was: ${q.options[q.correct]}`}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
