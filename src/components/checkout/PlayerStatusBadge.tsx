import { Check, Clock, RefreshCw } from "lucide-react";

type PlayerStatus = "filled" | "empty" | "invited" | "reused";

interface PlayerStatusBadgeProps {
  status: PlayerStatus;
}

const config: Record<PlayerStatus, { label: string; icon: React.ReactNode; className: string }> = {
  filled: {
    label: "Confirmado",
    icon: <Check className="w-3 h-3" />,
    className: "bg-success/20 text-success",
  },
  empty: {
    label: "Pendente",
    icon: null,
    className: "bg-attention/20 text-attention",
  },
  invited: {
    label: "Aguardando parceiro",
    icon: <Clock className="w-3 h-3" />,
    className: "bg-attention/20 text-attention",
  },
  reused: {
    label: "Dupla reutilizada",
    icon: <RefreshCw className="w-3 h-3" />,
    className: "bg-primary/20 text-primary",
  },
};

const PlayerStatusBadge = ({ status }: PlayerStatusBadgeProps) => {
  const { label, icon, className } = config[status];

  return (
    <span className={`font-mono text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 ${className}`}>
      {icon}
      {label}
    </span>
  );
};

export default PlayerStatusBadge;
export type { PlayerStatus };
