import { useState, useCallback } from "react";
// Custom hook for managing a step value clamped between minStep and maxStep, with optional callbacks. Useful for steppers like forms or progress bars
export var useStep = function (options) {
    // Destructure options with default values
    var _a = options.initialStep, initialStep = _a === void 0 ? 0 : _a, _b = options.minStep, minStep = _b === void 0 ? 0 : _b, maxStep = options.maxStep, onStepChange = options.onStepChange;
    var safeInitialStep = Math.min(Math.max(initialStep, minStep), maxStep);
    var _c = useState(safeInitialStep), step = _c[0], setStep = _c[1];
    // Internal setter with clamp and callback
    var updateStep = useCallback(function (newStep) {
        var clampedStep = newStep;
        if (clampedStep < minStep)
            clampedStep = minStep;
        if (maxStep !== undefined && clampedStep > maxStep)
            clampedStep = maxStep;
        setStep(clampedStep);
        if (onStepChange)
            onStepChange(clampedStep);
    }, [minStep, maxStep, onStepChange]);
    // Public methods
    var next = useCallback(function () {
        updateStep(step + 1);
    }, [step, updateStep]);
    var prev = useCallback(function () {
        updateStep(step - 1);
    }, [step, updateStep]);
    var reset = useCallback(function () {
        updateStep(safeInitialStep);
    }, [safeInitialStep, updateStep]);
    var set = useCallback(function (value) {
        updateStep(value);
    }, [updateStep]);
    // Helper flags for UI
    var canGoNext = maxStep === undefined ? true : step < maxStep;
    var canGoPrev = step > minStep;
    return {
        step: step,
        maxStep: maxStep,
        minStep: minStep,
        next: next,
        prev: prev,
        reset: reset,
        set: set,
        canGoNext: canGoNext,
        canGoPrev: canGoPrev,
    };
};
