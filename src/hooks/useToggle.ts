import { useState, useEffect } from 'react';
import { InitialValueType, OptionalLocalStorageKey } from '../interfaces/const';

// Custom hook named useToggle, which takes an optional initialValue or defaults to false
const useToggle = <T>(
  initialValue: InitialValueType<T> = false as InitialValueType<T>, // if not specified, default value is false
  localStorageKey: OptionalLocalStorageKey = '' // if specified localStorageKey, the value will be stored in localStorage
) => {

  // function to get initial value from localStorage if available
  const getInitialValue = (): T => {
    if (localStorageKey) {
      const storedValue = localStorage.getItem(localStorageKey);
      if (storedValue !== null) {
        return JSON.parse(storedValue);
      }
    }
    return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
  };

  const [value, setValue] = useState<T>(getInitialValue);

  // function to toggle the value
  const toggle = () => {
    setValue(prevValue => {
      const newValue = !prevValue; // Toggle the boolean value
      if (localStorageKey) {
        localStorage.setItem(localStorageKey, JSON.stringify(newValue)); // Update localStorage if key is provided
      }
      return newValue as T; // Cast newValue to type T explicitly
    });
  };

  // function to set the value to a specific state
  const setValueTo = (newValue: T) => {
    setValue(newValue); // Update the state with the new value
    if (localStorageKey) {
      localStorage.setItem(localStorageKey, JSON.stringify(newValue)); // Update localStorage if key is provided
    }
  };

  // function to check if the value is in a specific state
  const isValue = (expectedValue: T) => {
    return value === expectedValue; // Check if current value matches the expected value
  };

  // useEffect to update localStorage when localStorageKey or initialValue change
  useEffect(() => {
    if (localStorageKey) {
      const storedValue = localStorage.getItem(localStorageKey);
      if (storedValue !== null) {
        setValue(JSON.parse(storedValue)); // Update state with value from localStorage
      } else {
        localStorage.setItem(localStorageKey, JSON.stringify(initialValue)); // Set initial value in localStorage
      }
    }
  }, [localStorageKey, initialValue]);

  // returning an object containing the current value, toggle function, setValueTo function and isValue function
  return {
    value,
    toggle,
    setValueTo,
    isValue
  };
};

export default useToggle;
