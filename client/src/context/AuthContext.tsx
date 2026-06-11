import { createContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string;
  loading: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);