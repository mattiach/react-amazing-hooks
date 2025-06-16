import { useState, useCallback } from "react";
import { UseStepOptions } from "../interfaces/const";

// Custom hook for managing a step value clamped between minStep and maxStep, with optional callbacks. Useful for steppers like forms or progress bars
export const useStep = (options: UseStepOptions) => {

  // Destructure options with default values
  const { initialStep = 0, minStep = 0, maxStep, onStepChange } = options;
  const safeInitialStep = Math.min(Math.max(initialStep, minStep), maxStep);
  const [step, setStep] = useState(safeInitialStep);

  // Internal setter with clamp and callback
  const updateStep = useCallback(
    (newStep: number) => {
      let clampedStep = newStep;

      if (clampedStep < minStep) clampedStep = minStep;
      if (maxStep !== undefined && clampedStep > maxStep) clampedStep = maxStep;

      setStep(clampedStep);
      if (onStepChange) onStepChange(clampedStep);
    },
    [minStep, maxStep, onStepChange]
  );

  // Public methods
  const next = useCallback(() => {
    updateStep(step + 1);
  }, [step, updateStep]);

  const prev = useCallback(() => {
    updateStep(step - 1);
  }, [step, updateStep]);

  const reset = useCallback(() => {
    updateStep(safeInitialStep);
  }, [safeInitialStep, updateStep]);

  const set = useCallback(
    (value: number) => {
      updateStep(value);
    },
    [updateStep]
  );

  // Helper flags for UI
  const canGoNext = maxStep === undefined ? true : step < maxStep;
  const canGoPrev = step > minStep;

  return {
    step,
    maxStep,
    minStep,
    next,
    prev,
    reset,
    set,
    canGoNext,
    canGoPrev,
  };
}
