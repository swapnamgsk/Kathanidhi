import React from 'react';
import { Grid, Container, Typography } from '@mui/material';
import CategoryCard from './CategoryCard';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TheatersIcon from '@mui/icons-material/Theaters';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import ImageIcon from '@mui/icons-material/Image';
import QuizIcon from '@mui/icons-material/Quiz';
import AbcIcon from '@mui/icons-material/Abc';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PublicIcon from '@mui/icons-material/Public';
import LocationCityIcon from '@mui/icons-material/LocationCity';

const CategoryList = () => {
  const categories = [
    {
      id: 'telugu-folk-tales',
      title: 'తెలుగు జానపద కథలు',
      description: 'Traditional Telugu folk tales and stories',
      icon: <AutoStoriesIcon sx={{ fontSize: 40 }} />,
      path: '/categories/telugu-folk-tales',
      color: '#1976d2'
    },
    {
      id: 'harikatha',
      title: 'హరికిషన్ కథలు',
      description: 'Stories of Harikatha tradition',
      icon: <MenuBookIcon sx={{ fontSize: 40 }} />,
      path: '/categories/harikatha',
      color: '#9c27b0'
    },
    {
      id: 'telugu-humor',
      title: 'తెలుగు హాస్య కథలు',
      description: 'Humorous Telugu stories',
      icon: <EmojiEmotionsIcon sx={{ fontSize: 40 }} />,
      path: '/categories/telugu-humor',
      color: '#ed6c02'
    },
    {
      id: 'world-folk-tales',
      title: 'ప్రపంచ జానపద కథలు',
      description: 'Folk tales from around the world',
      icon: <PublicIcon sx={{ fontSize: 40 }} />,
      path: '/categories/world-folk-tales',
      color: '#2e7d32'
    },
    {
      id: 'childrens-humor',
      title: 'బాలల హాస్య కథలు',
      description: "Children's humorous stories",
      icon: <ChildCareIcon sx={{ fontSize: 40 }} />,
      path: '/categories/childrens-humor',
      color: '#d32f2f'
    },
    {
      id: 'moral-stories',
      title: 'బాలల నీతి కథలు',
      description: 'Moral stories for children',
      icon: <MenuBookIcon sx={{ fontSize: 40 }} />,
      path: '/categories/moral-stories',
      color: '#0288d1'
    },
    {
      id: 'proverbs-with-pictures',
      title: 'బొమ్మలతో సామెతలు',
      description: 'Proverbs with illustrations',
      icon: <ImageIcon sx={{ fontSize: 40 }} />,
      path: '/categories/proverbs-with-pictures',
      color: '#7b1fa2'
    },
    {
      id: 'riddles-with-pictures',
      title: 'బొమ్మలతో పొడుపు కథలు',
      description: 'Riddles with illustrations',
      icon: <QuizIcon sx={{ fontSize: 40 }} />,
      path: '/categories/riddles-with-pictures',
      color: '#c2185b'
    },
    {
      id: 'stories-without-ottulu',
      title: 'ఒత్తులు లేని కథలు',
      description: 'Stories without combined letters',
      icon: <AbcIcon sx={{ fontSize: 40 }} />,
      path: '/categories/stories-without-ottulu',
      color: '#00796b'
    },
    {
      id: 'stories-without-samyukta',
      title: 'సంయుక్త అక్షరాలు లేని కథలు',
      description: 'Stories without compound letters',
      icon: <AbcIcon sx={{ fontSize: 40 }} />,
      path: '/categories/stories-without-samyukta',
      color: '#607d8b'
    },
    {
      id: 'songs-without-ottulu',
      title: 'ఒత్తులు లేని గేయాలు',
      description: 'Songs without combined letters',
      icon: <MusicNoteIcon sx={{ fontSize: 40 }} />,
      path: '/categories/songs-without-ottulu',
      color: '#ff5722'
    },
    {
      id: 'songs-without-samyukta',
      title: 'సంయుక్త అక్షరాలు లేని గేయాలు',
      description: 'Songs without compound letters',
      icon: <MusicNoteIcon sx={{ fontSize: 40 }} />,
      path: '/categories/songs-without-samyukta',
      color: '#795548'
    },
    {
      id: 'short-stories',
      title: 'చిట్టి కథలు',
      description: 'Very short stories',
      icon: <AutoStoriesIcon sx={{ fontSize: 40 }} />,
      path: '/categories/short-stories',
      color: '#673ab7'
    },
    {
      id: 'childrens-songs',
      title: 'చిన్నారి గేయాలు',
      description: "Children's songs",
      icon: <MusicNoteIcon sx={{ fontSize: 40 }} />,
      path: '/categories/childrens-songs',
      color: '#009688'
    },
    {
      id: 'folk-humor-songs',
      title: 'జానపద హాస్య గేయాలు',
      description: 'Folk humor songs',
      icon: <MusicNoteIcon sx={{ fontSize: 40 }} />,
      path: '/categories/folk-humor-songs',
      color: '#ff9800'
    },
    {
      id: 'audio-stories',
      title: 'కథలు విందాం',
      description: 'Audio stories and songs',
      icon: <HeadphonesIcon sx={{ fontSize: 40 }} />,
      path: '/categories/audio-stories',
      color: '#e91e63'
    },
    {
      id: 'video-stories',
      title: 'కథలు చూద్దాం',
      description: 'Video stories',
      icon: <TheatersIcon sx={{ fontSize: 40 }} />,
      path: '/categories/video-stories',
      color: '#f44336'
    },
    {
      id: 'rayalaseema-stories',
      title: 'రాయలసీమ కథలు',
      description: 'Stories from Rayalaseema',
      icon: <LocationCityIcon sx={{ fontSize: 40 }} />,
      path: '/categories/rayalaseema-stories',
      color: '#3f51b5'
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
        కథల వర్గాలు
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
