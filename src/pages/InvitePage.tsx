import { useState } from "react";
import { useParams } from "react-router-dom";
import { Check, User, Trophy, Users } from "lucide-react";
import { toast } from "sonner";

const InvitePage = () => {
  const { code } = useParams();
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = () => {
    if (!isValid) return;
    toast.success("Dados enviados com sucesso!");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-success" />
          </div>
          <div>
            <h1 className="font-mono text-xl font-bold text-foreground mb-2">Tudo certo!</h1>
            <p className="text-sm text-muted-foreground">
              Seus dados foram enviados com sucesso. Seu parceiro será notificado e a inscrição será atualizada.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-left space-y-2">
            <p className="font-mono text-xs text-muted-foreground">Resumo</p>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="font-mono text-sm text-foreground">{name}</span>
            </div>
            <p className="text-xs text-muted-foreground">Código do convite: {code}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
            <Users className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="font-mono text-xl font-bold text-foreground">Você foi convidado!</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Seu parceiro te convidou para jogar juntos.
            </p>
          </div>
        </div>

        {/* Tournament info */}
        <div className="bg-card border border-border rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm font-semibold text-foreground">Torneio Vera verão</span>
          </div>
          <p className="text-xs text-muted-foreground">Categoria A · Dupla</p>
          <p className="text-xs text-muted-foreground">Convidado por: <span className="text-foreground">THZ 777</span></p>
          <p className="font-mono text-[10px] text-muted-foreground">Código: {code}</p>
        </div>

        {/* Form */}
        <div className="bg-card border border-border rounded-lg p-4 space-y-4">
          <p className="font-mono text-sm font-semibold text-foreground">Preencha seus dados</p>

          <div className="space-y-1.5">
            <label className="font-mono text-xs text-muted-foreground">Nome completo *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
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

          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`w-full font-mono text-sm font-bold py-3 rounded-lg transition-colors ${
              isValid
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-disabled text-disabled-foreground cursor-not-allowed"
            }`}
          >
            Confirmar participação
          </button>
        </div>

        <p className="text-center text-[10px] text-muted-foreground">
          Ao confirmar, você aceita os termos e regulamento do torneio.
        </p>
      </div>
    </div>
  );
};

export default InvitePage;
