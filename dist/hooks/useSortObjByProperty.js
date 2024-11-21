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
import { useState, useEffect } from 'react';
// Sort an array of objects by a property with optional ascending or descending order.
var useSortObjByProperty = function (arr, property, order) {
    if (order === void 0) { order = 'asc'; }
    var _a = useState([]), sortedArray = _a[0], setSortedArray = _a[1];
    useEffect(function () {
        var sorted = __spreadArray([], arr, true).sort(function (a, b) {
            if (order === 'asc' || order === true) {
                return a[property] > b[property] ? 1 : -1;
            }
            else if (order === 'desc' || order === false) {
                return a[property] < b[property] ? 1 : -1;
            }
            return 0; // will not sort if order is not 'asc' or 'desc'
        });
        setSortedArray(function (prevSortedArray) {
            if (JSON.stringify(prevSortedArray) !== JSON.stringify(sorted)) {
                return sorted;
            }
            return prevSortedArray;
        });
    }, [arr, property, order]);
    return sortedArray;
};
export default useSortObjByProperty;
