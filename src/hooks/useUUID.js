import { useState } from 'react';

// custom hook used to generate a unique identifier
const useUUID = ({
  prefix = '',
  length = 24,
  specialChars = false,
  excludeChars = ''
}) => {
  const defaultChars = 'abcdefghilmnopqrstuvz0123456789';
  const specialCharsSet = 'abcdefghilmnopqrstuvz0123456789!@#$%^&*()_+-={}[]:;<>,.?/';
  let chars = specialChars ? specialCharsSet : defaultChars;

  // remove excluded characters
  excludeChars.split('').forEach(char => {
    chars = chars.replace(new RegExp(char, 'g'), '');
  });

  // function to generate a unique identifier
  const generateUUID = () => {
    let uuid = '';
    for (let i = 0; i < length; i++) {
      uuid += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${prefix}${uuid}`;
  };

  const [id, setId] = useState(generateUUID());

  // function to regenerate the unique identifier
  const regenerateId = () => {
    setId(generateUUID());
  };

  return [id, regenerateId];
}

export default useUUID;
