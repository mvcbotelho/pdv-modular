import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { Button, Input, Divider, ErrorMessage, useToast } from "@/components/ui";
import { styled } from "@/styles/stitches.config";

const ForgotPasswordLink = styled(Link, {
  display: "block",
  textAlign: "center",
  color: "var(--text-secondary)",
  textDecoration: "none",
  fontSize: "0.875rem",
  marginTop: "1rem",
  transition: "color 0.3s ease",
  
  "&:hover": {
    color: "var(--text-primary)",
  },
});

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailStatus, setEmailStatus] = useState<"success" | "error" | "warning" | undefined>();
  const [passwordStatus, setPasswordStatus] = useState<"success" | "error" | "warning" | undefined>();

  const navigate = useNavigate();
  const { success, error: showError } = useToast();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);



  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setError("");
    setEmailStatus(undefined);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setError("");
    setPasswordStatus(undefined);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      success("Login realizado com sucesso! 🎉");
      navigate("/dashboard");
    } catch (err: unknown) {
      console.error("Erro ao logar:", err);
      
      let errorMessage = "Erro ao fazer login";
      
      if (err && typeof err === 'object' && 'code' in err) {
        const errorCode = (err as { code: string }).code;
        if (errorCode === "auth/user-not-found") {
          errorMessage = "Usuário não encontrado";
        } else if (errorCode === "auth/wrong-password") {
          errorMessage = "Senha incorreta";
        } else if (errorCode === "auth/invalid-email") {
          errorMessage = "Email inválido";
        } else if (errorCode === "auth/too-many-requests") {
          errorMessage = "Muitas tentativas. Tente novamente em alguns minutos";
        }
      }
      
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");

    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      success("Login com Google realizado com sucesso! 🎉");
      navigate("/dashboard");
    } catch (err: unknown) {
      console.error("Erro ao logar com Google:", err);
      
      let errorMessage = "Não foi possível entrar com Google";
      
      if (err && typeof err === 'object' && 'code' in err) {
        const errorCode = (err as { code: string }).code;
        if (errorCode === "auth/popup-closed-by-user") {
          errorMessage = "Login cancelado pelo usuário";
        } else if (errorCode === "auth/popup-blocked") {
          errorMessage = "Popup bloqueado. Permita popups para este site";
        }
      }
      
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getEmailStatusMessage = () => {
    if (emailStatus === "error") return "Email inválido";
    return "";
  };

  const getPasswordStatusMessage = () => {
    if (passwordStatus === "error") return "Senha inválida";
    return "";
  };

  return (
    <form onSubmit={handleLogin}>
      <Input
        id="email"
        type="email"
        label="E-mail"
        placeholder="seu@email.com"
        value={email}
        onChange={handleEmailChange}
        status={emailStatus}
        statusMessage={getEmailStatusMessage()}
        required
      />

      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        label="Senha"
        placeholder="Digite sua senha"
        value={password}
        onChange={handlePasswordChange}
        status={passwordStatus}
        statusMessage={getPasswordStatusMessage()}
        icon={
          showPassword ? (
            <FiEyeOff size={20} />
          ) : (
            <FiEye size={20} />
          )
        }
        onIconClick={togglePasswordVisibility}
        required
      />

      {error && <ErrorMessage message={error} />}

      <Button 
        type="submit" 
        loading={isLoading}
        disabled={isLoading}
      >
        Entrar
      </Button>

      <ForgotPasswordLink to="/forgot-password">
        Esqueci minha senha
      </ForgotPasswordLink>

      <Divider>ou entre com</Divider>

      <Button
        type="button"
        variant="secondary"
        onClick={handleGoogleLogin}
        loading={isLoading}
        disabled={isLoading}
        icon={
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            style={{ width: "20px", height: "20px" }}
          />
        }
      >
        Entrar com Google
      </Button>
    </form>
  );
} 