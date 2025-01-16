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
  const { stories, loading, error, deleteStory, likeStory } = useStories();
  const [story, setStory] = useState(null);

  useEffect(() => {
    const currentStory = stories.find(s => s.id === id);
    setStory(currentStory);
  }, [id, stories]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        await deleteStory(id);
        navigate('/stories');
      } catch (err) {
        console.error('Failed to delete story:', err);
      }
    }
  };

  const handleLike = async () => {
    try {
      await likeStory(id);
    } catch (err) {
      console.error('Failed to like story:', err);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: story.excerpt,
        url: window.location.href,
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!story) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">Story not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <IconButton onClick={handleLike} color={story.isLiked ? "error" : "default"}>
              <FavoriteIcon />
            </IconButton>
            <IconButton onClick={handleShare}>
              <ShareIcon />
            </IconButton>
          </Box>
          <Button
            variant="outlined"
            onClick={() => navigate('/stories')}
          >
            Back to Stories
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default StoryDetail;
