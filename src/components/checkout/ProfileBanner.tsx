import { AlertTriangle, User } from "lucide-react";

interface ProfileBannerProps {
  isComplete: boolean;
  onCompleteProfile: () => void;
}

const ProfileBanner = ({ isComplete, onCompleteProfile }: ProfileBannerProps) => {
  if (isComplete) return null;

  return (
    <div className="border border-attention/40 bg-attention/10 rounded-lg p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-attention shrink-0" />
        <span className="font-mono text-sm text-attention">
          Complete seu perfil para finalizar sua inscrição.
        </span>
      </div>
      <button
        onClick={onCompleteProfile}
        className="font-mono text-xs font-semibold bg-attention text-attention-foreground px-4 py-2 rounded shrink-0 hover:opacity-90 transition-opacity"
      >
        Completar perfil
      </button>
    </div>
  );
};

export default ProfileBanner;
