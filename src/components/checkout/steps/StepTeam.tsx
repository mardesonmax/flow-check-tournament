import { ArrowLeft } from "lucide-react";
import TeamCard from "@/components/checkout/TeamCard";

interface Player {
  name: string;
  filled: boolean;
}

interface StepTeamProps {
  players: Player[];
  useMyData: boolean;
  onToggleMyData: () => void;
  onEditPlayer: (index: number) => void;
  onBack: () => void;
  onContinue: () => void;
}

const StepTeam = ({
  players,
  useMyData,
  onToggleMyData,
  onEditPlayer,
  onBack,
  onContinue,
}: StepTeamProps) => {
  const allFilled = players.every((p) => p.filled);

  return (
    <div className="space-y-4">
      <TeamCard
        categoryNumber={1}
        categoryName="Categoria A"
        tournamentName="Torneio Vera verão"
        price="R$ 150,00"
        players={players}
        useMyData={useMyData}
        onToggleMyData={onToggleMyData}
        onEditPlayer={onEditPlayer}
      />

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>
        <button
          disabled={!allFilled}
          onClick={onContinue}
          className={`font-mono text-sm font-bold px-8 py-3 rounded-lg transition-opacity ${
            allFilled
              ? "bg-primary text-primary-foreground hover:opacity-90"
              : "bg-disabled text-disabled-foreground cursor-not-allowed"
          }`}
        >
          Continuar para pagamento
        </button>
      </div>
    </div>
  );
};

export default StepTeam;
