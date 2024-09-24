import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';  // Lägg till useNavigate
import ReactMarkdown from 'react-markdown';
import { getPostById, deletePost } from '../services/api';  // Lägg till deletePost API-funktionen

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();  // För att navigera efter borttagning

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
        navigate('/');  // Navigera tillbaka till startsidan efter borttagning
      } catch (error) {
        console.error('Failed to delete the post:', error);
      }
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <ReactMarkdown>{post.content}</ReactMarkdown>

      {/* Edit-knapp */}
      <Link to={`/edit/${post._id}`} className="btn btn-warning mt-3">Edit Post</Link>

      {/* Delete-knapp */}
      <button onClick={handleDelete} className="btn btn-danger mt-3">Delete Post</button>
    </div>
  );
};

export default Post;
