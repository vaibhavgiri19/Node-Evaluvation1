// index.js
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const postRoutes = require('./routes/postRoutes');
const authorRoutes = require('./routes/authorRoutes');
const loggingMiddleware = require('./middlewares/logging');

const app = express();
const PORT = 4001;

// Middleware to parse JSON data
app.use(express.json());

// Logging Middleware
app.use(loggingMiddleware);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogging-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Blogging Platform API');
});

// API Routes
app.use('/api', postRoutes);
app.use('/api', authorRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An internal error occurred!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
