import React from 'react';
import '../styles/Header.css';  // Import custom CSS Styled it


const Header = () => {
  return (
    <div>
      {/* Header image */}
      <div className="header-image">
        <img
          //src='../styles/d.webp'
          src="https://www.portainer.io/hubfs/Best%20CICD%20Concepts%20for%20DevOps%201600x900.png" 
          alt="DevOps CI/CD Concepts"
        />
      </div>
    </div>
  );
};

export default Header;
