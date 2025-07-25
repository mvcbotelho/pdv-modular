import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Login } from "@/modules/auth/Login";
import { ForgotPassword } from "@/modules/auth/ForgotPassword";
import { Dashboard } from "@/modules/dashboard/Dashboard";
import { PrivateRoute } from "@/routes/PrivateRoute";
import { AuthProvider } from "@/context/AuthProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ToastContainer, LoadingSpinner } from "@/components/ui";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Lazy loading para módulos
const Agendamentos = lazy(() => import("@/modules/agendamentos/Agendamentos").then(module => ({ default: module.Agendamentos })));
const Estoque = lazy(() => import("@/modules/estoque/Estoque").then(module => ({ default: module.Estoque })));
const Caixa = lazy(() => import("@/modules/caixa/Caixa").then(module => ({ default: module.Caixa })));
const Clientes = lazy(() => import("@/modules/clientes/Clientes").then(module => ({ default: module.Clientes })));
const Colaborador = lazy(() => import("@/modules/colaborador/Colaborador").then(module => ({ default: module.Colaborador })));
const Configuracoes = lazy(() => import("@/modules/configuracoes/Configuracoes").then(module => ({ default: module.Configuracoes })));

// Componente de loading para lazy routes
const LazyRouteWrapper = ({ children }: { children: React.ReactElement }) => (
  <Suspense fallback={
    <LoadingSpinner 
      fullScreen 
      text="Carregando módulo..." 
      size="lg"
    />
  }>
    {children}
  </Suspense>
);

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Rotas públicas */}
              <Route path="/" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* Rotas privadas */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/agendamentos"
                element={
                  <PrivateRoute>
                    <LazyRouteWrapper>
                      <Agendamentos />
                    </LazyRouteWrapper>
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/estoque"
                element={
                  <PrivateRoute>
                    <LazyRouteWrapper>
                      <Estoque />
                    </LazyRouteWrapper>
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/caixa"
                element={
                  <PrivateRoute>
                    <LazyRouteWrapper>
                      <Caixa />
                    </LazyRouteWrapper>
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/clientes"
                element={
                  <PrivateRoute>
                    <LazyRouteWrapper>
                      <Clientes />
                    </LazyRouteWrapper>
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/colaborador"
                element={
                  <PrivateRoute>
                    <LazyRouteWrapper>
                      <Colaborador />
                    </LazyRouteWrapper>
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/configuracoes"
                element={
                  <PrivateRoute>
                    <LazyRouteWrapper>
                      <Configuracoes />
                    </LazyRouteWrapper>
                  </PrivateRoute>
                }
              />
              
              {/* Fallback para rotas não encontradas */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <ToastContainer />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
