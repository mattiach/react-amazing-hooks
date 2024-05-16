import { useState, useEffect } from 'react';

// // custom hook to detect if an element is hovered. It accepts a string ('id' or 'class') or a 'ref'.
// options object can be used to extend the hook with custom delay and callback functions
const useHover = (target, options = {}) => {
  // boolean state to keep track of the hover state
  const [isHovered, setIsHovered] = useState(false);

  // options object with default values
  const {
    delay = 0, // delay in milliseconds before hover is considered active
    onHoverStart = () => { }, // callback function when hover starts
    onHoverEnd = () => { } // callback function when hover ends
  } = options;

  // handlers for mouse enter and leave events
  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setIsHovered(true);
      onHoverStart();
    }, delay);

    return () => clearTimeout(timeout);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverEnd();
  };

  useEffect(() => {
    let targetElement;

    // determine target element based on input type
    if (typeof target === 'string') {
      if (target.startsWith('#')) {
        targetElement = document.getElementById(target.slice(1));
      } else if (target.startsWith('.')) {
        targetElement = document.getElementsByClassName(target.slice(1))[0];
      }
    } else if (target.current) {
      targetElement = target.current;
    }

    // add event listeners to target element
    if (targetElement) {
      targetElement.addEventListener('mouseenter', handleMouseEnter);
      targetElement.addEventListener('mouseleave', handleMouseLeave);

      // clean up event listeners on unmount
      return () => {
        targetElement.removeEventListener('mouseenter', handleMouseEnter);
        targetElement.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, delay, onHoverStart, onHoverEnd]);

  return isHovered; // return the boolean state
};

export default useHover;
