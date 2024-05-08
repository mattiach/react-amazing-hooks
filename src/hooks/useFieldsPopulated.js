import { useState, useEffect } from "react";

// custom hook to check if object fields are populated
const useFieldsPopulated = (fields) => {
  const [fieldsPopulated, setFieldsPopulated] = useState(false);

  // function to check if fields are populated
  const checkFields = () => {
    const arePopulated = Object.values(fields).every((value) => value);
    setFieldsPopulated(arePopulated);
  };

  // check fields on every update
  useEffect(() => {
    checkFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  return fieldsPopulated;
};

export default useFieldsPopulated;