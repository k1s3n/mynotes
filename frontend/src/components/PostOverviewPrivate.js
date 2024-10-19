import React, { useEffect, useState, useRef, useCallback, useContext } from 'react';
import { getPosts } from '../services/api';
import { convertMarkdownToHtml } from '../utils/markdownUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faCancel } from '@fortawesome/free-solid-svg-icons';
import { getTrimmedContent, processHashtagsInHTML, handleDelete } from '../utils/postUtils';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import CreatePost from './CreatePost';
import AuthContext from '../AuthContext';
import '../styles/markdownStyle.css';
import '../styles/custom-bootstrap.scss';
import '../styles/Home.css';

const PostOverviewPrivate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const postContentRefs = useRef([]);
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedTagMessage, setSelectedTagMessage] = useState('');  // New state for hashtag message
  const [message, setMessage] = useState(location.state?.message || '');
  const contentLengthLimit = 600;

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      setTimeout(() => setMessage(''), 2000);
    }
  }, [location.state]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');  // Skicka icke-inloggad användare till startsidan
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await getPosts();
        const sortedPosts = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // Filter only posts where the logged-in user is the owner
        const userPosts = sortedPosts.filter(post => post.user?._id === user._id && post.private === true);
        setPosts(userPosts);
        setFilteredPosts(userPosts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    if (user) { // Ensure the user is logged in before fetching posts
      fetchPosts();
    }
  }, [user]);
  

  const handleHashtagClick = useCallback((tag) => {
    setSelectedTagMessage(`Showing posts tagged with #${tag}`);
    setSelectedTag(tag);
    const filtered = posts.filter((post) => post.content.includes(`#${tag}`));
    setFilteredPosts(filtered);
  }, [posts]);

  useEffect(() => {
    postContentRefs.current.forEach((contentElement, index) => {
      if (contentElement) {
        const hashtags = contentElement.querySelectorAll('a[data-hashtag]');
        hashtags.forEach((hashtag) => {
          const tag = hashtag.getAttribute('data-hashtag');
          hashtag.style.cursor = 'pointer';
          hashtag.addEventListener('click', (e) => {
            e.preventDefault();
            handleHashtagClick(tag);
          });
        });
      }
    });
  }, [filteredPosts, handleHashtagClick]);

  const toggleExpanded = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handlePostDelete = async (postId) => {
    await handleDelete(postId, setPosts, setMessage, navigate);

    // Update filteredPosts after deletion
    setFilteredPosts((prevFilteredPosts) =>
      prevFilteredPosts.filter((post) => post._id !== postId)
    );
  };

  if (!filteredPosts.length) return <div>No posts found...</div>;

  return (
    <div className='app-container'>
      <div></div>
      <div>
        {selectedTag && (
          <div className='sticky-element'>
            <div className="alert alert-info">
              {selectedTagMessage}  
              <button className='btn btn-danger btn-sm float-end' onClick={() => { 
                setFilteredPosts(posts); 
                setSelectedTag(null); 
                setSelectedTagMessage('');  
              }}>
                <FontAwesomeIcon icon={faCancel} />
              </button>
            </div>
          </div>
        )}

        {message && <div className="alert alert-success mt-3">{message}</div>}

        {filteredPosts.map((post, index) => {
          const localDate = new Date(post.createdAt).toLocaleString();
          const isExpanded = expandedPosts[post._id];
          const canEditOrDelete = user && (user.isAdmin || user._id === post.user?._id);
          const { trimmedContent, isTrimmed } = getTrimmedContent(post.content, contentLengthLimit, isExpanded);
          let htmlContent = convertMarkdownToHtml(trimmedContent);
          htmlContent = processHashtagsInHTML(htmlContent);
          
          return (

            <div key={post._id} className="markdown-content">
              <div className='border rounded-5 p-3 mb-3 shadow'>
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className='text-primary m-2'>{post.title}</h3>
                  {canEditOrDelete && (
                    <span>
                      <button
                        onClick={() => handlePostDelete(post._id)}  // Call handlePostDelete instead of handleDelete
                        className="btn btn-outline-danger btn-sm ms-2 float-end"
                      >
                        <FontAwesomeIcon icon={faTrashAlt}/>
                      </button>
                      <Link to={`/edit/${post._id}`} className="btn btn-outline-primary btn-sm float-end ms-1">
                        <FontAwesomeIcon icon={faEdit}/>
                      </Link>
                    </span>
                  )}
                </div>
                <div className='post-header'>
                  <span className='text-muted'>Created at: {localDate}</span>
                </div>

                <div
                  ref={(el) => (postContentRefs.current[index] = el)}
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
                
                <div className='clearfix'></div>

                {isTrimmed || isExpanded ? (
                  <div>
                    <button
                      className="btn btn-primary btn-sm rounded-2"
                      style={{margin: '10px' }}
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
      <div></div>
    </div>
  );
};

export default PostOverviewPrivate;
