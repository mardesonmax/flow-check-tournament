import { X, User } from "lucide-react";
import { useState } from "react";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: ProfileData) => void;
}

export interface ProfileData {
  cpf: string;
  telefone: string;
  dataNascimento: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento: string;
}

const ProfileModal = ({ open, onClose, onSave }: ProfileModalProps) => {
  const [form, setForm] = useState<ProfileData>({
    cpf: "",
    telefone: "",
    dataNascimento: "",
    cep: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    complemento: "",
  });

  if (!open) return null;

  const update = (field: keyof ProfileData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const requiredFields: (keyof ProfileData)[] = [
    "cpf", "telefone", "dataNascimento", "cep", "endereco", "numero", "bairro", "cidade", "estado",
  ];
  const canSave = requiredFields.every((f) => form[f].trim() !== "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg w-full max-w-lg mx-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-mono text-xl font-bold text-foreground">Complete seu perfil</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="border border-border rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="font-mono text-sm font-semibold text-foreground">Complete seu perfil</p>
              <p className="text-xs text-muted-foreground">Precisamos de mais algumas informações para a sua inscrição.</p>
            </div>
          </div>

          <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">Informações básicas</p>
          <div className="grid grid-cols-3 gap-3 mb-5">
            <InputField label="CPF*" placeholder="000.000.000-00" value={form.cpf} onChange={(v) => update("cpf", v)} />
            <InputField label="Telefone (Whatsapp)*" placeholder="(00) 9 0000-0000" value={form.telefone} onChange={(v) => update("telefone", v)} />
            <InputField label="Data de Nascimento*" placeholder="00/00/0000" value={form.dataNascimento} onChange={(v) => update("dataNascimento", v)} />
          </div>

          <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">Endereço</p>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <InputField label="CEP*" placeholder="00000-000" value={form.cep} onChange={(v) => update("cep", v)} />
            <InputField label="Endereço*" placeholder="Rua, avenida..." value={form.endereco} onChange={(v) => update("endereco", v)} />
            <InputField label="Número*" placeholder="000" value={form.numero} onChange={(v) => update("numero", v)} />
          </div>
          <div className="grid grid-cols-4 gap-3">
            <InputField label="Bairro*" placeholder="Bairro" value={form.bairro} onChange={(v) => update("bairro", v)} />
            <InputField label="Cidade*" placeholder="Cidade" value={form.cidade} onChange={(v) => update("cidade", v)} />
            <InputField label="Estado*" placeholder="UF" value={form.estado} onChange={(v) => update("estado", v)} />
            <InputField label="Complemento" placeholder="Apartamento" value={form.complemento} onChange={(v) => update("complemento", v)} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground max-w-xs">
            Essas informações são necessárias para confirmar sua inscrição nos torneios.
          </p>
          <button
            disabled={!canSave}
            onClick={() => onSave(form)}
            className={`font-mono text-sm font-semibold px-6 py-2 rounded transition-opacity ${
              canSave
                ? "bg-pix text-pix-foreground hover:opacity-90"
                : "bg-disabled text-disabled-foreground cursor-not-allowed"
            }`}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <label className="font-mono text-xs text-muted-foreground mb-1 block">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
    />
  </div>
);

export default ProfileModal;
