import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostById } from '../services/api';
import { handleDelete } from '../utils/postUtils';
import AuthContext from '../AuthContext';
import { capitalizeTitle } from '../utils/utils';
import { convertMarkdownToHtml } from '../utils/markdownUtils';

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState('');
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const result = await getPostById(id);
      setPost(result);
    };
    fetchPost();
  }, [id]);


  if (!post) return <div>Loading...</div>;

  const canEditOrDelete = user && (user.isAdmin || user._id === post.user);
  const createdAtLocalTime = new Date(post.createdAt).toLocaleString();
  const capitalizedTitle = capitalizeTitle(post.title);

  return (
    <div className='container mt-5'>
      <div className='markdown-content'>
        <h3 className='text-primary'>{capitalizedTitle}</h3>
        <p className='text-secondary'>Created at: {createdAtLocalTime}</p>

        {/* Use dangerouslySetInnerHTML to render the HTML content */}
        <div dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(post.content) }} />

        <p className="text-muted" align="center">Posted by: {post.user?.name}</p>

        {message && <div className="alert alert-success mt-3">{message}</div>}
        
        <Link to={`/`} className="btn btn-secondary mt-3 btn-sm">Return</Link>

        
        {canEditOrDelete && (
          <>
            <Link to={`/edit/${post._id}`} className="btn btn-warning mt-3 btn-sm">Edit Post</Link>
            <button onClick={() => handleDelete(post._id, setPost, setMessage, navigate)} className="btn btn-danger mt-3 btn-sm">Delete Post</button>
           
          </>
        )}
       
      </div>
    </div>
  );
};

export default Post;
