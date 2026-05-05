import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useNSStore from '../store/useNSStore';
import { levels, MODES } from '../data/nsData';

export default function UIOverlay({ onExit }) {
  const {
    currentLevelIdx, nodes, connections, selectedNodeId,
    score, attempts, hintText, timeLeft, clearHint, tickTimer,
  } = useNSStore();

  const level = levels[currentLevelIdx];
  const mode  = MODES[level?.mode] ?? MODES.focus;
  const totalValid = level?.validConnections?.length ?? 0;
  const correctCount = connections.filter(c => c.correct).length;
  const progress = totalValid > 0 ? (correctCount / totalValid) * 100 : 0;

  // Timer tick
  useEffect(() => {
    if (mode.timeLimit === 0 || timeLeft === 0) return;
    const t = setInterval(tickTimer, 1000);
    return () => clearInterval(t);
  }, [timeLeft, mode.timeLimit]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <>
      {/* Top HUD */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
        background: 'linear-gradient(to bottom, rgba(5,5,20,0.92), transparent)',
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        pointerEvents: 'none',
      }}>
        <div style={{ pointerEvents: 'auto' }}>
          <button onClick={onExit}
            style={{ padding: '7px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#94a3b8', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
            ← Exit
          </button>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#f1f5f9', fontWeight: 900, fontSize: 16, letterSpacing: 2, textShadow: '0 0 16px #3b82f6' }}>
            🧠 NEURAL SYNC
          </p>
          <p style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>{level?.title}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Mode badge */}
          <div style={{ padding: '5px 12px', borderRadius: 20, background: `${mode.color}20`, border: `1px solid ${mode.color}50`, color: mode.color, fontSize: 12, fontWeight: 700 }}>
            {mode.label}
          </div>
          {/* Timer */}
          {mode.timeLimit > 0 && (
            <div style={{ padding: '5px 12px', borderRadius: 20, background: timeLeft < 30 ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.08)', border: `1px solid ${timeLeft < 30 ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.15)'}`, color: timeLeft < 30 ? '#fca5a5' : '#f1f5f9', fontSize: 14, fontWeight: 900 }}>
              ⏱ {mins}:{secs.toString().padStart(2, '0')}
            </div>
          )}
          {/* Score */}
          <div style={{ padding: '5px 12px', borderRadius: 20, background: 'rgba(234,179,8,0.15)', border: '1px solid rgba(234,179,8,0.4)', color: '#fde047', fontSize: 13, fontWeight: 800 }}>
            ⚡ {score}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ position: 'absolute', top: 64, left: 24, right: 24, zIndex: 20, pointerEvents: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ color: '#64748b', fontSize: 11, fontWeight: 600 }}>CONNECTIONS</span>
          <span style={{ color: '#94a3b8', fontSize: 11 }}>{correctCount} / {totalValid}</span>
        </div>
        <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
          <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }}
            style={{ height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, #3b82f6, #22c55e)', boxShadow: '0 0 8px rgba(59,130,246,0.6)' }} />
        </div>
      </div>

      {/* Selected node indicator */}
      <AnimatePresence>
        {selectedNodeId && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            style={{
              position: 'absolute', bottom: 100, left: '50%', transform: 'translateX(-50%)',
              zIndex: 20, pointerEvents: 'none',
              background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.5)',
              borderRadius: 12, padding: '8px 20px',
              color: '#93c5fd', fontSize: 13, fontWeight: 700,
              backdropFilter: 'blur(12px)',
              boxShadow: '0 0 16px rgba(59,130,246,0.3)',
            }}>
            ✦ Node selected — click another to connect
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint text */}
      <AnimatePresence>
        {hintText && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: 'absolute', bottom: 140, left: '50%', transform: 'translateX(-50%)',
              zIndex: 20, maxWidth: 380, width: '90%',
              background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(239,68,68,0.4)',
              borderRadius: 14, padding: '12px 18px',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 0 20px rgba(239,68,68,0.2)',
            }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontSize: 18 }}>💡</span>
              <div>
                <p style={{ color: '#fca5a5', fontWeight: 700, fontSize: 12, marginBottom: 3 }}>Not quite — here's a hint:</p>
                <p style={{ color: '#cbd5e1', fontSize: 13 }}>{hintText}</p>
              </div>
              <button onClick={clearHint} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 16, padding: 0 }}>✕</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div style={{
        position: 'absolute', bottom: 24, left: 24, zIndex: 20, pointerEvents: 'none',
        background: 'rgba(5,5,20,0.85)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12, padding: '10px 14px', backdropFilter: 'blur(12px)',
      }}>
        <p style={{ color: '#475569', fontSize: 10, marginBottom: 6, fontWeight: 700, letterSpacing: 1 }}>NODE TYPES</p>
        {[
          { color: '#3b82f6', label: 'Concept' },
          { color: '#a855f7', label: 'Formula' },
          { color: '#22c55e', label: 'Answer' },
        ].map(i => (
          <div key={i.label} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: i.color, boxShadow: `0 0 5px ${i.color}` }} />
            <span style={{ color: '#94a3b8', fontSize: 11 }}>{i.label}</span>
          </div>
        ))}
        <p style={{ color: '#334155', fontSize: 10, marginTop: 6 }}>Click 2 nodes to connect</p>
      </div>

      {/* Attempts */}
      <div style={{
        position: 'absolute', bottom: 24, right: 24, zIndex: 20, pointerEvents: 'none',
        background: 'rgba(5,5,20,0.85)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12, padding: '10px 14px', backdropFilter: 'blur(12px)',
        textAlign: 'right',
      }}>
        <p style={{ color: '#475569', fontSize: 10, marginBottom: 4, fontWeight: 700, letterSpacing: 1 }}>ACCURACY</p>
        <p style={{ color: '#f1f5f9', fontWeight: 900, fontSize: 20 }}>
          {attempts > 0 ? Math.round((correctCount / attempts) * 100) : 100}%
        </p>
        <p style={{ color: '#475569', fontSize: 10 }}>{attempts} attempts</p>
      </div>
    </>
  );
}
