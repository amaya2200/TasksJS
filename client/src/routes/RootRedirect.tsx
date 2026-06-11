import { Navigate } from 'react-router';
import { useContext } from 'react';
import {AuthContext} from '../context/AuthContext';

export const RootRedirect = () => {

  const context = useContext(AuthContext);

  if(context?.loading){
    return null;
  }

  return context?.isAuthenticated
    ? <Navigate to="/tasks" replace />
    : <Navigate to="/login" replace />;
};
