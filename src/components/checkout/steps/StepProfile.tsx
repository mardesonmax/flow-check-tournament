import { User, CheckCircle } from "lucide-react";
import { useState } from "react";
import type { ProfileData } from "@/components/checkout/ProfileModal";

interface StepProfileProps {
  profileComplete: boolean;
  onComplete: (data: ProfileData) => void;
  onContinue: () => void;
}

const StepProfile = ({ profileComplete, onComplete, onContinue }: StepProfileProps) => {
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

  const update = (field: keyof ProfileData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const requiredFields: (keyof ProfileData)[] = [
    "cpf", "telefone", "dataNascimento", "cep", "endereco", "numero", "bairro", "cidade", "estado",
  ];
  const canSave = requiredFields.every((f) => form[f].trim() !== "");

  if (profileComplete) {
    return (
      <div className="border border-border rounded-lg bg-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-5 h-5 text-primary" />
          <h2 className="font-mono text-lg font-semibold text-foreground">Perfil completo</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Seus dados estão preenchidos. Você pode continuar para a próxima etapa.
        </p>
        <button
          onClick={onContinue}
          className="font-mono text-sm font-bold bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Continuar
        </button>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg bg-card p-6">
      <div className="flex items-center gap-3 mb-1">
        <User className="w-5 h-5 text-muted-foreground" />
        <h2 className="font-mono text-lg font-semibold text-foreground">Complete seu perfil</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Precisamos de algumas informações para a sua inscrição.
      </p>

      <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">
        Informações básicas
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <InputField label="CPF *" placeholder="000.000.000-00" value={form.cpf} onChange={(v) => update("cpf", v)} />
        <InputField label="Telefone (WhatsApp) *" placeholder="(00) 9 0000-0000" value={form.telefone} onChange={(v) => update("telefone", v)} />
        <InputField label="Data de Nascimento *" placeholder="00/00/0000" value={form.dataNascimento} onChange={(v) => update("dataNascimento", v)} />
      </div>

      <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">
        Endereço
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
        <InputField label="CEP *" placeholder="00000-000" value={form.cep} onChange={(v) => update("cep", v)} />
        <InputField label="Endereço *" placeholder="Rua, avenida..." value={form.endereco} onChange={(v) => update("endereco", v)} />
        <InputField label="Número *" placeholder="000" value={form.numero} onChange={(v) => update("numero", v)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
        <InputField label="Bairro *" placeholder="Bairro" value={form.bairro} onChange={(v) => update("bairro", v)} />
        <InputField label="Cidade *" placeholder="Cidade" value={form.cidade} onChange={(v) => update("cidade", v)} />
        <InputField label="Estado *" placeholder="UF" value={form.estado} onChange={(v) => update("estado", v)} />
        <InputField label="Complemento" placeholder="Apartamento" value={form.complemento} onChange={(v) => update("complemento", v)} />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground max-w-xs">
          Essas informações são necessárias para confirmar sua inscrição.
        </p>
        <button
          disabled={!canSave}
          onClick={() => onComplete(form)}
          className={`font-mono text-sm font-bold px-8 py-3 rounded-lg transition-opacity ${
            canSave
              ? "bg-primary text-primary-foreground hover:opacity-90"
              : "bg-disabled text-disabled-foreground cursor-not-allowed"
          }`}
        >
          Salvar e continuar
        </button>
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

export default StepProfile;
