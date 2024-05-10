import { useRef, useEffect } from 'react';

// store previous values with a limit. Default is 1 and optional "remove duplicates function" if 'unique' is true
const usePreviousValues = (value, maxValues = 1, unique = false) => {
  const ref = useRef([]);

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
    previousValue: ref.current,
    storedValue: ref.current,
  };
};

export default usePreviousValues;
