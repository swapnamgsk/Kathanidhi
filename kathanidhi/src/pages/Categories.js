import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  IconButton, 
  Breadcrumbs 
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useStories } from '../context/StoriesContext';
import StoryList from '../components/Stories/StoryList';
import CategoryList from '../components/Categories/CategoryList';

const Categories = () => {
  const { categoryId } = useParams();
  const { stories, deleteStory } = useStories();

  // Get category details
  const getCategoryDetails = () => {
    const categories = [
      {
        id: 'telugu-folk-tales',
        title: 'తెలుగు జానపద కథలు',
        description: 'Traditional Telugu folk tales and stories'
      },
      {
        id: 'harikatha',
        title: 'హరికిషన్ కథలు',
        description: 'Stories of Harikatha tradition'
      },
      {
        id: 'telugu-humor',
        title: 'తెలుగు హాస్య కథలు',
        description: 'Telugu humor stories'
      },
      {
        id: 'world-folk-tales',
        title: 'ప్రపంచ జానపద కథలు',
        description: 'World folk tales'
      },
      {
        id: 'childrens-humor',
        title: 'బాలల హాస్య కథలు',
        description: "Children's humor stories"
      },
      {
        id: 'moral-stories',
        title: 'బాలల నీతి కథలు',
        description: 'Moral stories for children'
      },
      {
        id: 'proverbs-with-pictures',
        title: 'బొమ్మలతో సామెతలు',
        description: 'Proverbs with pictures'
      },
      {
        id: 'riddles-with-pictures',
        title: 'బొమ్మలతో పొడుపు కథలు',
        description: 'Riddles with pictures'
      },
      {
        id: 'stories-without-ottulu',
        title: 'ఒత్తులు లేని కథలు',
        description: 'Stories without ottulu'
      },
      {
        id: 'stories-without-samyukta',
        title: 'సంయుక్త అక్షరాలు లేని కథలు',
        description: 'Stories without samyukta aksharam'
      },
      {
        id: 'songs-without-ottulu',
        title: 'ఒత్తులు లేని గేయాలు',
        description: 'Songs without ottulu'
      },
      {
        id: 'songs-without-samyukta',
        title: 'సంయుక్త అక్షరాలు లేని గేయాలు',
        description: 'Songs without samyukta aksharam'
      },
      {
        id: 'short-stories',
        title: 'చిట్టి కథలు',
        description: 'Short stories'
      },
      {
        id: 'childrens-songs',
        title: 'చిన్నారి గేయాలు',
        description: "Children's songs"
      },
      {
        id: 'folk-humor-songs',
        title: 'జానపద హాస్య గేయాలు',
        description: 'Folk humor songs'
      },
      {
        id: 'audio-stories',
        title: 'కథలు విందాం',
        description: 'Audio stories'
      },
      {
        id: 'video-stories',
        title: 'కథలు చూద్దాం',
        description: 'Video stories'
      },
      {
        id: 'rayalaseema-stories',
        title: 'రాయలసీమ కథలు',
        description: 'Stories from Rayalaseema'
      }
    ];
    return categories.find(cat => cat.id === categoryId);
  };

  const categoryDetails = getCategoryDetails();

  // Filter stories by category
  const filteredStories = categoryId 
    ? stories.filter(story => story.category === categoryId)
    : [];

  const handleDelete = async (storyId) => {
    try {
      await deleteStory(storyId);
    } catch (error) {
      console.error('Error deleting story:', error);
    }
  };

  if (categoryId) {
    return (
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
            <IconButton 
              component={Link} 
              to="/categories"
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Breadcrumbs>
                <Link 
                  to="/categories" 
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Categories
                </Link>
                <Typography color="text.primary">
                  {categoryDetails?.title}
                </Typography>
              </Breadcrumbs>
              <Typography variant="h4" component="h1" sx={{ mt: 1 }}>
                {categoryDetails?.title}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                {categoryDetails?.description}
              </Typography>
            </Box>
          </Box>
          
          {filteredStories.length > 0 ? (
            <StoryList 
              stories={filteredStories} 
              onDelete={handleDelete}
            />
          ) : (
            <Typography variant="body1" color="text.secondary">
              No stories found in this category yet.
            </Typography>
          )}
        </Container>
      </Box>
    );
  }

  // Show category list if no category is selected
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <CategoryList />
      </Container>
    </Box>
  );
};

export default Categories;
