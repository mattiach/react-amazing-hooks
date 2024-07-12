import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { StorageItem, StorageType, UseStorageReturnType } from "../interfaces/const";


const useStorage = <T>(
  key: string,
  storageType: StorageType = "localStorage",
  expirationDays: number = 0
  ): UseStorageReturnType<T> => {
  const storage: Storage = storageType === "localStorage" ? localStorage : sessionStorage;

    const [storageValue, setStorageValue] = useState<T>(() => {
    try {
      const item = storage.getItem(key);
      if (item) {
        const parsedItem: StorageItem<T> = JSON.parse(item);
        return parsedItem.value;
      } else {
        return undefined as unknown as T; // Return undefined initially
      }
    } catch (error) {
          console.error(`Error retrieving ${key} from ${storageType}:`, error);
        return undefined as unknown as T; // Return undefined on error
    }
  });

  useEffect(() => {
    if (expirationDays > 0) {
      const interval = setInterval(() => {
        const item = storage.getItem(key);
        if (item) {
          const parsedItem: StorageItem<T> = JSON.parse(item);
          const storedTimestamp = parsedItem.timestamp;
          if (storedTimestamp && Date.now() > storedTimestamp + expirationDays * 24 * 60 * 60 * 1000) {
            storage.removeItem(key);
          setStorageValue(undefined as unknown as T); // Reset to undefined
          }
        }
      }, expirationDays * 24 * 60 * 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [key, expirationDays, storage]);

          const setStorageStateValue: Dispatch<SetStateAction<T>> = (valueOrFn) => {
            let newValue: T;
            if (typeof valueOrFn === 'function') {
      const fn: (prevState: T) => T = valueOrFn as (prevState: T) => T;
            newValue = fn(storageValue);
    } else {
              newValue = valueOrFn as T;
    }

            if (newValue === undefined) {
              storage.removeItem(key); // Remove item if newValue is undefined
    } else {
      if (expirationDays > 0) {
        const now = Date.now();
            storage.setItem(key, JSON.stringify({value: newValue, timestamp: now }));
      } else {
              storage.setItem(key, JSON.stringify({ value: newValue }));
      }
    }

            setStorageValue(newValue);
  };

            return [storageValue, setStorageStateValue];
};

            export default useStorage;
