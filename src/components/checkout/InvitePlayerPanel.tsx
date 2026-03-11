import { useState } from "react";
import { Link2, Copy, MessageCircle, Clock, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface InvitePlayerPanelProps {
  onInviteSent: () => void;
  onBack: () => void;
}

const InvitePlayerPanel = ({ onInviteSent, onBack }: InvitePlayerPanelProps) => {
  const [linkGenerated, setLinkGenerated] = useState(false);
  const mockLink = "gravae.app/convite/ABC123";

  const handleGenerateLink = () => {
    setLinkGenerated(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(mockLink).catch(() => {});
    toast.success("Link copiado!");
  };

  const handleSendWhatsApp = () => {
    toast.success("Link enviado via WhatsApp!");
    onInviteSent();
  };

  return (
    <div className="space-y-3">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-3 h-3" />
        Voltar
      </button>

      {!linkGenerated ? (
        <button
          onClick={handleGenerateLink}
          className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-accent text-foreground font-mono text-sm py-3 rounded-lg transition-colors"
        >
          <Link2 className="w-4 h-4" />
          Gerar link de convite
        </button>
      ) : (
        <div className="space-y-3">
          <div className="bg-secondary rounded-lg p-3">
            <p className="font-mono text-xs text-muted-foreground mb-1">Link de convite</p>
            <p className="font-mono text-sm text-foreground select-all">{mockLink}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCopyLink}
              className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent/80 text-foreground font-mono text-xs py-2.5 rounded-lg transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              Copiar link
            </button>
            <button
              onClick={handleSendWhatsApp}
              className="flex-1 flex items-center justify-center gap-2 bg-success hover:bg-success/90 text-success-foreground font-mono text-xs py-2.5 rounded-lg transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Enviar via WhatsApp
            </button>
          </div>

          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Clock className="w-3 h-3 shrink-0" />
            Envie este link para seu parceiro preencher os dados dele.
          </p>
        </div>
      )}
    </div>
  );
};

export default InvitePlayerPanel;
