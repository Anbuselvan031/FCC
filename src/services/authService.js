import api from './api.js';

export const authService = {
  async login(credentials) {
    const res = await api.post('/auth/login', credentials);
    if (res?.data?.token) {
      localStorage.setItem('fcc_admin_token', res.data.token);
      localStorage.setItem('fcc_admin_user', JSON.stringify(res.data));
    }
    return res?.data;
  },

  async register(adminData) {
    const res = await api.post('/auth/register', adminData);
    if (res?.data?.token) {
      localStorage.setItem('fcc_admin_token', res.data.token);
      localStorage.setItem('fcc_admin_user', JSON.stringify(res.data));
    }
    return res?.data;
  },

  async getMe() {
    const res = await api.get('/auth/me');
    return res?.data;
  },

  logout() {
    localStorage.removeItem('fcc_admin_token');
    localStorage.removeItem('fcc_admin_user');
  },

  isAuthenticated() {
    return !!localStorage.getItem('fcc_admin_token');
  },

  getCurrentUser() {
    try {
      const user = localStorage.getItem('fcc_admin_user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },
};

export default authService;
