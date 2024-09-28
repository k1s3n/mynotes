import React, { useEffect, useState } from 'react';
import { getPosts } from '../services/api';
import { Link } from 'react-router-dom';
import { convertMarkdownToHtml } from '../utils/markdownUtils';  // Import the utility
import '../styles/markdownStyle.css';

const PostOverview = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await getPosts();
        // Sort posts by latest
        const sortedPosts = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  if (!posts.length) return <div>Loading...</div>;


  return (
    <div>
      {posts.map((post) => {
        const localDate = new Date(post.createdAt).toLocaleString(); // Locale-aware date and time
        // Trim content to 400 characters with "..."
        const trimmedContent = post.content.length > 400
          ? `${post.content.slice(0, 500)}...`
          : post.content;

        return (
          <div key={post._id} className="markdown-content">
            <h3 className='text-primary'>{post.title}</h3>
            <div className='post-header'>
            <span className='text-muted'>Created at: {localDate}</span>        {/* Local date on the right */}
            <span className='text-muted'>Posted by: {post.user?.name}</span>  {/* User's name on the left */}
          </div>
            {/* Render trimmed and sanitized HTML */}
            <div dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(trimmedContent) }} />

            <Link style={{ marginBottom: '20px' }} className="btn btn-secondary btn-sm" to={`/posts/${post._id}`}>
              Read More
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default PostOverview;
