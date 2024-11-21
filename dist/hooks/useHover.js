import { useState, useEffect } from 'react';
// // custom hook to detect if an element is hovered. It accepts a string ('id' or 'class') or a 'ref'.
// options object can be used to extend the hook with custom delay and callback functions
var useHover = function (target, options) {
    if (options === void 0) { options = {}; }
    var _a = useState(false), isHovered = _a[0], setIsHovered = _a[1];
    // options object with default values
    var _b = options.delay, delay = _b === void 0 ? 0 : _b, _c = options.onHoverStart, onHoverStart = _c === void 0 ? function () { } : _c, _d = options.onHoverEnd, onHoverEnd = _d === void 0 ? function () { } : _d;
    // handlers for mouse enter and leave events
    var handleMouseEnter = function () {
        var timeout = setTimeout(function () {
            setIsHovered(true);
            onHoverStart();
        }, delay);
        return function () { return clearTimeout(timeout); };
    };
    var handleMouseLeave = function () {
        setIsHovered(false);
        onHoverEnd();
    };
    useEffect(function () {
        var targetElement;
        // determine target element based on input type
        if (typeof target === 'string') {
            if (target.startsWith('#')) {
                targetElement = document.getElementById(target.slice(1));
            }
            else if (target.startsWith('.')) {
                targetElement = document.getElementsByClassName(target.slice(1))[0];
            }
        }
        else if (target.current) {
            targetElement = target.current;
        }
        if (targetElement) {
            targetElement.addEventListener('mouseenter', handleMouseEnter);
            targetElement.addEventListener('mouseleave', handleMouseLeave);
            return function () {
                targetElement.removeEventListener('mouseenter', handleMouseEnter);
                targetElement.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target, delay, onHoverStart, onHoverEnd]);
    return isHovered;
};
export default useHover;
