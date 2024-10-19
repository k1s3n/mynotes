const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },  // Markdown-innehållet
  private: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Knyt till användare
}, { timestamps: true });  // timestamps skapar och hanterar både createdAt och updatedAt

module.exports = mongoose.model('Post', PostSchema);
