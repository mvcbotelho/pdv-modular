import { useState, useEffect } from "react";
import { styled } from "@/styles/stitches.config";
import { Button, Card, TypographyText, LoadingSpinner } from "@/components/ui";
import { FiEdit, FiEye, FiX, FiTrash2 } from "react-icons/fi";
import { useColaboradores } from "@/hooks/useColaboradores";
import { formatPhone } from "../utils";
import type { Colaborador } from "../types";

const ListContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const SearchContainer = styled("div", {
  display: "flex",
  gap: "0.5rem",
  marginBottom: "1rem",
  alignItems: "center",
});

const SearchInputContainer = styled("div", {
  position: "relative",
  flex: 1,
  display: "flex",
  alignItems: "center",
});

const SearchInput = styled("input", {
  width: "100%",
  padding: "0.75rem 1rem",
  paddingRight: "2.5rem",
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--background-secondary)",
  color: "var(--text-primary)",
  fontSize: "0.9rem",
  outline: "none",
  transition: "all 0.3s ease",

  "&:focus": {
    borderColor: "var(--primary)",
    boxShadow: "0 0 0 2px var(--primary)",
  },

  "&::placeholder": {
    color: "var(--text-muted)",
  },
});




const ClearButton = styled("button", {
  position: "absolute",
  right: "0.75rem",
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "0.25rem",
  borderRadius: "50%",
  color: "var(--text-muted)",
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    color: "var(--text-primary)",
    backgroundColor: "var(--background)",
  },
});

const ColaboradorCard = styled(Card, {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1.5rem",
  cursor: "pointer",
  transition: "all 0.3s ease",

  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
  },
});

const ColaboradorInfo = styled("div", {
  flex: 1,
});

const ColaboradorName = styled("h3", {
  fontSize: "1.1rem",
  fontWeight: "600",
  color: "var(--text-primary)",
  marginBottom: "0.25rem",
});

const ColaboradorDetails = styled("div", {
  display: "flex",
  gap: "2rem",
  fontSize: "0.875rem",
  color: "var(--text-secondary)",
});

const StatusBadge = styled("span", {
  padding: "0.25rem 0.75rem",
  borderRadius: "20px",
  fontSize: "0.75rem",
  fontWeight: "500",
  textTransform: "uppercase",

  variants: {
    status: {
      ativo: {
        background: "var(--success)",
        color: "white",
      },
      inativo: {
        background: "var(--error)",
        color: "white",
      },
      suspenso: {
        background: "var(--warning)",
        color: "white",
      },
    },
  },
});

const ActionsContainer = styled("div", {
  display: "flex",
  gap: "0.5rem",
});

const EmptyState = styled("div", {
  textAlign: "center",
  padding: "3rem",
  color: "var(--text-secondary)",
});

interface ColaboradorListProps {
  onEdit: (colaborador: Colaborador) => void;
  onView: (colaborador: Colaborador) => void;
  onDelete: (colaborador: Colaborador) => void;
}



export function ColaboradorList({ onEdit, onView, onDelete }: ColaboradorListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"todos" | "ativo" | "inativo" | "suspenso">("todos");
  const [departamentoFilter, setDepartamentoFilter] = useState<string>("todos");
  const [cargoFilter, setCargoFilter] = useState<string>("todos");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [colaboradorToDelete, setColaboradorToDelete] = useState<Colaborador | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const { colaboradores, loading, searchColaboradores, loadColaboradores, loadColaboradoresByStatus } = useColaboradores();

  // Carregar colaboradores apenas uma vez na montagem do componente
  useEffect(() => {
    loadColaboradores();
  }, []); // Removido loadColaboradores das dependências para evitar loop infinito

  // Filtrar colaboradores localmente
  const filteredColaboradores = colaboradores
    .filter(colaborador => {
      const matchesSearch = colaborador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           colaborador.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           colaborador.cargo.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "todos" || colaborador.status === statusFilter;
      const matchesDepartamento = departamentoFilter === "todos" || colaborador.departamento === departamentoFilter;
      const matchesCargo = cargoFilter === "todos" || colaborador.cargo === cargoFilter;
      
      return matchesSearch && matchesStatus && matchesDepartamento && matchesCargo;
    })
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));

  // Gerar opções de filtros dinamicamente
  const departamentos = [...new Set(colaboradores.map(c => c.departamento))].sort();
  const cargos = [...new Set(colaboradores.map(c => c.cargo))].sort();

  // Paginação
  const totalPages = Math.ceil(filteredColaboradores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedColaboradores = filteredColaboradores.slice(startIndex, endIndex);

  // Resetar página quando mudar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, departamentoFilter, cargoFilter]);

  // Função para lidar com mudanças no filtro de status
  const handleStatusFilterChange = (newStatus: "todos" | "ativo" | "inativo" | "suspenso") => {
    setStatusFilter(newStatus);
    if (newStatus === "todos") {
      loadColaboradores();
    } else {
      loadColaboradoresByStatus(newStatus);
    }
  };

  // Função para lidar com mudanças na busca
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value.trim()) {
      searchColaboradores(value);
    } else {
      // Se o filtro atual não for "todos", recarregar por status
      if (statusFilter === "todos") {
        loadColaboradores();
      } else {
        loadColaboradoresByStatus(statusFilter);
      }
    }
  };

  const handleView = (colaborador: Colaborador) => {
    onView(colaborador);
  };

  const handleEdit = (colaborador: Colaborador) => {
    onEdit(colaborador);
  };

  const handleDelete = (colaborador: Colaborador) => {
    setColaboradorToDelete(colaborador);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (colaboradorToDelete) {
      setDeletingId(colaboradorToDelete.id);
      await onDelete(colaboradorToDelete);
      setShowDeleteConfirm(false);
      setColaboradorToDelete(null);
      setDeletingId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setColaboradorToDelete(null);
  };

  return (
    <ListContainer>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <LoadingSpinner text="Carregando colaboradores..." />
        </div>
      )}
      
      <SearchContainer>
        <SearchInputContainer>
          <SearchInput
            placeholder="Buscar por nome, email ou cargo..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {searchTerm && (
            <ClearButton onClick={() => handleSearchChange("")}>
              <FiX size={16} />
            </ClearButton>
          )}
        </SearchInputContainer>
        <Button
          variant="filter"
          onClick={() => handleStatusFilterChange("todos")}
          style={{
            background: statusFilter === "todos" ? "var(--primary)" : "#fff",
            color: statusFilter === "todos" ? "white" : "#111827",
            borderColor: statusFilter === "todos" ? "var(--primary)" : "#d1d5db",
          }}
        >
          Todos
        </Button>
        <Button
          variant="filter"
          onClick={() => handleStatusFilterChange("ativo")}
          style={{
            background: statusFilter === "ativo" ? "var(--primary)" : "#fff",
            color: statusFilter === "ativo" ? "white" : "#111827",
            borderColor: statusFilter === "ativo" ? "var(--primary)" : "#d1d5db",
          }}
        >
          Ativos
        </Button>
        <Button
          variant="filter"
          onClick={() => handleStatusFilterChange("inativo")}
          style={{
            background: statusFilter === "inativo" ? "var(--primary)" : "#fff",
            color: statusFilter === "inativo" ? "white" : "#111827",
            borderColor: statusFilter === "inativo" ? "var(--primary)" : "#d1d5db",
          }}
        >
          Inativos
        </Button>
        
        <select
          value={departamentoFilter}
          onChange={(e) => setDepartamentoFilter(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            background: "white",
            color: "#111827",
            fontSize: "0.875rem",
          }}
        >
          <option value="todos">Todos os Departamentos</option>
          {departamentos.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        
        <select
          value={cargoFilter}
          onChange={(e) => setCargoFilter(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            background: "white",
            color: "#111827",
            fontSize: "0.875rem",
          }}
        >
          <option value="todos">Todos os Cargos</option>
          {cargos.map(cargo => (
            <option key={cargo} value={cargo}>{cargo}</option>
          ))}
        </select>
      </SearchContainer>

      {filteredColaboradores.length === 0 ? (
        <EmptyState>
          <TypographyText size="lg">
            {searchTerm || statusFilter !== "todos" 
              ? "Nenhum colaborador encontrado com os filtros aplicados"
              : "Nenhum colaborador cadastrado ainda"
            }
          </TypographyText>
          <TypographyText>
            {searchTerm || statusFilter !== "todos" 
              ? "Tente ajustar os filtros ou adicionar um novo colaborador"
              : "Clique em 'Novo Colaborador' para começar"
            }
          </TypographyText>
        </EmptyState>
      ) : (
        paginatedColaboradores.map((colaborador) => (
          <ColaboradorCard key={colaborador.id}>
            <ColaboradorInfo>
              <ColaboradorName>{colaborador.nome}</ColaboradorName>
              <ColaboradorDetails>
                <span>{colaborador.email}</span>
                <span>{colaborador.telefone ? formatPhone(colaborador.telefone) : 'Sem telefone'}</span>
                <span>{colaborador.cargo}</span>
                <span>{colaborador.departamento}</span>
                <span>Admissão: {new Date(colaborador.dataAdmissao).toLocaleDateString('pt-BR')}</span>
              </ColaboradorDetails>
            </ColaboradorInfo>
            
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <StatusBadge status={colaborador.status}>
                {colaborador.status}
              </StatusBadge>
              
              <ActionsContainer>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<FiEye />}
                  onClick={() => handleView(colaborador)}
                >
                  Ver
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<FiEdit size={24} />}
                  onClick={() => handleEdit(colaborador)}
                >
                  Editar
                </Button>
                <Button
                  variant="error"
                  size="sm"
                  icon={<FiTrash2 size={24} />}
                  onClick={() => handleDelete(colaborador)}
                  loading={deletingId === colaborador.id}
                  disabled={deletingId === colaborador.id}
                >
                  Excluir
                </Button>
              </ActionsContainer>
            </div>
          </ColaboradorCard>
        ))
      )}
      
      {/* Estatísticas */}
      {filteredColaboradores.length > 0 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          background: 'var(--background-secondary)',
          borderRadius: '8px',
          border: '1px solid var(--border)',
          marginBottom: '1rem',
        }}>
          <div style={{
            display: 'flex',
            gap: '2rem',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
          }}>
            <span>Total: <strong style={{ color: 'var(--text-primary)' }}>{filteredColaboradores.length}</strong></span>
            <span>Ativos: <strong style={{ color: 'var(--success)' }}>{filteredColaboradores.filter(c => c.status === 'ativo').length}</strong></span>
            <span>Inativos: <strong style={{ color: 'var(--error)' }}>{filteredColaboradores.filter(c => c.status === 'inativo').length}</strong></span>
            <span>Suspensos: <strong style={{ color: 'var(--warning)' }}>{filteredColaboradores.filter(c => c.status === 'suspenso').length}</strong></span>
          </div>
          
          {filteredColaboradores.length > itemsPerPage && (
            <span style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
            }}>
              Mostrando {startIndex + 1}-{Math.min(endIndex, filteredColaboradores.length)} de {filteredColaboradores.length}
            </span>
          )}
        </div>
      )}
      
      {/* Controles de Paginação */}
      {filteredColaboradores.length > itemsPerPage && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          marginTop: '2rem',
          padding: '1rem',
        }}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          
          <span style={{
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
          }}>
            Página {currentPage} de {totalPages}
          </span>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Próxima
          </Button>
        </div>
      )}
      
      {/* Modal de confirmação de exclusão */}
      {showDeleteConfirm && colaboradorToDelete && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={cancelDelete}
        >
          <div 
            style={{
              backgroundColor: 'var(--background-secondary)',
              padding: '2rem',
              borderRadius: '12px',
              maxWidth: '450px',
              width: '90%',
              border: '1px solid var(--border)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--error)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}>
                <FiTrash2 size={24} />
              </div>
              <div>
                <h3 style={{
                  color: 'var(--text-primary)',
                  margin: 0,
                  fontSize: '1.25rem',
                  fontWeight: '600',
                }}>
                  Confirmar Exclusão
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  margin: '0.25rem 0 0 0',
                  fontSize: '0.875rem',
                }}>
                  Esta ação não pode ser desfeita
                </p>
              </div>
            </div>
            
            <p style={{
              color: 'var(--text-secondary)',
              marginBottom: '1.5rem',
              lineHeight: '1.6',
              fontSize: '0.95rem',
            }}>
              Tem certeza que deseja excluir o colaborador <strong style={{ color: 'var(--text-primary)' }}>{colaboradorToDelete.nome}</strong>?
            </p>
            
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'flex-end',
            }}>
              <Button
                variant="secondary"
                onClick={cancelDelete}
                style={{ minWidth: '100px' }}
              >
                Cancelar
              </Button>
              <Button
                variant="error"
                onClick={confirmDelete}
                icon={<FiTrash2 size={18} />}
                style={{ minWidth: '100px' }}
              >
                Excluir
              </Button>
            </div>
          </div>
        </div>
      )}
    </ListContainer>
  );
} 