import type { SteppingStepProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function SteppingStone({
  steps,
  currentStep,
  setStep,
}: SteppingStepProps) {
  return (
    <div className="space-y-6">
      {/* STEP INDICATOR */}
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={index} className="flex items-center w-full">
              {/* STEP CIRCLE */}
              <div
                onClick={() => {
                  if (isCompleted) setStep(index);
                }}
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border text-sm transition",
                  isActive && "border-primary text-primary",
                  isCompleted &&
                    "border-muted-foreground text-muted-foreground cursor-pointer",
                  !isActive &&
                    !isCompleted &&
                    "border-muted text-muted-foreground opacity-50",
                )}
              >
                {index + 1}
              </div>

              {/* LABEL */}
              <span
                className={cn(
                  "ml-2 text-sm",
                  isActive && "text-foreground font-medium",
                  isCompleted && "text-muted-foreground",
                  !isActive &&
                    !isCompleted &&
                    "text-muted-foreground opacity-50",
                )}
              >
                {step.label}
              </span>

              {/* DASH LINE */}
              {index !== steps.length - 1 && (
                <div className="flex-1 mx-3 border-t border-dashed border-muted" />
              )}
            </div>
          );
        })}
      </div>

      {/* STEP CONTENT */}
      <div>{steps[currentStep].content}</div>
    </div>
  );
}
