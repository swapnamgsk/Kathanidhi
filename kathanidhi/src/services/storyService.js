import api from './api';

class StoryService {
  async getAllStories(params = {}) {
    try {
      const response = await api.get('/stories', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getStoryById(id) {
    try {
      const response = await api.get(`/stories/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createStory(storyData) {
    try {
      const response = await api.post('/stories', storyData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateStory(id, storyData) {
    try {
      const response = await api.put(`/stories/${id}`, storyData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteStory(id) {
    try {
      await api.delete(`/stories/${id}`);
      return true;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async likeStory(id) {
    try {
      const response = await api.post(`/stories/${id}/like`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async unlikeStory(id) {
    try {
      const response = await api.delete(`/stories/${id}/like`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getStoriesByCategory(category, params = {}) {
    try {
      const response = await api.get(`/stories/category/${category}`, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async searchStories(query) {
    try {
      const response = await api.get('/stories/search', {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getFeaturedStories() {
    try {
      const response = await api.get('/stories/featured');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getPopularStories() {
    try {
      const response = await api.get('/stories/popular');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async addComment(storyId, comment) {
    try {
      const response = await api.post(`/stories/${storyId}/comments`, comment);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getComments(storyId) {
    try {
      const response = await api.get(`/stories/${storyId}/comments`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error(error.message || 'An error occurred');
    }
  }
}

export default new StoryService();
