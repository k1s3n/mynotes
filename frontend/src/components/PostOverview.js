import React, { useEffect, useState, useRef, useCallback } from 'react';
import { getPosts } from '../services/api';
import { Link } from 'react-router-dom';
import { convertMarkdownToHtml } from '../utils/markdownUtils';  // Import the utility
import '../styles/markdownStyle.css';

const PostOverview = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null); // Keep track of the selected hashtag
  const postContentRefs = useRef([]);  // Ref to store post content elements

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await getPosts();
        // Sort posts by latest
        const sortedPosts = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
        setFilteredPosts(sortedPosts); // Initially show all posts
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // UseCallback to memoize handleHashtagClick to avoid re-renders
  const handleHashtagClick = useCallback((tag) => {
    setSelectedTag(tag); // Set the selected hashtag
    const filtered = posts.filter((post) => post.content.includes(`#${tag}`));
    setFilteredPosts(filtered); // Update filtered posts based on the hashtag
  }, [posts]);  // Depend on 'posts' because it is used in filtering

  useEffect(() => {
    // Process hashtags after the content is rendered
    postContentRefs.current.forEach((contentElement, index) => {
      if (contentElement) {
        const hashtags = contentElement.querySelectorAll('a[data-hashtag]');  // Find hashtags in content
        hashtags.forEach((hashtag) => {
          const tag = hashtag.getAttribute('data-hashtag'); // Get the actual tag from data attribute
          hashtag.style.cursor = 'pointer';  // Make it look clickable
          hashtag.addEventListener('click', (e) => {
            e.preventDefault();
            handleHashtagClick(tag);  // Call the handler to filter posts by hashtag
          });
        });
      }
    });
  }, [filteredPosts, handleHashtagClick]);  // Include handleHashtagClick in dependencies

  // Function to process hashtags inside the markdown HTML
  const processHashtagsInHTML = (htmlContent) => {
    // Replace hashtags with clickable <a> tags
    const hashtagRegex = /#(\w+)/g;
    return htmlContent.replace(hashtagRegex, (match, tag) => {
      return `<a href="#" class="hashtag-button" data-hashtag="${tag}">${match}</a>`;
    });
  };

  if (!filteredPosts.length) return <div>No posts found...</div>;

  return (
    <div>
      {selectedTag && (
        <div className="alert alert-info">
          Showing posts tagged with <strong>#{selectedTag}</strong>{' '}
          <button className='btn btn-danger btn-sm float-end' onClick={() => { setFilteredPosts(posts); setSelectedTag(null); }}>Clear Filter</button>
        </div>
      )}

      {filteredPosts.map((post, index) => {
        const localDate = new Date(post.createdAt).toLocaleString(); // Locale-aware date and time
        // Trim content to 400 characters with "..."
        const trimmedContent = post.content.length > 400
          ? `${post.content.slice(0, 400)}...`
          : post.content;

        // Convert markdown to HTML
        let htmlContent = convertMarkdownToHtml(trimmedContent);
        // Process hashtags in the HTML content
        htmlContent = processHashtagsInHTML(htmlContent);

        return (
          <div key={post._id} className="markdown-content">
            <h3 className='text-primary'>{post.title}</h3>
            <div className='post-header'>
              <span className='text-muted'>Created at: {localDate}</span>        {/* Local date */}
              <span className='text-muted'>Posted by: {post.user?.name}</span>  {/* User's name */}
            </div>

            {/* Render the markdown content with HTML and process hashtags later */}
            <div
              ref={(el) => (postContentRefs.current[index] = el)}  // Attach ref to each content div
              dangerouslySetInnerHTML={{ __html: htmlContent }}  // Inject the converted HTML
            />

            <Link style={{ marginBottom: '20px' }} className="btn btn-secondary btn-sm" to={`/posts/${post._id}`}>
              Read More...
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default PostOverview;
