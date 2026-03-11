import { Check, AlertTriangle, ChevronDown, ChevronUp, User, Pencil, Mail } from "lucide-react";
import { useState } from "react";

interface Player {
  name: string;
  filled: boolean;
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
}: TeamCardProps) => {
  const [expanded, setExpanded] = useState(true);
  const allFilled = players.every((p) => p.filled);

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
          <span
            className={`font-mono text-xs px-3 py-1 rounded-full ${
              allFilled
                ? "bg-success/20 text-success"
                : "bg-attention/20 text-attention"
            }`}
          >
            {allFilled ? "Completo" : "Pendente"}
          </span>
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
            <div
              key={i}
              className="flex items-center justify-between border border-border rounded-lg p-3"
            >
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-foreground">Jogador {i + 1}</span>
                    {player.filled ? (
                      <Check className="w-3.5 h-3.5 text-primary" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-attention" />
                    )}
                  </div>
                  <p className={`text-xs ${player.filled ? "text-foreground" : "text-muted-foreground"}`}>
                    {player.filled ? player.name : "Clique em editar para preencher os dados"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!player.filled && i === 1 && (
                  <span className="font-mono text-[10px] bg-secondary text-muted-foreground px-2 py-1 rounded flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Convite será enviado
                  </span>
                )}
                <button
                  onClick={() => onEditPlayer(i)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
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
    </div>
  );
};

export default TeamCard;
