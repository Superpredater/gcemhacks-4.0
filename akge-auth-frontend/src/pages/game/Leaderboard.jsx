import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from './store/useGameStore';
import { CURRENT_USER_ID } from './data/gameData';

const MODES = ['Global', 'Weekly', 'Class'];

const rankStyle = {
  1: { bg: 'rgba(234,179,8,0.15)',  border: 'rgba(234,179,8,0.5)',  color: '#fde047', icon: '🥇' },
  2: { bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.4)', color: '#cbd5e1', icon: '🥈' },
  3: { bg: 'rgba(180,83,9,0.15)',   border: 'rgba(180,83,9,0.5)',   color: '#fdba74', icon: '🥉' },
};

export default function Leaderboard() {
  const navigate = useNavigate();
  const { leaderboard, xp } = useGameStore();
  const [activeMode, setActiveMode] = useState('Global');

  // Simulate different modes with slight variations
  const getBoard = () => {
    if (activeMode === 'Weekly') {
      return [...leaderboard].map(u => ({ ...u, xp: Math.round(u.xp * 0.3) })).sort((a, b) => b.xp - a.xp).map((u, i) => ({ ...u, rank: i + 1 }));
    }
    if (activeMode === 'Class') {
      return leaderboard.slice(0, 6).map((u, i) => ({ ...u, rank: i + 1 }));
    }
    return leaderboard;
  };

  const board = getBoard();
  const currentUserRank = board.find(u => u.id === CURRENT_USER_ID)?.rank ?? '—';

  return (
    <div style={{ minHeight: '100vh', background: '#050510', padding: 24, fontFamily: 'sans-serif' }}>

      {/* Header */}
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <button onClick={() => navigate('/student/map')}
            style={{ padding: '8px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#94a3b8', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
            ← Map
          </button>
          <h1 style={{ color: '#f1f5f9', fontWeight: 900, fontSize: 28, textShadow: '0 0 20px #8b5cf6', margin: 0 }}>
            🏆 LEADERBOARD
          </h1>
          <button onClick={() => navigate('/student/dashboard')}
            style={{ padding: '8px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#94a3b8', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
            Dashboard
          </button>
        </div>

        {/* Your rank card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.5)', borderRadius: 16, padding: '16px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 0 24px rgba(139,92,246,0.3)' }}>
          <div>
            <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>YOUR RANK</p>
            <p style={{ color: '#c084fc', fontWeight: 900, fontSize: 32 }}>#{currentUserRank}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>YOUR XP</p>
            <p style={{ color: '#fde047', fontWeight: 900, fontSize: 24 }}>⚡ {xp}</p>
          </div>
        </motion.div>

        {/* Mode tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {MODES.map(m => (
            <button key={m} onClick={() => setActiveMode(m)}
              style={{
                flex: 1, padding: '10px', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: 14, transition: 'all 0.2s',
                background: activeMode === m ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${activeMode === m ? 'rgba(139,92,246,0.7)' : 'rgba(255,255,255,0.1)'}`,
                color: activeMode === m ? '#c084fc' : '#64748b',
                boxShadow: activeMode === m ? '0 0 12px rgba(139,92,246,0.3)' : 'none',
              }}>
              {m}
            </button>
          ))}
        </div>

        {/* Board */}
        <AnimatePresence mode="wait">
          <motion.div key={activeMode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {board.map((user, i) => {
                const isMe = user.id === CURRENT_USER_ID;
                const rs = rankStyle[user.rank];
                return (
                  <motion.div key={user.id}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px', borderRadius: 14,
                      background: isMe ? 'rgba(139,92,246,0.2)' : rs ? rs.bg : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${isMe ? 'rgba(139,92,246,0.6)' : rs ? rs.border : 'rgba(255,255,255,0.08)'}`,
                      boxShadow: isMe ? '0 0 16px rgba(139,92,246,0.3)' : 'none',
                      transition: 'all 0.2s',
                    }}>

                    {/* Rank */}
                    <div style={{ width: 36, textAlign: 'center', flexShrink: 0 }}>
                      {rs ? (
                        <span style={{ fontSize: 22 }}>{rs.icon}</span>
                      ) : (
                        <span style={{ color: '#64748b', fontWeight: 800, fontSize: 16 }}>#{user.rank}</span>
                      )}
                    </div>

                    {/* Avatar */}
                    <span style={{ fontSize: 28, flexShrink: 0 }}>{user.avatar}</span>

                    {/* Name */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: isMe ? '#c084fc' : rs ? rs.color : '#f1f5f9', fontWeight: isMe ? 800 : 600, fontSize: 15, margin: 0 }}>
                        {user.name} {isMe && <span style={{ fontSize: 11, color: '#8b5cf6' }}>← YOU</span>}
                      </p>
                    </div>

                    {/* Change indicator */}
                    {user.change !== 0 && (
                      <span style={{ color: user.change > 0 ? '#22c55e' : '#ef4444', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                        {user.change > 0 ? `▲${user.change}` : `▼${Math.abs(user.change)}`}
                      </span>
                    )}

                    {/* XP */}
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{ color: '#fde047', fontWeight: 800, fontSize: 16, margin: 0 }}>⚡ {user.xp.toLocaleString()}</p>
                      <p style={{ color: '#64748b', fontSize: 11, margin: 0 }}>XP</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Play button */}
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/student/map')}
          style={{ width: '100%', marginTop: 24, padding: '16px', borderRadius: 16, background: 'linear-gradient(135deg,#8b5cf6,#3b82f6)', border: 'none', color: '#fff', fontWeight: 800, fontSize: 16, cursor: 'pointer', boxShadow: '0 0 24px rgba(139,92,246,0.4)' }}>
          🎮 Play to Climb the Ranks
        </motion.button>
      </div>
    </div>
  );
}
