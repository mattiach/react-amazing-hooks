import { useState, useEffect } from 'react';
import { ScrollPosition } from '../interfaces/const';

// Custom hook to track window scroll position
const useWindowScroll = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
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
      x: Math.floor(scrollX),
      y: Math.floor(scrollY),
      percentageX: parseFloat(percentageX.toFixed(2)),
      percentageY: parseFloat(percentageY.toFixed(2)),
    });
  };

  // add scroll event listener on mount, remove on unmount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
};

export default useWindowScroll;
