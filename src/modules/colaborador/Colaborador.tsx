import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

import { Button } from "@/components/ui";
import { FiPlus } from "react-icons/fi";

import { useColaboradores } from "@/hooks/useColaboradores";
import { ColaboradorList } from "./components/ColaboradorList";
import { ColaboradorForm } from "./components/ColaboradorForm";
import { ColaboradorDetails } from "./components/ColaboradorDetails";
import { PermissoesModal } from "./components/PermissoesModal";
import type { Colaborador } from "./types";

type ViewMode = "list" | "form" | "details" | "permissoes";

export function Colaborador() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedColaborador, setSelectedColaborador] =
    useState<Colaborador | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { deleteColaborador } = useColaboradores();

  const handleAddColaborador = () => {
    setSelectedColaborador(null);
    setIsEditing(false);
    setViewMode("form");
  };

  const handleEditColaborador = (colaborador: Colaborador) => {
    setSelectedColaborador(colaborador);
    setIsEditing(true);
    setViewMode("form");
  };

  const handleViewColaborador = (colaborador: Colaborador) => {
    setSelectedColaborador(colaborador);
    setViewMode("details");
  };

  const handleDeleteColaborador = async (colaborador: Colaborador) => {
    try {
      await deleteColaborador(colaborador.id);
      // Se estava visualizando o colaborador que foi deletado, voltar para a lista
      if (selectedColaborador?.id === colaborador.id) {
        setViewMode("list");
        setSelectedColaborador(null);
      }
    } catch (error) {
      console.error('Erro ao deletar colaborador:', error);
    }
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedColaborador(null);
    setIsEditing(false);
  };

  const handlePermissoes = (colaborador: Colaborador) => {
    setSelectedColaborador(colaborador);
    setViewMode("permissoes");
  };

  const renderContent = () => {
    switch (viewMode) {
      case "list":
        return (
          <ColaboradorList
            onEdit={handleEditColaborador}
            onView={handleViewColaborador}
            onDelete={handleDeleteColaborador}
          />
        );
      case "form":
        return (
          <ColaboradorForm
            colaborador={selectedColaborador}
            isEditing={isEditing}
            onSave={() => setViewMode("list")}
            onCancel={handleBackToList}
          />
        );
      case "details":
        return (
          <ColaboradorDetails
            colaborador={selectedColaborador!}
            onEdit={() => handleEditColaborador(selectedColaborador!)}
            onBack={handleBackToList}
            onPermissoes={() => handlePermissoes(selectedColaborador!)}
          />
        );
      case "permissoes":
        return (
          <PermissoesModal
            colaborador={selectedColaborador!}
            onSave={() => setViewMode("list")}
            onCancel={handleBackToList}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout title="Colaboradores">
      {viewMode === "list" && (
        <div style={{ 
          display: "flex", 
          justifyContent: "flex-end", 
          marginBottom: "1rem" 
        }}>
          <Button variant="fixed" onClick={handleAddColaborador} icon={<FiPlus />}>
            Novo Colaborador
          </Button>
        </div>
      )}
      
      {renderContent()}
    </DashboardLayout>
  );
}
