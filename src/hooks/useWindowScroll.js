import { useState, useEffect } from 'react';

// custom hook to track window scroll position
const useWindowScroll = () => {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0,
    percentageX: 0,
    percentageY: 0
  });

  // function to handle scroll event
  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    const percentageY = (scrollY / (documentHeight - windowHeight)) * 100;
    const percentageX = (scrollX / (document.body.scrollWidth - window.innerWidth)) * 100;

    setScrollPosition({
      x: 0 | scrollX,
      y: 0 | scrollY,
      percentageX: 0 | percentageX.toFixed(2),
      percentageY: 0 | percentageY.toFixed(2),
    });
  };

  // window scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
};

export default useWindowScroll;
