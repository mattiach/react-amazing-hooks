import { RefObject } from 'react';
import { OptionsUseOver } from '../interfaces/const';
type Target = string | RefObject<Element>;
declare const useHover: (target: Target, options?: OptionsUseOver) => boolean;
export default useHover;
