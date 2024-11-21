import { useState, useEffect } from 'react';
// Custom hook named useToggle, which takes an optional initialValue or defaults to false
var useToggle = function (initialValue, // if not specified, default value is false
localStorageKey // if specified localStorageKey, the value will be stored in localStorage
) {
    if (initialValue === void 0) { initialValue = false; }
    if (localStorageKey === void 0) { localStorageKey = ''; }
    // function to get initial value from localStorage if available
    var getInitialValue = function () {
        if (localStorageKey) {
            var storedValue = localStorage.getItem(localStorageKey);
            if (storedValue !== null) {
                return JSON.parse(storedValue);
            }
        }
        return typeof initialValue === 'function' ? initialValue() : initialValue;
    };
    var _a = useState(getInitialValue), value = _a[0], setValue = _a[1];
    // function to toggle the value
    var toggle = function () {
        setValue(function (prevValue) {
            var newValue = !prevValue; // Toggle the boolean value
            if (localStorageKey) {
                localStorage.setItem(localStorageKey, JSON.stringify(newValue)); // Update localStorage if key is provided
            }
            return newValue; // Cast newValue to type T explicitly
        });
    };
    // function to set the value to a specific state
    var setValueTo = function (newValue) {
        setValue(newValue); // Update the state with the new value
        if (localStorageKey) {
            localStorage.setItem(localStorageKey, JSON.stringify(newValue)); // Update localStorage if key is provided
        }
    };
    // function to check if the value is in a specific state
    var isValue = function (expectedValue) {
        return value === expectedValue; // Check if current value matches the expected value
    };
    // useEffect to update localStorage when localStorageKey or initialValue change
    useEffect(function () {
        if (localStorageKey) {
            var storedValue = localStorage.getItem(localStorageKey);
            if (storedValue !== null) {
                setValue(JSON.parse(storedValue)); // Update state with value from localStorage
            }
            else {
                localStorage.setItem(localStorageKey, JSON.stringify(initialValue)); // Set initial value in localStorage
            }
        }
    }, [localStorageKey, initialValue]);
    // returning an object containing the current value, toggle function, setValueTo function and isValue function
    return {
        value: value,
        toggle: toggle,
        setValueTo: setValueTo,
        isValue: isValue
    };
};
export default useToggle;
