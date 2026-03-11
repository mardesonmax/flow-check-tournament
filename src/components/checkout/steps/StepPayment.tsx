import { ArrowLeft } from "lucide-react";
import PaymentSection from "@/components/checkout/PaymentSection";
import OrderSummary from "@/components/checkout/OrderSummary";

interface StepPaymentProps {
  paymentMethod: "credit" | "pix";
  onSelectMethod: (method: "credit" | "pix") => void;
  onBack: () => void;
  onPay: () => void;
}

const StepPayment = ({ paymentMethod, onSelectMethod, onBack, onPay }: StepPaymentProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PaymentSection selectedMethod={paymentMethod} onSelectMethod={onSelectMethod} />
        <OrderSummary canPay={true} onPay={onPay} />
      </div>

      <button
        onClick={onBack}
        className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>
    </div>
  );
};

export default StepPayment;
