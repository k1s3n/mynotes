const Post = require('../models/Post');

// Skapa ett nytt inlägg
const createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = new Post({
      title,
      content,
      user: req.user._id,  // Koppla till administratören
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error, could not create post' });
  }
};

// Hämta alla inlägg
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name email');  // Hämta användardata också
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error, could not fetch posts' });
  }
};

// Hämta ett specifikt inlägg
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'name email');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error, could not fetch post' });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
};
