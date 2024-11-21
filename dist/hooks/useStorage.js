import { useState, useEffect } from "react";
var useStorage = function (key, storageType, expirationDays) {
    if (storageType === void 0) { storageType = "localStorage"; }
    if (expirationDays === void 0) { expirationDays = 0; }
    var storage = storageType === "localStorage" ? localStorage : sessionStorage;
    var getStoredValue = function () {
        var item = storage.getItem(key);
        if (item) {
            var parsedItem = JSON.parse(item);
            if (expirationDays === 0) {
                return parsedItem.value;
            }
            var now = Date.now();
            var itemAge = now - (parsedItem.timestamp || 0);
            if (itemAge <= expirationDays * 24 * 60 * 60 * 1000) {
                return parsedItem.value;
            }
        }
        return undefined;
    };
    var _a = useState(getStoredValue), storedValue = _a[0], setStoredValue = _a[1];
    useEffect(function () {
        if (storedValue !== undefined) {
            if (expirationDays > 0) {
                var item = {
                    value: storedValue,
                    timestamp: Date.now(),
                };
                storage.setItem(key, JSON.stringify(item));
            }
            else {
                storage.setItem(key, JSON.stringify({ value: storedValue }));
            }
        }
        else {
            storage.removeItem(key);
        }
    }, [storedValue, key, storage, expirationDays]);
    return [storedValue, setStoredValue];
};
export default useStorage;
