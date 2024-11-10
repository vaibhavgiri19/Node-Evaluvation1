const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');
const authorRoutes = require('./routes/authorRoutes');
const logger = require('./middleware/logger');

const app = express();
app.use(express.json());
app.use(logger); // Logging middleware

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogging-platform', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Blogging Platform API');
});

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/authors', authorRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An error occurred' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));