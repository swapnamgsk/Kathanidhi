import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  InputAdornment,
  IconButton,
  Link,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Google,
  Facebook
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Custom styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
}));

const SocialButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: '8px',
  width: '100%',
  textTransform: 'none',
  fontSize: '1rem',
}));

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        <StyledPaper>
          {/* Logo or App Name */}
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 'bold',
              color: '#1b5e20',
              fontFamily: 'Telugu, sans-serif'
            }}
          >
            కథానిధి
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label="ఇమెయిల్"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: '#1b5e20' }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="పాస్వర్డ్"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#1b5e20' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                bgcolor: '#1b5e20',
                '&:hover': {
                  bgcolor: '#2e7d32',
                },
                fontSize: '1.1rem',
                borderRadius: '8px',
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'లాగిన్'
              )}
            </Button>

            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Link
                href="#"
                onClick={() => navigate('/forgot-password')}
                sx={{
                  color: '#1b5e20',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                పాస్‌వర్డ్ మర్చిపోయారా?
              </Link>
            </Box>

            <Divider sx={{ mb: 3 }}>
              <Typography color="textSecondary">లేదా</Typography>
            </Divider>

            <SocialButton
              variant="outlined"
              startIcon={<Google />}
              onClick={() => {/* Handle Google login */}}
              sx={{ 
                borderColor: '#DB4437',
                color: '#DB4437',
                '&:hover': { borderColor: '#DB4437', bgcolor: 'rgba(219, 68, 55, 0.04)' }
              }}
            >
              Google తో లాగిన్ చేయండి
            </SocialButton>

            <SocialButton
              variant="outlined"
              startIcon={<Facebook />}
              onClick={() => {/* Handle Facebook login */}}
              sx={{ 
                borderColor: '#4267B2',
                color: '#4267B2',
                '&:hover': { borderColor: '#4267B2', bgcolor: 'rgba(66, 103, 178, 0.04)' }
              }}
            >
              Facebook తో లాగిన్ చేయండి
            </SocialButton>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                ఖాతా లేదా?{' '}
                <Link
                  component="button"
                  onClick={() => navigate('/signup')}
                  sx={{
                    color: '#1b5e20',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  సైన్ అప్ చేయండి
                </Link>
              </Typography>
            </Box>
          </form>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default Login;
