import api from './api.js';
import statsFallback from '../data/stats.js';

export const statsService = {
  async getStats() {
    try {
      const res = await api.get('/stats');
      return res?.data || statsFallback;
    } catch (err) {
      return statsFallback;
    }
  },

  async getBattingStats() {
    try {
      const res = await api.get('/stats/batting');
      return res?.data || statsFallback.batting;
    } catch (err) {
      return statsFallback.batting;
    }
  },

  async getBowlingStats() {
    try {
      const res = await api.get('/stats/bowling');
      return res?.data || statsFallback.bowling;
    } catch (err) {
      return statsFallback.bowling;
    }
  },

  async getFieldingStats() {
    try {
      const res = await api.get('/stats/fielding');
      return res?.data || statsFallback.fielding;
    } catch (err) {
      return statsFallback.fielding;
    }
  },

  async getMatchStats() {
    try {
      const res = await api.get('/stats/matches');
      return res?.data || statsFallback.matchPerformance;
    } catch (err) {
      return statsFallback.matchPerformance;
    }
  },

  async updateStats(id, data) {
    return api.put(`/stats/${id}`, data);
  },
};

export default statsService;
