/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import { useState } from 'react';
import type { HasId, UseArrayReturn } from '../interfaces/const';

// custom hook to manage an array of items with various functions
const useArray = <T extends HasId>(initial: T[]): UseArrayReturn<T> => {
  const [value, setValue] = useState<T[]>(initial);

  // function to add an element to the array
  const add = (item: T) => {
    setValue((prevValue) => [...prevValue, item]);
  };

  // function to clear the array
  const clear = () => {
    setValue([]);
  };

  // function to remove an element from the array by id
  const removeById = (id: number) => {
    setValue((prevValue) =>
      prevValue.filter((item) => item && item.id !== id)
    );
  };

  // function to remove an element from the array by index
  const removeIndex = (index: number) => {
    setValue((prevValue) => prevValue.filter((_, i) => i !== index));
  };

  // function to replace an element in the array at a specific index
  const replaceAtIndex = (index: number, newItem: T) => {
    setValue((prevValue) => {
      const newArray = [...prevValue];
      if (index >= 0 && index < newArray.length) {
        newArray.splice(index, 1, newItem);
      }
      return newArray;
    });
  };

  // function to replate an element in the array at specific id
  const replaceById = (id: number, newItem: T) => {
    setValue((prevValue) => {
      const newArray = [...prevValue];
      const index = newArray.findIndex((item) => item && item.id === id);
      if (index >= 0) {
        newArray.splice(index, 1, newItem);
      }
      return newArray;
    });
  };

  // function to shuffle the array in a random order
  const shuffle = () => {
    setValue((prevValue) => {
      const newArray = [...prevValue];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    });
  };

  // function to sort the array in ascending order
  const ascendingSort = () => {
    setValue((prevValue) => {
      const newArray = [...prevValue];
      return newArray.sort((a, b) => (a.id > b.id ? 1 : -1));
    });
  };

  // function to sort the array in descending order
  const descendingSort = () => {
    setValue((prevValue) => {
      const newArray = [...prevValue];
      return newArray.sort((a, b) => (a.id < b.id ? 1 : -1));
    });
  };

  return {
    value,
    add,
    clear,
    removeById,
    removeIndex,
    replaceAtIndex,
    replaceById,
    shuffle,
    ascendingSort,
    descendingSort,
  };
};

export default useArray;
