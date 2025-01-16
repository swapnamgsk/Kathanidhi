import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  TextField, 
  IconButton, 
  CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatMessage from './ChatMessage';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Telugu literature assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processMessage = async (userMessage) => {
    // This is where you would integrate with your backend API
    // For now, we'll use some example responses
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      let botResponse = "I'm processing your request...";

      // Simple keyword-based responses
      if (userMessage.toLowerCase().includes('mother') || 
          userMessage.toLowerCase().includes('amma')) {
        botResponse = "Here are some stories about mothers:\n\n" +
          "1. 'A Mother's Love' (One-Page Stories)\n" +
          "2. 'Amma's Wisdom' (Proverbs)\n" +
          "3. 'Mother's Sacrifice' (Multi-Page Stories)";
      } else if (userMessage.toLowerCase().includes('story')) {
        botResponse = "Would you like to:\n\n" +
          "1. Read a story\n" +
          "2. Write a new story\n" +
          "3. Search for specific stories\n\n" +
          "Please let me know your preference!";
      } else if (userMessage.toLowerCase().includes('proverb')) {
        botResponse = "Here are some popular Telugu proverbs:\n\n" +
          "1. తల్లి లేని బిడ్డ తండ్రి లేని బిడ్డ\n" +
          "2. ఆకలి మంటకన్నా పెద్దమంట లేదు\n" +
          "3. చదువు సంపద నశింపదు";
      }

      setMessages(prev => [...prev, {
        id: prev.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }]);

    } catch (error) {
      setMessages(prev => [...prev, {
        id: prev.length + 2,
        text: "I'm sorry, I encountered an error. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
        error: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    await processMessage(inputMessage);
  };

  return (
    <Paper 
      elevation={3}
      sx={{
        height: '600px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Messages Area */}
      <Box 
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          backgroundColor: '#f5f5f5'
        }}
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress size={20} />
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Box
        component="form"
        onSubmit={handleSend}
        sx={{
          p: 2,
          backgroundColor: 'white',
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          gap: 1
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          size="small"
          disabled={isLoading}
        />
        <IconButton 
          type="submit" 
          color="primary"
          disabled={!inputMessage.trim() || isLoading}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Chatbot;
