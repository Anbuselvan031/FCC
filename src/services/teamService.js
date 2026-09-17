import api from './api.js';
import teamDataFallback from '../data/teamData.js';

export const teamService = {
  async getTeam() {
    try {
      const res = await api.get('/team');
      return res?.data || teamDataFallback;
    } catch (err) {
      return teamDataFallback;
    }
  },

  async updateTeam(id, data) {
    return api.put(`/team/${id}`, data);
  },
};

export default teamService;
