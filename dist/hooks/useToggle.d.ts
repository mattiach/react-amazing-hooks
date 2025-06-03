import { InitialValueType, OptionalLocalStorageKey } from '../interfaces/const';
declare const useToggle: <T>(initialValue?: InitialValueType<T>, // if not specified, default value is false
localStorageKey?: OptionalLocalStorageKey) => {
    value: T;
    toggle: () => void;
    setValueTo: (newValue: T) => void;
    isValue: (expectedValue: T) => boolean;
};
export default useToggle;
