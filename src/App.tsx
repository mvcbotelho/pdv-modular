import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "@/modules/auth/Login";
import { ForgotPassword } from "@/modules/auth/ForgotPassword";
import { Dashboard } from "@/modules/dashboard/Dashboard";
import { PrivateRoute } from "@/routes/PrivateRoute";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastContainer } from "@/components/ui";

import { DashboardLayout } from "@/components/layout/DashboardLayout";

// Páginas temporárias para os módulos
const Agendamentos = () => (
  <DashboardLayout title="Agendamentos">
    <div>Agendamentos - Em desenvolvimento</div>
  </DashboardLayout>
);
const Estoque = () => (
  <DashboardLayout title="Estoque">
    <div>Estoque - Em desenvolvimento</div>
  </DashboardLayout>
);
const Caixa = () => (
  <DashboardLayout title="Caixa">
    <div>Caixa - Em desenvolvimento</div>
  </DashboardLayout>
);
const Clientes = () => (
  <DashboardLayout title="Clientes">
    <div>Clientes - Em desenvolvimento</div>
  </DashboardLayout>
);
const Colaborador = () => (
  <DashboardLayout title="Colaborador">
    <div>Colaborador - Em desenvolvimento</div>
  </DashboardLayout>
);
const Configuracoes = () => (
  <DashboardLayout title="Configurações">
    <div>Configurações - Em desenvolvimento</div>
  </DashboardLayout>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
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
                  <Agendamentos />
                </PrivateRoute>
              }
            />
            <Route
              path="/estoque"
              element={
                <PrivateRoute>
                  <Estoque />
                </PrivateRoute>
              }
            />
            <Route
              path="/caixa"
              element={
                <PrivateRoute>
                  <Caixa />
                </PrivateRoute>
              }
            />
            <Route
              path="/clientes"
              element={
                <PrivateRoute>
                  <Clientes />
                </PrivateRoute>
              }
            />
            <Route
              path="/colaborador"
              element={
                <PrivateRoute>
                  <Colaborador />
                </PrivateRoute>
              }
            />
            <Route
              path="/configuracoes"
              element={
                <PrivateRoute>
                  <Configuracoes />
                </PrivateRoute>
              }
            />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
