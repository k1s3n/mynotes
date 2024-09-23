const express = require('express');
const { createPost, getPosts, getPostById } = require('../controllers/postController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, admin, createPost);  // Endast admin kan skapa inlägg
router.get('/', getPosts);  // Hämta alla inlägg
router.get('/:id', getPostById);  // Hämta specifikt inlägg

module.exports = router;
