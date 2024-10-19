import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';  // Importera stilar för react-mde
import { createPost } from '../services/api';
import '../styles/markdownStyle.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');  // Hanterar markdown-innehållet
  const [selectedTab, setSelectedTab] = useState('write');  // Hanterar editor-läget
  const [error, setError] = useState(null);  // För att hantera eventuella fel
  const [message, setMessage] = useState(null);
  const [isPrivate, setIsPrivate] = useState(null);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  // Konvertera markdown till HTML med Showdown
  const converter = new Showdown.Converter();

  // Kontrollera om användaren är inloggad, annars navigera bort
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');  // Skicka icke-inloggad användare till startsidan
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validering: Kontrollera att titel och innehåll inte är tomma
      if (!title || !content) {
        setError('Title and content cannot be empty');
        return;
      }

      // Försök skapa inlägget
      await createPost({ title, content, private: isPrivate });
      setMessage('Post has been created successfully!');
      setTimeout(() => {
        navigate('/');
      }, 1000);  // Navigera till startsidan efter att inlägget har skapats
    } catch (error) {
      setError('Failed to create post. Please try again.');
    }
  };


  return (
    
    <div className="container mt-5">
      <h1>Create a New Post</h1>
      {message && <div className="alert alert-success">{message}</div>}
      {/* Visa eventuella fel */}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Inmatning för titel */}
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
        {/* Checkbox för privat inlägg */}
        {isAdmin && (
          <div className="mb-3 form-check">
            <input 
              type="checkbox" 
              className="form-check-input" 
              id="isPrivate" 
              checked={isPrivate} 
              onChange={(e) => setIsPrivate(e.target.checked)} 
            />
            <label className="form-check-label" htmlFor="isPrivate">Make this post private</label>
          </div>
        )}


        {/* Live-förhandsgranskning direkt under textfältet */}
        <div className="mb-3 markdown-content">
          <label htmlFor="preview" className="form-label">Live Preview</label>
          <div className="border p-3" id="preview">
            <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }} />
          </div>
        </div>
        <Link to={`/`} className="btn btn-secondary">Return</Link>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;
