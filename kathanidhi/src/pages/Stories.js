import React, { useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, Button } from '@mui/material';
import { useStories } from '../context/StoriesContext';
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
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={fetchStories}>
              మళ్ళీ ప్రయత్నించండి
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
        కథలు
      </Typography>
      {stories.length === 0 ? (
        <Typography variant="body1">ఇంకా ఏ కథలు ప్రచురించలేదు.</Typography>
      ) : (
        <StoryList stories={stories} />
      )}
    </Container>
  );
};

export default Stories;
