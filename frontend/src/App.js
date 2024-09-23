import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Post from './components/Post';
import CreatePost from './components/CreatePost';
import { AuthProvider } from './AuthContext';  // Importera AuthProvider

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/create" element={<CreatePost />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
