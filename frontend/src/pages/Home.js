import React from 'react';
import PostList from '../components/PostList';  // Import PostList
import PostOverview from '../components/PostOverview';  // Import PostOverview
import '../styles/Home.css';

const App = () => {
  return (
    
    <div className="app-container">
      <div></div>
        {/* PostOverview on the left */}
        <PostOverview />

        {/* PostList on the right */}
        <PostList />
        </div>
  );
};

export default App;
