import React, { useEffect, useRef, useState } from 'react';
import { TextField, Box, IconButton, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const TransliterateInput = ({ onSend, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const [transliteratedText, setTransliteratedText] = useState('');
  const inputRef = useRef(null);
  const transliterateControl = useRef(null);

  useEffect(() => {
    // Initialize Google Transliteration
    const initTransliteration = () => {
      if (window.google && window.google.elements && window.google.elements.transliteration) {
        const options = {
          sourceLanguage: 'en',
          destinationLanguage: ['te'],
          transliterationEnabled: true,
          shortcutKey: 'ctrl+g'
        };

        transliterateControl.current = new window.google.elements.transliteration.TransliterationControl(options);
        
        if (inputRef.current) {
          transliterateControl.current.makeTransliteratable([inputRef.current]);
          
          transliterateControl.current.addEventListener('transliterate', (e) => {
            setTransliteratedText(e.transliteratedText);
          });
        }
      }
    };

    if (window.google && window.google.elements) {
      initTransliteration();
    } else {
      const checkGoogleLoad = setInterval(() => {
        if (window.google && window.google.elements) {
          clearInterval(checkGoogleLoad);
          initTransliteration();
        }
      }, 100);

      return () => clearInterval(checkGoogleLoad);
    }

    return () => {
      if (transliterateControl.current) {
        transliterateControl.current.dispose();
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSend(transliteratedText || inputText);
      setInputText('');
      setTransliteratedText('');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
        inputRef={inputRef}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type in English to convert to Telugu..."
        helperText="Press Ctrl+G to toggle between English and Telugu"
        variant="outlined"
        size="small"
        disabled={isLoading}
        InputProps={{
          sx: {
            fontFamily: 'Noto Sans Telugu, sans-serif',
            '& input': {
              fontFamily: 'Noto Sans Telugu, sans-serif',
            }
          }
        }}
        inputProps={{
          lang: 'te',
          style: { 
            fontFamily: 'Noto Sans Telugu, sans-serif',
          },
          'data-testid': 'chat-input',
          autoComplete: 'off',
          spellCheck: false,
          dir: 'auto'
        }}
      />
      <IconButton 
        type="submit" 
        sx={{
          bgcolor: '#388e3c',
          color: 'white',
          '&:hover': {
            bgcolor: '#2e7d32'
          },
          height: 40
        }}
        disabled={!inputText.trim() || isLoading}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
      </IconButton>
    </Box>
  );
};

export default TransliterateInput;
