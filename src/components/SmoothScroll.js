import React, { useEffect } from 'react';

// This component can be added to your main App component
const SmoothScroll = () => {
  useEffect(() => {
    // Handle scroll button in Home component
    const handleSmoothScroll = () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        // This ensures the scroll is perfectly aligned to the About section
        window.scrollTo({
          top: window.innerHeight, // Exactly one viewport height
          behavior: 'smooth'
        });
      }
    };

    // Add this event listener to your scroll button
    const scrollButton = document.querySelector('#home button');
    if (scrollButton) {
      scrollButton.addEventListener('click', handleSmoothScroll);
    }

    return () => {
      if (scrollButton) {
        scrollButton.removeEventListener('click', handleSmoothScroll);
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default SmoothScroll;