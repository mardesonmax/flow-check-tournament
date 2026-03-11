import { useState } from "react";
import { Check } from "lucide-react";

interface OrderSummaryProps {
  canPay: boolean;
  onPay: () => void;
}

const OrderSummary = ({ canPay, onPay }: OrderSummaryProps) => {
  const [coupon, setCoupon] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const readyToPay = canPay && termsAccepted;

  return (
    <div className="border border-border rounded-lg bg-card p-5">
      <h3 className="font-mono text-sm font-semibold text-foreground mb-4">Resumo da compra</h3>

      {/* Coupon */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Digite seu cupom"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="flex-1 bg-secondary border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <button className="font-mono text-xs font-semibold bg-pix text-pix-foreground px-4 py-2 rounded hover:opacity-90 transition-opacity">
          Aplicar
        </button>
      </div>

      {/* Line items */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-foreground">Categoria A</span>
          <span className="font-mono text-foreground">R$ 150,00</span>
        </div>
      </div>

      <div className="border-t border-border pt-3 space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Valor das inscrições</span>
          <span className="font-mono text-foreground">R$ 150,00</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Taxa estimada (10%)</span>
          <span className="font-mono text-foreground">R$ 15,00</span>
        </div>
        <p className="text-xs text-muted-foreground">a taxa está sendo bonificada pelo Gravaê + Summer</p>
      </div>

      <div className="border-t border-border pt-3 mb-4">
        <div className="flex justify-between">
          <span className="font-mono text-sm font-bold text-foreground">Total a pagar hoje</span>
          <span className="font-mono text-sm font-bold text-foreground">R$ 150,00</span>
        </div>
      </div>

      {/* Terms */}
      <label className="flex items-start gap-2 mb-4 cursor-pointer">
        <button
          onClick={() => setTermsAccepted(!termsAccepted)}
          className={`w-5 h-5 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
            termsAccepted ? "bg-primary border-primary" : "border-muted-foreground"
          }`}
        >
          {termsAccepted && <Check className="w-3 h-3 text-primary-foreground" />}
        </button>
        <span className="text-xs text-muted-foreground">
          Li e aceito o{" "}
          <a href="#" className="text-pix underline">regulamento do torneio</a>
          {" "}e as{" "}
          <a href="#" className="text-pix underline">políticas de reembolso</a>.
        </span>
      </label>

      {/* Pay button */}
      <button
        disabled={!readyToPay}
        onClick={onPay}
        className={`w-full font-mono text-sm font-bold py-3 rounded-lg transition-colors ${
          readyToPay
            ? "bg-primary text-primary-foreground hover:opacity-90"
            : "bg-disabled text-disabled-foreground cursor-not-allowed"
        }`}
      >
        {canPay ? "Gerar QR Code Pix" : "Complete os dados da inscrição"}
      </button>
    </div>
  );
};

export default OrderSummary;
