import { useState, useEffect } from "react";
// custom hook to detect online status
var useOnlineStatus = function () {
    var _a = useState(navigator.onLine), isOnline = _a[0], setIsOnline = _a[1];
    useEffect(function () {
        var handleOnline = function () {
            setIsOnline(true);
        };
        var handleOffline = function () {
            setIsOnline(false);
        };
        // event listeners for online and offline events
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        // clean up event listeners on unmount
        return function () {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);
    // return current online status as boolean value (true/false)
    return isOnline;
};
export default useOnlineStatus;
