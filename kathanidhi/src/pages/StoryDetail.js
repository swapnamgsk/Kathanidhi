import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Chip,
  Avatar,
  IconButton,
  Button,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStories } from '../context/StoriesContext';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/formatters';

const StoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { stories, deleteStory, likeStory, editStory, shareStory } = useStories();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const story = stories.find(s => s.id === id);

  const handleLike = async () => {
    try {
      setError(null);
      await likeStory(id);
    } catch (error) {
      console.error('Failed to like story:', error);
      setError('Failed to like story');
    }
  };

  const handleShare = async () => {
    try {
      setError(null);
      await shareStory(id);
    } catch (error) {
      console.error('Failed to share story:', error);
      setError('Failed to share story');
    }
  };

  const handleEdit = () => {
    navigate(`/edit-story/${id}`);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError(null);
      await deleteStory(id);
      navigate('/stories');
    } catch (error) {
      console.error('Failed to delete story:', error);
      setError('Failed to delete story');
    } finally {
      setLoading(false);
    }
  };

  if (!story) {
    return <Typography>Story not found</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* Author and Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={story.author.avatar} alt={story.author.name} />
            <Box>
              <Typography variant="subtitle1">
                {story.author.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDate(story.createdAt)}
              </Typography>
            </Box>
          </Box>
          
          {user?.id === story.author.id && (
            <Box>
              <IconButton
                color="primary"
                onClick={() => navigate(`/story/edit/${id}`)}
              >
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </Box>

        {/* Title and Category */}
        <Typography variant="h4" component="h1" gutterBottom>
          {story.title}
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Chip
            label={story.category}
            color="primary"
            sx={{ mr: 1 }}
          />
          {story.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              variant="outlined"
              sx={{ mr: 1 }}
            />
          ))}
        </Box>

        {/* Content */}
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap'
          }}
        >
          {story.content}
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Actions */}
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <IconButton 
            onClick={handleLike} 
            color={story.isLiked ? "error" : "default"}
            disabled={loading}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton 
            onClick={handleShare}
            disabled={loading}
          >
            <ShareIcon />
          </IconButton>
          {user && user.id === story.author.id && (
            <>
              <IconButton 
                onClick={handleEdit}
                disabled={loading}
              >
                <EditIcon />
              </IconButton>
              <IconButton 
                onClick={handleDelete}
                disabled={loading}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default StoryDetail;
