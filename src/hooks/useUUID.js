import { useState } from 'react';

// function to generate a unique identifier
export const generateUUID = ({
  prefix = '',
  length = 24,
  specialChars = false,
  excludeChars = ''
} = {}) => {
  const defaultChars = 'abcdefghilmnopqrstuvz0123456789';
  const specialCharsSet = 'abcdefghilmnopqrstuvz0123456789!@#$%^&*()_+-={}[]:;<>,.?/';
  let chars = specialChars ? specialCharsSet : defaultChars;

  // remove excluded characters
  excludeChars.split('').forEach(char => {
    chars = chars.replace(new RegExp(char, 'g'), '');
  });

  let uuid = '';
  for (let i = 0; i < length; i++) {
    uuid += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}${uuid}`;
};

// custom hook used to generate a unique identifier
const useUUID = (options) => {
  const [id] = useState(() => generateUUID(options));
  return id;
};

export default useUUID;
