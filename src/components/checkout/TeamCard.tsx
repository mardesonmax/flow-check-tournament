import { AlertTriangle, ChevronDown, ChevronUp, User, Pencil, UserPlus, Link2, Users } from "lucide-react";
import { useState } from "react";
import InvitePlayerPanel from "@/components/checkout/InvitePlayerPanel";
import SelectPlayerModal from "@/components/checkout/SelectPlayerModal";
import PlayerStatusBadge, { type PlayerStatus } from "@/components/checkout/PlayerStatusBadge";

interface Player {
  name: string;
  filled: boolean;
  status: PlayerStatus;
}

interface FilledPlayer {
  name: string;
  source: string;
}

interface TeamCardProps {
  categoryNumber: number;
  categoryName: string;
  tournamentName: string;
  price: string;
  players: Player[];
  useMyData: boolean;
  onToggleMyData: () => void;
  onEditPlayer: (index: number) => void;
  onSelectPlayer: (index: number, name: string) => void;
  onInvitePlayer: (index: number) => void;
  filledPlayers?: FilledPlayer[];
}

const TeamCard = ({
  categoryNumber,
  categoryName,
  tournamentName,
  price,
  players,
  useMyData,
  onToggleMyData,
  onEditPlayer,
  onSelectPlayer,
  onInvitePlayer,
  filledPlayers = [],
}: TeamCardProps) => {
  const [expanded, setExpanded] = useState(true);
  const [showInviteFor, setShowInviteFor] = useState<number | null>(null);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [selectingForIndex, setSelectingForIndex] = useState<number>(1);

  const allFilled = players.every((p) => p.status === "filled" || p.status === "invited" || p.status === "reused");

  const headerStatus = allFilled ? "filled" : "empty";

  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-accent/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-pix flex items-center justify-center">
            <span className="font-mono text-sm font-bold text-pix-foreground">{categoryNumber}</span>
          </div>
          <div className="text-left">
            <p className="font-mono text-sm font-semibold text-foreground">{categoryName}</p>
            <p className="text-xs text-muted-foreground">{tournamentName}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-semibold text-foreground">{price}</span>
          <PlayerStatusBadge status={headerStatus} />
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          {/* Use my data toggle */}
          <div className="flex items-center justify-between bg-secondary rounded-lg p-3">
            <div>
              <p className="font-mono text-sm font-semibold text-foreground">Usar meus dados</p>
              <p className="text-xs text-muted-foreground">Usar meus dados para preencher o Jogador 1</p>
            </div>
            <button
              onClick={onToggleMyData}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                useMyData ? "bg-primary" : "bg-disabled"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-foreground transition-transform ${
                  useMyData ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Players */}
          {players.map((player, i) => (
            <div key={i} className="border border-border rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-foreground">Jogador {i + 1}</span>
                      <PlayerStatusBadge status={player.status} />
                    </div>
                    <p className={`text-xs ${player.filled ? "text-foreground" : "text-muted-foreground"}`}>
                      {player.status === "invited"
                        ? "Convite enviado — aguardando confirmação"
                        : player.filled
                          ? player.name
                          : i === 0
                            ? "Clique em editar para preencher os dados"
                            : ""}
                    </p>
                  </div>
                </div>
                {player.filled && (
                  <button
                    onClick={() => onEditPlayer(i)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Empty state for Jogador 2+ with action options */}
              {!player.filled && player.status === "empty" && i > 0 && showInviteFor !== i && (
                <div className="px-3 pb-3 space-y-2">
                  <p className="font-mono text-xs text-muted-foreground mb-2">Adicionar parceiro</p>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => onEditPlayer(i)}
                      className="flex items-center gap-2 bg-secondary hover:bg-accent text-foreground font-mono text-xs py-2.5 px-3 rounded-lg transition-colors"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      Preencher dados manualmente
                    </button>
                    <button
                      onClick={() => setShowInviteFor(i)}
                      className="flex items-center gap-2 bg-secondary hover:bg-accent text-foreground font-mono text-xs py-2.5 px-3 rounded-lg transition-colors"
                    >
                      <Link2 className="w-3.5 h-3.5" />
                      Convidar parceiro por link
                    </button>
                    <button
                      onClick={() => {
                        setSelectingForIndex(i);
                        setShowSelectModal(true);
                      }}
                      className="flex items-center gap-2 bg-secondary hover:bg-accent text-foreground font-mono text-xs py-2.5 px-3 rounded-lg transition-colors"
                    >
                      <Users className="w-3.5 h-3.5" />
                      Selecionar jogador existente
                    </button>
                  </div>
                </div>
              )}

              {/* Invite panel */}
              {showInviteFor === i && (
                <div className="px-3 pb-3">
                  <InvitePlayerPanel
                    onInviteSent={() => {
                      setShowInviteFor(null);
                      onInvitePlayer(i);
                    }}
                    onBack={() => setShowInviteFor(null)}
                  />
                </div>
              )}
            </div>
          ))}

          {/* Inline warning */}
          {!allFilled && (
            <div className="flex items-center gap-2 px-1">
              <AlertTriangle className="w-3.5 h-3.5 text-attention shrink-0" />
              <span className="font-mono text-xs text-attention">
                Preencha todos os jogadores para continuar.
              </span>
            </div>
          )}
        </div>
      )}

      <SelectPlayerModal
        open={showSelectModal}
        onClose={() => setShowSelectModal(false)}
        onSelect={(name) => onSelectPlayer(selectingForIndex, name)}
        filledPlayers={filledPlayers}
      />
    </div>
  );
};

export default TeamCard;
