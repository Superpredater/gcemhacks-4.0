import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

// ─── Config ───────────────────────────────────────────────────────────────────
const AXES = [
  { key: 'mastery',   label: 'Mastery',   color: '#3b82f6' },
  { key: 'accuracy',  label: 'Accuracy',  color: '#22c55e' },
  { key: 'retention', label: 'Retention', color: '#a855f7' },
  { key: 'speed',     label: 'Speed',     color: '#f59e0b' },
];
const RINGS = [25, 50, 75, 100];
const RADIUS = 3;

function toXZ(angle, r) {
  return [Math.cos(angle) * r, 0, Math.sin(angle) * r];
}

// ─── Grid rings ───────────────────────────────────────────────────────────────
function GridRings() {
  return (
    <>
      {RINGS.map(r => {
        const pts = [];
        for (let i = 0; i <= 64; i++) {
          const a = (i / 64) * Math.PI * 2;
          pts.push(new THREE.Vector3(Math.cos(a) * (r / 100) * RADIUS, 0, Math.sin(a) * (r / 100) * RADIUS));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        return (
          <line key={r} geometry={geo}>
            <lineBasicMaterial color="#1e3a5f" transparent opacity={0.5} />
          </line>
        );
      })}
    </>
  );
}

// ─── Axis spokes ──────────────────────────────────────────────────────────────
function AxisSpokes() {
  return (
    <>
      {AXES.map((ax, i) => {
        const angle = (i / AXES.length) * Math.PI * 2;
        const [x, , z] = toXZ(angle, RADIUS);
        const pts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, 0, z)];
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        return (
          <group key={ax.key}>
            <line geometry={geo}>
              <lineBasicMaterial color={ax.color} transparent opacity={0.4} />
            </line>
            {/* Axis label */}
            <Html position={[x * 1.22, 0.1, z * 1.22]} center>
              <div style={{
                color: ax.color, fontSize: 12, fontWeight: 800,
                whiteSpace: 'nowrap', pointerEvents: 'none',
                textShadow: `0 0 8px ${ax.color}`,
              }}>
                {ax.label}
              </div>
            </Html>
          </group>
        );
      })}
    </>
  );
}

// ─── Animated radar polygon ───────────────────────────────────────────────────
function RadarPolygon({ metrics, simMetrics, color, opacity, yOffset = 0 }) {
  const meshRef = useRef();
  const lineRef = useRef();
  const [progress, setProgress] = useState(0);

  useFrame((_, delta) => {
    setProgress(p => Math.min(p + delta * 1.2, 1));
    if (meshRef.current) meshRef.current.rotation.y += 0.002;
    if (lineRef.current) lineRef.current.rotation.y += 0.002;
  });

  const eased = progress < 1 ? 1 - Math.pow(1 - progress, 3) : 1;

  const points = useMemo(() => {
    return AXES.map((ax, i) => {
      const angle = (i / AXES.length) * Math.PI * 2;
      const val = (simMetrics?.[ax.key] ?? metrics[ax.key] ?? 0) / 100;
      const r = val * RADIUS * eased;
      return new THREE.Vector3(Math.cos(angle) * r, yOffset, Math.sin(angle) * r);
    });
  }, [metrics, simMetrics, eased, yOffset]);

  const shape = useMemo(() => {
    const s = new THREE.Shape();
    points.forEach((p, i) => {
      if (i === 0) s.moveTo(p.x, p.z);
      else s.lineTo(p.x, p.z);
    });
    s.closePath();
    return s;
  }, [points]);

  const shapeGeo = useMemo(() => new THREE.ShapeGeometry(shape), [shape]);

  const closedPts = [...points, points[0]];
  const lineGeo = useMemo(() => new THREE.BufferGeometry().setFromPoints(closedPts), [closedPts]);

  return (
    <group>
      <mesh ref={meshRef} geometry={shapeGeo} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
      </mesh>
      <line ref={lineRef} geometry={lineGeo}>
        <lineBasicMaterial color={color} transparent opacity={0.9} linewidth={2} />
      </line>
      {/* Vertex dots */}
      {points.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color={AXES[i].color} emissive={AXES[i].color} emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Hover tooltip dots ───────────────────────────────────────────────────────
function MetricDots({ metrics }) {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      {AXES.map((ax, i) => {
        const angle = (i / AXES.length) * Math.PI * 2;
        const val = (metrics[ax.key] ?? 0) / 100;
        const r = val * RADIUS;
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;
        return (
          <mesh
            key={ax.key}
            position={[x, 0, z]}
            onPointerOver={e => { e.stopPropagation(); setHovered(ax.key); }}
            onPointerOut={() => setHovered(null)}
          >
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial
              color={ax.color}
              emissive={ax.color}
              emissiveIntensity={hovered === ax.key ? 1.5 : 0.6}
            />
            {hovered === ax.key && (
              <Html center distanceFactor={8}>
                <div style={{
                  background: 'rgba(15,23,42,0.95)',
                  border: `1px solid ${ax.color}`,
                  borderRadius: 8, padding: '6px 10px',
                  color: ax.color, fontWeight: 800, fontSize: 13,
                  whiteSpace: 'nowrap', pointerEvents: 'none',
                  backdropFilter: 'blur(10px)',
                }}>
                  {ax.label}: {metrics[ax.key]}%
                </div>
              </Html>
            )}
          </mesh>
        );
      })}
    </>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({ metrics, simMetrics }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]}   intensity={0.8} color="#3b82f6" />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#a855f7" />
      <pointLight position={[0, -5, 0]}  intensity={0.3} color="#22c55e" />

      <GridRings />
      <AxisSpokes />

      {/* Base polygon */}
      <RadarPolygon metrics={metrics} color="#3b82f6" opacity={0.18} />

      {/* Simulation overlay */}
      {simMetrics && (
        <RadarPolygon metrics={metrics} simMetrics={simMetrics} color="#22c55e" opacity={0.22} yOffset={0.02} />
      )}

      <MetricDots metrics={simMetrics ?? metrics} />

      <OrbitControls enableZoom enablePan={false} autoRotate autoRotateSpeed={0.6} />
    </>
  );
}

// ─── Legend ───────────────────────────────────────────────────────────────────
function Legend({ metrics, simMetrics }) {
  return (
    <div style={{
      position: 'absolute', bottom: 14, left: 14,
      background: 'rgba(15,23,42,0.88)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 10, padding: '10px 14px',
      backdropFilter: 'blur(12px)', zIndex: 10,
    }}>
      {AXES.map(ax => {
        const base = metrics[ax.key] ?? 0;
        const sim  = simMetrics?.[ax.key];
        return (
          <div key={ax.key} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: ax.color }} />
            <span style={{ color: '#cbd5e1', fontSize: 11, minWidth: 64 }}>{ax.label}</span>
            <span style={{ color: ax.color, fontWeight: 800, fontSize: 12 }}>{sim ?? base}%</span>
            {sim && sim !== base && (
              <span style={{ color: '#22c55e', fontSize: 10, fontWeight: 700 }}>↑+{sim - base}%</span>
            )}
          </div>
        );
      })}
      {simMetrics && (
        <div style={{ marginTop: 6, paddingTop: 6, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 3, background: '#22c55e', borderRadius: 2 }} />
            <span style={{ color: '#86efac', fontSize: 10 }}>Simulated</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function MasteryRadar3D({ metrics, simMetrics }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 4, 6], fov: 50 }} style={{ background: 'transparent' }}>
        <Scene metrics={metrics} simMetrics={simMetrics} />
      </Canvas>
      <Legend metrics={metrics} simMetrics={simMetrics} />
    </div>
  );
}
