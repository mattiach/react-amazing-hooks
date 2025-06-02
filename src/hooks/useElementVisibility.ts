import { useState, useEffect, type RefObject } from 'react';

// custom hook to manage the visibility state of a specific element
const useElementVisibility = <T extends Element>(
  ref: RefObject<T | null>,
  threshold: number = 0
) => {
  const [isVisible, setIsVisible] = useState(false); // current visibility state of the element

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return; // exit early if there is no current re

    // create an IntersectionObserver instance
    const observer = new IntersectionObserver(
      ([entry]) => {
        // update visibility state based on intersection status
        setIsVisible(entry.isIntersecting);
      },
      { threshold } // set the threshold for intersection
    );

    // start observing the target element
    if (currentRef) {
      observer.observe(currentRef);
    }

    // cleanup function to stop observing when component unmounts or ref changes
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, threshold]);

  return isVisible;
}

export default useElementVisibility;
