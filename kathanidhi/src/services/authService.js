import api from './api';

class AuthorService {
  async getAuthors() {
    try {
      const response = await api.get('/authors');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAuthorById(id) {
    try {
      const response = await api.get(`/authors/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAuthorStories(authorId) {
    try {
      const response = await api.get(`/authors/${authorId}/stories`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateAuthorProfile(authorId, profileData) {
    try {
      const response = await api.put(`/authors/${authorId}`, profileData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAuthorStats(authorId) {
    try {
      const response = await api.get(`/authors/${authorId}/stats`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async followAuthor(authorId) {
    try {
      const response = await api.post(`/authors/${authorId}/follow`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async unfollowAuthor(authorId) {
    try {
      const response = await api.delete(`/authors/${authorId}/follow`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAuthorFollowers(authorId) {
    try {
      const response = await api.get(`/authors/${authorId}/followers`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAuthorFollowing(authorId) {
    try {
      const response = await api.get(`/authors/${authorId}/following`);
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

export default new AuthorService();
