import React from 'react';
import { Grid, Container, Typography } from '@mui/material';
import CategoryCard from './CategoryCard';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import QuizIcon from '@mui/icons-material/Quiz';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EmojiSymbolsIcon from '@mui/icons-material/EmojiSymbols';

const CategoryList = () => {
  const categories = [
    {
      id: 1,
      title: 'One-Page Stories',
      description: 'Short and impactful stories that can be read in one sitting',
      icon: <AutoStoriesIcon sx={{ fontSize: 40 }} />,
      path: '/categories/one-page',
      color: '#1976d2'
    },
    {
      id: 2,
      title: 'Proverbs',
      description: 'Traditional Telugu proverbs with their meanings and usage',
      icon: <FormatQuoteIcon sx={{ fontSize: 40 }} />,
      path: '/categories/proverbs',
      color: '#2e7d32'
    },
    {
      id: 3,
      title: 'Riddles',
      description: 'Fun and challenging Telugu riddles for all ages',
      icon: <QuizIcon sx={{ fontSize: 40 }} />,
      path: '/categories/riddles',
      color: '#ed6c02'
    },
    {
      id: 4,
      title: 'Wise Sayings',
      description: 'Ancient Telugu wisdom and philosophical quotes',
      icon: <LightbulbIcon sx={{ fontSize: 40 }} />,
      path: '/categories/wise-sayings',
      color: '#9c27b0'
    },
    {
      id: 5,
      title: 'Multi-Page Stories',
      description: 'Longer stories divided into chapters',
      icon: <MenuBookIcon sx={{ fontSize: 40 }} />,
      path: '/categories/multi-page',
      color: '#d32f2f'
    },
    {
      id: 6,
      title: 'Poetry',
      description: 'Modern and classical Telugu poetry collection',
      icon: <EmojiSymbolsIcon sx={{ fontSize: 40 }} />,
      path: '/categories/poetry',
      color: '#0288d1'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mb: 4, textAlign: 'center' }}
      >
        Explore Categories
      </Typography>
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item key={category.id} xs={12} sm={6} md={4}>
            <CategoryCard category={category} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoryList;
