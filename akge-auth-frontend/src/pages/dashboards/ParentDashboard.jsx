import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ParentDashboard() {
  const navigate = useNavigate();
  useEffect(() => { navigate('/parent/dashboard', { replace: true }); }, []);
  return null;
}
