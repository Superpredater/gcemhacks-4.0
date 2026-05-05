import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  useEffect(() => { navigate('/admin/users', { replace: true }); }, []);
  return null;
}
