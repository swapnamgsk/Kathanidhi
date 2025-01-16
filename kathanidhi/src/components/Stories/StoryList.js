import React, { useState } from 'react';
import {
  Grid,
  Container,
  Typography,
  Box,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
  Pagination
} from '@mui/material';
import StoryCard from './StoryCard';
import { useStories } from '../../context/StoriesContext';

const ITEMS_PER_PAGE = 9;

const StoryList = () => {
  const { stories, loading, error, deleteStory } = useStories();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'one-page', label: 'One-Page Stories' },
    { value: 'multi-page', label: 'Multi-Page Stories' },
    { value: 'proverbs', label: 'Proverbs' },
    { value: 'riddles', label: 'Riddles' },
    { value: 'wise-sayings', label: 'Wise Sayings' },
  ];

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || story.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredStories.length / ITEMS_PER_PAGE);
  const displayedStories = filteredStories.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <Container sx={{ py: 4 }}>
      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search Stories"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>

      {/* Results Count */}
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Showing {displayedStories.length} of {filteredStories.length} stories
      </Typography>

      {/* Stories Grid */}
      <Grid container spacing={3}>
        {displayedStories.map((story) => (
          <Grid item key={story.id} xs={12} sm={6} md={4}>
            <StoryCard 
              story={story} 
              onDelete={deleteStory}
            />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      {/* No Results */}
      {displayedStories.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No stories found matching your criteria
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default StoryList;
