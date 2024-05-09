import { useState } from 'react';

// custom hook to manage an array of items with various functions
const useArray = (initial) => {
  const [value, setValue] = useState(initial);

  // function to add an element to the array
  const add = (item) => {
    setValue((prevValue) => [...prevValue, item]);
  };

  // function to clear the array
  const clear = () => {
    setValue([]);
  };

  // function to remove an element from the array by id
  const removeById = (id) => {
    setValue((prevValue) =>
      prevValue.filter((item) => item && item.id !== id)
    );
  };

  // function to remove an element from the array by index
  const removeIndex = (index) => {
    setValue((prevValue) =>
      prevValue.filter((item, i) => i !== index)
    );
  };

  // function to replace an element in the array at a specific index
  const replaceAtIndex = (index, newItem) => {
    setValue((prevValue) => {
      const newArray = [...prevValue];
      if (index >= 0 && index < newArray.length) {
        newArray.splice(index, 1, newItem);
      }
      return newArray;
    });
  };

  // function to replate an element in the array at specific id
  const replaceById = (id, newItem) => {
    setValue((prevValue) => {
      const newArray = [...prevValue];
      const index = newArray.findIndex((item) => item.id === id);
      if (index >= 0) {
        newArray.splice(index, 1, newItem);
      }
      return newArray;
    });
  }

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
      return newArray.sort();
    });
  };

  // functio nto sort the array in descending order
  const descendingSort = () => {
    setValue((prevValue) => {
      const newArray = [...prevValue];
      return newArray.sort().reverse();
    });
  };

  return {
    add,
    clear,  
    removeById,
    removeIndex,
    replaceAtIndex,
    replaceById,
    shuffle,
    ascendingSort,
    descendingSort,
    value: value
  };
};

export default useArray;
