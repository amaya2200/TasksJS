import { createContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);