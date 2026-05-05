import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useNSStore from './store/useNSStore';
import { levels, MODES } from './data/nsData';
import UIOverlay from './components/UIOverlay';
import ResultScreen from './components/ResultScreen';
import NeuralScene2D from './components/NeuralScene2D';

// ─── Menu ─────────────────────────────────────────────────────────────────────
function Menu({ onStart, onExit }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #050510 0%, #0f0a2e 50%, #050510 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: 560, width: '100%' }}>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }}
            style={{ fontSize: 64, marginBottom: 16 }}>🧠</motion.div>
          <h1 style={{ color: '#f1f5f9', fontWeight: 900, fontSize: 40, letterSpacing: 3, textShadow: '0 0 30px #3b82f6', margin: 0 }}>
            NEURAL SYNC
          </h1>
          <p style={{ color: '#64748b', fontSize: 16, marginTop: 8 }}>Connect concepts in the neural space</p>
        </div>

        {/* Level cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {levels.map((level, i) => {
            const mode = MODES[level.mode];
            return (
              <motion.button key={level.id} whileHover={{ scale: 1.02, x: 4 }} whileTap={{ scale: 0.98 }}
                onClick={() => onStart(i)}
                style={{
                  padding: '18px 20px', borderRadius: 16, cursor: 'pointer', textAlign: 'left',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                <div>
                  <p style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 16, marginBottom: 4 }}>
                    Level {level.id}: {level.title}
                  </p>
                  <p style={{ color: '#64748b', fontSize: 13 }}>
                    {level.nodes.length} nodes · {level.validConnections.length} connections
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <span style={{ padding: '4px 10px', borderRadius: 20, background: `${mode.color}20`, border: `1px solid ${mode.color}44`, color: mode.color, fontSize: 12, fontWeight: 700 }}>
                    {mode.label}
                  </span>
                  <span style={{ color: '#334155', fontSize: 12 }}>▶ Play</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* How to play */}
        <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 14, padding: '14px 18px', marginBottom: 20 }}>
          <p style={{ color: '#93c5fd', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>How to Play</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {[
              '🖱️ Click a node to select it',
              '🔗 Click another to connect',
              '✅ Correct = glowing line',
              '💡 Wrong = gentle hint',
              '🔵 Blue = Concept',
              '🟣 Purple = Formula · 🟢 Green = Answer',
            ].map(t => (
              <p key={t} style={{ color: '#64748b', fontSize: 12 }}>{t}</p>
            ))}
          </div>
        </div>

        <button onClick={onExit}
          style={{ width: '100%', padding: '12px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#64748b', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
          ← Back to Dashboard
        </button>
      </motion.div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NeuralSync() {
  const navigate = useNavigate();
  const { gamePhase, initLevel, goMenu } = useNSStore();

  const handleExit = () => {
    goMenu();
    navigate('/student/dashboard');
  };

  if (gamePhase === 'menu') {
    return <Menu onStart={initLevel} onExit={handleExit} />;
  }

  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: 'linear-gradient(135deg, #050510 0%, #0f0a2e 50%, #050510 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* 2D SVG Scene — no Three.js */}
      <NeuralScene2D />

      {/* 2D UI Overlay */}
      {gamePhase === 'playing' && (
        <UIOverlay onExit={() => { goMenu(); navigate('/student/dashboard'); }} />
      )}

      {/* Result Screen */}
      <AnimatePresence>
        {gamePhase === 'result' && <ResultScreen onExit={handleExit} />}
      </AnimatePresence>
    </div>
  );
}
