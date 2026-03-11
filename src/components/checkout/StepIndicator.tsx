import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center gap-2">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isComplete = currentStep > stepNum;
        const isCurrent = currentStep === stepNum;

        return (
          <div key={i} className="flex items-center gap-2">
            {/* Step circle */}
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono font-bold transition-colors ${
                  isComplete
                    ? "bg-primary text-primary-foreground"
                    : isCurrent
                    ? "border-2 border-primary text-primary"
                    : "border border-border text-muted-foreground"
                }`}
              >
                {isComplete ? <Check className="w-4 h-4" /> : stepNum}
              </div>
              <span
                className={`font-mono text-sm hidden sm:inline ${
                  isComplete
                    ? "text-success"
                    : isCurrent
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div
                className={`w-12 h-px ${
                  currentStep > stepNum ? "bg-success" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
