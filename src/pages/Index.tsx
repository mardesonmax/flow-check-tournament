import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import StepIndicator from "@/components/checkout/StepIndicator";
import StepProfile from "@/components/checkout/steps/StepProfile";
import StepTeam from "@/components/checkout/steps/StepTeam";
import StepPayment from "@/components/checkout/steps/StepPayment";
import type { ProfileData } from "@/components/checkout/ProfileModal";
import type { PlayerStatus } from "@/components/checkout/PlayerStatusBadge";

const STEPS = ["Perfil", "Dupla", "Pagamento"];

interface Player {
  name: string;
  filled: boolean;
  status: PlayerStatus;
}

interface CategoryData {
  categoryNumber: number;
  categoryName: string;
  tournamentName: string;
  price: string;
  players: Player[];
  useMyData: boolean;
}

const initialCategories: CategoryData[] = [
  {
    categoryNumber: 1,
    categoryName: "Categoria A",
    tournamentName: "Torneio Vera verão",
    price: "R$ 150,00",
    players: [
      { name: "THZ 777", filled: true, status: "filled" },
      { name: "", filled: false, status: "empty" },
    ],
    useMyData: true,
  },
  {
    categoryNumber: 2,
    categoryName: "Categoria B",
    tournamentName: "Torneio Vera verão",
    price: "R$ 150,00",
    players: [
      { name: "THZ 777", filled: true, status: "filled" },
      { name: "", filled: false, status: "empty" },
    ],
    useMyData: true,
  },
  {
    categoryNumber: 3,
    categoryName: "Categoria C",
    tournamentName: "Torneio Vera verão",
    price: "R$ 150,00",
    players: [
      { name: "THZ 777", filled: true, status: "filled" },
      { name: "", filled: false, status: "empty" },
    ],
    useMyData: true,
  },
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileComplete, setProfileComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "pix">("pix");
  const [categories, setCategories] = useState<CategoryData[]>(initialCategories);

  const handleSaveProfile = (data: ProfileData) => {
    setProfileComplete(true);
    setCurrentStep(2);
  };

  const handleEditPlayer = (catIndex: number, playerIndex: number) => {
    setCategories((prev) =>
      prev.map((cat, ci) =>
        ci === catIndex
          ? {
              ...cat,
              players: cat.players.map((p, pi) =>
                pi === playerIndex
                  ? { name: pi === 0 ? "THZ 777" : "Jogador Manual", filled: true, status: "filled" as PlayerStatus }
                  : p
              ),
            }
          : cat
      )
    );
  };

  const handleSelectPlayer = (catIndex: number, playerIndex: number, name: string) => {
    setCategories((prev) =>
      prev.map((cat, ci) =>
        ci === catIndex
          ? {
              ...cat,
              players: cat.players.map((p, pi) =>
                pi === playerIndex ? { name, filled: true, status: "filled" as PlayerStatus } : p
              ),
            }
          : cat
      )
    );
  };

  const handleInvitePlayer = (catIndex: number, playerIndex: number) => {
    setCategories((prev) =>
      prev.map((cat, ci) =>
        ci === catIndex
          ? {
              ...cat,
              players: cat.players.map((p, pi) =>
                pi === playerIndex
                  ? { name: "", filled: false, status: "invited" as PlayerStatus }
                  : p
              ),
            }
          : cat
      )
    );
  };

  const handleToggleMyData = (catIndex: number) => {
    setCategories((prev) =>
      prev.map((cat, ci) =>
        ci === catIndex ? { ...cat, useMyData: !cat.useMyData } : cat
      )
    );
  };

  const totalCategories = categories.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-mono text-sm">Voltar</span>
        </button>

        <h1 className="font-mono text-2xl font-bold text-foreground mb-1">Finalizar Inscrição</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {totalCategories} {totalCategories === 1 ? "categoria" : "categorias"} no carrinho
        </p>

        <div className="mb-8">
          <StepIndicator currentStep={currentStep} steps={STEPS} />
        </div>

        {currentStep === 1 && (
          <StepProfile
            profileComplete={profileComplete}
            onComplete={handleSaveProfile}
            onContinue={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <StepTeam
            categories={categories}
            onToggleMyData={handleToggleMyData}
            onEditPlayer={handleEditPlayer}
            onSelectPlayer={handleSelectPlayer}
            onInvitePlayer={handleInvitePlayer}
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
