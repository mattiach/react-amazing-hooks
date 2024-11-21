import { GenerateUUIDOptions } from '../interfaces/const';
export declare const generateUUID: ({ prefix, length, specialChars, excludeChars }?: GenerateUUIDOptions) => string;
declare const useUUID: (options?: GenerateUUIDOptions) => string;
export default useUUID;
