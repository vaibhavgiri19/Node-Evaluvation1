const fs = require('fs');
const path = './db.json';

// Create Post
exports.createPost = (req, res) => {
    const posts = JSON.parse(fs.readFileSync(path, 'utf8'));
    const newPost = { id: Date.now(), ...req.body };
    posts.push(newPost);
    fs.writeFileSync(path, JSON.stringify(posts, null, 2));
    res.status(201).json(newPost);
};

// Read All Posts
exports.getAllPosts = (req, res) => {
    const posts = JSON.parse(fs.readFileSync(path, 'utf8'));
    res.json(posts);
};

// Read Single Post
exports.getPostById = (req, res) => {
    const posts = JSON.parse(fs.readFileSync(path, 'utf8'));
    const post = posts.find(p => p.id === parseInt(req.params.id));
    post ? res.json(post) : res.status(404).json({ message: 'Post not found' });
};

// Update Post
exports.updatePost = (req, res) => {
    const posts = JSON.parse(fs.readFileSync(path, 'utf8'));
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (postIndex === -1) return res.status(404).json({ message: 'Post not found' });

    posts[postIndex] = { ...posts[postIndex], ...req.body };
    fs.writeFileSync(path, JSON.stringify(posts, null, 2));
    res.json(posts[postIndex]);
};

// Delete Post
exports.deletePost = (req, res) => {
    let posts = JSON.parse(fs.readFileSync(path, 'utf8'));
    posts = posts.filter(p => p.id !== parseInt(req.params.id));
    fs.writeFileSync(path, JSON.stringify(posts, null, 2));
    res.status(204).end();
};