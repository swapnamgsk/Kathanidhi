import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import storyService from '../services/storyService';

const StoriesContext = createContext(null);

export const StoriesProvider = ({ children }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchStories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await storyService.getAllStories();
      setStories(response || []);
    } catch (error) {
      console.error('Error fetching stories:', error);
      setError('Failed to fetch stories');
    } finally {
      setLoading(false);
    }
  }, []);

  const createStory = async (storyData) => {
    if (!user) {
      throw new Error('User must be authenticated to create a story');
    }

    try {
      const response = await storyService.createStory({
        ...storyData,
        author: {
          id: user.id,
          name: user.name,
          avatar: user.avatar || ''
        }
      });
      setStories(prevStories => [response, ...prevStories]);
      return response;
    } catch (error) {
      console.error('Error creating story:', error);
      throw error;
    }
  };

  const deleteStory = async (storyId) => {
    try {
      const success = await storyService.deleteStory(storyId);
      if (success) {
        setStories(prevStories => prevStories.filter(story => story.id !== storyId));
        return true;
      }
    } catch (error) {
      console.error('Error deleting story:', error);
      throw error;
    }
  };

  const likeStory = async (storyId) => {
    try {
      const response = await storyService.likeStory(storyId);
      setStories(prevStories =>
        prevStories.map(story =>
          story.id === storyId
            ? { ...story, likes: response.likes }
            : story
        )
      );
      return response;
    } catch (error) {
      console.error('Error liking story:', error);
      throw error;
    }
  };

  const editStory = async (storyId, updates) => {
    try {
      const response = await storyService.updateStory(storyId, updates);
      setStories(prevStories =>
        prevStories.map(story =>
          story.id === storyId ? { ...story, ...response } : story
        )
      );
      return response;
    } catch (error) {
      console.error('Error updating story:', error);
      throw error;
    }
  };

  const shareStory = async (storyId) => {
    try {
      const story = stories.find(s => s.id === storyId);
      if (story) {
        await navigator.share({
          title: story.title,
          text: story.excerpt || story.content.substring(0, 100),
          url: window.location.href
        });
        return true;
      }
    } catch (error) {
      console.error('Error sharing story:', error);
      throw error;
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
    deleteStory,
    fetchStories,
    likeStory,
    editStory,
    shareStory
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
