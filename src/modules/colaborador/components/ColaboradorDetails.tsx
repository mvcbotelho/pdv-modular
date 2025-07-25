import { styled } from "@/styles/stitches.config";
import { Button, Card, TypographyTitle, TypographyText } from "@/components/ui";
import { FiEdit, FiShield, FiCalendar, FiMail, FiPhone, FiUser, FiX } from "react-icons/fi";
import { formatPhone } from "../utils";
import type { Colaborador } from "../types";

const DetailsContainer = styled("div", {
  maxWidth: "800px",
  margin: "0 auto",
});

const InfoGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1.5rem",
  marginBottom: "2rem",

  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
  },
});

const InfoItem = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  padding: "1.5rem",
  background: "var(--background-secondary)",
  borderRadius: 8,
  border: "1px solid var(--border)",
});

const InfoHeader = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  marginBottom: "0.5rem",
});

const InfoLabel = styled("span", {
  fontSize: "0.75rem",
  color: "var(--text-secondary)",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.025em",
});

const InfoValue = styled("span", {
  fontSize: "1rem",
  color: "var(--text-primary)",
  fontWeight: "500",
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
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "1rem",
  marginTop: "2rem",
});



const ObservacoesContainer = styled("div", {
  gridColumn: "1 / -1",
  padding: "1rem",
  background: "var(--background-secondary)",
  borderRadius: 8,
  border: "1px solid var(--border)",
});

interface ColaboradorDetailsProps {
  colaborador: Colaborador;
  onEdit: () => void;
  onBack: () => void;
  onPermissoes: () => void;
}

export function ColaboradorDetails({ colaborador, onEdit, onBack, onPermissoes }: ColaboradorDetailsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <DetailsContainer>
      <Card maxWidth="lg">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <TypographyTitle>{colaborador.nome}</TypographyTitle>
            <TypographyText>
              {colaborador.cargo} • {colaborador.departamento}
            </TypographyText>
          </div>
          <StatusBadge status={colaborador.status}>
            {colaborador.status}
          </StatusBadge>
        </div>

        <InfoGrid>
          <InfoItem>
            <InfoHeader>
              <FiMail size={16} color="var(--text-secondary)" />
              <InfoLabel>E-mail</InfoLabel>
            </InfoHeader>
            <InfoValue>{colaborador.email}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoHeader>
              <FiPhone size={16} color="var(--text-secondary)" />
              <InfoLabel>Telefone</InfoLabel>
            </InfoHeader>
            <InfoValue>{formatPhone(colaborador.telefone)}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoHeader>
              <FiUser size={16} color="var(--text-secondary)" />
              <InfoLabel>Cargo</InfoLabel>
            </InfoHeader>
            <InfoValue>{colaborador.cargo}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoHeader>
              <FiUser size={16} color="var(--text-secondary)" />
              <InfoLabel>Departamento</InfoLabel>
            </InfoHeader>
            <InfoValue>{colaborador.departamento}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoHeader>
              <FiCalendar size={16} color="var(--text-secondary)" />
              <InfoLabel>Data de Admissão</InfoLabel>
            </InfoHeader>
            <InfoValue>{formatDate(colaborador.dataAdmissao)}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoHeader>
              <FiCalendar size={16} color="var(--text-secondary)" />
              <InfoLabel>Cadastrado em</InfoLabel>
            </InfoHeader>
            <InfoValue>{formatDate(colaborador.dataCriacao)}</InfoValue>
          </InfoItem>

          {colaborador.observacoes && (
            <ObservacoesContainer>
              <InfoHeader>
                <FiUser size={16} color="var(--text-secondary)" />
                <InfoLabel>Observações</InfoLabel>
              </InfoHeader>
              <InfoValue>{colaborador.observacoes}</InfoValue>
            </ObservacoesContainer>
          )}
        </InfoGrid>

        <ActionsContainer>
          <Button variant="cancel" onClick={onBack} icon={<FiX size={18} />}>
            Cancelar
          </Button>
          <Button variant="permissions" onClick={onPermissoes} icon={<FiShield />}>
            Gerenciar Permissões
          </Button>
          <Button variant="edit" onClick={onEdit} icon={<FiEdit size={18} />}>
            Editar
          </Button>
        </ActionsContainer>
      </Card>
    </DetailsContainer>
  );
} 