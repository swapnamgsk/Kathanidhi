import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  IconButton,
  useTheme 
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();

  const footerSections = {
    about: {
      title: 'About Us',
      description: 'Telugu Poets Hub is a platform dedicated to preserving and promoting Telugu literature through storytelling and community engagement.'
    },
    quickLinks: {
      title: 'Quick Links',
      links: [
        { text: 'Stories', path: '/stories' },
        { text: 'Categories', path: '/categories' },
        { text: 'Write Story', path: '/create' },
        { text: 'Chatbot', path: '/chatbot' }
      ]
    },
    categories: {
      title: 'Categories',
      links: [
        { text: 'One-Page Stories', path: '/categories/one-page' },
        { text: 'Proverbs', path: '/categories/proverbs' },
        { text: 'Riddles', path: '/categories/riddles' },
        { text: 'Wise Sayings', path: '/categories/wise-sayings' }
      ]
    }
  };

  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com' },
    { icon: <TwitterIcon />, url: 'https://twitter.com' },
    { icon: <InstagramIcon />, url: 'https://instagram.com' }
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              {footerSections.about.title}
            </Typography>
            <Typography variant="body2">
              {footerSections.about.description}
            </Typography>
            <Box sx={{ mt: 2 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: 'white',
                    '&:hover': {
                      color: theme.palette.secondary.main
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              {footerSections.quickLinks.title}
            </Typography>
            {footerSections.quickLinks.links.map((link, index) => (
              <Link
                key={index}
                component={RouterLink}
                to={link.path}
                sx={{
                  display: 'block',
                  color: 'white',
                  textDecoration: 'none',
                  mb: 1,
                  '&:hover': {
                    color: theme.palette.secondary.main
                  }
                }}
              >
                {link.text}
              </Link>
            ))}
          </Grid>

          {/* Categories Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              {footerSections.categories.title}
            </Typography>
            {footerSections.categories.links.map((link, index) => (
              <Link
                key={index}
                component={RouterLink}
                to={link.path}
                sx={{
                  display: 'block',
                  color: 'white',
                  textDecoration: 'none',
                  mb: 1,
                  '&:hover': {
                    color: theme.palette.secondary.main
                  }
                }}
              >
                {link.text}
              </Link>
            ))}
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box sx={{ mt: 5, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Telugu Poets Hub. All rights reserved.
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            <Link
              component={RouterLink}
              to="/privacy"
              sx={{
                color: 'white',
                textDecoration: 'none',
                mx: 1,
                '&:hover': {
                  color: theme.palette.secondary.main
                }
              }}
            >
              Privacy Policy
            </Link>
            |
            <Link
              component={RouterLink}
              to="/terms"
              sx={{
                color: 'white',
                textDecoration: 'none',
                mx: 1,
                '&:hover': {
                  color: theme.palette.secondary.main
                }
              }}
            >
              Terms of Service
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
