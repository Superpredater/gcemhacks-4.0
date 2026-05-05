import React, { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from './store/useGameStore';
import useAuthStore from '../../store/authStore';
import { levels, edges } from './data/gameData';
import LevelNode from './components/LevelNode';

// ─── Edge lines ───────────────────────────────────────────────────────────────
function MapEdge({ from, to, bothCompleted }) {
  const pts = [new THREE.Vector3(...from.position), new THREE.Vector3(...to.position)];
  return (
    <Line
      points={pts}
      color={bothCompleted ? '#22c55e' : '#1e3a5f'}
      lineWidth={bothCompleted ? 2.5 : 1}
      transparent
      opacity={bothCompleted ? 0.8 : 0.3}
    />
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function MapScene({ onHover, onNodeClick }) {
  const { getLevelStatus, mastery } = useGameStore();
  const levelMap = Object.fromEntries(levels.map(l => [l.id, l]));

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
      <pointLight position={[-10, -5, -5]} intensity={0.6} color="#8b5cf6" />
      <pointLight position={[0, 0, 15]} intensity={0.4} color="#22c55e" />
      <Stars radius={80} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

      {/* Edges */}
      {edges.map(([fId, tId], i) => {
        const from = levelMap[fId];
        const to   = levelMap[tId];
        if (!from || !to) return null;
        const bothDone = getLevelStatus(fId) === 'completed' && getLevelStatus(tId) === 'completed';
        return <MapEdge key={i} from={from} to={to} bothCompleted={bothDone} />;
      })}

      {/* Nodes */}
      {levels.map(l => (
        <LevelNode
          key={l.id}
          level={l}
          status={getLevelStatus(l.id)}
          mastery={mastery[l.id] ?? 0}
          onHover={onHover}
          onClick={onNodeClick}
        />
      ))}

      <OrbitControls enableZoom enablePan autoRotate autoRotateSpeed={0.3} maxDistance={20} minDistance={5} />
    </>
  );
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────
function Tooltip({ level, status, mastery }) {
  if (!level) return null;
  const color = status === 'completed' ? '#22c55e' : status === 'unlocked' ? '#eab308' : '#64748b';
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: 'absolute', top: 20, left: 20,
        background: 'rgba(10,10,20,0.95)',
        border: `1px solid ${color}`,
        borderRadius: 16, padding: '14px 18px',
        backdropFilter: 'blur(16px)',
        minWidth: 200, zIndex: 20,
        boxShadow: `0 0 24px ${color}40`,
      }}>
      <p style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 15, marginBottom: 6 }}>{level.concept}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
        <span style={{ color, fontWeight: 700, fontSize: 13, textTransform: 'capitalize' }}>{status}</span>
      </div>
      {mastery > 0 && (
        <p style={{ color: '#94a3b8', fontSize: 12 }}>Mastery: <span style={{ color, fontWeight: 700 }}>{mastery}%</span></p>
      )}
      <p style={{ color: '#64748b', fontSize: 11, marginTop: 6 }}>
        {status === 'locked' ? '🔒 Complete prerequisites first' : status === 'unlocked' ? '▶ Click to play!' : '✅ Completed'}
      </p>
    </motion.div>
  );
}

// ─── Locked modal ─────────────────────────────────────────────────────────────
function LockedModal({ level, onClose }) {
  if (!level) return null;
  const requires = level.requires.map(r => levels.find(l => l.id === r)?.concept ?? r);
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}
      onClick={onClose}>
      <motion.div
        initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 20 }}
        onClick={e => e.stopPropagation()}
        style={{ background: 'rgba(15,23,42,0.98)', border: '1px solid rgba(239,68,68,0.5)', borderRadius: 20, padding: '2rem', maxWidth: 360, width: '90%', textAlign: 'center', backdropFilter: 'blur(20px)' }}>
        <span style={{ fontSize: 48 }}>🔒</span>
        <h3 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 20, margin: '12px 0 8px' }}>{level.concept}</h3>
        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>Complete these first:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 20 }}>
          {requires.map(r => (
            <span key={r} style={{ padding: '4px 12px', borderRadius: 20, background: 'rgba(239,68,68,0.15)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.3)', fontSize: 13, fontWeight: 600 }}>{r}</span>
          ))}
        </div>
        <button onClick={onClose} style={{ padding: '10px 28px', borderRadius: 12, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
          Got it
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MapPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { xp, streak, completedLevels, getLevelStatus } = useGameStore();
  const [hoveredLevel, setHoveredLevel] = useState(null);
  const [hoveredStatus, setHoveredStatus] = useState(null);
  const [hoveredMastery, setHoveredMastery] = useState(null);
  const [lockedLevel, setLockedLevel] = useState(null);

  const handleNodeClick = (level, status) => {
    if (status === 'locked') { setLockedLevel(level); return; }
    navigate(`/student/game/${level.id}`);
  };

  const handleHover = (level, status, mastery) => {
    setHoveredLevel(level);
    setHoveredStatus(status);
    setHoveredMastery(mastery);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050510', position: 'relative', overflow: 'hidden' }}>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 2, 14], fov: 55 }} style={{ position: 'absolute', inset: 0 }}>
        <Suspense fallback={null}>
          <MapScene onHover={handleHover} onNodeClick={handleNodeClick} />
        </Suspense>
      </Canvas>

      {/* HUD top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 30,
        background: 'linear-gradient(to bottom, rgba(5,5,16,0.95), transparent)',
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => navigate('/student/dashboard')}
            style={{ padding: '8px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#94a3b8', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
            ← Dashboard
          </button>
          <div style={{ color: '#f1f5f9', fontWeight: 900, fontSize: 20, letterSpacing: 2, textShadow: '0 0 20px #3b82f6' }}>
            🗺️ SKILL MAP
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ padding: '6px 14px', borderRadius: 20, background: 'rgba(234,179,8,0.15)', border: '1px solid rgba(234,179,8,0.4)', color: '#fde047', fontWeight: 800, fontSize: 14 }}>
            ⚡ {xp} XP
          </div>
          <div style={{ padding: '6px 14px', borderRadius: 20, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', color: '#fca5a5', fontWeight: 800, fontSize: 14 }}>
            🔥 {streak}d
          </div>
          <div style={{ padding: '6px 14px', borderRadius: 20, background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.4)', color: '#86efac', fontWeight: 800, fontSize: 14 }}>
            ✅ {completedLevels.length}/{levels.length}
          </div>
          <button onClick={() => navigate('/student/leaderboard')}
            style={{ padding: '8px 16px', borderRadius: 10, background: 'linear-gradient(135deg,#8b5cf6,#3b82f6)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
            🏆 Leaderboard
          </button>
          <button onClick={() => { logout(); navigate('/login'); }}
            style={{ padding: '8px 14px', borderRadius: 10, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
            Logout
          </button>
        </div>
      </div>

      {/* Legend */}
      <div style={{
        position: 'absolute', bottom: 24, left: 24, zIndex: 30,
        background: 'rgba(10,10,20,0.88)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 14, padding: '12px 16px', backdropFilter: 'blur(12px)',
      }}>
        <p style={{ color: '#64748b', fontSize: 10, marginBottom: 8, fontWeight: 700, letterSpacing: 1 }}>LEGEND</p>
        {[
          { color: '#22c55e', label: 'Completed' },
          { color: '#eab308', label: 'Unlocked (pulsing)' },
          { color: '#475569', label: 'Locked' },
        ].map(i => (
          <div key={i.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: i.color, boxShadow: `0 0 6px ${i.color}` }} />
            <span style={{ color: '#cbd5e1', fontSize: 11 }}>{i.label}</span>
          </div>
        ))}
        <p style={{ color: '#475569', fontSize: 10, marginTop: 6 }}>Drag to rotate · Scroll to zoom</p>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredLevel && <Tooltip level={hoveredLevel} status={hoveredStatus} mastery={hoveredMastery} />}
      </AnimatePresence>

      {/* Locked modal */}
      <AnimatePresence>
        {lockedLevel && <LockedModal level={lockedLevel} onClose={() => setLockedLevel(null)} />}
      </AnimatePresence>
    </div>
  );
}
