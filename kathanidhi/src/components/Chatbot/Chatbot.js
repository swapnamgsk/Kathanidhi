import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import ChatMessage from './ChatMessage';
import TransliterateInput from '../common/TransliterateInput';
import { useStories } from '../../context/StoriesContext';

const Chatbot = () => {
  const { stories } = useStories();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "నమస్తే! నేను మీ తెలుగు సాహిత్య సహాయకుడు. నేను మీకు ఎలా సహాయం చేయగలను?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findRelevantStories = (query) => {
    const searchTerms = query.toLowerCase();
    return stories.filter(story => {
      const titleMatch = story.title.toLowerCase().includes(searchTerms);
      const contentMatch = story.content.toLowerCase().includes(searchTerms);
      const categoryMatch = story.category.toLowerCase().includes(searchTerms);
      const tagsMatch = story.tags?.some(tag => tag.toLowerCase().includes(searchTerms));
      return titleMatch || contentMatch || categoryMatch || tagsMatch;
    });
  };

  const generateStoryIdea = (topic) => {
    // Basic story structure template
    return `ఇక్కడ "${topic}" గురించి ఒక కథ ఆలోచన:\n\n` +
           `శీర్షిక: ${topic} సాహస యాత్ర\n\n` +
           `ప్రారంభం:\n` +
           `- పాత్రల పరిచయం\n` +
           `- నేపథ్య వివరణ\n\n` +
           `మధ్య భాగం:\n` +
           `- ముఖ్య సంఘటన\n` +
           `- సమస్య/సవాలు\n\n` +
           `ముగింపు:\n` +
           `- పరిష్కారం\n` +
           `- నీతి\n\n` +
           `మీరు ఈ ఆలోచనను అభివృద్ధి చేసి, కొత్త కథను సృష్టించవచ్చు.`;
  };

  const processMessage = async (userMessage) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      let botResponse = "";

      // Check if user is asking about stories
      if (userMessage.toLowerCase().includes('కథ') || 
          userMessage.toLowerCase().includes('story')) {
        
        // If asking to create a story
        if (userMessage.toLowerCase().includes('కొత్త') || 
            userMessage.toLowerCase().includes('రాయి') ||
            userMessage.toLowerCase().includes('create')) {
          const topic = userMessage.split('గురించి')[1]?.trim() || 
                       userMessage.split('about')[1]?.trim() || 
                       'సాధారణ';
          botResponse = generateStoryIdea(topic);
        } 
        // If searching for existing stories
        else {
          const relevantStories = findRelevantStories(userMessage);
          if (relevantStories.length > 0) {
            botResponse = "సంబంధిత కథలు:\n\n" + 
              relevantStories.map((story, index) => 
                `${index + 1}. ${story.title}\n` +
                `   వర్గం: ${story.category}\n` +
                `   సారాంశం: ${story.excerpt || story.content.substring(0, 100)}...\n`
              ).join('\n');
          } else {
            botResponse = "క్షమించండి, మీ ప్రశ్నకు సంబంధించిన కథలు కనుగొనలేకపోయాను. మీరు కొత్త కథను సృష్టించాలనుకుంటున్నారా?";
          }
        }
      } else {
        botResponse = "మీ ప్రశ్నను అర్థం చేసుకోలేకపోయాను. దయచేసి కథల గురించి అడగండి లేదా కొత్త కథను సృష్టించమని అడగండి.";
      }

      const botMessage = {
        id: Date.now(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage = {
        id: Date.now(),
        text: "క్షమించండి, ఏదో తప్పు జరిగింది. దయచేసి మళ్ళీ ప్రయత్నించండి.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (message) => {
    const userMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    await processMessage(message);
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
      <Box 
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
        }}
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <TransliterateInput onSend={handleSend} isLoading={isLoading} />
    </Paper>
  );
};

export default Chatbot;
