import { Check, AlertTriangle, Lock } from "lucide-react";

interface Step {
  label: string;
  status: "complete" | "incomplete" | "locked";
}

interface ChecklistStatusProps {
  steps: Step[];
}

const ChecklistStatus = ({ steps }: ChecklistStatusProps) => {
  return (
    <div className="border border-border rounded-lg p-5 bg-card">
      <h2 className="font-mono text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
        Etapas da inscrição
      </h2>
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            {step.status === "complete" && (
              <Check className="w-4 h-4 text-primary shrink-0" />
            )}
            {step.status === "incomplete" && (
              <AlertTriangle className="w-4 h-4 text-attention shrink-0" />
            )}
            {step.status === "locked" && (
              <Lock className="w-4 h-4 text-disabled-foreground shrink-0" />
            )}
            <span
              className={`font-mono text-sm ${
                step.status === "complete"
                  ? "text-primary"
                  : step.status === "incomplete"
                  ? "text-attention"
                  : "text-disabled-foreground"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChecklistStatus;
