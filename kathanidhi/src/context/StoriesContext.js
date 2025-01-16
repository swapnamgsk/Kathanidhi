import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const StoriesContext = createContext(null);

export const StoriesProvider = ({ children }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchStories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/stories');
      console.log('Fetched stories:', response.data);
      setStories(response.data || []);
    } catch (error) {
      console.error('Error fetching stories:', error);
      setError('Failed to fetch stories');
    } finally {
      setLoading(false);
    }
  }, []);

  const createStory = async (storyData) => {
    try {
      const response = await api.post('/stories', {
        ...storyData,
        author: {
          id: user.id,
          name: user.name,
          avatar: user.avatar || ''
        }
      });

      setStories(prevStories => [response.data, ...prevStories]);
      return response.data;
    } catch (error) {
      console.error('Error creating story:', error);
      throw new Error(error.response?.data?.message || 'Failed to create story');
    }
  };

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const value = {
    stories,
    loading,
    error,
    createStory,
    fetchStories
  };

  return (
    <StoriesContext.Provider value={value}>
      {children}
    </StoriesContext.Provider>
  );
};

export const useStories = () => {
  const context = useContext(StoriesContext);
  if (!context) {
    throw new Error('useStories must be used within a StoriesProvider');
  }
  return context;
};
