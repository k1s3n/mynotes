import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/api';  // API-anrop för att hämta alla inlägg
import { capitalizeTitle } from '../utils/utils';

const PostList = () => {
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
      <ul className='nav nav-tabs'>
      <li class="nav-item">
      <a class="nav-link active" aria-current="page" href="/">All posts</a>
      </li>
        {posts.map((post) => {
          const capitalizedTitle = capitalizeTitle(post.title);  // Använd capitalizeTitle
          return (
            <li className='nav-item' key={post._id}>
              <Link to={`/posts/${post._id}`} className="nav-link">
                {capitalizedTitle}
              </Link> 
                {/* Visa datumet */}     
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PostList;
