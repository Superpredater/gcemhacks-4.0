import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { concepts, dependencies } from '../data/mockData';

// ─── helpers ─────────────────────────────────────────────────────────────────
function masteryColor(mastery) {
  if (mastery >= 70) return '#22c55e';
  if (mastery >= 50) return '#eab308';
  return '#ef4444';
}

function masteryEmissive(mastery) {
  if (mastery >= 70) return '#166534';
  if (mastery >= 50) return '#713f12';
  return '#7f1d1d';
}

function nodeRadius(conceptId) {
  const outgoing = dependencies.filter(([f]) => f === conceptId).length;
  const incoming = dependencies.filter(([, t]) => t === conceptId).length;
  return 0.25 + (outgoing + incoming) * 0.06;
}

// ─── Single Node ─────────────────────────────────────────────────────────────
function ConceptNode({ concept, onHover, onClick, isSelected }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const color   = masteryColor(concept.mastery);
  const emissive = masteryEmissive(concept.mastery);
  const radius  = nodeRadius(concept.id);
  const isWeak  = concept.mastery < 50;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    // Weak nodes pulse
    if (isWeak) {
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 2.5) * 0.12;
      meshRef.current.scale.setScalar(pulse);
    }
    // Hover scale
    if (hovered) {
      meshRef.current.scale.setScalar(isWeak ? 1.3 : 1.2);
    }
  });

  return (
    <group position={concept.position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); onHover(concept); }}
        onPointerOut={() => { setHovered(false); onHover(null); }}
        onClick={(e) => { e.stopPropagation(); onClick(concept); }}
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={isWeak ? 0.6 : 0.3}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>

      {/* Glow ring for weak nodes */}
      {isWeak && (
        <mesh>
          <torusGeometry args={[radius + 0.1, 0.03, 8, 32]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.8} transparent opacity={0.5} />
        </mesh>
      )}

      {/* Selected ring */}
      {isSelected && (
        <mesh>
          <torusGeometry args={[radius + 0.18, 0.04, 8, 32]} />
          <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={1} transparent opacity={0.8} />
        </mesh>
      )}

      {/* Label */}
      <Html distanceFactor={10} center>
        <div style={{
          background: 'rgba(15,23,42,0.85)',
          border: `1px solid ${color}55`,
          borderRadius: '6px',
          padding: '2px 6px',
          color: '#f1f5f9',
          fontSize: '10px',
          fontWeight: '600',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          transform: 'translateY(-28px)',
        }}>
          {concept.name}
        </div>
      </Html>
    </group>
  );
}

// ─── Edge (line between two nodes) ───────────────────────────────────────────
function Edge({ from, to }) {
  const fromPos = new THREE.Vector3(...from.position);
  const toPos   = new THREE.Vector3(...to.position);

  const points = useMemo(() => [fromPos, toPos], [from.id, to.id]);
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(points);
    return g;
  }, [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#334155" transparent opacity={0.5} linewidth={1} />
    </line>
  );
}

// ─── Scene ───────────────────────────────────────────────────────────────────
function Scene({ onHover, onSelect, selectedId }) {
  const conceptMap = useMemo(() => Object.fromEntries(concepts.map(c => [c.id, c])), []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -5, -5]} intensity={0.4} color="#3b82f6" />
      <pointLight position={[0, -10, 5]}  intensity={0.3} color="#8b5cf6" />

      {/* Edges */}
      {dependencies.map(([fId, tId], i) => {
        const from = conceptMap[fId];
        const to   = conceptMap[tId];
        if (!from || !to) return null;
        return <Edge key={i} from={from} to={to} />;
      })}

      {/* Nodes */}
      {concepts.map(c => (
        <ConceptNode
          key={c.id}
          concept={c}
          onHover={onHover}
          onClick={onSelect}
          isSelected={selectedId === c.id}
        />
      ))}

      <OrbitControls enableZoom enablePan autoRotate autoRotateSpeed={0.4} />
    </>
  );
}

// ─── Tooltip overlay ─────────────────────────────────────────────────────────
function Tooltip({ concept }) {
  if (!concept) return null;
  const color = masteryColor(concept.mastery);
  return (
    <div style={{
      position: 'absolute',
      top: 16,
      left: 16,
      background: 'rgba(15,23,42,0.92)',
      border: `1px solid ${color}`,
      borderRadius: '12px',
      padding: '12px 16px',
      color: '#f1f5f9',
      pointerEvents: 'none',
      zIndex: 20,
      minWidth: '160px',
      backdropFilter: 'blur(12px)',
    }}>
      <p style={{ fontWeight: '700', fontSize: '14px', marginBottom: '4px' }}>{concept.name}</p>
      <p style={{ fontSize: '12px', color: '#94a3b8' }}>Class Mastery</p>
      <p style={{ fontSize: '22px', fontWeight: '800', color }}>{concept.mastery}%</p>
      <p style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
        {concept.mastery >= 70 ? '✅ Strong' : concept.mastery >= 50 ? '⚠️ Average' : '🔴 Weak — needs attention'}
      </p>
    </div>
  );
}

// ─── Legend ──────────────────────────────────────────────────────────────────
function Legend() {
  const items = [
    { color: '#22c55e', label: 'Strong (≥70%)' },
    { color: '#eab308', label: 'Average (50–69%)' },
    { color: '#ef4444', label: 'Weak (<50%) — pulsing' },
  ];
  return (
    <div style={{
      position: 'absolute',
      bottom: 16,
      left: 16,
      background: 'rgba(15,23,42,0.85)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '10px',
      padding: '10px 14px',
      zIndex: 20,
      backdropFilter: 'blur(12px)',
    }}>
      <p style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '6px', fontWeight: '600' }}>NODE LEGEND</p>
      {items.map(item => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
          <span style={{ color: '#cbd5e1', fontSize: '11px' }}>{item.label}</span>
        </div>
      ))}
      <p style={{ color: '#475569', fontSize: '10px', marginTop: '6px' }}>Click node to drill down</p>
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function ConceptGraph({ onConceptSelect }) {
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (concept) => {
    setSelectedId(concept.id);
    onConceptSelect?.(concept);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 2, 12], fov: 55 }}
        style={{ background: 'transparent' }}
      >
        <Scene
          onHover={setHoveredConcept}
          onSelect={handleSelect}
          selectedId={selectedId}
        />
      </Canvas>
      <Tooltip concept={hoveredConcept} />
      <Legend />
    </div>
  );
}
