import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from '../components/PostList';  // Import PostList
import PostOverview from '../components/PostOverview';  // Import PostOverview
import Post from '../components/Post';  // Import Post component for individual post view

const App = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px' }}>
        {/* PostOverview on the left */}
        <PostOverview />

        {/* PostList on the right */}
        <PostList />
      </div>
  );
};

export default App;
