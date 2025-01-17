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
          bgcolor: '#1b5e20',
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
                తెలుగు కవుల సమూహం
              </Typography>
              <Typography
                variant="h5"
                sx={{ mb: 4, opacity: 0.9 }}
              >
                తెలుగు సాహిత్యాన్ని కనుగొనండి, సృష్టించండి మరియు పంచుకోండి
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  component={Link}
                  to="/stories"
                  variant="contained"
                  sx={{
                    bgcolor: '#4caf50',
                    '&:hover': {
                      bgcolor: '#43a047'
                    }
                  }}
                  size="large"
                >
                  కథలను అన్వేషించండి
                </Button>
                <Button
                  component={Link}
                  to="/create"
                  variant="outlined"
                  color="inherit"
                  size="large"
                >
                  రచన ప్రారంభించండి
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
                  borderColor: 'divider',
                  '& .MuiSvgIcon-root': {
                    color: '#2e7d32'
                  }
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
            తాజా కథలు
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
              అన్ని కథలను చూడండి
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

const features = [
  {
    icon: <AutoStoriesIcon sx={{ fontSize: 40, color: '#2e7d32' }} />,
    title: 'ధనవంతమైన కథల సేకరణ',
    description: 'తెలుగు కథలు, సామెతలు మరియు సాహిత్యంలోని విస్తారమైన సేకరణను అన్వేషించండి.'
  },
  {
    icon: <AutoStoriesIcon sx={{ fontSize: 40, color: '#2e7d32' }} />,
    title: 'సృష్టించండి & పంచుకోండి',
    description: 'మీ కథలను రాయండి మరియు మా అభివృద్ధి చెందుతున్న కమ్యూనిటీలో పంచుకోండి.'
  },
  {
    icon: <AutoStoriesIcon sx={{ fontSize: 40, color: '#2e7d32' }} />,
    title: 'ఇంటరాక్టివ్ లెర్నింగ్',
    description: 'వ్యాఖ్యలు మరియు లైకుల ద్వారా ఇతర రచయితలు మరియు పాఠకులతో మమేకం అవ్వండి.'
  }
];

export default Home;
