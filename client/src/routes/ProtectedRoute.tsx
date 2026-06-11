import { Navigate, Outlet } from 'react-router';
import { useContext } from 'react';
import {AuthContext} from '../context/AuthContext';

export const ProtectedRoute = () => {
  const context = useContext(AuthContext);

  if(context?.loading){
    return null;
  }

  return context?.isAuthenticated
    ? <Outlet/>
    : <Navigate to="/login" replace />;
};