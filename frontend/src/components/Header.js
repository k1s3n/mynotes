import React, { useState, useEffect } from 'react';
import '../styles/Header.css';

const Header = () => {
  const [scrollY, setScrollY] = useState(0); // Track scroll position

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerStyle = {
    height: scrollY > 100 ? '300px' : '100vh', // Shrinks to 300px height when scrolling
    transition: 'height 0.5s ease',
  };

  const fontSize = scrollY > 100 ? '2rem' : '4rem';
  const descriptionFontSize = scrollY > 100 ? '1rem' : '1.5rem';
  const textPosition = scrollY > 100 ? '75%' : '50%'; // Change 90% to the desired value

  return (
    <header className="header-background" style={headerStyle}>
      <div className="text-content" style={{ top: textPosition }}>
        <h1 style={{ fontSize }}>#DevOps Journey</h1>
        <p style={{ fontSize: descriptionFontSize }}>
        Navigating the Future of Automation and Innovation
        </p>
      </div>
    </header>
  );
};

export default Header;
