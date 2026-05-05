import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManagementDashboard() {
  const navigate = useNavigate();
  useEffect(() => { navigate('/management/dashboard', { replace: true }); }, []);
  return null;
}
