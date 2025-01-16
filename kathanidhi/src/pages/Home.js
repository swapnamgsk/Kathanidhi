import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Grid,
  Paper,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useStories } from '../context/StoriesContext';
import StoryCard from '../components/Stories/StoryCard';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const Home = () => {
  const { stories } = useStories();

  // Get latest 6 stories
  const latestStories = stories.slice(0, 6);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 6, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                Telugu Poets Hub
              </Typography>
              <Typography
                variant="h5"
                sx={{ mb: 4, opacity: 0.9 }}
              >
                Discover, Create, and Share Telugu Literature
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  component={Link}
                  to="/stories"
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  Explore Stories
                </Button>
                <Button
                  component={Link}
                  to="/create"
                  variant="outlined"
                  color="inherit"
                  size="large"
                >
                  Start Writing
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  justifyContent: 'center'
                }}
              >
                <AutoStoriesIcon sx={{ fontSize: 300, opacity: 0.2 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                {feature.icon}
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Latest Stories Section */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ mb: 4 }}
          >
            Latest Stories
          </Typography>
          <Grid container spacing={3}>
            {latestStories.map((story) => (
              <Grid item xs={12} sm={6} md={4} key={story.id}>
                <StoryCard story={story} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              component={Link}
              to="/stories"
              variant="contained"
              color="primary"
              size="large"
            >
              View All Stories
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

const features = [
  {
    icon: <AutoStoriesIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Rich Story Collection',
    description: 'Explore a vast collection of Telugu stories, proverbs, and literature.'
  },
  {
    icon: <AutoStoriesIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Create & Share',
    description: 'Write and share your own stories with our growing community.'
  },
  {
    icon: <AutoStoriesIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Interactive Learning',
    description: 'Engage with other writers and readers through comments and likes.'
  }
];

export default Home;
