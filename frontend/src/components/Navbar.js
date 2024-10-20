import React, { useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'; // Import brand icons
import { faNavicon, faSignOutAlt, faSigning, faSignIn, faUserLock, faAdd , faUser} from '@fortawesome/free-solid-svg-icons';

// Import Bootstrap JavaScript and Offcanvas component
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../styles/OffCanvasStyles.css'; // Import custom CSS for off-canvas styling

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const offCanvasRef = useRef(null); // Create a ref for the off-canvas
  const navigate = useNavigate(); // Get the navigate function from React Router

  useEffect(() => {
    // Cleanup function to remove backdrop and reset scroll-lock
    const cleanUpBackdrop = () => {
      const backdrop = document.querySelector('.offcanvas-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
      document.body.classList.remove('offcanvas-open');
      document.body.style.overflow = ''; // Reset overflow if manually set
    };

    // Event listener to clean up the backdrop when off-canvas is hidden
    const offcanvasElement = offCanvasRef.current;
    if (offcanvasElement) {
      offcanvasElement.addEventListener('hidden.bs.offcanvas', cleanUpBackdrop);

      // Cleanup event listener when the component unmounts
      return () => {
        offcanvasElement.removeEventListener('hidden.bs.offcanvas', cleanUpBackdrop);
      };
    }
  }, []);

  // Function to handle link clicks and navigate
  const handleLinkClick = (path, event) => {
    event.preventDefault(); // Prevent default link behavior to avoid reloading

    const offcanvasElement = offCanvasRef.current;

    // Listen for when the off-canvas is completely hidden and perform navigation
    const onHiddenHandler = () => {
      // Perform navigation after off-canvas is hidden
      navigate(path);

      // Clean up any remaining event listeners
      offcanvasElement.removeEventListener('hidden.bs.offcanvas', onHiddenHandler);
    };

    // Add a one-time event listener for hidden event
    offcanvasElement.addEventListener('hidden.bs.offcanvas', onHiddenHandler, { once: true });

    // Close the off-canvas menu using Bootstrap's built-in dismiss
    const closeButton = offcanvasElement.querySelector('[data-bs-dismiss="offcanvas"]');
    if (closeButton) {
      closeButton.click(); // Trigger the close button programmatically
    }
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">My DevOps Journey</Link>

          {/* Off-canvas toggle button for all screens */}
          <button 
            className="btn btn-light btn-lg d-lg-block" 
            type="button" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvasRight" 
            aria-controls="offcanvasRight"
          >
            {user ? (
              
              <FontAwesomeIcon icon={faUser} />
              ): (
            
              <FontAwesomeIcon icon={faNavicon} />
            
              )}
          </button>
        </div>
      </nav>

      {/* Off-canvas menu for all screens */}
      <div 
        className="offcanvas offcanvas-end custom-offcanvas small" 
        tabIndex="-1" 
        id="offcanvasRight" 
        aria-labelledby="offcanvasRightLabel"
        ref={offCanvasRef}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">Menu</h5>
          
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body small">
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <button className="nav-link btn btn-light w-100" onClick={(e) => handleLinkClick('/create', e)}><FontAwesomeIcon icon={faSigning} /> Create Post</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-light w-100" onClick={(e) => handleLinkClick('/posts/private', e)}><FontAwesomeIcon icon={faUserLock} /> Private Post</button>
                </li>
                <li><hr className="nav-divider" /></li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-danger btn-sm w-100"
                    onClick={(e) => {
                      logout();
                      handleLinkClick('/', e); // Redirect to home after logout
                    }}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} /> Sign out
                  </button>
                </li>
              </>
            ) : (
              <>
            
                <li className="nav-item">
                  <button className="nav-link btn btn-light w-100" onClick={(e) => handleLinkClick('/register', e)}><FontAwesomeIcon icon={faAdd} /> Register</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-light w-100" onClick={(e) => handleLinkClick('/login', e)}><FontAwesomeIcon icon={faSignIn} /> Login</button>
                </li>
              </>
            )}
            <li><hr className="nav-divider" /></li>
            <li className="nav-item">
              <a className="nav-link btn btn-light w-100" href="https://github.com/k1s3n/" target='_blank' rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} /> GitHub
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link btn btn-light w-100" href="https://www.linkedin.com/in/christoffer-rehnmark-15a6b5223/" target='_blank' rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
