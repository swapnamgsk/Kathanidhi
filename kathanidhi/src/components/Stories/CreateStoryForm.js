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
    { value: 'telugu-folk-tales', label: 'తెలుగు జానపద కథలు' },
    { value: 'harikatha', label: 'హరికిషన్ కథలు' },
    { value: 'telugu-humor', label: 'తెలుగు హాస్య కథలు' },
    { value: 'world-folk-tales', label: 'ప్రపంచ జానపద కథలు' },
    { value: 'childrens-humor', label: 'బాలల హాస్య కథలు' },
    { value: 'moral-stories', label: 'బాలల నీతి కథలు' },
    { value: 'proverbs-with-pictures', label: 'బొమ్మలతో సామెతలు' },
    { value: 'riddles-with-pictures', label: 'బొమ్మలతో పొడుపు కథలు' },
    { value: 'stories-without-ottulu', label: 'ఒత్తులు లేని కథలు' },
    { value: 'stories-without-samyukta', label: 'సంయుక్త అక్షరాలు లేని కథలు' },
    { value: 'songs-without-ottulu', label: 'ఒత్తులు లేని గేయాలు' },
    { value: 'songs-without-samyukta', label: 'సంయుక్త అక్షరాలు లేని గేయాలు' },
    { value: 'short-stories', label: 'చిట్టి కథలు' },
    { value: 'childrens-songs', label: 'చిన్నారి గేయాలు' },
    { value: 'folk-humor-songs', label: 'జానపద హాస్య గేయాలు' },
    { value: 'audio-stories', label: 'కథలు విందాం' },
    { value: 'video-stories', label: 'కథలు చూద్దాం' },
    { value: 'rayalaseema-stories', label: 'రాయలసీమ కథలు' }
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
      setError('కథను సేవ్ చేయడంలో విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.');
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
        setTagInput('');
      }
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToDelete)
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" component="h1" gutterBottom>
          కొత్త కథ రాయండి
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="కథ పేరు"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          margin="normal"
          required
          inputProps={{
            lang: 'te' // Specify Telugu language
          }}
        />

        <TextField
          fullWidth
          select
          label="వర్గం"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          margin="normal"
          required
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: 300
                }
              }
            }
          }}
        >
          {categories.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              {category.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="సారాంశం"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          margin="normal"
          multiline
          rows={2}
          required
          inputProps={{
            lang: 'te' // Specify Telugu language
          }}
        />

        <TextField
          fullWidth
          label="కథ"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          margin="normal"
          multiline
          rows={10}
          required
          inputProps={{
            lang: 'te' // Specify Telugu language
          }}
        />

        <TextField
          fullWidth
          label="ట్యాగ్‌లు జోడించండి (ఎంటర్ నొక్కండి)"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyPress={handleAddTag}
          margin="normal"
          inputProps={{
            lang: 'te' // Specify Telugu language
          }}
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
            sx={{
              bgcolor: '#1b5e20',
              '&:hover': {
                bgcolor: '#2e7d32'
              }
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : initialData ? (
              'కథను నవీకరించు'
            ) : (
              'కథను ప్రచురించు'
            )}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{
              color: '#1b5e20',
              borderColor: '#1b5e20',
              '&:hover': {
                borderColor: '#2e7d32'
              }
            }}
          >
            రద్దు చేయి
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CreateStoryForm;
