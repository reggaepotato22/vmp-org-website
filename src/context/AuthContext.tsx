import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';

interface User {
  id: number;
  email: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initSession = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await api.get<User>('/auth/me');
        setUser(userData);
      } catch (error) {
        console.error('Error verifying session:', error);
        localStorage.removeItem('auth_token');
      } finally {
        setLoading(false);
      }
    };

    initSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<{ token: string; user: User }>('/auth/login', { email, password });
      localStorage.setItem('auth_token', response.token);
      setUser(response.user);
      return { error: null };
    } catch (error: any) {
      console.error('Login error:', error);
      return { error: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    // Optional: Redirect to home
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
