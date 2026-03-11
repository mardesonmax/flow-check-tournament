import { User, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface MockPlayer {
  name: string;
  id: string;
}

const MOCK_PLAYERS: MockPlayer[] = [
  { name: "Player2", id: "1" },
  { name: "Lucas Silva", id: "2" },
  { name: "Pedro Santos", id: "3" },
];

interface SelectPlayerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (name: string) => void;
}

const SelectPlayerModal = ({ open, onClose, onSelect }: SelectPlayerModalProps) => {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-mono text-foreground">Selecionar jogador</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Jogadores usados recentemente
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 pt-2">
          {MOCK_PLAYERS.map((player) => (
            <button
              key={player.id}
              onClick={() => {
                onSelect(player.name);
                onClose();
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="font-mono text-sm text-foreground">{player.name}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectPlayerModal;
