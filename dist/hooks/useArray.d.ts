import type { HasId, UseArrayReturn } from '../interfaces/const';
declare const useArray: <T extends HasId>(initial: T[]) => UseArrayReturn<T>;
export default useArray;
