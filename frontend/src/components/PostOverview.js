import React, { useEffect, useState, useRef, useCallback, useContext } from 'react';
import { getPosts, deletePost } from '../services/api';
import { convertMarkdownToHtml } from '../utils/markdownUtils';  // Import the utility
import '../styles/markdownStyle.css';
import AuthContext from '../AuthContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';  // Import the trash icon


const PostOverview = () => {
  const [posts, setPosts] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({});  // Track which posts are expanded
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null); // Keep track of the selected hashtag
  const postContentRefs = useRef([]);  // Ref to store post content elements
  const contentLengthLimit = 600; // Content limit, change this value as needed
  const { user } = useContext(AuthContext);
  const [deleteMessage, setDeleteMessage] = useState('');

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

  const handleHashtagClick = useCallback((tag) => {
    setSelectedTag(tag); // Set the selected hashtag
    const filtered = posts.filter((post) => post.content.includes(`#${tag}`));
    setFilteredPosts(filtered); // Update filtered posts based on the hashtag
  }, [posts]);

  useEffect(() => {
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
  }, [filteredPosts, handleHashtagClick]);

  const processHashtagsInHTML = (htmlContent) => {
    const hashtagRegex = /#(\w+)/g;
    return htmlContent.replace(hashtagRegex, (match, tag) => {
      return `<a href="#" class="btn btn-outline-secondary btn-sm btn-weight-bold" data-hashtag="${tag}">${match}</a>`;
    });
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId);
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
        setDeleteMessage('Post has been deleted successfully!');
        setTimeout(() => window.location.reload(), 2000);
      } catch (error) {
        console.error('Failed to delete the post:', error);
      }
    }
  };

  // Function to trim content and check if "Read More" should be shown
  const getTrimmedContent = (content, isExpanded) => {
    if (!isExpanded && content.length > contentLengthLimit) {
      return {
        trimmedContent: `${content.slice(0, contentLengthLimit)}...`,
        isTrimmed: true,
      };
    }
    return {
      trimmedContent: content,
      isTrimmed: false,
    };
  };

  const toggleExpanded = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],  // Toggle the expanded state for this post
    }));
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
      {deleteMessage && <div className="alert alert-success mt-3">{deleteMessage}</div>}
      {filteredPosts.map((post, index) => {
        const localDate = new Date(post.createdAt).toLocaleString(); // Locale-aware date and time
        const isExpanded = expandedPosts[post._id];  // Check if this post is expanded
        const canEditOrDelete = user && (user.isAdmin || user._id === post.user);
        
        // Get trimmed content and check if it was trimmed
        const { trimmedContent, isTrimmed } = getTrimmedContent(post.content, isExpanded);

        // Convert markdown to HTML
        let htmlContent = convertMarkdownToHtml(trimmedContent);
        htmlContent = processHashtagsInHTML(htmlContent);

        return (
          <div key={post._id} className="markdown-content">
            <div className='border rounded-5 p-3 mb-3 shadow'>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className='text-primary m-0'>{post.title}</h3>  {/* Added 'm-0' to remove margin */}
              {canEditOrDelete && (
              
                <span>
                  <Link to={`/edit/${post._id}`} className="btn btn-outline-primary btn-sm"><FontAwesomeIcon icon={faEdit}/></Link>

                  <button
                    onClick={() => handleDelete(post._id)}  // Pass the post ID here
                    className="btn btn-outline-danger btn-sm ms-2 float-end"
                  >
                    <FontAwesomeIcon icon={faTrashAlt}/>
                  </button>
                  </span>
                
              )}
            </div>
              <div className='post-header'>
                <span className='text-muted'>Created at: {localDate}</span>
              </div>

              {/* Render the markdown content with HTML and process hashtags later */}
              <div
                ref={(el) => (postContentRefs.current[index] = el)}  // Attach ref to each content div
                dangerouslySetInnerHTML={{ __html: htmlContent }}  // Inject the converted HTML
              />
              
              <div className='clearfix'></div>

              {/* Toggle between 'Read More' and 'Show Less' */}
              {isTrimmed || isExpanded ? (
                <div>
                <button
                  className="btn btn-secondary btn-sm read-more rounded-4"
                  style={{ marginTop: '10px' }}
                  onClick={() => toggleExpanded(post._id)}
                >
                  {isExpanded ? 'Show Less' : 'Read More'}
                </button>
               
                </div>
              ) : null}
             
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostOverview;
