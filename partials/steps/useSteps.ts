import { useState } from "react";

interface Options {
  initialStep: number;
}

export const useSteps = (options: Options) => {
  const { initialStep } = options;
  const [activeStep, setActiveStep] = useState(initialStep);
  const [isLoading, setLoading] = useState<boolean>(false);

  const showLoading = (load) => setLoading(load);
  const nextStep = () => setActiveStep(activeStep + 1);
  const prevStep = () => setActiveStep(activeStep - 1);
  const reset = () => setActiveStep(0);

  return { nextStep, prevStep, reset, activeStep, showLoading, isLoading };
};
