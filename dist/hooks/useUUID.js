import { useState } from 'react';
// Function to generate a unique identifier
export var generateUUID = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.prefix, prefix = _c === void 0 ? '' : _c, _d = _b.length, length = _d === void 0 ? 24 : _d, _e = _b.specialChars, specialChars = _e === void 0 ? false : _e, _f = _b.excludeChars, excludeChars = _f === void 0 ? '' : _f;
    var defaultChars = 'abcdefghilmnopqrstuvz0123456789';
    var specialCharsSet = 'abcdefghilmnopqrstuvz0123456789!@#$%^&*()_+-={}[]:;<>,.?/';
    var chars = specialChars ? specialCharsSet : defaultChars;
    // Remove excluded characters
    excludeChars.split('').forEach(function (char) {
        chars = chars.replace(new RegExp(char, 'g'), '');
    });
    var uuid = '';
    for (var i = 0; i < length; i++) {
        uuid += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return "".concat(prefix).concat(uuid);
};
// Custom hook used to generate a unique identifier
var useUUID = function (options) {
    var id = useState(function () { return generateUUID(options); })[0];
    return id;
};
export default useUUID;
