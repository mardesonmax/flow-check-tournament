import { User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface FilledPlayer {
  name: string;
  source: string;
}

interface SelectPlayerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (name: string) => void;
  filledPlayers?: FilledPlayer[];
}

const MOCK_PLAYERS: FilledPlayer[] = [
  { name: "Lucas Silva", source: "Usado recentemente" },
  { name: "Pedro Santos", source: "Usado recentemente" },
];

const SelectPlayerModal = ({ open, onClose, onSelect, filledPlayers = [] }: SelectPlayerModalProps) => {
  // Merge filled players from categories + mock recent players, deduplicate by name
  const allPlayers = [...filledPlayers, ...MOCK_PLAYERS];
  const unique = allPlayers.filter(
    (p, i, arr) => arr.findIndex((x) => x.name === p.name) === i
  );

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-mono text-foreground">Selecionar jogador</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Jogadores disponíveis
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 pt-2">
          {unique.map((player, i) => (
            <button
              key={`${player.name}-${i}`}
              onClick={() => {
                onSelect(player.name);
                onClose();
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <span className="font-mono text-sm text-foreground">{player.name}</span>
                <p className="text-[10px] text-muted-foreground">{player.source}</p>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectPlayerModal;
