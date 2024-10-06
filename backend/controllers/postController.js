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

const deletePost = async (req, res) => {
  try {
    console.log('Request to delete post:', req.params.id);

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Kontrollera om användaren har rätt att ta bort inlägget
    if (post.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Post.findByIdAndDelete(req.params.id);  // Direkt borttagning
    res.json({ message: 'Post removed' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Uppdatera ett inlägg (PUT)
const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;  // Hämta titel och innehåll från request body
    const post = await Post.findById(req.params.id);  // Hitta inlägget med det givna ID:t

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Uppdatera inläggets titel och innehåll
    post.title = title;
    post.content = content;

    // Spara uppdateringarna
    const updatedPost = await post.save();
    res.json(updatedPost);  // Returnera det uppdaterade inlägget
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  updatePost,
};
