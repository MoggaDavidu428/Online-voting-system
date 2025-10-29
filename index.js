const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'Frontend')));

// Mock database for demo (in production, use real database)
let users = [];
let votes = [];
let candidates = [
  { id: 1, name: 'David', party: 'Democratic Party', votes: 0 },
  { id: 2, name: 'Raju', party: 'Republican Party', votes: 0 },
  { id: 3, name: 'Ramu', party: 'Independent', votes: 0 }
];

// API Routes
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  
  // Check if user exists
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  
  const newUser = { id: users.length + 1, username, email, password };
  users.push(newUser);
  
  res.json({ 
    message: 'Registration successful!',
    user: { id: newUser.id, username: newUser.username }
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  
  res.json({ 
    message: 'Login successful!',
    user: { id: user.id, username: user.username },
    token: 'demo-token-' + Date.now()
  });
});

app.post('/api/vote', (req, res) => {
  const { candidateId } = req.body;
  
  if (!candidateId) {
    return res.status(400).json({ message: 'Please select a candidate' });
  }
  
  const candidate = candidates.find(c => c.id === candidateId);
  if (!candidate) {
    return res.status(404).json({ message: 'Candidate not found' });
  }
  
  candidate.votes++;
  
  res.json({ 
    message: 'Vote submitted successfully!',
    candidate: candidate.name
  });
});

app.get('/api/results', (req, res) => {
  res.json({ results: candidates });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`\nAccess the application at:`);
    console.log(`- Home: http://localhost:${PORT}/index.html`);
    console.log(`- Login: http://localhost:${PORT}/login.html`);
    console.log(`- Register: http://localhost:${PORT}/register.html`);
    console.log(`- Vote: http://localhost:${PORT}/vote.html`);
    console.log(`- Results: http://localhost:${PORT}/result.html\n`);
});
