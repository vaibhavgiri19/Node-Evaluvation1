// controllers/authorController.js
const Author = require('../models/authorModel');

exports.createAuthor = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newAuthor = await Author.create({ name, email });
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create author' });
  }
};

exports.getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch authors' });
  }
};

exports.getPostsByAuthor = (req, res) => {
  const { name } = req.params;
  const posts = readData().filter(post => post.author === name);
  res.json(posts);
};
