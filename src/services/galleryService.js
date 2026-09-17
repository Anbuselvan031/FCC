import api from './api.js';
import galleryFallback from '../data/galleryData.js';

export const galleryService = {
  async getGallery(category = '') {
    try {
      const endpoint = category && category !== 'All' ? `/gallery?category=${encodeURIComponent(category)}` : '/gallery';
      const res = await api.get(endpoint);
      return res?.data || galleryFallback;
    } catch (err) {
      if (category && category !== 'All') {
        return galleryFallback.filter(g => g.category?.toLowerCase() === category.toLowerCase());
      }
      return galleryFallback;
    }
  },

  async createGalleryItem(data) {
    return api.post('/gallery', data);
  },

  async updateGalleryItem(id, data) {
    return api.put(`/gallery/${id}`, data);
  },

  async deleteGalleryItem(id) {
    return api.delete(`/gallery/${id}`);
  },
};

export default galleryService;
