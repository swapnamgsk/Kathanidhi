import React from 'react';
import { Grid } from '@mui/material';
import StoryCard from './StoryCard';
import { useStories } from '../../context/StoriesContext';
import { useNavigate } from 'react-router-dom';

const StoryList = ({ stories }) => {
  const { deleteStory, likeStory, editStory, shareStory } = useStories();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await deleteStory(id);
    } catch (error) {
      console.error('Failed to delete story:', error);
    }
  };

  const handleLike = async (id) => {
    try {
      await likeStory(id);
    } catch (error) {
      console.error('Failed to like story:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-story/${id}`);
  };

  const handleShare = async (id) => {
    try {
      await shareStory(id);
    } catch (error) {
      console.error('Failed to share story:', error);
    }
  };

  return (
    <Grid container spacing={3}>
      {stories.map((story) => (
        <Grid item xs={12} sm={6} md={4} key={story.id}>
          <StoryCard
            story={story}
            onDelete={handleDelete}
            onLike={handleLike}
            onEdit={handleEdit}
            onShare={handleShare}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StoryList;
