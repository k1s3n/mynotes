import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';  // Import brand icons

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">My DevOps Journey</Link>
        {/* Toggler button for small screens */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Collapsible part of the navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <a className="btn btn-outline-dark btn-floating m-1" href="https://github.com/k1s3n/" target='_blank' rel="noreferrer" role="button">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a className="btn btn-outline-dark btn-floating m-1" href="https://www.linkedin.com/in/christoffer-rehnmark-15a6b5223/" target='_blank' rel="noreferrer" role="button">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <ul className="navbar-nav ms-auto">
            {user && (
              <>
              <li className="nav-item">
              <Link className="nav-link" to="/create">Create Post</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/posts/private">Private Post</Link>
            </li>
            </>
            )}
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-success mt-1 btn-sm" to="/login">Login</Link>
                </li>
              </>
            ) : (
              <Link className="nav-item">
                <button
                  className="btn btn-danger mt-1 btn-sm"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </button>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
