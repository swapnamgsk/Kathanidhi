import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import { StoriesProvider } from './context/StoriesContext';

// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Stories from './pages/Stories';
import StoryDetail from './pages/StoryDetail';
import CreateStory from './pages/CreateStory';
import Profile from './pages/Profile';
import Categories from './pages/Categories';
import ChatbotPage from './pages/ChatbotPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <StoriesProvider>
            <div className="App" style={{ 
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Header />
              <main style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/stories" element={<Stories />} />
                  <Route path="/story/:id" element={<StoryDetail />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/chatbot" element={<ChatbotPage />} />
                  <Route path="/create" element={<CreateStory />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </StoriesProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
