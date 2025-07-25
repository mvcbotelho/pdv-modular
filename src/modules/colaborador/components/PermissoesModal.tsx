import { useState } from "react";
import { styled } from "@/styles/stitches.config";
import { Button, TypographyTitle, TypographyText, useToast } from "@/components/ui";
import { FiSave, FiEye, FiEdit, FiTrash2, FiPlus, FiShield } from "react-icons/fi";

import type { Colaborador, Permissao, ModuloSistema } from "../types";

const ModalOverlay = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  padding: "1rem",
});

const ModalContent = styled("div", {
  background: "var(--background)",
  borderRadius: 12,
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  maxWidth: "800px",
  width: "100%",
  maxHeight: "90vh",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
});

const ModalHeader = styled("div", {
  padding: "1.5rem",
  borderBottom: "1px solid var(--border)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const ModalBody = styled("div", {
  padding: "1.5rem",
  overflowY: "auto",
  flex: 1,
});

const ModalFooter = styled("div", {
  padding: "1.5rem",
  borderTop: "1px solid var(--border)",
  display: "flex",
  gap: "1rem",
  justifyContent: "flex-end",
});

const PermissaoCard = styled("div", {
  padding: "1rem",
  border: "1px solid var(--border)",
  borderRadius: 8,
  marginBottom: "1rem",
  background: "var(--background-secondary)",
});

const PermissaoHeader = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",
});

const ModuloName = styled("h3", {
  fontSize: "1rem",
  fontWeight: "600",
  color: "var(--text-primary)",
});

const PermissaoGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  gap: "1rem",
});

const PermissaoItem = styled("label", {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "0.875rem",
  color: "var(--text-primary)",
  cursor: "pointer",
  padding: "0.5rem",
  borderRadius: 4,
  transition: "background 0.2s ease",

  "&:hover": {
    background: "var(--background)",
  },
});

const Checkbox = styled("input", {
  width: "16px",
  height: "16px",
  accentColor: "var(--primary)",
});



const modulosSistema: { value: ModuloSistema; label: string; icon: string }[] = [
  { value: "dashboard", label: "Dashboard", icon: "📊" },
  { value: "agendamentos", label: "Agendamentos", icon: "📅" },
  { value: "estoque", label: "Estoque", icon: "📦" },
  { value: "caixa", label: "Caixa", icon: "💰" },
  { value: "clientes", label: "Clientes", icon: "👥" },
  { value: "colaborador", label: "Colaboradores", icon: "👤" },
  { value: "configuracoes", label: "Configurações", icon: "⚙️" },
];

interface PermissoesModalProps {
  colaborador: Colaborador;
  onSave: () => void;
  onCancel: () => void;
}

export function PermissoesModal({ colaborador, onSave, onCancel }: PermissoesModalProps) {
  const [permissoes, setPermissoes] = useState<Permissao[]>(colaborador.permissoes);
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();
  // TODO: Implementar updatePermissoes quando necessário
  const updatePermissoes = async (id: string, permissoes: Permissao[]) => {
    console.log('Atualizando permissões:', id, permissoes);
    // Implementar quando necessário
  };

  const handlePermissaoChange = (modulo: ModuloSistema, tipo: keyof Omit<Permissao, 'modulo'>, value: boolean) => {
    setPermissoes(prev => {
      const existing = prev.find(p => p.modulo === modulo);
      if (existing) {
        return prev.map(p => 
          p.modulo === modulo ? { ...p, [tipo]: value } : p
        );
      } else {
        return [...prev, {
          modulo,
          visualizar: tipo === 'visualizar' ? value : false,
          criar: tipo === 'criar' ? value : false,
          editar: tipo === 'editar' ? value : false,
          excluir: tipo === 'excluir' ? value : false,
        }];
      }
    });
  };

  const getPermissao = (modulo: ModuloSistema): Permissao => {
    return permissoes.find(p => p.modulo === modulo) || {
      modulo,
      visualizar: false,
      criar: false,
      editar: false,
      excluir: false,
    };
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Salvar permissões no Firebase
      await updatePermissoes(colaborador.id, permissoes);
      success("Permissões atualizadas com sucesso! ✅");
      onSave();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao salvar permissões. Tente novamente.";
      error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay onClick={onCancel}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <div>
            <TypographyTitle>
              <FiShield size={20} style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
              Gerenciar Permissões
            </TypographyTitle>
            <TypographyText>
              Configure as permissões de acesso para {colaborador.nome}
            </TypographyText>
          </div>
        </ModalHeader>

        <ModalBody>
          {modulosSistema.map((modulo) => {
            const permissao = getPermissao(modulo.value);
            
            return (
              <PermissaoCard key={modulo.value}>
                <PermissaoHeader>
                  <ModuloName>
                    {modulo.icon} {modulo.label}
                  </ModuloName>
                </PermissaoHeader>
                
                <PermissaoGrid>
                  <PermissaoItem>
                    <Checkbox
                      type="checkbox"
                      checked={permissao.visualizar}
                      onChange={(e) => handlePermissaoChange(modulo.value, 'visualizar', e.target.checked)}
                    />
                    <FiEye size={14} />
                    Visualizar
                  </PermissaoItem>
                  
                  <PermissaoItem>
                    <Checkbox
                      type="checkbox"
                      checked={permissao.criar}
                      onChange={(e) => handlePermissaoChange(modulo.value, 'criar', e.target.checked)}
                    />
                    <FiPlus size={14} />
                    Criar
                  </PermissaoItem>
                  
                  <PermissaoItem>
                    <Checkbox
                      type="checkbox"
                      checked={permissao.editar}
                      onChange={(e) => handlePermissaoChange(modulo.value, 'editar', e.target.checked)}
                    />
                    <FiEdit size={14} />
                    Editar
                  </PermissaoItem>
                  
                  <PermissaoItem>
                    <Checkbox
                      type="checkbox"
                      checked={permissao.excluir}
                      onChange={(e) => handlePermissaoChange(modulo.value, 'excluir', e.target.checked)}
                    />
                    <FiTrash2 size={14} />
                    Excluir
                  </PermissaoItem>
                </PermissaoGrid>
              </PermissaoCard>
            );
          })}
        </ModalBody>

        <ModalFooter>
          <Button variant="cancel" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            loading={loading}
            icon={<FiSave />}
          >
            Salvar Permissões
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
} 