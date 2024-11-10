const express = require('express');
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
const validation = require('../middleware/validation');

const router = express.Router();

router.post('/', validation, createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', validation, updatePost);
router.delete('/:id', deletePost);

module.exports = router;
