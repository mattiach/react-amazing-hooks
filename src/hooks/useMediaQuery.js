// hooks/useMediaQuery.js
import { useState, useEffect } from 'react';

// custom hook to check media query. Can be used to conditionally render components based on screen size, or to apply different styles based on screen size
const useMediaQuery = (queryObj) => {
  const { query, min, max } = queryObj;
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    let mediaQuery;

    switch (true) {
      case (min !== undefined && max !== undefined): // if you include both min and max, it will be a range between this values and will ignore 'query' parameter
        mediaQuery = `(min-width: ${min}px) and (max-width: ${max}px)`;
        break;
      case (query !== undefined): // the most common use case, just a single value
        mediaQuery = `(max-width: ${query}px)`;
        break;
      case (min !== undefined): // if you include only min, it will be a range from this value and up
        mediaQuery = `(min-width: ${min}px)`;
        break;
      case (max !== undefined): // if you include only max, it will be a range up to this value
        mediaQuery = `(max-width: ${max}px)`;
        break;
      default:
        throw new Error('Invalid media query parameters.');
    }

    const handleChange = (event) => {
      setMatches(event.matches);
    };

    const mqList = window.matchMedia(mediaQuery);
    handleChange(mqList); // check initial match
    mqList.addEventListener('change', handleChange);

    return () => {
      mqList.removeEventListener('change', handleChange);
    };
  }, [query, min, max]);

  return matches;
}

export default useMediaQuery;
