import React, { useEffect } from 'react';
import { useStories } from '../context/StoriesContext';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import StoryList from '../components/Stories/StoryList';

const Stories = () => {
  const { stories, loading, error, fetchStories } = useStories();

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Stories
      </Typography>
      {stories.length === 0 ? (
        <Typography variant="body1">No stories published yet.</Typography>
      ) : (
        <StoryList stories={stories} />
      )}
    </Container>
  );
};

export default Stories;
