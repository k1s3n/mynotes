import React from 'react';
import PostList from '../components/PostList';  // Säkerställ att PostList är korrekt

const Home = () => {
  return (
    <div>
    <h1>Welcome to My Blog</h1>
      <PostList />  {/* Renderar komponenten som listar alla inlägg */}
    </div>
  );
};

export default Home;
