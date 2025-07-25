import { AuthLayout } from "@/components/layout/AuthLayout";
import { Card } from "@/components/ui/Card";
import { TypographyTitle, TypographySubtitle, ThemeToggle } from "@/components/ui";
import { LoginForm } from "@/components/auth/LoginForm";
import { styled } from "@/styles/stitches.config";

const ToggleContainer = styled("div", {
  position: "absolute",
  top: "1rem",
  right: "1rem",
  zIndex: 10,
});



export function Login() {
  return (
    <AuthLayout>
      <ToggleContainer>
        <ThemeToggle />
      </ToggleContainer>
      <Card maxWidth="md">
        <TypographyTitle>Bem-vindo</TypographyTitle>
        <TypographySubtitle>Entre na sua conta para continuar</TypographySubtitle>
        <LoginForm />
      </Card>
    </AuthLayout>
  );
}
