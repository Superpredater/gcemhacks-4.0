import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useNSStore from '../store/useNSStore';

// ─── Node type colors ─────────────────────────────────────────────────────────
const TYPE_COLOR = {
  concept: { fill: '#1d4ed8', stroke: '#3b82f6', glow: '#3b82f6' },
  formula: { fill: '#6b21a8', stroke: '#a855f7', glow: '#a855f7' },
  answer:  { fill: '#14532d', stroke: '#22c55e', glow: '#22c55e' },
};

const STATE_STROKE = {
  idle:      null,
  selected:  '#ffffff',
  connected: '#22c55e',
  wrong:     '#ef4444',
};

// ─── Layout: map 3D positions to 2D screen coords ────────────────────────────
function project(pos, width, height) {
  // pos is [x, y, z] in range roughly -5..5
  const cx = width  / 2;
  const cy = height / 2;
  const scale = Math.min(width, height) / 12;
  return {
    x: cx + pos[0] * scale,
    y: cy - pos[1] * scale,   // flip Y
  };
}

// ─── Animated node ────────────────────────────────────────────────────────────
function Node2D({ node, projected, isShaking, onClick }) {
  const colors = TYPE_COLOR[node.type] ?? TYPE_COLOR.concept;
  const strokeColor = STATE_STROKE[node.state] ?? colors.stroke;
  const r = 28;

  const stateStyle = {
    idle:      { strokeWidth: 2,   opacity: 1 },
    selected:  { strokeWidth: 3.5, opacity: 1 },
    connected: { strokeWidth: 2.5, opacity: 0.85 },
    wrong:     { strokeWidth: 3,   opacity: 1 },
  }[node.state] ?? { strokeWidth: 2, opacity: 1 };

  return (
    <motion.g
      key={node.id}
      animate={isShaking ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
      transition={isShaking ? { duration: 0.5, ease: 'easeInOut' } : {}}
      style={{ cursor: 'pointer' }}
      onClick={() => onClick(node.id)}
    >
      {/* Glow ring */}
      <motion.circle
        cx={projected.x} cy={projected.y} r={r + 10}
        fill="none"
        stroke={colors.glow}
        strokeWidth={1}
        opacity={node.state === 'selected' ? 0.6 : node.state === 'connected' ? 0.4 : 0.15}
        animate={{ r: [r + 8, r + 14, r + 8] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Main circle */}
      <motion.circle
        cx={projected.x} cy={projected.y} r={r}
        fill={node.state === 'wrong' ? '#7f1d1d' : colors.fill}
        stroke={strokeColor}
        strokeWidth={stateStyle.strokeWidth}
        opacity={stateStyle.opacity}
        animate={node.state === 'connected' ? { r: [r, r + 3, r] } : { r }}
        transition={node.state === 'connected' ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } : {}}
        filter={node.state === 'selected' ? `url(#glow-${node.type})` : undefined}
      />

      {/* Label */}
      <foreignObject
        x={projected.x - 44} y={projected.y - 16}
        width={88} height={32}
        style={{ pointerEvents: 'none' }}
      >
        <div style={{
          width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
          color: '#f1f5f9',
          fontSize: 10,
          fontWeight: 700,
          lineHeight: 1.2,
          userSelect: 'none',
          overflow: 'hidden',
          padding: '0 2px',
        }}>
          {node.label}
        </div>
      </foreignObject>

      {/* Type dot */}
      <circle cx={projected.x + r - 6} cy={projected.y - r + 6} r={5}
        fill={colors.stroke} opacity={0.9} />
    </motion.g>
  );
}

// ─── Connection line ──────────────────────────────────────────────────────────
function ConnectionLine2D({ from, to, correct }) {
  const color = correct ? '#22c55e' : '#ef4444';
  const id = `line-${from.id}-${to.id}`;

  return (
    <g>
      {/* Glow */}
      <line
        x1={from.x} y1={from.y} x2={to.x} y2={to.y}
        stroke={color} strokeWidth={6} opacity={0.2}
        strokeLinecap="round"
      />
      {/* Main line */}
      <motion.line
        x1={from.x} y1={from.y} x2={to.x} y2={to.y}
        stroke={color} strokeWidth={2.5} opacity={0.9}
        strokeLinecap="round"
        strokeDasharray="6 3"
        animate={{ strokeDashoffset: [0, -18] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </g>
  );
}

// ─── Main 2D Scene ────────────────────────────────────────────────────────────
export default function NeuralScene2D() {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ w: 800, h: 600 });
  const { nodes, connections, shakeNodeId, selectNode } = useNSStore();

  // Responsive sizing
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setSize({ w: containerRef.current.offsetWidth, h: containerRef.current.offsetHeight });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const projected = Object.fromEntries(
    nodes.map(n => [n.id, project(n.position, size.w, size.h)])
  );

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg width={size.w} height={size.h} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          {/* Glow filters */}
          {['concept', 'formula', 'answer'].map(type => {
            const c = TYPE_COLOR[type];
            return (
              <filter key={type} id={`glow-${type}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feFlood floodColor={c.glow} floodOpacity="0.6" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="shadow" />
                <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            );
          })}
          {/* Background grid */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59,130,246,0.06)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Background */}
        <rect width={size.w} height={size.h} fill="url(#grid)" />

        {/* Connection lines (behind nodes) */}
        {connections.map(conn => {
          const from = projected[conn.fromId];
          const to   = projected[conn.toId];
          if (!from || !to) return null;
          return <ConnectionLine2D key={conn.id} from={from} to={to} correct={conn.correct} />;
        })}

        {/* Nodes */}
        {nodes.map(node => (
          <Node2D
            key={node.id}
            node={node}
            projected={projected[node.id] ?? { x: 0, y: 0 }}
            isShaking={shakeNodeId === node.id}
            onClick={selectNode}
          />
        ))}
      </svg>
    </div>
  );
}
