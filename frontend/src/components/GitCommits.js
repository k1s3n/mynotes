import React, { useEffect, useState } from 'react';

const GitCommits = () => {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/k1s3n/mynotes/commits');
        const data = await response.json();
        setCommits(data.slice(0, 10)); // Fetch the latest 5 commits
      } catch (error) {
        console.error('Error fetching commits:', error);
      }
    };

    fetchCommits();
  }, []);

  return (
    <div>
      <h5 style={{ textAlign: 'center' }} className="text-dark">10 Latest Commits:</h5>
      <ul>
        {commits.map((commit) => (
          <li key={commit.sha}>
            <div className='text-dark'>
            <strong>{commit.commit.message}</strong> on {new Date(commit.commit.author.date).toLocaleDateString()}
            </div>
          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default GitCommits;
