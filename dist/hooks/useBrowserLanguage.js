import { useState, useEffect } from 'react';
// custom hook to get the browser language with optional formatting
var useBrowserLanguage = function (format, textFormat) {
    if (format === void 0) { format = 'short'; }
    if (textFormat === void 0) { textFormat = 'lowercase'; }
    var _a = useState(navigator.language), language = _a[0], setLanguage = _a[1];
    // effect to update language when it changes
    useEffect(function () {
        var handleLanguageChange = function () {
            setLanguage(navigator.language);
        };
        window.addEventListener('languagechange', handleLanguageChange);
        // clean up event listener on unmount
        return function () {
            window.removeEventListener('languagechange', handleLanguageChange);
        };
    }, []);
    // default formatted language is the raw language value
    var formattedLanguage = language;
    // format the language based on the 'format' parameter
    if (format === 'short') {
        formattedLanguage = language.split('-')[0];
    }
    // apply text formatting based on the 'textFormat' parameter
    switch (textFormat) {
        case 'uppercase':
            formattedLanguage = formattedLanguage.toUpperCase();
            break;
        case 'capitalize':
            formattedLanguage = formattedLanguage.charAt(0).toUpperCase() + formattedLanguage.slice(1);
            break;
        case 'lowercase':
            formattedLanguage = formattedLanguage.toLowerCase();
            break;
        default:
            break;
    }
    // return the formatted language
    return formattedLanguage;
};
export default useBrowserLanguage;
