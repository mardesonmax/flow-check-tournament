import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import ChecklistStatus from "@/components/checkout/ChecklistStatus";
import ProfileBanner from "@/components/checkout/ProfileBanner";
import ProfileModal from "@/components/checkout/ProfileModal";
import TeamCard from "@/components/checkout/TeamCard";
import PaymentSection from "@/components/checkout/PaymentSection";
import OrderSummary from "@/components/checkout/OrderSummary";
import type { ProfileData } from "@/components/checkout/ProfileModal";

const Index = () => {
  const [profileComplete, setProfileComplete] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [useMyData, setUseMyData] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "pix">("pix");

  const [players, setPlayers] = useState([
    { name: "THZ 777", filled: true },
    { name: "", filled: false },
  ]);

  const allPlayersFilled = players.every((p) => p.filled);
  const canPay = profileComplete && allPlayersFilled;

  const steps = [
    {
      label: "Perfil completo",
      status: profileComplete ? ("complete" as const) : ("incomplete" as const),
    },
    {
      label: "Preencher dados da dupla",
      status: allPlayersFilled ? ("complete" as const) : ("incomplete" as const),
    },
    {
      label: "Pagamento",
      status: canPay ? ("complete" as const) : ("locked" as const),
    },
  ];

  const handleSaveProfile = (data: ProfileData) => {
    setProfileComplete(true);
    setProfileModalOpen(false);
  };

  const handleEditPlayer = (index: number) => {
    // Simulate filling player 2
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
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Back */}
        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-mono text-sm">Voltar</span>
        </button>

        {/* Title */}
        <h1 className="font-mono text-2xl font-bold text-foreground mb-1">Finalizar Inscrição</h1>
        <p className="text-sm text-muted-foreground mb-6">1 categoria no carrinho</p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left column */}
          <div className="lg:col-span-3 space-y-4">
            {/* Checklist */}
            <ChecklistStatus steps={steps} />

            {/* Profile banner */}
            <ProfileBanner
              isComplete={profileComplete}
              onCompleteProfile={() => setProfileModalOpen(true)}
            />

            {/* Warning banner for duplas */}
            {!allPlayersFilled && (
              <div className="border border-attention/40 bg-attention/10 rounded-lg p-4 flex items-center gap-3">
                <span className="text-attention text-lg">⚠</span>
                <span className="font-mono text-sm text-attention">
                  Preencha os dados de todas as duplas antes de pagar!
                </span>
              </div>
            )}

            {/* Teams */}
            <div>
              <h2 className="font-mono text-sm font-semibold text-foreground mb-3">Duplas por Categoria</h2>
              <TeamCard
                categoryNumber={1}
                categoryName="Categoria A"
                tournamentName="Torneio Vera verão"
                price="R$ 150,00"
                players={players}
                useMyData={useMyData}
                onToggleMyData={() => setUseMyData(!useMyData)}
                onEditPlayer={handleEditPlayer}
              />
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 space-y-4">
            <PaymentSection
              selectedMethod={paymentMethod}
              onSelectMethod={setPaymentMethod}
            />
            <OrderSummary canPay={canPay} onPay={() => alert("Gerando QR Code Pix...")} />
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default Index;
