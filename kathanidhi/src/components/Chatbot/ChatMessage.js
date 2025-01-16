import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

const ChatMessage = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isBot ? 'flex-start' : 'flex-end',
        mb: 2,
        gap: 1
      }}
    >
      {isBot && (
        <SmartToyIcon 
          sx={{ 
            color: 'primary.main',
            alignSelf: 'flex-end',
            mb: 0.5
          }} 
        />
      )}
      
      <Paper
        elevation={1}
        sx={{
          maxWidth: '70%',
          p: 1.5,
          backgroundColor: isBot ? 'white' : 'primary.main',
          color: isBot ? 'text.primary' : 'white',
          borderRadius: 2,
          ...(isBot 
            ? { borderTopLeftRadius: 0 }
            : { borderTopRightRadius: 0 }
          )
        }}
      >
        <Typography
          variant="body1"
          sx={{ 
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
        >
          {message.text}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 0.5,
            color: isBot ? 'text.secondary' : 'rgba(255, 255, 255, 0.7)',
            textAlign: 'right'
          }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Typography>
      </Paper>

      {!isBot && (
        <PersonIcon 
          sx={{ 
            color: 'primary.main',
            alignSelf: 'flex-end',
            mb: 0.5
          }} 
        />
      )}
    </Box>
  );
};

export default ChatMessage;
