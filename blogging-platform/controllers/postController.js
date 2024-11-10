// controllers/postController.js
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../DB.json');

// Helper function to read JSON data
const readData = () => JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Helper function to write JSON data
const writeData = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// Create a new post
exports.createPost = (req, res) => {
  const { title, content, author } = req.body;
  const posts = readData();
  const newPost = { id: Date.now().toString(), title, content, author };
  posts.push(newPost);
  writeData(posts);
  res.status(201).json(newPost);
};

// Get all posts
exports.getAllPosts = (req, res) => {
  const posts = readData();
  res.json(posts);
};

// Get a post by ID
exports.getPostById = (req, res) => {
  const posts = readData();
  const post = posts.find((p) => p.id === req.params.id);
  post ? res.json(post) : res.status(404).json({ message: 'Post not found' });
};

// Update a post by ID
exports.updatePost = (req, res) => {
  const { title, content } = req.body;
  const posts = readData();
  const postIndex = posts.findIndex((p) => p.id === req.params.id);
  if (postIndex !== -1) {
    posts[postIndex] = { ...posts[postIndex], title, content };
    writeData(posts);
    res.json(posts[postIndex]);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

// Delete a post by ID
exports.deletePost = (req, res) => {
  let posts = readData();
  posts = posts.filter((p) => p.id !== req.params.id);
  writeData(posts);
  res.json({ message: 'Post deleted successfully' });
};
