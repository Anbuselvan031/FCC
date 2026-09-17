import api from './api.js';
import matchesFallback from '../data/matches.js';

export const matchService = {
  async getMatches(status = '') {
    try {
      const endpoint = status ? `/matches?status=${status}` : '/matches';
      const res = await api.get(endpoint);
      return res?.data || matchesFallback;
    } catch (err) {
      if (status) {
        return matchesFallback.filter(m => m.status?.toLowerCase() === status.toLowerCase());
      }
      return matchesFallback;
    }
  },

  async getMatchById(id) {
    try {
      const res = await api.get(`/matches/${id}`);
      return res?.data;
    } catch (err) {
      return matchesFallback.find(m => m.id === id || m.id === Number(id) || m.matchId === Number(id));
    }
  },

  async createMatch(data) {
    return api.post('/matches', data);
  },

  async updateMatch(id, data) {
    return api.put(`/matches/${id}`, data);
  },

  async deleteMatch(id) {
    return api.delete(`/matches/${id}`);
  },
};

export default matchService;
