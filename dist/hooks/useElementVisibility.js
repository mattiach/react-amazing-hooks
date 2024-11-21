import { useState, useEffect } from 'react';
// custom hook to manage the visibility state of a specific element
var useElementVisibility = function (ref, threshold) {
    if (threshold === void 0) { threshold = 0; }
    var _a = useState(false), isVisible = _a[0], setIsVisible = _a[1]; // current visibility state of the element
    useEffect(function () {
        // copy ref.current to a local variable to avoid stale closure issues
        var currentRef = ref.current;
        // create an IntersectionObserver instance
        var observer = new IntersectionObserver(function (_a) {
            var entry = _a[0];
            // update visibility state based on intersection status
            setIsVisible(entry.isIntersecting);
        }, { threshold: threshold } // set the threshold for intersection
        );
        // start observing the target element
        if (currentRef) {
            observer.observe(currentRef);
        }
        // cleanup function to stop observing when component unmounts or ref changes
        return function () {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, threshold]);
    return isVisible;
};
export default useElementVisibility;
