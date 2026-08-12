import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      if (token) {
        try {
          const res = await axiosClient.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.user);
            localStorage.setItem('user', JSON.stringify(res.data.user));
          }
        } catch (error) {
          console.error('Session verification failed:', error);
          logout();
        }
      }
      setLoading(false);
    };

    verifySession();
  }, [token]);

  const login = async (email, password) => {
    const res = await axiosClient.post('/auth/login', { email, password });
    if (res.data.success) {
      const { token: jwtToken, user: userData } = res.data;
      setToken(jwtToken);
      setUser(userData);
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    }
    throw new Error(res.data.message || 'Login failed');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
