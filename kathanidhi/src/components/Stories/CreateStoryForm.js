import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem,
  Chip,
  Stack,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validateStory } from '../../utils/validation';
import { useStories } from '../../context/StoriesContext';

const CreateStoryForm = ({ initialData = null }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createStory } = useStories();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    category: initialData?.category || '',
    tags: initialData?.tags || [],
    excerpt: initialData?.excerpt || ''
  });

  const [tagInput, setTagInput] = useState('');

  const categories = [
    { value: 'one-page', label: 'One-Page Stories' },
    { value: 'multi-page', label: 'Multi-Page Stories' },
    { value: 'proverbs', label: 'Proverbs' },
    { value: 'riddles', label: 'Riddles' },
    { value: 'wise-sayings', label: 'Wise Sayings' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form
    const errors = validateStory(formData);
    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors).join(', '));
      return;
    }

    setLoading(true);
    try {
      const storyData = {
        ...formData,
        authorId: user.id,
        author: {
          id: user.id,
          name: user.name,
          avatar: user.avatar || ''
        },
        createdAt: new Date().toISOString()
      };

      await createStory(storyData);
      navigate('/stories');
    } catch (err) {
      setError('Failed to save story. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput.trim()]
        });
      }
      setTagInput('');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToDelete)
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" component="h1" gutterBottom>
        {initialData ? 'Edit Story' : 'Create New Story'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          select
          label="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          margin="normal"
          required
        >
          {categories.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              {category.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          margin="normal"
          multiline
          rows={2}
          required
        />

        <TextField
          fullWidth
          label="Content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          margin="normal"
          multiline
          rows={10}
          required
        />

        <TextField
          fullWidth
          label="Add Tags (Press Enter)"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyPress={handleAddTag}
          margin="normal"
        />

        <Stack direction="row" spacing={1} sx={{ mt: 1, mb: 2 }}>
          {formData.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleDeleteTag(tag)}
            />
          ))}
        </Stack>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : initialData ? (
              'Update Story'
            ) : (
              'Publish Story'
            )}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CreateStoryForm;
