import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const TYPE_COLOR = {
  concept: '#3b82f6',
  formula: '#a855f7',
  answer:  '#22c55e',
};

const STATE_EMISSIVE = {
  idle:      0.2,
  selected:  1.2,
  connected: 0.6,
  wrong:     0.8,
};

const STATE_EMISSIVE_COLOR = {
  idle:      null,
  selected:  '#ffffff',
  connected: null,
  wrong:     '#ef4444',
};

export default function Node3D({ node, isShaking, onClick }) {
  const meshRef  = useRef();
  const ringRef  = useRef();
  const [hovered, setHovered] = useState(false);
  const [shakeOffset, setShakeOffset] = useState(0);

  const baseColor = TYPE_COLOR[node.type] ?? '#3b82f6';
  const emissiveIntensity = hovered ? 1.0 : STATE_EMISSIVE[node.state] ?? 0.2;
  const emissiveColor = STATE_EMISSIVE_COLOR[node.state] ?? baseColor;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    // Idle float
    meshRef.current.position.y = node.position[1] + Math.sin(t * 0.8 + node.position[0]) * 0.12;

    // Shake on wrong
    if (isShaking) {
      meshRef.current.position.x = node.position[0] + Math.sin(t * 40) * 0.15;
    } else {
      meshRef.current.position.x = node.position[0];
    }

    // Ring rotation for selected/connected
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 1.5;
      ringRef.current.rotation.x = t * 0.8;
      ringRef.current.visible = node.state === 'selected' || node.state === 'connected';
    }

    // Pulse scale for connected
    if (node.state === 'connected') {
      const pulse = 1 + Math.sin(t * 3) * 0.05;
      meshRef.current.scale.setScalar(hovered ? 1.3 : pulse);
    } else {
      meshRef.current.scale.setScalar(hovered ? 1.25 : 1);
    }
  });

  return (
    <group position={node.position}>
      {/* Main sphere */}
      <mesh ref={meshRef}
        onPointerOver={e => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
        onClick={e => { e.stopPropagation(); onClick(node.id); }}
      >
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial
          color={node.state === 'wrong' ? '#ef4444' : baseColor}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          roughness={0.2}
          metalness={0.5}
          transparent
          opacity={node.state === 'connected' ? 0.9 : 1}
        />
      </mesh>

      {/* Orbit ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.48, 0.025, 8, 32]} />
        <meshStandardMaterial
          color={baseColor}
          emissive={baseColor}
          emissiveIntensity={node.state === 'selected' ? 2 : 0.8}
          transparent opacity={0.7}
        />
      </mesh>

      {/* Label */}
      <Html distanceFactor={9} center>
        <div style={{
          background: 'rgba(5,5,20,0.88)',
          border: `1px solid ${baseColor}66`,
          borderRadius: 8,
          padding: '3px 9px',
          color: '#f1f5f9',
          fontSize: 11,
          fontWeight: 700,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          transform: 'translateY(-34px)',
          textShadow: `0 0 8px ${baseColor}`,
          maxWidth: 140,
          textAlign: 'center',
          lineHeight: 1.3,
        }}>
          {node.label}
        </div>
      </Html>
    </group>
  );
}
