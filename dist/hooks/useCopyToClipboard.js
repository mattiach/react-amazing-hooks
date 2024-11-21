var useCopyToClipboard = function (callback) {
    var copyToClipboard = function (value) {
        navigator.clipboard.writeText(value)
            .then(function () {
            if (callback && typeof callback === 'function') {
                callback(true);
            }
        })
            .catch(function (error) {
            console.error('Failed to copy:', error);
            if (callback && typeof callback === 'function') {
                callback(false);
            }
        });
    };
    return copyToClipboard;
};
export default useCopyToClipboard;
