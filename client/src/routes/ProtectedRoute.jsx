import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import EmployeeContext from '../context/EmployeeContext';

export default function ProtectedRoute() {
  const { isAuth } = useContext(EmployeeContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      return navigate('/login');
    }
  }, [isAuth]);

  return <Outlet />;
}
