import React, { useEffect, useState } from 'react';
import { getPosts } from '../services/api';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';  // Import react-markdown to render Markdown
import '../styles/markdownStyle.css';

const PostOverview = (user) => {
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
    <div>
      {posts.map((post) => (
        <div key={post._id} className="markdown-content">
          <h3>{post.title}</h3>
          <ReactMarkdown>
          {post.content.length > 400 
            ? `${post.content.slice(0, 400)}...` 
            : post.content}
          </ReactMarkdown>

          <Link style={{marginBottom: '20px'}} className="btn btn-secondary btn-sm" to={`/posts/${post._id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default PostOverview;
