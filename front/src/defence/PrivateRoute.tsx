import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? children : <Navigate to="/login" />;
};