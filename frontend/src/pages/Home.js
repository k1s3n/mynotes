import React, { useState, useEffect} from 'react';
import PostList from '../components/PostList';  // Import PostList
import PostOverview from '../components/PostOverview';  // Import PostOverview
import '../styles/Home.css';

const App = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'allPosts');

  // Save the active tab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  return (
    
    <div className="app-container">
      <div>
      </div>
        {/* PostOverview on the left */}
        <PostOverview />

        {/* PostList on the right */}
        <div>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a 
                className={`nav-link ${activeTab === 'allPosts' ? 'active' : ''}`} 
                aria-current="page" 
                href="#1" 
                onClick={() => setActiveTab('allPosts')}
              >
                All Posts
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeTab === 'top5' ? 'active' : ''}`} 
                aria-current="page" 
                href="#2" 
                onClick={() => setActiveTab('top5')}
              >
                Top 5
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeTab === 'latestPost' ? 'active' : ''}`} 
                aria-current="page" 
                href="#3" 
                onClick={() => setActiveTab('latestPost')}
              >
                Latest Post
              </a>
            </li>
          </ul>

          <div className="nav nav-tabs mt-2">
            {activeTab === 'allPosts' && <PostList />}
            {activeTab === 'top5' && ""}
            {activeTab === 'latestPost' && ""}
          </div>
        </div>
    </div>
  );
};

export default App;
