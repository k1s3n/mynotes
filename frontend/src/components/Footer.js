import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNodeJs,faReact,faUbuntu, faDocker,faLinkedin, faGithub} from '@fortawesome/free-brands-svg-icons';  // Import brand icons
import '../styles/Footer.css';  // Import custom CSS for footer

const Footer = () => {
  return (
    <footer style={{ marginTop: '50px' }}  className="footer bg-light text-center text-lg-start">
      <div className="container p-4">
        

        {/* Links section */}
        <section className="mb-4">
          <a className="btn btn-outline-dark btn-floating m-1" href="https://github.com/k1s3n/" target='_blank' rel="noreferrer" role="button">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a className="btn btn-outline-dark btn-floating m-1" href="https://www.linkedin.com" target='_blank' rel="noreferrer" role="button">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </section>


        {/* Copyright section */}
        <div className="text-center p-3">
        <div className='text-dark'>
          <span>Powered by: </span> 
          <span><FontAwesomeIcon icon={faNodeJs} /> </span>
          <span><FontAwesomeIcon icon={faReact} /> </span>
          <span><FontAwesomeIcon icon={faUbuntu} /> </span>
          <span><FontAwesomeIcon icon={faDocker} /> </span>
          <span><FontAwesomeIcon icon={faGithub} /> </span>
          
          </div>
          <br></br>
          © 2024 My DevOps Journey
          <a className="text-dark header-post" href="https://christoffer.rehnmark.se/"> Christoffer.Rehnmark.se</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
