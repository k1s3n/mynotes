import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Post from './components/Post';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import { AuthProvider } from './AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import PostList from './components/PostList';
import UsersAdmin from './components/UsersAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  
  return (
    <AuthProvider>
      <Router> {/* Wrap everything inside the Router */}
        <Header />
        <Navbar />
        <div className="container-fluid mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/posts/postlist" element={<PostList />} />
            <Route Path="/admin" element={<UsersAdmin />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}


export default App;
