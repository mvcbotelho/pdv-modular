import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/config/firebase";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Card } from "@/components/ui/Card";
import {
  TypographyTitle,
  TypographySubtitle,
  TypographyText,
  Button,
  Input,
  useToast,
  ThemeToggle,
} from "@/components/ui";
import { styled } from "@/styles/stitches.config";
import { FiArrowLeft } from "react-icons/fi";

const ToggleContainer = styled("div", {
  position: "absolute",
  top: "1rem",
  right: "1rem",
  zIndex: 10,
});

const BackLink = styled(Link, {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  color: "var(--text-secondary)",
  textDecoration: "none",
  fontSize: "0.875rem",
  marginBottom: "1rem",
  transition: "color 0.3s ease",

  "&:hover": {
    color: "var(--text-primary)",
  },
});

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { success, error: showError } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
      success(
        "Email de recuperação enviado! Verifique sua caixa de entrada 📧"
      );
    } catch (err: unknown) {
      console.error("Erro ao enviar email:", err);

      let errorMessage = "Erro ao enviar email de recuperação";

      if (err && typeof err === 'object' && 'code' in err) {
        const errorCode = (err as { code: string }).code;
        if (errorCode === "auth/user-not-found") {
          errorMessage = "Email não encontrado";
        } else if (errorCode === "auth/invalid-email") {
          errorMessage = "Email inválido";
        } else if (errorCode === "auth/too-many-requests") {
          errorMessage = "Muitas tentativas. Tente novamente em alguns minutos";
        }
      }

      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <AuthLayout>
        <ToggleContainer>
          <ThemeToggle />
        </ToggleContainer>
        <Card maxWidth="md">
          <TypographyTitle>Email Enviado! 📧</TypographyTitle>
          <TypographySubtitle>
            Verifique sua caixa de entrada e spam
          </TypographySubtitle>

          <div style={{ marginBottom: "3rem", textAlign: "center" }}>
            <TypographyText>
              Enviamos um link de recuperação para <strong>{email}</strong>
            </TypographyText>
          </div>

          <div style={{ marginTop: "3rem" }}>
            <Button>
              <Link to="/">Voltar ao Login</Link>
            </Button>
          </div>
        </Card>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <ToggleContainer>
        <ThemeToggle />
      </ToggleContainer>
      <Card maxWidth="md">
        <BackLink to="/">
          <FiArrowLeft size={16} />
          Voltar ao login
        </BackLink>

        <TypographyTitle>Recuperar Senha</TypographyTitle>
        <TypographySubtitle>
          Digite seu email para receber o link de recuperação
        </TypographySubtitle>

        <form onSubmit={handleSubmit}>
          <Input
            id="email"
            type="email"
            label="E-mail"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div style={{ marginTop: "2rem" }}>
            <Button type="submit" loading={isLoading} disabled={isLoading}>
              Enviar Email
            </Button>
          </div>
        </form>
      </Card>
    </AuthLayout>
  );
}
