import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  const [isPrivate, setIsPrivate] = useState(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  

  // Fetch the post data when the component loads
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(id);
        setTitle(post.title);
        setContent(post.content);
        setIsPrivate(post.private);
      } catch (err) {
        setError('Failed to load the post');
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');  // Skicka icke-inloggad användare till startsidan
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!title || !content) {
        setError('Title and content cannot be empty');
        return;
      }

      const updatedPost = { title, content, private: isPrivate };
      // Update the post
      await updatePost(id, updatedPost);
      //navigate(`/`, { state: { message: 'Post has been updated successfully!' } });
      setMessage('Post has been updated successfully!');

      const currentPrivateStatus = isPrivate;

      setTimeout(() => {
        if (currentPrivateStatus) {
          navigate('/posts/private');
        } else {
          navigate('/');
        }
      }, 2000);
    } catch (err) {
      setError('Failed to update the post');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Edit Post</h1>
      {message && <div className="alert alert-success">{message}</div>}
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
        {isAdmin && (
        <div className="mb-3 form-check">
          <input 
            value={isPrivate}
            type="checkbox" 
            className="form-check-input" 
            id="isPrivate" 
            checked={isPrivate} 
            onChange={(e) => setIsPrivate(e.target.checked)} 
          />
          <label className="form-check-label" htmlFor="isPrivate">Make this post private</label>
        </div>
        )}


        <Link to="/" className="btn btn-secondary btn-sm">Cancel</Link>
        <button type="submit" className="btn btn-primary btn-sm">Update Post</button>
        
        {/* Live Preview */}
        <div className="mb-3 markdown-content">
          <label htmlFor="preview" className="form-label">Live Preview</label>
          <div className="border p-3" id="preview">
            <div dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(content) }} />
          </div>
        </div>
        
      </form>
    </div>
  );
};

export default EditPost;
