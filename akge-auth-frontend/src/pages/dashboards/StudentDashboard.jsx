import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Redirect to the full student module system
export default function StudentDashboard() {
  const navigate = useNavigate();
  useEffect(() => { navigate('/student/dashboard', { replace: true }); }, []);
  return null;
}
