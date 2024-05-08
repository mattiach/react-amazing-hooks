import { useState, useEffect } from "react";

// custom hook to manage state in localStorage or sessionStorage with expiration
const useStorage = (
  key,
  defaultValue,
  storageType = "localStorage",
  expirationDays
) => {
  // determine which storage to use based on storageType
  const storage = storageType === "localStorage" ? localStorage : sessionStorage;

  // initialize state with stored value or default value
  const [storageValue, setStorageValue] = useState(() => {
    try {
      const item = storage.getItem(key);
      if (item) {
        // if item exists, check if it's expired, if not, return its value
        const parsedItem = JSON.parse(item);
        if (expirationDays && Date.now() > parsedItem.timestamp + expirationDays * 24 * 60 * 60 * 1000) {
          // if expired, remove from storage and return default value
          storage.removeItem(key);
          return defaultValue;
        }
        return parsedItem.value;
      } else {
        // if item doesn't exist, store default value with current timestamp
        const now = Date.now();
        storage.setItem(key, JSON.stringify({ value: defaultValue, timestamp: now }));
        return defaultValue;
      }
    } catch (error) {
      // if error occurs while parsing or setting item, store default value with current timestamp
      storage.setItem(key, JSON.stringify({ value: defaultValue, timestamp: Date.now() }));
      return defaultValue;
    }
  });

  // update stored value on component mount and handle expiration if provided
  useEffect(() => {
    if (expirationDays) {
      const interval = setInterval(() => {
        const item = storage.getItem(key);
        if (item) {
          const parsedItem = JSON.parse(item);
          if (Date.now() > parsedItem.timestamp + expirationDays * 24 * 60 * 60 * 1000) {
            // if expired remove from storage and update state with default value
            storage.removeItem(key);
            setStorageValue(defaultValue);
          }
        }
      }, expirationDays * 24 * 60 * 60 * 1000);

      // clean up interval on component unmount
      return () => clearInterval(interval);
    }
  }, [key, defaultValue, expirationDays, storage]);

  // function to set new value in storage and state
  const setStorageStateValue = (valueOrFn) => {
    let newValue;
    if (typeof valueOrFn === 'function') {
      // if valueOrFn is a function, call it with current storageValue
      const fn = valueOrFn;
      newValue = fn(storageValue);
    } else {
      newValue = valueOrFn;
    }

    // store new value with current timestamp in storage and update state
    const now = Date.now();
    storage.setItem(key, JSON.stringify({ value: newValue, timestamp: now }));
    setStorageValue(newValue);
  };

  // return current storageValue and function to set new value
  return [storageValue, setStorageStateValue];
};

export default useStorage;
