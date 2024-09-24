import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/api';  // Säkerställ att du har en korrekt API-funktion för att hämta inlägg

const PostList = () => {
  const [posts, setPosts] = useState([]);  // Använd state för att hantera inläggen
  const [loading, setLoading] = useState(true);  // Lägg till en loading-indikator

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await getPosts();  // Hämta inlägg från backend
        setPosts(result);
        setLoading(false);  // Sätt loading till false när datan har laddats
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setLoading(false);
      }
    };
    fetchPosts();  // Kör när komponenten mountas
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;  // Visa en loading-indikator medan inläggen laddas
  }

  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts available</p>  // Visa ett meddelande om det inte finns några inlägg
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <Link to={`/posts/${post._id}`}>{post.title}</Link>  {/* Länk till det enskilda inlägget */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
