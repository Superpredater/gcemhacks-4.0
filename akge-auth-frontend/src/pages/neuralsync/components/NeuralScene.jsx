import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import useNSStore from '../store/useNSStore';
import Node3D from './Node3D';
import ConnectionLine3D from './ConnectionLine3D';

function Scene() {
  const { nodes, connections, selectedNodeId, shakeNodeId, selectNode } = useNSStore();

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[8, 8, 8]}   intensity={1.2} color="#3b82f6" />
      <pointLight position={[-8, -4, -4]} intensity={0.7} color="#8b5cf6" />
      <pointLight position={[0, 0, 10]}   intensity={0.4} color="#22c55e" />
      <Stars radius={60} depth={40} count={2000} factor={3} saturation={0} fade speed={0.5} />

      {/* Connection lines */}
      {connections.map(conn => {
        const from = nodes.find(n => n.id === conn.fromId);
        const to   = nodes.find(n => n.id === conn.toId);
        if (!from || !to) return null;
        return (
          <ConnectionLine3D
            key={conn.id}
            fromPos={from.position}
            toPos={to.position}
            correct={conn.correct}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map(node => (
        <Node3D
          key={node.id}
          node={node}
          isShaking={shakeNodeId === node.id}
          onClick={selectNode}
        />
      ))}

      <OrbitControls
        enableZoom
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxDistance={18}
        minDistance={5}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  );
}

export default function NeuralScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 55 }}
      style={{ position: 'absolute', inset: 0, background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
