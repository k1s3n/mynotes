import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';  // Importera stilar för react-mde
import { createPost } from '../services/api';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');  // Hanterar markdown-innehållet
  const navigate = useNavigate();

  // Konvertera markdown till HTML med Showdown
  const converter = new Showdown.Converter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost({ title, content });
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h1>Create a New Post</h1>

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
            selectedTab="write"  // Vi sätter editorn alltid i "skrivläge"
            generateMarkdownPreview={() => Promise.resolve('')}  // Inaktiverar preview-knappen
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
