const useCopyToClipboard = (callback?: (success: boolean) => void) => {
  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value)
      .then(() => {
        if (callback && typeof callback === 'function') {
          callback(true);
        }
      })
      .catch((error) => {
        console.error('Failed to copy:', error);
        if (callback && typeof callback === 'function') {
          callback(false);
        }
      });
  };

  return copyToClipboard;
};

export default useCopyToClipboard;
