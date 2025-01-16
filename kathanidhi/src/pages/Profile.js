import React, { useState } from 'react';
import {
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Avatar,
  Box,
  Alert,
  CircularProgress,
  Divider,
  Tab,
  Tabs
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useStories } from '../context/StoriesContext';
import StoryCard from '../components/Stories/StoryCard';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const Profile = () => {
  const { user, updateProfile, loading: authLoading } = useAuth();
  const { stories } = useStories();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Filter user's stories
  const userStories = stories.filter(story => story.author.id === user?.id);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await updateProfile({
        name: formData.name,
        bio: formData.bio
      });
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setLoading(true);
    try {
      // Implement password update logic here
      setSuccess('Password updated successfully');
    } catch (err) {
      setError(err.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        // Implement avatar upload logic here
        console.log('Avatar file:', file);
      } catch (err) {
        setError('Failed to update avatar');
      }
    }
  };

  if (authLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Profile Summary */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                src={user?.avatar}
                alt={user?.name}
                sx={{ width: 120, height: 120, mb: 2, mx: 'auto' }}
              />
              <input
                type="file"
                accept="image/*"
                id="avatar-upload"
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-upload">
                <Button
                  component="span"
                  variant="contained"
                  size="small"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    minWidth: 'auto',
                    p: 1
                  }}
                >
                  <CameraAltIcon />
                </Button>
              </label>
            </Box>
            <Typography variant="h6" gutterBottom>
              {user?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              {user?.bio || 'No bio added yet'}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2">
              Stories Published: {userStories.length}
            </Typography>
          </Paper>
        </Grid>

        {/* Profile Tabs */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab label="Edit Profile" />
              <Tab label="Change Password" />
              <Tab label="My Stories" />
            </Tabs>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            {/* Edit Profile Tab */}
            {activeTab === 0 && (
              <Box component="form" onSubmit={handleProfileUpdate}>
                <TextField
                  fullWidth
                  label="Name"
                  margin="normal"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Bio"
                  margin="normal"
                  multiline
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Update Profile'}
                </Button>
              </Box>
            )}

            {/* Change Password Tab */}
            {activeTab === 1 && (
              <Box component="form" onSubmit={handlePasswordUpdate}>
                <TextField
                  fullWidth
                  type="password"
                  label="Current Password"
                  margin="normal"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="New Password"
                  margin="normal"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm New Password"
                  margin="normal"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Update Password'}
                </Button>
              </Box>
            )}

            {/* My Stories Tab */}
            {activeTab === 2 && (
              <Grid container spacing={3}>
                {userStories.map((story) => (
                  <Grid item xs={12} sm={6} key={story.id}>
                    <StoryCard story={story} />
                  </Grid>
                ))}
                {userStories.length === 0 && (
                  <Grid item xs={12}>
                    <Typography variant="body1" color="text.secondary" align="center">
                      You haven't published any stories yet.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
