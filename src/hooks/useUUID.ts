import { useState } from 'react';
import { GenerateUUIDOptions } from '../interfaces/const';

// Function to generate a unique identifier
export const generateUUID = ({
  prefix = '',
  length = 24,
  specialChars = false,
  excludeChars = ''
}: GenerateUUIDOptions = {}): string => {
  const defaultChars = 'abcdefghilmnopqrstuvz0123456789';
  const specialCharsSet = 'abcdefghilmnopqrstuvz0123456789!@#$%^&*()_+-={}[]:;<>,.?/';
  let chars = specialChars ? specialCharsSet : defaultChars;

  // Remove excluded characters
  excludeChars.split('').forEach(char => {
    chars = chars.replace(new RegExp(char, 'g'), '');
  });

  let uuid = '';
  for (let i = 0; i < length; i++) {
    uuid += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}${uuid}`;
};

// Custom hook used to generate a unique identifier
const useUUID = (options?: GenerateUUIDOptions): string => {
  const [id] = useState(() => generateUUID(options));
  return id;
};

export default useUUID;
