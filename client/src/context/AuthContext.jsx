import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('asia_explora_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await api.getCurrentUser();
          if (res?.user) {
            setUser(res.user);
          } else {
            logout();
          }
        } catch (err) {
          console.error("Auth check failed:", err);
          logout();
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.login(email, password);
    if (res?.token && res?.user) {
      localStorage.setItem('asia_explora_token', res.token);
      setToken(res.token);
      setUser(res.user);
      return { success: true };
    }
    return { success: false, message: res?.message || 'Login failed' };
  };

  const register = async (name, email, password) => {
    const res = await api.register(name, email, password);
    if (res?.token && res?.user) {
      localStorage.setItem('asia_explora_token', res.token);
      setToken(res.token);
      setUser(res.user);
      return { success: true };
    }
    return { success: false, message: res?.message || 'Registration failed' };
  };

  const logout = () => {
    localStorage.removeItem('asia_explora_token');
    setToken(null);
    setUser(null);
  };

  const updateUserLocal = (updatedData) => {
    setUser(prev => prev ? { ...prev, ...updatedData } : null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      register,
      logout,
      updateUserLocal,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
