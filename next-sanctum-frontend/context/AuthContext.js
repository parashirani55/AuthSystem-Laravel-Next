import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../lib/api';
import { useRouter } from 'next/router';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/user');
        setUser(response.data);
      } catch (error) {
        setUser(null);
        Cookies.remove('auth_token'); // Clear token if user fetch fails
      } finally {
        setLoading(false);
      }
    };

    if (Cookies.get('auth_token')) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      await api.get('/sanctum/csrf-cookie'); // Fetch CSRF token
      const response = await api.post('/login', { email, password });
      Cookies.set('auth_token', response.data.token, { 
        expires: 1, // 1 day
        secure: process.env.NODE_ENV === 'production', // Secure in production
        sameSite: 'Lax'
      });
      setUser(response.data.user);
      router.push('/dashboard');
    } catch (error) {
      throw error?.response?.data || { message: 'Login failed' };
    }
  };

  const register = async (name, email, password, password_confirmation) => {
    try {
      await api.get('/sanctum/csrf-cookie');
      const response = await api.post('/register', {
        name,
        email,
        password,
        password_confirmation,
      });
      Cookies.set('auth_token', response.data.token, { 
        expires: 1, // 1 day
        secure: process.env.NODE_ENV === 'production', // Secure in production
        sameSite: 'Lax'
      });
      setUser(response.data.user);
      router.push('/dashboard');
    } catch (error) {
      throw error?.response?.data || { message: 'Registration failed' };
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      Cookies.remove('auth_token'); // Remove non-HTTP-only token
      setUser(null);
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};