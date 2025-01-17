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
            ఏఐ సహాయకుడు
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            paragraph
            align="center"
            sx={{ mb: 4 }}
          >
            తెలుగు సాహిత్యం, కథలు, లేదా నిర్దిష్ట విషయాలను కనుగొనడంలో సహాయం కోసం నన్ను ఏమైనా అడగండి!
          </Typography>
          <Chatbot />
        </Box>
      </Paper>
    </Container>
  );
};

export default ChatbotPage;
