import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMde from 'react-mde';
import { getPostById, updatePost } from '../services/api';
import { convertMarkdownToHtml } from '../utils/markdownUtils';
import 'react-mde/lib/styles/css/react-mde-all.css';
import '../styles/markdownStyle.css';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTab, setSelectedTab] = useState('write');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [editMessage, setEditMessage] = useState('');

  // Fetch the post data when the component loads
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(id);
        setTitle(post.title);
        setContent(post.content);
      } catch (err) {
        setError('Failed to load the post');
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!title || !content) {
        setError('Title and content cannot be empty');
        return;
      }

      // Update the post
      await updatePost(id, { title, content });
      setEditMessage('Post has been updated successfully!');
      setTimeout(() => navigate(`/posts/${id}`), 2000);
    } catch (err) {
      setError('Failed to update the post');
    }
  };

  return (
    <div className="container mt-5">
      {editMessage && <div className="alert alert-success mt-3">{editMessage}</div>}
      <h1>Edit Post</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input 
            type="text" 
            className="form-control" 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>

        {/* Markdown-editor */}
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content (Markdown supported)</label>
          <ReactMde
            value={content}
            onChange={setContent}  // Real-time content update
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={() => Promise.resolve('')}  // Disable preview button
          />
        </div>

        {/* Live Preview */}
        <div className="mb-3 markdown-content">
          <label htmlFor="preview" className="form-label">Live Preview</label>
          <div className="border p-3" id="preview">
            <div dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(content) }} />
          </div>
        </div>
        
        <button type="submit" className="btn btn-primary">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
