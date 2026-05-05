import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const DEMO_ACCOUNTS = [
  { id: 'student1',    label: '👨‍🎓 Student',    role: 'student' },
  { id: 'parent1',     label: '👨‍👩‍👧 Parent',     role: 'parent' },
  { id: 'teacher1',    label: '👨‍🏫 Teacher',    role: 'teacher' },
  { id: 'management1', label: '👔 Management', role: 'management' },
  { id: 'admin1',      label: '⚙️ Admin',      role: 'admin' },
];

const ROLES = [
  { value: 'student',    label: '👨‍🎓 Student' },
  { value: 'parent',     label: '👨‍👩‍👧 Parent' },
  { value: 'teacher',    label: '👨‍🏫 Teacher' },
  { value: 'management', label: '👔 Management' },
  { value: 'admin',      label: '⚙️ Admin' },
];

export default function AuthForm({ isSignup = false }) {
  const navigate = useNavigate();
  const { login, signup, isLoading, error, clearError } = useAuthStore();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    let success;
    if (isSignup) {
      success = await signup(userId, password, role);
    } else {
      success = await login(userId, password);
    }

    if (success) {
      const userRole = isSignup ? role : useAuthStore.getState().user?.role;
      navigate(`/${userRole}/dashboard`);
    }
  };

  const handleDemoLogin = async (demo) => {
    clearError();
    const success = await login(demo.id, '1234');
    if (success) {
      navigate(`/${demo.role}/dashboard`);
    }
  };

  const styles = {
    card: {
      width: '100%',
      maxWidth: '420px',
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
    },
    title: {
      fontSize: '2rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #60a5fa, #22d3ee)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textAlign: 'center',
      marginBottom: '0.25rem',
    },
    subtitle: {
      color: '#94a3b8',
      fontSize: '0.875rem',
      textAlign: 'center',
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      color: '#e2e8f0',
      fontSize: '0.875rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '10px',
      color: '#f1f5f9',
      fontSize: '0.95rem',
      outline: 'none',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s',
    },
    select: {
      width: '100%',
      padding: '0.75rem 1rem',
      background: 'rgba(15, 23, 42, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '10px',
      color: '#f1f5f9',
      fontSize: '0.95rem',
      outline: 'none',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '0.85rem',
      background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
      border: 'none',
      borderRadius: '10px',
      color: '#fff',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'opacity 0.2s, transform 0.1s',
      marginTop: '0.5rem',
    },
    errorBox: {
      background: 'rgba(239, 68, 68, 0.15)',
      border: '1px solid rgba(239, 68, 68, 0.4)',
      borderRadius: '10px',
      padding: '0.75rem 1rem',
      color: '#fca5a5',
      fontSize: '0.875rem',
      marginBottom: '1rem',
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      margin: '1.25rem 0',
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      background: 'rgba(255,255,255,0.15)',
    },
    dividerText: {
      color: '#64748b',
      fontSize: '0.75rem',
      whiteSpace: 'nowrap',
    },
    demoGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.5rem',
      marginBottom: '1.25rem',
    },
    demoBtn: {
      padding: '0.5rem 0.75rem',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '8px',
      color: '#cbd5e1',
      fontSize: '0.75rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background 0.2s, border-color 0.2s',
      textAlign: 'center',
    },
    toggleText: {
      textAlign: 'center',
      color: '#64748b',
      fontSize: '0.875rem',
    },
    toggleLink: {
      color: '#60a5fa',
      fontWeight: '600',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    fieldGroup: {
      marginBottom: '1rem',
    },
    passwordWrapper: {
      position: 'relative',
    },
    eyeBtn: {
      position: 'absolute',
      right: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      color: '#94a3b8',
      padding: '0',
    },
  };

  return (
    <div style={styles.card}>
      {/* Header */}
      <div>
        <h1 style={styles.title}>AKGE</h1>
        <p style={styles.subtitle}>
          {isSignup ? 'Create your account' : 'Adaptive Knowledge Graph Engine'}
        </p>
      </div>

      {/* Error */}
      {error && <div style={styles.errorBox}>{error}</div>}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your user ID"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Password</label>
          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{ ...styles.input, paddingRight: '2.5rem' }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeBtn}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        {isSignup && (
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={styles.select}
            >
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          style={{ ...styles.button, opacity: isLoading ? 0.7 : 1 }}
        >
          {isLoading ? (
            <span>⏳ {isSignup ? 'Creating account...' : 'Logging in...'}</span>
          ) : (
            isSignup ? '🚀 Create Account' : '🔐 Login'
          )}
        </button>
      </form>

      {/* Demo accounts */}
      {!isSignup && (
        <>
          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerText}>Quick Demo Login</span>
            <div style={styles.dividerLine} />
          </div>

          <div style={styles.demoGrid}>
            {DEMO_ACCOUNTS.map((demo) => (
              <button
                key={demo.id}
                onClick={() => handleDemoLogin(demo)}
                disabled={isLoading}
                style={{ ...styles.demoBtn, opacity: isLoading ? 0.5 : 1 }}
              >
                {demo.label}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Toggle */}
      <div style={styles.toggleText}>
        {isSignup ? (
          <>
            Already have an account?{' '}
            <a href="/login" style={styles.toggleLink}>Login</a>
          </>
        ) : (
          <>
            Don't have an account?{' '}
            <a href="/signup" style={styles.toggleLink}>Sign up</a>
          </>
        )}
      </div>
    </div>
  );
}
