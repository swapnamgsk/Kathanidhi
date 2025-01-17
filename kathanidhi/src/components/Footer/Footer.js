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
      title: 'మా గురించి',
      description: 'తెలుగు కవుల సమూహం తెలుగు సాహిత్యాన్ని కథల ద్వారా కాపాడడం మరియు ప్రోత్సహించడానికి, సమాజం మధ్యకారంగా పనిచేసే వేదిక.'
    },
    quickLinks: {
      title: 'త్వరిత లింకులు',
      links: [
        { text: 'కథలు', path: '/stories' },
        { text: 'వర్గాలు', path: '/categories' },
        { text: 'కథ రాయండి', path: '/create' },
        { text: 'చాట్‌బాట్', path: '/chatbot' }
      ]
    },
    categories: {
      title: 'వర్గాలు',
      links: [
        { text: 'తెలుగు జానపద కథలు', path: '/categories/telugu-folk-tales' },
        { text: 'హరికిషన్ కథలు', path: '/categories/harikatha' },
        { text: 'బాలల నీతి కథలు', path: '/categories/moral-stories' },
        { text: 'చిట్టి కథలు', path: '/categories/short-stories' }
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
        bgcolor: '#1b5e20',
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
                      color: '#81c784'
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
                    color: '#81c784'
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
                    color: '#81c784'
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
            © {new Date().getFullYear()} తెలుగు కవుల సమూహం. హక్కులు అన్ని రిజర్వు చేయబడినవి.
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
                  color: '#81c784'
                }
              }}
            >
              గోప్యతా విధానం
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
                  color: '#81c784'
                }
              }}
            >
              సేవా షరతులు
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
