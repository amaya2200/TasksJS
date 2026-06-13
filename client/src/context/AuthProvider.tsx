import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  const login = async (username: string, password: string) => {
    const response = await authService.login({username, password});
    if(response.status === 200){
      setIsAuthenticated(true);
      setUsername(username);
    }
  };

  const logout = async () => {
    const response = await authService.logout();
    if(response.status === 200){
      setIsAuthenticated(false);
      setUsername('');
    }
  };

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const { isAuthenticated, username } = await authService.checkAuthStatus();
        setIsAuthenticated(isAuthenticated);

        if(isAuthenticated){
          setUsername(username);
        } else {
          setUsername('');
        }
      } catch {
        setIsAuthenticated(false);
        setUsername('');
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};