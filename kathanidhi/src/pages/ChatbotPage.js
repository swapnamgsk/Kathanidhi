import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box
} from '@mui/material';
import Chatbot from '../components/Chatbot/Chatbot';

const ChatbotPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
          >
            AI Assistant
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            paragraph
            align="center"
            sx={{ mb: 4 }}
          >
            Ask me anything about Telugu literature, stories, or help finding specific content!
          </Typography>
          <Chatbot />
        </Box>
      </Paper>
    </Container>
  );
};

export default ChatbotPage;
