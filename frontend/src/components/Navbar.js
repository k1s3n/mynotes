import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../AuthContext';  // Importera AuthContext

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);  // Använd användartillståndet och logout-funktionen

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">My DevOps Journey | </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {user && user.isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/create">Create Post</Link>
              </li>
            )}
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={() => {
                    logout();  // Logga ut användaren
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
