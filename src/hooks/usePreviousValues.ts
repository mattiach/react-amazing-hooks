import { useRef, useEffect } from 'react';
import { UsePreviousValuesOptions, UsePreviousValuesResult } from '../interfaces/const';

// custom hook to store previous values with a limit
const usePreviousValues = ({ value, maxValues, unique }: UsePreviousValuesOptions): UsePreviousValuesResult => {
  const ref = useRef<unknown[]>([]);

  useEffect(() => {
    ref.current.unshift(value);

    // apply filter to remove duplicates if 'unique' is true
    if (unique) {
      ref.current = ref.current.filter((item, index, arr) => arr.indexOf(item) === index);
    }

    // limit to 'maxValues'
    ref.current = ref.current.slice(0, maxValues);
  }, [value, maxValues, unique]);

  return {
    previousValue: ref.current.slice(1), // exclude the current value
    storedValue: ref.current.slice(),    // include all values
  };
};

export default usePreviousValues;