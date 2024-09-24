import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';  // Importera stilar för react-mde
import { createPost } from '../services/api';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');  // Hanterar markdown-innehållet
  const [selectedTab, setSelectedTab] = useState('write');  // Hanterar editor-läget
  const [error, setError] = useState(null);  // För att hantera eventuella fel
  const navigate = useNavigate();

  // Konvertera markdown till HTML med Showdown
  const converter = new Showdown.Converter();

  // Kontrollera om användaren är admin och inloggad, annars navigera bort
  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (!token || !isAdmin) {
      navigate('/');  // Skicka icke-admin eller icke-inloggad användare till startsidan
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
      await createPost({ title, content });
      navigate('/');  // Navigera till startsidan efter att inlägget har skapats
    } catch (error) {
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Create a New Post</h1>

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

        {/* Live-förhandsgranskning direkt under textfältet */}
        <div className="mb-3">
          <label htmlFor="preview" className="form-label">Live Preview</label>
          <div className="border p-3" id="preview">
            <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }} />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;
