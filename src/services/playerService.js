import api from './api.js';
import playersFallback from '../data/players.js';

export const playerService = {
  async getPlayers(params = {}) {
    try {
      const query = new URLSearchParams();
      if (params.tag) query.append('tag', params.tag);
      if (params.role) query.append('role', params.role);
      const queryString = query.toString() ? `?${query.toString()}` : '';

      const res = await api.get(`/players${queryString}`);
      return res?.data || playersFallback;
    } catch (err) {
      let filtered = [...playersFallback];
      if (params.tag) {
        filtered = filtered.filter(p => p.tags && p.tags.some(t => t.toLowerCase() === params.tag.toLowerCase()));
      }
      if (params.role) {
        filtered = filtered.filter(p => p.role && p.role.toLowerCase() === params.role.toLowerCase());
      }
      return filtered;
    }
  },

  async getPlayerById(id) {
    try {
      const res = await api.get(`/players/${id}`);
      return res?.data;
    } catch (err) {
      return playersFallback.find(p => p.id === Number(id) || p.cricHeroesId === Number(id) || p.id === id);
    }
  },

  async searchPlayers(name) {
    try {
      const res = await api.get(`/players/search?name=${encodeURIComponent(name)}`);
      return res?.data || [];
    } catch (err) {
      return playersFallback.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
    }
  },

  async createPlayer(data) {
    return api.post('/players', data);
  },

  async updatePlayer(id, data) {
    return api.put(`/players/${id}`, data);
  },

  async deletePlayer(id) {
    return api.delete(`/players/${id}`);
  },
};

export default playerService;
