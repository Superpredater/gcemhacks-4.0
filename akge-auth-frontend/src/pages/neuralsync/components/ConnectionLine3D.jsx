import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

export default function ConnectionLine3D({ fromPos, toPos, correct }) {
  const lineRef = useRef();
  const color = correct ? '#22c55e' : '#ef4444';

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    // Animate opacity / emissive pulse
    const t = clock.getElapsedTime();
    if (lineRef.current.material) {
      lineRef.current.material.opacity = 0.6 + Math.sin(t * 2) * 0.3;
    }
  });

  const pts = useMemo(() => [
    new THREE.Vector3(...fromPos),
    new THREE.Vector3(...toPos),
  ], [fromPos, toPos]);

  return (
    <Line
      ref={lineRef}
      points={pts}
      color={color}
      lineWidth={2.5}
      transparent
      opacity={0.85}
    />
  );
}
