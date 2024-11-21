import { useRef, useEffect } from 'react';
// custom hook to store previous values with a limit
var usePreviousValues = function (_a) {
    var value = _a.value, maxValues = _a.maxValues, unique = _a.unique;
    var ref = useRef([]);
    useEffect(function () {
        ref.current.unshift(value);
        // apply filter to remove duplicates if 'unique' is true
        if (unique) {
            ref.current = ref.current.filter(function (item, index, arr) { return arr.indexOf(item) === index; });
        }
        // limit to 'maxValues'
        ref.current = ref.current.slice(0, maxValues);
    }, [value, maxValues, unique]);
    return {
        previousValue: ref.current.slice(1), // exclude the current value
        storedValue: ref.current.slice(), // include all values
    };
};
export default usePreviousValues;
