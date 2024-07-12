import { useState, useEffect } from 'react';

// Define type for textFormat options
type TextFormat = 'uppercase' | 'capitalize' | 'lowercase';

// custom hook to get the browser language with optional formatting
const useBrowserLanguage = (format: 'short' | 'full' = 'short', textFormat: TextFormat = 'lowercase'): string => {
  const [language, setLanguage] = useState<string>(navigator.language);

  // effect to update language when it changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(navigator.language);
    };

    window.addEventListener('languagechange', handleLanguageChange);

    // clean up event listener on unmount
    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  }, []);

  // default formatted language is the raw language value
  let formattedLanguage: string = language;

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
