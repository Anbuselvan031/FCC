import api from './api.js';
import leaderboardFallback from '../data/leaderboard.js';

export const leaderboardService = {
  async getLeaderboard(params = {}) {
    try {
      const query = new URLSearchParams();
      if (params.category) query.append('category', params.category);
      if (params.season) query.append('season', params.season);
      const queryString = query.toString() ? `?${query.toString()}` : '';

      const res = await api.get(`/leaderboard${queryString}`);
      return res?.data || leaderboardFallback;
    } catch (err) {
      if (params.category) {
        return leaderboardFallback[params.category] || [];
      }
      return leaderboardFallback;
    }
  },

  async getBatting() {
    try {
      const res = await api.get('/leaderboard/batting');
      return res?.data || leaderboardFallback.batting;
    } catch (err) {
      return leaderboardFallback.batting;
    }
  },

  async getBowling() {
    try {
      const res = await api.get('/leaderboard/bowling');
      return res?.data || leaderboardFallback.bowling;
    } catch (err) {
      return leaderboardFallback.bowling;
    }
  },

  async getFielding() {
    try {
      const res = await api.get('/leaderboard/fielding');
      return res?.data || leaderboardFallback.fielding;
    } catch (err) {
      return leaderboardFallback.fielding;
    }
  },

  async createEntry(data) {
    return api.post('/leaderboard', data);
  },

  async updateEntry(id, data) {
    return api.put(`/leaderboard/${id}`, data);
  },

  async deleteEntry(id) {
    return api.delete(`/leaderboard/${id}`);
  },
};

export default leaderboardService;
