import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../context/AuthContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';

const StoryCard = ({ story, onDelete, onLike, onEdit, onShare }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      setError(null);
      await onDelete(story.id);
      setOpenDialog(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    try {
      await onLike(story.id);
    } catch (error) {
      console.error('Failed to like story:', error);
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(story.id);
  };

  const handleShareClick = async (e) => {
    e.stopPropagation();
    try {
      await onShare(story.id);
    } catch (error) {
      console.error('Failed to share story:', error);
    }
  };

  return (
    <>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)'
          }
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar 
                src={story.author?.avatar} 
                alt={story.author?.name || 'Anonymous'}
              >
                {story.author?.name?.charAt(0) || 'A'}
              </Avatar>
              <Box>
                <Typography variant="subtitle2">
                  {story.author?.name || 'Anonymous'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(story.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <IconButton 
                onClick={handleLikeClick}
                color={story.isLiked ? "error" : "default"}
              >
                <FavoriteIcon />
                <Typography variant="caption" sx={{ ml: 1 }}>
                  {story.likes || 0}
                </Typography>
              </IconButton>
              
              <IconButton onClick={handleShareClick}>
                <ShareIcon />
              </IconButton>

              {user?.id === story.author?.id && (
                <>
                  <IconButton onClick={handleEditClick}>
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    onClick={handleDeleteClick}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </Box>
          </Box>

          <Typography variant="h6" gutterBottom>
            {story.title}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            paragraph
            sx={{ 
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {story.excerpt || story.content.substring(0, 150) + '...'}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            <Chip
              label={story.category}
              sx={{
                backgroundColor: '#1b5e20',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#2e7d32',
                },
                '& .MuiChip-label': {
                  fontWeight: 500,
                },
              }}
            />
          </Box>
        </CardContent>

        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
          <Button
            variant="contained"
            onClick={() => navigate(`/story/${story.id}`)}
            sx={{
              backgroundColor: '#1b5e20',
              '&:hover': {
                backgroundColor: '#2e7d32',
              }
            }}
          >
            పూర్తి కథ చదవండి
          </Button>
        </CardActions>
      </Card>

      <Dialog open={openDialog} onClose={() => !loading && setOpenDialog(false)}>
        <DialogTitle>కథను తొలగించు</DialogTitle>
        <DialogContent>
          <Typography>
            మీరు నిజంగా ఈ కథను తొలగించాలనుకుంటున్నారా?
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDialog(false)}
            disabled={loading}
          >
            రద్దు చేయి
          </Button>
          <Button 
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? 'తొలగిస్తోంది...' : 'తొలగించు'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StoryCard;
