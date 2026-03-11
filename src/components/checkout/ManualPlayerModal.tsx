import { useState } from "react";
import { X, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface ManualPlayerModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  playerLabel: string;
}

const ManualPlayerModal = ({ open, onClose, onSave, playerLabel }: ManualPlayerModalProps) => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const formatCpf = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const isValid = name.trim().length >= 3 && cpf.replace(/\D/g, "").length === 11;

  const handleSave = () => {
    if (!isValid) return;
    toast.success(`${name} adicionado como ${playerLabel}`);
    onSave(name.trim());
    setName("");
    setCpf("");
    setPhone("");
    setEmail("");
  };

  const handleClose = () => {
    setName("");
    setCpf("");
    setPhone("");
    setEmail("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-mono text-foreground flex items-center gap-2">
            <User className="w-4 h-4" />
            Preencher dados — {playerLabel}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Insira os dados do jogador manualmente.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="font-mono text-xs text-muted-foreground">Nome completo *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Lucas Silva"
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-xs text-muted-foreground">CPF *</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(formatCpf(e.target.value))}
              placeholder="000.000.000-00"
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-xs text-muted-foreground">Telefone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              placeholder="(00) 00000-0000"
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-xs text-muted-foreground">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jogador@email.com"
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleClose}
              className="flex-1 font-mono text-sm py-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={!isValid}
              className={`flex-1 font-mono text-sm font-bold py-2.5 rounded-lg transition-colors ${
                isValid
                  ? "bg-primary text-primary-foreground hover:opacity-90"
                  : "bg-disabled text-disabled-foreground cursor-not-allowed"
              }`}
            >
              Salvar jogador
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManualPlayerModal;
