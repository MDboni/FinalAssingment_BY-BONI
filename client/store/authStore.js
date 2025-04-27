import { create } from 'zustand';
import axios from 'axios';

const authStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  error: null,
  loading: false,

  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token, isAuthenticated: true });
  },
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.post('/api/auth/login', { email, password });
      const { token, user } = res.data;
      set({ user, token: token, isAuthenticated: true, loading: false });
      localStorage.setItem('token', token);
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Login failed',
        loading: false,
      });
    }
  },

  register: async (name, email, password) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.post('/api/auth/register', {
        name,
        email,
        password,
      });
      const { token, user } = res.data;
      set({ user, token: token, isAuthenticated: true, loading: false });
      localStorage.setItem('token', token);
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Registration failed',
        loading: false,
      });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  loadUser: async () => {
    try {
      set({ loading: true });
      const token = localStorage.getItem('token');
      if (token) {
        const res = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        set({ user: res.data, isAuthenticated: true, loading: false });
      }
    } catch (err) {
      localStorage.removeItem('token');
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },
}));

export const useAuthStore = authStore; 