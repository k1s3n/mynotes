const express = require('express');
const { deletePost, getPosts, createPost, getPostById, updatePost} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, createPost);  // Skapa ett nytt inlägg (skyddad rutt)


router.route('/:id')
  .get(getPostById)
  .put(protect, updatePost)  // Uppdatera ett inlägg (PUT)
  .delete(protect, deletePost);  // Ta bort ett inlägg (DELETE)


module.exports = router;
