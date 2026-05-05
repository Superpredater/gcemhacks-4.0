import React from 'react';
import { motion } from 'framer-motion';
import useNSStore from '../store/useNSStore';
import { levels } from '../data/nsData';

export default function ResultScreen({ onExit }) {
  const { currentLevelIdx, connections, attempts, score, masteryGained, totalMastery, nextLevel, retry } = useNSStore();
  const level = levels[currentLevelIdx];
  const totalValid = level?.validConnections?.length ?? 0;
  const correct = connections.filter(c => c.correct).length;
  const accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : 100;

  const grade = accuracy >= 90 ? { label: 'Neural Sync Achieved!', icon: '🧠', color: '#22c55e' }
    : accuracy >= 70 ? { label: 'Good Sync!', icon: '⚡', color: '#3b82f6' }
    : { label: 'Keep Syncing!', icon: '🌱', color: '#8b5cf6' };

  const hasNext = currentLevelIdx + 1 < levels.length;

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(5,5,20,0.85)', backdropFilter: 'blur(8px)' }}>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.4 }}
        style={{ maxWidth: 440, width: '90%', background: 'rgba(10,10,30,0.98)', border: `1px solid ${grade.color}44`, borderRadius: 24, padding: '2.5rem', textAlign: 'center', backdropFilter: 'blur(20px)', boxShadow: `0 0 40px ${grade.color}30` }}>

        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', bounce: 0.6 }}
          style={{ fontSize: 64, display: 'block', marginBottom: 12 }}>{grade.icon}</motion.span>

        <h2 style={{ color: grade.color, fontWeight: 900, fontSize: 26, marginBottom: 6, textShadow: `0 0 16px ${grade.color}` }}>{grade.label}</h2>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>{level?.title}</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Accuracy',    value: `${accuracy}%`,      color: grade.color },
            { label: 'Connections', value: `${correct}/${totalValid}`, color: '#3b82f6' },
            { label: 'Mastery +',  value: `+${masteryGained}%`, color: '#22c55e' },
          ].map(s => (
            <div key={s.label} style={{ padding: '12px 8px', borderRadius: 14, background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
              <p style={{ color: s.color, fontWeight: 900, fontSize: 22 }}>{s.value}</p>
              <p style={{ color: '#475569', fontSize: 11, marginTop: 2 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Mastery bar */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ color: '#64748b', fontSize: 12 }}>Overall Mastery</span>
            <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 12 }}>{totalMastery}%</span>
          </div>
          <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
            <motion.div initial={{ width: `${totalMastery - masteryGained}%` }} animate={{ width: `${totalMastery}%` }} transition={{ duration: 1, delay: 0.5 }}
              style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, #3b82f6, #22c55e)', boxShadow: '0 0 8px rgba(59,130,246,0.5)' }} />
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {hasNext && (
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={nextLevel}
              style={{ padding: '13px', borderRadius: 14, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', border: 'none', color: '#fff', fontWeight: 800, fontSize: 15, cursor: 'pointer', boxShadow: '0 0 20px rgba(59,130,246,0.4)' }}>
              ▶ Next Level
            </motion.button>
          )}
          <div style={{ display: 'flex', gap: 10 }}>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={retry}
              style={{ flex: 1, padding: '11px', borderRadius: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#94a3b8', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              🔄 Retry
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={onExit}
              style={{ flex: 1, padding: '11px', borderRadius: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#94a3b8', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              🗺️ Exit
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
