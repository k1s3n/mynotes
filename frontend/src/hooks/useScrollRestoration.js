import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollRestoration = () => {
  const location = useLocation();

  useEffect(() => {
    // Check for saved scroll position in localStorage
    const scrollPosition = localStorage.getItem('scrollPosition');

    // Restore scroll position after a small delay to allow layout calculation
    if (scrollPosition && location.pathname === '/') {
      setTimeout(() => {
        window.scrollTo(0, parseInt(scrollPosition, 10));
      }, 50);  // Delay of 50ms to allow layout to adjust
    }

    // Save scroll position when the user scrolls
    const saveScrollPosition = () => {
      localStorage.setItem('scrollPosition', window.scrollY);
    };

    window.addEventListener('scroll', saveScrollPosition);

    return () => {
      window.removeEventListener('scroll', saveScrollPosition);
    };
  }, [location]);  // Dependency on location to detect route changes
};

export default useScrollRestoration;
