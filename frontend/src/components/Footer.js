import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';  // Import brand icons
import '../styles/Footer.css';  // Import custom CSS for footer

const Footer = () => {
  return (
    <footer style={{ marginTop: '50px' }}  className="footer bg-light text-center text-lg-start">
      <div className="container p-4">
        {/* Links section */}
        <section className="mb-4">
          <a className="btn btn-outline-dark btn-floating m-1" href="https://github.com/k1s3n/" target='_blank' role="button">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a className="btn btn-outline-dark btn-floating m-1" href="https://www.linkedin.com" target='_blank' role="button">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </section>


        {/* Copyright section */}
        <div className="text-center p-3">
          © 2024 My DevOps Journey | 
          <a className="text-dark" href="https://christoffer.rehnmark.se/"> Christoffer.Rehnmark.se</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
