import React, { useState, useEffect } from 'react';
import PostList from '../components/PostList';
import PostOverview from '../components/PostOverview';
import useScrollRestoration from '../hooks/useScrollRestoration';  // Custom scroll restoration hook
import GitCommits from '../components/GitCommits';
import { Link } from 'react-router-dom';  // Import Link for navigation
import { getPosts } from '../services/api';
import UsersAdmin from '../components/UsersAdmin';
import '../styles/Home.css';


const Home = () => {
  useScrollRestoration();  // Call the hook to manage scroll position
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'allPosts');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);


  useEffect(() => {

    const fetchPosts = async () => {
      try {
        const result = await getPosts();
        const sortedPosts = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
        setFilteredPosts(sortedPosts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Save the active tab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);


  return (
    <div className="app-container">
      <div>
        <UsersAdmin />
      </div>

      {/* PostOverview on the left */}
      <PostOverview />

      {/* PostList on the right */}
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link
              className={`nav-link ${activeTab === 'allPosts' ? 'active' : ''}`}
              onClick={() => setActiveTab('allPosts')}
            >
              All Posts
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${activeTab === 'top5' ? 'active' : ''}`}
              onClick={() => setActiveTab('top5')}
            >
              Git Commits
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${activeTab === 'latestPost' ? 'active' : ''}`}
              onClick={() => setActiveTab('latestPost')}
            >
              Latest Post
            </Link>
          </li>
        </ul>

        <div className="nav nav-tabs mt-2">
          {activeTab === 'allPosts' && <PostList posts={filteredPosts} />}
          {activeTab === 'top5' && <GitCommits />}
          {activeTab === 'latestPost' && ""}
        </div>
      </div>
    </div>
  );
};

export default Home;
