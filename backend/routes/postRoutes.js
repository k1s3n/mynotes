const express = require('express');
const { deletePost, getPosts, createPost, getPostById, updatePost, getUsers } = require('../controllers/postController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, createPost);  // Skapa ett nytt inlägg (skyddad rutt)

router.route('/users')
  .get(protect, admin, getUsers)
  


router.route('/:id')
  .get(getPostById)
  .put(protect, updatePost)  // Uppdatera ett inlägg (PUT)
  .delete(protect, deletePost);  // Ta bort ett inlägg (DELETE)


module.exports = router;
