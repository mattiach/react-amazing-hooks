import { type RefObject } from 'react';
declare const useElementVisibility: <T extends Element>(ref: RefObject<T | null>, threshold?: number) => boolean;
export default useElementVisibility;
