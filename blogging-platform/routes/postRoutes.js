// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { validatePost } = require('../middlewares/validation');

// CRUD routes for posts
router.post('/posts', validatePost, postController.createPost);
router.get('/posts', postController.getAllPosts);
router.get('/posts/:id', postController.getPostById);
router.put('/posts/:id', validatePost, postController.updatePost);
router.delete('/posts/:id', postController.deletePost);

module.exports = router;
