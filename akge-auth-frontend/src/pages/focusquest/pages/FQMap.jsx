import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useFQStore from '../store/useFQStore';
import { fqConcepts } from '../data/fqData';

function masteryColor(m) {
  if (m >= 80) return '#22c55e';
  if (m >= 60) return '#3b82f6';
  if (m >= 40) return '#eab308';
  return '#ef4444';
}

export default function FQMap() {
  const navigate = useNavigate();
  const { concepts } = useFQStore();
  const [hoveredId, setHoveredId] = useState(null);
  const [lockedId, setLockedId] = useState(null);

  const handleClick = (c) => {
    if (!c.unlocked) { setLockedId(c.id); return; }
    navigate(`/student/fq/game/${c.id}`);
  };

  const hovered = concepts.find(c => c.id === hoveredId);
  const locked  = concepts.find(c => c.id === lockedId);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-6 border border-white/10" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.1))' }}>
        <h1 className="text-2xl font-black text-white">Learning Map 🗺️</h1>
        <p className="text-white/50 mt-1 text-sm">Choose a zone to begin your Focus Quest session</p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {[
          { color: '#22c55e', label: 'Mastered (≥80%)' },
          { color: '#3b82f6', label: 'In Progress' },
          { color: '#eab308', label: 'Needs Work' },
          { color: '#64748b', label: 'Locked 🔒' },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-xs font-medium text-white/60"
            style={{ background: `${l.color}15` }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
            {l.label}
          </div>
        ))}
      </div>

      {/* Zone grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {concepts.map((c, i) => {
          const color = c.unlocked ? masteryColor(c.mastery) : '#475569';
          return (
            <motion.button key={c.id}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
              whileHover={c.unlocked ? { scale: 1.06, y: -4 } : { scale: 1.02 }}
              whileTap={c.unlocked ? { scale: 0.97 } : {}}
              onClick={() => handleClick(c)}
              onMouseEnter={() => setHoveredId(c.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative rounded-2xl p-5 text-center border transition-all duration-200"
              style={{
                background: c.unlocked ? `${color}18` : 'rgba(71,85,105,0.12)',
                border: `1px solid ${c.unlocked ? `${color}44` : 'rgba(71,85,105,0.3)'}`,
                cursor: c.unlocked ? 'pointer' : 'not-allowed',
                opacity: c.unlocked ? 1 : 0.6,
                boxShadow: hoveredId === c.id && c.unlocked ? `0 0 20px ${color}30` : 'none',
              }}>
              <span className="text-3xl block mb-2">{c.unlocked ? c.emoji : '🔒'}</span>
              <p className="text-white font-bold text-xs leading-tight mb-2">{c.zone}</p>
              {c.unlocked ? (
                <>
                  <p className="text-2xl font-black mb-1" style={{ color }}>{c.mastery}%</p>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div className="h-1.5 rounded-full transition-all duration-700" style={{ width: `${c.mastery}%`, background: color }} />
                  </div>
                  {c.mastery >= 80 && (
                    <span className="absolute top-2 right-2 text-xs">✅</span>
                  )}
                </>
              ) : (
                <p className="text-slate-500 text-xs">Complete prerequisites</p>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Locked modal */}
      <AnimatePresence>
        {lockedId && locked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ background: 'rgba(0,0,0,0.7)' }}
            onClick={() => setLockedId(null)}>
            <motion.div initial={{ scale: 0.85, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85 }}
              onClick={e => e.stopPropagation()}
              className="rounded-2xl p-8 text-center max-w-sm w-full mx-4 border border-white/20"
              style={{ background: 'rgba(15,23,42,0.98)', backdropFilter: 'blur(20px)' }}>
              <span className="text-5xl">🔒</span>
              <h3 className="text-white font-black text-xl mt-4 mb-2">{locked.zone}</h3>
              <p className="text-white/50 text-sm mb-4">Complete these zones first:</p>
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {locked.requires.map(r => {
                  const req = fqConcepts.find(c => c.id === r);
                  return (
                    <span key={r} className="px-3 py-1 rounded-full text-xs font-semibold border border-red-500/30 text-red-300"
                      style={{ background: 'rgba(239,68,68,0.15)' }}>
                      {req?.zone ?? r}
                    </span>
                  );
                })}
              </div>
              <button onClick={() => setLockedId(null)}
                className="px-6 py-2.5 rounded-xl text-white font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}>
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
