import { useState, useEffect } from 'react';
// Custom hook to track window scroll position
var useWindowScroll = function () {
    var _a = useState({
        x: 0,
        y: 0,
        percentageX: 0,
        percentageY: 0
    }), scrollPosition = _a[0], setScrollPosition = _a[1];
    // function to handle scroll event
    var handleScroll = function () {
        var windowHeight = window.innerHeight;
        var documentHeight = document.documentElement.scrollHeight;
        var scrollY = window.scrollY;
        var scrollX = window.scrollX;
        var percentageY = (scrollY / (documentHeight - windowHeight)) * 100;
        var percentageX = (scrollX / (document.body.scrollWidth - window.innerWidth)) * 100;
        setScrollPosition({
            x: Math.floor(scrollX),
            y: Math.floor(scrollY),
            percentageX: parseFloat(percentageX.toFixed(2)),
            percentageY: parseFloat(percentageY.toFixed(2)),
        });
    };
    // add scroll event listener on mount, remove on unmount
    useEffect(function () {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return function () {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return scrollPosition;
};
export default useWindowScroll;
