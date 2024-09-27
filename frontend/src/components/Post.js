import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';  // Lägg till useNavigate
import ReactMarkdown from 'react-markdown';
import { getPostById, deletePost } from '../services/api';  // Lägg till deletePost API-funktionen
import AuthContext from '../AuthContext';  // Importera AuthContext för att kontrollera inloggad användare
import { capitalizeTitle } from '../utils/utils';


const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();  // För att navigera efter borttagning
  const [deleteMessage, setDeleteMessage] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      const result = await getPostById(id);
      setPost(result);
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);  // Kalla API:t för att ta bort inlägget
        setDeleteMessage('Post has been deleted successfully!');  // Sätt meddelandet
        setTimeout(() => navigate('/'), 2000);  // Navigera efter 2 sekunder // Navigera tillbaka till startsidan efter borttagning
      } catch (error) {
        console.error('Failed to delete the post:', error);
      }
    }
  };

  if (!post) return <div>Loading...</div>;

  // Kontrollera om användaren är ägaren av inlägget eller admin
  const canEditOrDelete = user && (user.isAdmin || user._id === post.user);

  // Formatera både createdAt till lokal tid
  const createdAtLocalTime = new Date(post.createdAt).toLocaleString();
  const capitalizedTitle = capitalizeTitle(post.title);

  return (
    <div className='container mt-5'>
    <div className='markdown-content'> {/* Markdown-innehåll */}
     {deleteMessage && <div className="alert alert-success mt-3">{deleteMessage}</div>}
      <h3 className='text-primary'>{capitalizedTitle}</h3>
      <p className='text-secondary'>Created at: {createdAtLocalTime}</p>
      <ReactMarkdown>{post.content}</ReactMarkdown>
      <p className="text-muted" align="center">Posted by: {post.user?.name}</p>
      <Link to={`/`} className="btn btn-secondary mt-3 btn-sm">Return</Link>
      {canEditOrDelete && (
        <>
          <Link to={`/edit/${post._id}`} className="btn btn-warning mt-3 btn-sm">Edit Post</Link>
          <button onClick={handleDelete} className="btn btn-danger mt-3 btn-sm">Delete Post</button>
        </>
      )}
    </div>
    </div>
  );
};

export default Post;
