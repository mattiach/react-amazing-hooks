import { useState, useEffect } from 'react';

// custom hook named useToggle, which takes an optional initialValue or defaults to false
const useToggle = (
  initialValue = false, // if not specified, default value is false
  localStorageKey = '' // if specified localStorageKey, the value will be stored in localStorage
) => {

  // function to get initial value from localStorage if available
  const getInitialValue = () => {
    if (localStorageKey) {
      const storedValue = localStorage.getItem(localStorageKey);
      if (storedValue !== null) {
        return JSON.parse(storedValue);
      }
    }
    return initialValue;
  };

  const [value, setValue] = useState(getInitialValue);

  // function to toggle the value
  const toggle = () => {
    setValue(prevValue => {
      const newValue = !prevValue;
      if (localStorageKey) {
        localStorage.setItem(localStorageKey, JSON.stringify(newValue));
      }
      return newValue;
    });
  };

  // function to set the value to a specific state
  const setValueTo = (newValue) => {
    setValue(newValue);
    if (localStorageKey) {
      localStorage.setItem(localStorageKey, JSON.stringify(newValue));
    }
  };

  // function to reset the value to the initial value
  const reset = () => {
    setValue(initialValue);
    if (localStorageKey) {
      localStorage.setItem(localStorageKey, JSON.stringify(initialValue));
    }
  };

  // function to check if the value is in a specific state
  const isValue = (expectedValue) => {
    return value === expectedValue;
  };

  // useEffect to update localStorage when localStorageKey or initialValue change
  useEffect(() => {
    if (localStorageKey) {
      const storedValue = localStorage.getItem(localStorageKey);
      if (storedValue !== null) {
        setValue(JSON.parse(storedValue));
      } else {
        localStorage.setItem(localStorageKey, JSON.stringify(initialValue));
      }
    }
  }, [localStorageKey, initialValue]);

  // returning an object containing the current value, toggle function, setValueTo function, reset function, and isValue function
  return {
    value,
    toggle,
    setValueTo,
    reset,
    isValue
  };
};

export default useToggle;
