import React from 'react';
import { Container, Typography } from '@mui/material';
import CreateStoryForm from '../components/Stories/CreateStoryForm';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { useStories } from '../context/StoriesContext';

const CreateStory = () => {
  const { user, loading } = useAuth();
  const { createStory } = useStories();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const handleCreateStory = async (formData) => {
    try {
      const storyData = {
        ...formData,
        author: {
          id: user.id,
          name: user.name,
          avatar: user.avatar || ''
        },
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: []
      };

      await createStory(storyData);
    } catch (error) {
      console.error('Failed to create story:', error);
      throw error;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Story
      </Typography>
      <CreateStoryForm onSubmit={handleCreateStory} />
    </Container>
  );
};

export default CreateStory;
