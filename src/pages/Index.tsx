import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import StepIndicator from "@/components/checkout/StepIndicator";
import StepProfile from "@/components/checkout/steps/StepProfile";
import StepTeam from "@/components/checkout/steps/StepTeam";
import StepPayment from "@/components/checkout/steps/StepPayment";
import type { ProfileData } from "@/components/checkout/ProfileModal";

const STEPS = ["Perfil", "Dupla", "Pagamento"];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileComplete, setProfileComplete] = useState(false);
  const [useMyData, setUseMyData] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "pix">("pix");

  const [players, setPlayers] = useState([
    { name: "THZ 777", filled: true },
    { name: "", filled: false },
  ]);

  const handleSaveProfile = (data: ProfileData) => {
    setProfileComplete(true);
    setCurrentStep(2);
  };

  const handleEditPlayer = (index: number) => {
    if (!players[index].filled) {
      setPlayers((prev) =>
        prev.map((p, i) =>
          i === index ? { name: index === 0 ? "THZ 777" : "Player 2", filled: true } : p
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Back */}
        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-mono text-sm">Voltar</span>
        </button>

        {/* Title */}
        <h1 className="font-mono text-2xl font-bold text-foreground mb-1">Finalizar Inscrição</h1>
        <p className="text-sm text-muted-foreground mb-6">1 categoria no carrinho</p>

        {/* Stepper */}
        <div className="mb-8">
          <StepIndicator currentStep={currentStep} steps={STEPS} />
        </div>

        {/* Step content */}
        {currentStep === 1 && (
          <StepProfile
            profileComplete={profileComplete}
            onComplete={handleSaveProfile}
            onContinue={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <StepTeam
            players={players}
            useMyData={useMyData}
            onToggleMyData={() => setUseMyData(!useMyData)}
            onEditPlayer={handleEditPlayer}
            onBack={() => setCurrentStep(1)}
            onContinue={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 3 && (
          <StepPayment
            paymentMethod={paymentMethod}
            onSelectMethod={setPaymentMethod}
            onBack={() => setCurrentStep(2)}
            onPay={() => alert("Gerando QR Code Pix...")}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
