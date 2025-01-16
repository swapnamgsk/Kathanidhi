import React from 'react';
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
  Menu,
  MenuItem
} from '@mui/material';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/formatters';

const StoryCard = ({ story, onDelete }) => {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [liked, setLiked] = React.useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLike = () => {
    setLiked(!liked);
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

  return (
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
          
          {user?.id === story.author?.id && (
            <>
              <IconButton onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => onDelete(story.id)}>Delete</MenuItem>
              </Menu>
            </>
          )}
        </Box>

        <Typography variant="h6" gutterBottom>
          {story.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          {story.excerpt || story.content.substring(0, 150) + '...'}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip 
            label={story.category} 
            color="primary" 
            size="small" 
          />
          {story.tags?.map((tag, index) => (
            <Chip 
              key={index} 
              label={tag} 
              size="small" 
              variant="outlined"
            />
          ))}
        </Box>
      </CardContent>

      <CardActions>
        <IconButton onClick={handleLike} color={liked ? "error" : "default"}>
          <FavoriteIcon />
        </IconButton>
        <IconButton onClick={handleShare}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default StoryCard;
