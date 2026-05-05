import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

function nodeColor(status) {
  if (status === 'completed') return '#22c55e';
  if (status === 'unlocked')  return '#eab308';
  return '#475569';
}
function nodeEmissive(status) {
  if (status === 'completed') return '#14532d';
  if (status === 'unlocked')  return '#713f12';
  return '#1e293b';
}

export default function LevelNode({ level, status, mastery, onHover, onClick }) {
  const meshRef = useRef();
  const ringRef = useRef();
  const [hovered, setHovered] = useState(false);
  const color   = nodeColor(status);
  const emissive = nodeEmissive(status);
  const radius  = 0.28 + level.importance * 0.12;
  const isWeak  = status === 'unlocked';
  const isDone  = status === 'completed';

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    if (isWeak) {
      const pulse = 1 + Math.sin(t * 2.5) * 0.1;
      meshRef.current.scale.setScalar(hovered ? 1.3 : pulse);
    } else {
      meshRef.current.scale.setScalar(hovered ? 1.25 : 1);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * (isDone ? 0.8 : 0.4);
      ringRef.current.rotation.x = t * 0.3;
    }
  });

  return (
    <group position={level.position}>
      {/* Main sphere */}
      <mesh ref={meshRef}
        onPointerOver={e => { e.stopPropagation(); setHovered(true); onHover(level, status, mastery); }}
        onPointerOut={() => { setHovered(false); onHover(null, null, null); }}
        onClick={e => { e.stopPropagation(); onClick(level, status); }}
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={isWeak ? 0.8 : isDone ? 0.5 : 0.2}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      {/* Orbit ring for unlocked/completed */}
      {(isWeak || isDone) && (
        <mesh ref={ringRef}>
          <torusGeometry args={[radius + 0.18, 0.03, 8, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isDone ? 1.2 : 0.7}
            transparent opacity={0.7}
          />
        </mesh>
      )}

      {/* Lock icon for locked */}
      {status === 'locked' && (
        <Html center distanceFactor={8}>
          <div style={{ color: '#64748b', fontSize: 14, pointerEvents: 'none', userSelect: 'none' }}>🔒</div>
        </Html>
      )}

      {/* Label */}
      <Html distanceFactor={10} center>
        <div style={{
          background: 'rgba(10,10,20,0.9)',
          border: `1px solid ${color}66`,
          borderRadius: 8,
          padding: '2px 8px',
          color: '#f1f5f9',
          fontSize: 10,
          fontWeight: 800,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          transform: 'translateY(-32px)',
          userSelect: 'none',
          textShadow: `0 0 8px ${color}`,
        }}>
          {level.concept}
        </div>
      </Html>
    </group>
  );
}
