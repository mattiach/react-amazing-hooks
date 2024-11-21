import { useState, useEffect } from 'react';
// custom hook to check media query. Can be used to conditionally render components based on screen size, or to apply different styles based on screen size
var useMediaQuery = function (queryObj) {
    var query = queryObj.query, min = queryObj.min, max = queryObj.max;
    var _a = useState(false), matches = _a[0], setMatches = _a[1];
    useEffect(function () {
        var mediaQuery;
        switch (true) {
            case (min !== undefined && max !== undefined): // if you include both min and max, it will be a range between this values and will ignore 'query' parameter
                mediaQuery = "(min-width: ".concat(min, "px) and (max-width: ").concat(max, "px)");
                break;
            case (query !== undefined): // the most common use case, just a single value
                mediaQuery = "(max-width: ".concat(query, "px)");
                break;
            case (min !== undefined): // if you include only min, it will be a range from this value and up
                mediaQuery = "(min-width: ".concat(min, "px)");
                break;
            case (max !== undefined): // if you include only max, it will be a range up to this value
                mediaQuery = "(max-width: ".concat(max, "px)");
                break;
            default:
                throw new Error('Invalid media query parameters.');
        }
        var handleChange = function (event) {
            setMatches(event.matches);
        };
        var mqList = window.matchMedia(mediaQuery);
        // Initial check
        setMatches(mqList.matches);
        // Listen for changes
        mqList.addEventListener('change', handleChange);
        return function () {
            mqList.removeEventListener('change', handleChange);
        };
    }, [query, min, max]);
    return matches;
};
export default useMediaQuery;
