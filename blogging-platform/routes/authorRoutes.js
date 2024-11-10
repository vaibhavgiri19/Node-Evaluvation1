// routes/authorRoutes.js
const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

router.post('/authors', authorController.createAuthor);
router.get('/authors', authorController.getAuthors);
router.get('/authors/:name/posts', authorController.getPostsByAuthor);

module.exports = router;
