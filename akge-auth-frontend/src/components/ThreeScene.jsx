import React from 'react';

// Pure CSS animated background - no Three.js dependency
// This is reliable and works in all browsers without WebGL issues
export default function ThreeScene() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float1 8s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float2 10s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '60%',
          width: '35%',
          height: '35%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float3 12s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: '25%',
          height: '25%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float1 9s ease-in-out infinite reverse',
        }}
      />

      {/* Floating emoji icons */}
      {[
        { icon: '📚', top: '15%', left: '10%', delay: '0s', duration: '6s' },
        { icon: '🎓', top: '70%', left: '80%', delay: '1s', duration: '7s' },
        { icon: '⚛️', top: '50%', left: '5%', delay: '2s', duration: '8s' },
        { icon: '🌐', top: '25%', left: '85%', delay: '0.5s', duration: '9s' },
        { icon: '✏️', top: '80%', left: '20%', delay: '1.5s', duration: '7s' },
        { icon: '🧠', top: '10%', left: '60%', delay: '3s', duration: '6s' },
        { icon: '💡', top: '60%', left: '50%', delay: '2.5s', duration: '8s' },
        { icon: '🔬', top: '40%', left: '90%', delay: '1s', duration: '10s' },
      ].map((item, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: item.top,
            left: item.left,
            fontSize: '2rem',
            opacity: 0.15,
            animation: `floatIcon ${item.duration} ease-in-out infinite`,
            animationDelay: item.delay,
          }}
        >
          {item.icon}
        </div>
      ))}

      {/* Grid pattern overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 20px) scale(1.08); }
          66% { transform: translate(30px, -30px) scale(0.92); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, -40px) scale(1.1); }
        }
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
      `}</style>
    </div>
  );
}
