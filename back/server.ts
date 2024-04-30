const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Define the endpoint handlers before starting the server
const registeredUsers = new Set();

app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  // Validate email and password (e.g., check for required fields, format)
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Check if user already exists
  if (registeredUsers.has(email)) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Add user to set of registered users (placeholder for database logic)
  registeredUsers.add(email);

  // Send response indicating success
  res.status(200).json({ message: 'Registration successful' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
