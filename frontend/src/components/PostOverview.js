import React, { useEffect, useState } from 'react';
import { getPosts } from '../services/api';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';  // Import react-markdown to render Markdown
import '../styles/markdownStyle.css';

const PostOverview = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await getPosts();
        setPosts(result);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  if (!posts.length) return <div>Loading...</div>;

  return (
    <div style={{ float: 'left', width: '100%', padding: '0px' }}>
      <center><h2>Post Overview</h2></center>
      <br></br>
      {posts.map((post) => (
        <div key={post._id} className="markdown-content">
          <h3>{post.title}</h3>
          <ReactMarkdown>{post.content.slice(0, 300)}</ReactMarkdown>  {/* Show only the first 100 characters */}
          <Link className="btn btn-secondary btn-sm" to={`/posts/${post._id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default PostOverview;
