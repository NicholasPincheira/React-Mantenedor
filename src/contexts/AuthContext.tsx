import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('admin_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username: string, password: string) => {
    // In a real app, this would be an API call
    if (username === 'Nicholas Pincheira' && password === '123456123') {
      Cookies.set('admin_token', 'dummy_token', { expires: 7 });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    Cookies.remove('admin_token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}