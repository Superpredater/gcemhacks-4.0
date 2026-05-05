import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { concepts as baseConcepts, dependencies } from '../data/weakData';

// ─── helpers ─────────────────────────────────────────────────────────────────
function getColor(mastery) {
  if (mastery >= 70) return '#22c55e';
  if (mastery >= 50) return '#eab308';
  return '#ef4444';
}
function getEmissive(mastery) {
  if (mastery >= 70) return '#14532d';
  if (mastery >= 50) return '#713f12';
  return '#7f1d1d';
}
function getRadius(concept) {
  const out = dependencies.filter(d => d.from === concept.id).length;
  const inn = dependencies.filter(d => d.to   === concept.id).length;
  return 0.22 + (out + inn) * 0.055 + (concept.impact / 60);
}

// ─── Node ─────────────────────────────────────────────────────────────────────
function Node({ concept, simMastery, onHover, onClick, isSelected }) {
  const ref = useRef();
  const [hov, setHov] = useState(false);
  const mastery = simMastery ?? concept.mastery;
  const color   = getColor(mastery);
  const emissive = getEmissive(mastery);
  const r = getRadius(concept);
  const isWeak = mastery < 50;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    if (isWeak) {
      const p = 1 + Math.sin(clock.getElapsedTime() * 2.8) * 0.13;
      ref.current.scale.setScalar(hov ? 1.35 : p);
    } else {
      ref.current.scale.setScalar(hov ? 1.2 : 1);
    }
  });

  return (
    <group position={concept.position}>
      <mesh
        ref={ref}
        onPointerOver={e => { e.stopPropagation(); setHov(true); onHover(concept, mastery); }}
        onPointerOut={() => { setHov(false); onHover(null, null); }}
        onClick={e => { e.stopPropagation(); onClick(concept); }}
      >
        <sphereGeometry args={[r, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={isWeak ? 0.7 : 0.25}
          roughness={0.25}
          metalness={0.5}
        />
      </mesh>

      {/* Pulse ring for weak */}
      {isWeak && (
        <mesh>
          <torusGeometry args={[r + 0.12, 0.035, 8, 32]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.9} transparent opacity={0.45} />
        </mesh>
      )}

      {/* Selection ring */}
      {isSelected && (
        <mesh>
          <torusGeometry args={[r + 0.22, 0.045, 8, 32]} />
          <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={1.2} transparent opacity={0.85} />
        </mesh>
      )}

      {/* Label */}
      <Html distanceFactor={10} center>
        <div style={{
          background: 'rgba(15,23,42,0.88)',
          border: `1px solid ${color}55`,
          borderRadius: 6,
          padding: '2px 7px',
          color: '#f1f5f9',
          fontSize: 10,
          fontWeight: 700,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          transform: 'translateY(-30px)',
          userSelect: 'none',
        }}>
          {concept.name}
        </div>
      </Html>
    </group>
  );
}

// ─── Edge ─────────────────────────────────────────────────────────────────────
function Edge({ dep, conceptMap }) {
  const from = conceptMap[dep.from];
  const to   = conceptMap[dep.to];
  if (!from || !to) return null;
  const pts = [new THREE.Vector3(...from.position), new THREE.Vector3(...to.position)];
  const opacity = 0.25 + dep.weight * 0.45;
  const width   = 1 + dep.weight * 2;
  return (
    <Line
      points={pts}
      color="#475569"
      lineWidth={width}
      transparent
      opacity={opacity}
    />
  );
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────
function Tooltip({ concept, mastery }) {
  if (!concept) return null;
  const color = getColor(mastery);
  return (
    <div style={{
      position: 'absolute', top: 14, left: 14,
      background: 'rgba(15,23,42,0.93)',
      border: `1px solid ${color}`,
      borderRadius: 12, padding: '12px 16px',
      color: '#f1f5f9', pointerEvents: 'none', zIndex: 20,
      minWidth: 170, backdropFilter: 'blur(14px)',
    }}>
      <p style={{ fontWeight: 800, fontSize: 14, marginBottom: 4 }}>{concept.name}</p>
      <p style={{ fontSize: 11, color: '#94a3b8' }}>Class Mastery</p>
      <p style={{ fontSize: 24, fontWeight: 900, color, lineHeight: 1.2 }}>{mastery}%</p>
      <p style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>
        Impact Score: <span style={{ color: '#f59e0b', fontWeight: 700 }}>{concept.impact}/10</span>
      </p>
      <p style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
        {mastery < 50 ? '🔴 Weak — pulsing' : mastery < 70 ? '🟡 Average' : '🟢 Strong'}
      </p>
    </div>
  );
}

// ─── Legend ───────────────────────────────────────────────────────────────────
function Legend() {
  return (
    <div style={{
      position: 'absolute', bottom: 14, left: 14,
      background: 'rgba(15,23,42,0.88)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 10, padding: '10px 14px', zIndex: 20,
      backdropFilter: 'blur(12px)',
    }}>
      <p style={{ color: '#64748b', fontSize: 10, marginBottom: 6, fontWeight: 700, letterSpacing: 1 }}>LEGEND</p>
      {[
        { color: '#22c55e', label: 'Strong ≥70%' },
        { color: '#eab308', label: 'Average 50–69%' },
        { color: '#ef4444', label: 'Weak <50% (pulsing)' },
      ].map(i => (
        <div key={i.label} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: i.color }} />
          <span style={{ color: '#cbd5e1', fontSize: 11 }}>{i.label}</span>
        </div>
      ))}
      <p style={{ color: '#475569', fontSize: 10, marginTop: 6 }}>Edge thickness = causal weight</p>
      <p style={{ color: '#475569', fontSize: 10 }}>Click node → drill-down</p>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function CausalGraph({ simMasteries = {}, onConceptSelect }) {
  const [hovConcept, setHovConcept] = useState(null);
  const [hovMastery, setHovMastery] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const conceptMap = useMemo(
    () => Object.fromEntries(baseConcepts.map(c => [c.id, c])),
    []
  );

  const handleSelect = (c) => {
    setSelectedId(c.id);
    onConceptSelect?.(c);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 2, 13], fov: 55 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-8, -5, -5]} intensity={0.4} color="#3b82f6" />
        <pointLight position={[0, -10, 5]}  intensity={0.3} color="#8b5cf6" />

        {dependencies.map((dep, i) => (
          <Edge key={i} dep={dep} conceptMap={conceptMap} />
        ))}

        {baseConcepts.map(c => (
          <Node
            key={c.id}
            concept={c}
            simMastery={simMasteries[c.id] ?? null}
            onHover={(concept, mastery) => { setHovConcept(concept); setHovMastery(mastery); }}
            onClick={handleSelect}
            isSelected={selectedId === c.id}
          />
        ))}

        <OrbitControls enableZoom enablePan autoRotate autoRotateSpeed={0.35} />
      </Canvas>
      <Tooltip concept={hovConcept} mastery={hovMastery} />
      <Legend />
    </div>
  );
}
