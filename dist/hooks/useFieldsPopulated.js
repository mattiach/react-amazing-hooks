import { useState, useEffect } from "react";
// custom hook to check if object fields are populated
var useFieldsPopulated = function (fields) {
    var _a = useState(false), fieldsPopulated = _a[0], setFieldsPopulated = _a[1];
    // function to check if fields are populated
    var checkFields = function () {
        var arePopulated = Object.values(fields).every(function (value) { return !!value; });
        setFieldsPopulated(arePopulated);
    };
    // check fields on every update
    useEffect(function () {
        checkFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fields]);
    return fieldsPopulated;
};
export default useFieldsPopulated;
