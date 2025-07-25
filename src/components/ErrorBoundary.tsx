import React from "react";
import { Button, Card, TypographyTitle, TypographyText } from "@/components/ui";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />;
      }

      return (
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          minHeight: "100vh",
          padding: "2rem"
        }}>
          <Card maxWidth="md">
            <TypographyTitle>Ops! Algo deu errado 😅</TypographyTitle>
            <TypographyText>
              Ocorreu um erro inesperado. Tente recarregar a página ou entre em contato com o suporte.
            </TypographyText>
            
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details style={{ marginTop: "1rem", padding: "1rem", background: "var(--background-secondary)", borderRadius: "8px" }}>
                <summary style={{ cursor: "pointer", color: "var(--error)" }}>
                  Detalhes do erro (desenvolvimento)
                </summary>
                <pre style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                  {this.state.error.message}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            
            <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
              <Button onClick={() => window.location.reload()}>
                Recarregar Página
              </Button>
              <Button variant="secondary" onClick={this.resetError}>
                Tentar Novamente
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
} 