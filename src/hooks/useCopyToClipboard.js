import { useState } from 'react';

// custom hook for copying text to clipboard with optional reset time and callback
const useCopyToClipboard = (resetTime = 0, callback = null) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isCopyActionBlocked, setIsCopyActionBlocked] = useState(false);

  const copyToClipboard = (value) => {
    if (isCopyActionBlocked) {
      return;
    }

    setIsCopyActionBlocked(true);

    navigator.clipboard.writeText(value)
      .then(() => {
        setIsCopied(true);
        if (resetTime > 0) {
          setTimeout(() => {
            setIsCopied(false);
            setIsCopyActionBlocked(false); // reset the flag after the resetTime
          }, resetTime);
        } else {
          setIsCopyActionBlocked(false); // reset the flag immediately
        }
        if (callback && typeof callback === 'function') {
          callback(true); // execute the callback with the copy value
        }
      })
      .catch((error) => {
        console.error('Failed to copy:', error);
        setIsCopyActionBlocked(false); // reset the flag
        if (callback && typeof callback === 'function') {
          callback(false); // execute the callback with the copy value
        }
      });
  };

  return { copyToClipboard, isCopied, isCopyActionBlocked };
};

export default useCopyToClipboard;
