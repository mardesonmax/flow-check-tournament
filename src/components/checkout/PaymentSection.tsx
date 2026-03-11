import { CreditCard, Sparkles } from "lucide-react";
import { useState } from "react";

interface PaymentSectionProps {
  selectedMethod: "credit" | "pix";
  onSelectMethod: (method: "credit" | "pix") => void;
}

const PaymentSection = ({ selectedMethod, onSelectMethod }: PaymentSectionProps) => {
  return (
    <div className="border border-border rounded-lg bg-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="w-5 h-5 text-foreground" />
        <h3 className="font-mono text-sm font-semibold text-foreground">Forma de pagamento</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-3">Escolha sua forma de pagamento:</p>

      <div className="space-y-2">
        <button
          onClick={() => onSelectMethod("credit")}
          className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
            selectedMethod === "credit"
              ? "border-foreground bg-accent"
              : "border-border hover:bg-accent/30"
          }`}
        >
          <div className="flex items-center gap-3">
            <CreditCard className="w-4 h-4 text-foreground" />
            <span className="font-mono text-sm text-foreground">Cartão de Crédito</span>
          </div>
          <div className={`w-4 h-4 rounded-full border-2 ${
            selectedMethod === "credit" ? "border-foreground bg-foreground" : "border-muted-foreground"
          }`} />
        </button>

        <button
          onClick={() => onSelectMethod("pix")}
          className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
            selectedMethod === "pix"
              ? "border-pix bg-pix/10"
              : "border-border hover:bg-accent/30"
          }`}
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-pix" />
            <div className="text-left">
              <span className="font-mono text-sm text-foreground block">Pix</span>
              <span className="text-xs text-muted-foreground">Taxa de serviço: 10%</span>
            </div>
          </div>
          <div className={`w-4 h-4 rounded-full border-2 ${
            selectedMethod === "pix" ? "border-pix bg-pix" : "border-muted-foreground"
          }`} />
        </button>
      </div>
    </div>
  );
};

export default PaymentSection;
