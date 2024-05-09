import { useState, useEffect } from 'react';

// custom hook to sort an array of objects by a property
const useSortObjByProperty = (arr, property, order = 'asc' | false) => {
  const [sortedArray, setSortedArray] = useState([]);

  useEffect(() => {
    const sorted = [...arr].sort((a, b) => {
      if (order === 'asc' || order === true) {
        return a[property] > b[property] ? 1 : -1;
      } else if (order === 'desc' || order === false) {
        return a[property] < b[property] ? 1 : -1;
      }
      return 0; // will not sort if order is not 'asc' or 'desc'
    });
    setSortedArray(prevSortedArray => {
      if (JSON.stringify(prevSortedArray) !== JSON.stringify(sorted)) {
        return sorted;
      }
      return prevSortedArray;
    });
  }, [arr, property, order]);

  return sortedArray;
};

export default useSortObjByProperty;
