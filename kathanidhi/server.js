const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB operations
const DB_PATH = path.join(__dirname, 'db.json');

const readDB = () => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    console.log('Reading DB:', data); // Debug log
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading DB:', error);
    const initialData = { users: [], stories: [] };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
    return initialData;
  }
};

const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    console.log('DB written successfully:', data); // Debug log
  } catch (error) {
    console.error('Error writing to DB:', error);
  }
};

// Stories endpoints
app.get('/stories', (req, res) => {
  try {
    const db = readDB();
    console.log('Sending stories:', db.stories); // Debug log
    res.json(db.stories || []);
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ message: 'Failed to fetch stories' });
  }
});

app.post('/stories', (req, res) => {
  try {
    const { title, content, category, author, tags, excerpt } = req.body;
    console.log('Received story data:', req.body);

    if (!title || !content || !category) {
      return res.status(400).json({ message: 'Title, content, and category are required' });
    }

    const db = readDB();
    if (!db.stories) {
      db.stories = [];
    }

    const newStory = {
      id: Date.now().toString(),
      title,
      content,
      category,
      excerpt,
      tags: tags || [],
      author,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: []
    };

    db.stories.unshift(newStory);
    writeDB(db);

    console.log('Story created:', newStory);
    res.status(201).json(newStory);
  } catch (error) {
    console.error('Error creating story:', error);
    res.status(500).json({ message: 'Failed to create story' });
  }
});

// Routes
app.post('/auth/register', (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('Registration request received:', { name, email });

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const db = readDB();
    
    // Check if user exists
    if (db.users.some(user => user.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password // In real app, hash this
    };

    // Save to DB
    db.users.push(newUser);
    writeDB(db);

    // Create token
    const token = Buffer.from(JSON.stringify({ id: newUser.id })).toString('base64');

    // Return response
    res.status(201).json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
app.post('/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const db = readDB();
    const user = db.users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // In a real app, you'd hash the password and compare hashes
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create token
    const token = Buffer.from(JSON.stringify({ id: user.id })).toString('base64');

    // Return user data (excluding password) and token
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Token verification endpoint
app.get('/auth/verify', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());

    const db = readDB();
    const user = db.users.find(u => u.id === decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  
  // Initialize DB if it doesn't exist
  if (!fs.existsSync(DB_PATH)) {
    writeDB({ users: [], stories: [] });
  }
});
