import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { StorageItem, StorageType } from "../interfaces/const";

const useStorage = <T,>(
  key: string,
  storageType: StorageType = "localStorage",
  expirationDays: number = 0
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] => {
  const storage: Storage =
    storageType === "localStorage" ? localStorage : sessionStorage;

  const getStoredValue = (): T | undefined => {
    const item = storage.getItem(key);
    if (item) {
      const parsedItem: StorageItem<T> = JSON.parse(item);
      if (expirationDays === 0) {
        return parsedItem.value;
      }
      const now = Date.now();
      const itemAge = now - (parsedItem.timestamp || 0);
      if (itemAge <= expirationDays * 24 * 60 * 60 * 1000) {
        return parsedItem.value;
      }
    }
    return undefined;
  };

  const [storedValue, setStoredValue] = useState<T | undefined>(getStoredValue);

  useEffect(() => {
    if (storedValue !== undefined) {
      if (expirationDays > 0) {
        const item: StorageItem<T> = {
          value: storedValue,
          timestamp: Date.now(),
        };
        storage.setItem(key, JSON.stringify(item));
      } else {
        storage.setItem(key, JSON.stringify({ value: storedValue }));
      }
    } else {
      storage.removeItem(key);
    }
  }, [storedValue, key, storage, expirationDays]);

  return [storedValue, setStoredValue];
};

export default useStorage;
