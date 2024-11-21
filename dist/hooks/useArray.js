var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import { useState } from 'react';
// custom hook to manage an array of items with various functions
var useArray = function (initial) {
    var _a = useState(initial), value = _a[0], setValue = _a[1];
    // function to add an element to the array
    var add = function (item) {
        setValue(function (prevValue) { return __spreadArray(__spreadArray([], prevValue, true), [item], false); });
    };
    // function to clear the array
    var clear = function () {
        setValue([]);
    };
    // function to remove an element from the array by id
    var removeById = function (id) {
        setValue(function (prevValue) {
            return prevValue.filter(function (item) { return item && item.id !== id; });
        });
    };
    // function to remove an element from the array by index
    var removeIndex = function (index) {
        setValue(function (prevValue) { return prevValue.filter(function (_, i) { return i !== index; }); });
    };
    // function to replace an element in the array at a specific index
    var replaceAtIndex = function (index, newItem) {
        setValue(function (prevValue) {
            var newArray = __spreadArray([], prevValue, true);
            if (index >= 0 && index < newArray.length) {
                newArray.splice(index, 1, newItem);
            }
            return newArray;
        });
    };
    // function to replate an element in the array at specific id
    var replaceById = function (id, newItem) {
        setValue(function (prevValue) {
            var newArray = __spreadArray([], prevValue, true);
            var index = newArray.findIndex(function (item) { return item && item.id === id; });
            if (index >= 0) {
                newArray.splice(index, 1, newItem);
            }
            return newArray;
        });
    };
    // function to shuffle the array in a random order
    var shuffle = function () {
        setValue(function (prevValue) {
            var _a;
            var newArray = __spreadArray([], prevValue, true);
            for (var i = newArray.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                _a = [newArray[j], newArray[i]], newArray[i] = _a[0], newArray[j] = _a[1];
            }
            return newArray;
        });
    };
    // function to sort the array in ascending order
    var ascendingSort = function () {
        setValue(function (prevValue) {
            var newArray = __spreadArray([], prevValue, true);
            return newArray.sort(function (a, b) { return (a.id > b.id ? 1 : -1); });
        });
    };
    // function to sort the array in descending order
    var descendingSort = function () {
        setValue(function (prevValue) {
            var newArray = __spreadArray([], prevValue, true);
            return newArray.sort(function (a, b) { return (a.id < b.id ? 1 : -1); });
        });
    };
    return {
        value: value,
        add: add,
        clear: clear,
        removeById: removeById,
        removeIndex: removeIndex,
        replaceAtIndex: replaceAtIndex,
        replaceById: replaceById,
        shuffle: shuffle,
        ascendingSort: ascendingSort,
        descendingSort: descendingSort,
    };
};
export default useArray;
