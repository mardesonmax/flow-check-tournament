import { ArrowLeft } from "lucide-react";
import TeamCard from "@/components/checkout/TeamCard";
import type { PlayerStatus } from "@/components/checkout/PlayerStatusBadge";

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
  isReused: boolean;
}

interface StepTeamProps {
  categories: CategoryData[];
  onToggleMyData: (catIndex: number) => void;
  onEditPlayer: (catIndex: number, playerIndex: number) => void;
  onSelectPlayer: (catIndex: number, playerIndex: number, name: string) => void;
  onInvitePlayer: (catIndex: number, playerIndex: number) => void;
  onReuseDupla: (catIndex: number) => void;
  onBack: () => void;
  onContinue: () => void;
}

const StepTeam = ({
  categories,
  onToggleMyData,
  onEditPlayer,
  onSelectPlayer,
  onInvitePlayer,
  onReuseDupla,
  onBack,
  onContinue,
}: StepTeamProps) => {
  const allReady = categories.every((cat) =>
    cat.players.every((p) => p.status === "filled" || p.status === "invited" || p.status === "reused")
  );

  return (
    <div className="space-y-4">
      {categories.map((cat, catIndex) => (
        <TeamCard
          key={catIndex}
          categoryNumber={cat.categoryNumber}
          categoryName={cat.categoryName}
          tournamentName={cat.tournamentName}
          price={cat.price}
          players={cat.players}
          useMyData={cat.useMyData}
          onToggleMyData={() => onToggleMyData(catIndex)}
          onEditPlayer={(playerIndex) => onEditPlayer(catIndex, playerIndex)}
          onSelectPlayer={(playerIndex, name) => onSelectPlayer(catIndex, playerIndex, name)}
          onInvitePlayer={(playerIndex) => onInvitePlayer(catIndex, playerIndex)}
          canReuseDupla={catIndex > 0 && !cat.isReused}
          isReused={cat.isReused}
          onReuseDupla={() => onReuseDupla(catIndex)}
        />
      ))}

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>
        <button
          disabled={!allReady}
          onClick={onContinue}
          className={`font-mono text-sm font-bold px-8 py-3 rounded-lg transition-opacity ${
            allReady
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
