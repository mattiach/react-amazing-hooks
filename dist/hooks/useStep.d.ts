import { UseStepOptions } from "../interfaces/const";
export declare const useStep: (options: UseStepOptions) => {
    step: number;
    maxStep: number;
    minStep: number;
    next: () => void;
    prev: () => void;
    reset: () => void;
    set: (value: number) => void;
    canGoNext: boolean;
    canGoPrev: boolean;
};
