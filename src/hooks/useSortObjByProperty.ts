/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { OrderType } from '../interfaces/const';

interface ObjectType {
  [key: string]: any;
}

// Sort an array of objects by a property with optional ascending or descending order.
const useSortObjByProperty = (arr: ObjectType[], property: string, order: OrderType = 'asc') => {
  const [sortedArray, setSortedArray] = useState<ObjectType[]>([]);

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
