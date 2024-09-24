import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { getPostById, updatePost } from '../services/api';  // Importera updatePost API-anropet
import '../styles/markdownStyle.css';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTab, setSelectedTab] = useState('write');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const converter = new Showdown.Converter();
  const [editMessage, seteditMessage] = useState('');

  // Hämta det aktuella inlägget när komponenten laddas
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

      // Uppdatera inlägget
      await updatePost(id, { title, content });
      seteditMessage('Post have been updated successfully!');
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

         {/* Markdown-editor utan preview-knapp */}
         <div className="mb-3">
          <label htmlFor="content" className="form-label">Content (Markdown supported)</label>
          <ReactMde
            value={content}
            onChange={setContent}  // Uppdaterar innehållet i realtid
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={() => Promise.resolve('')}  // Inaktivera preview-knappen
          />
        </div>

        {/* Live-förhandsgranskning direkt under textfältet */}
        <div className="mb-3 markdown-content">
          <label htmlFor="preview" className="form-label">Live Preview</label>
          <div className="border p-3" id="preview">
            <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }} />
          </div>
        </div>
        
        <button type="submit" className="btn btn-primary">Update Post</button>
      </form>
    </div>
    
  );
};

export default EditPost;
