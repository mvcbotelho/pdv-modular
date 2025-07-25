// src/routes/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/ui";

export function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <LoadingSpinner 
        fullScreen 
        text="Verificando autenticação..." 
        size="lg"
      />
    );
  }

  return user ? children : <Navigate to="/" replace />;
}
