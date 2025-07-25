import { useState, useEffect } from "react";
import { styled } from "@/styles/stitches.config";
import {
  Button,
  Input,
  Select,
  Textarea,
  Card,
  TypographyTitle,
  TypographyText,
  useToast,
} from "@/components/ui";
import { FiSave, FiX } from "react-icons/fi";
import { useColaboradores } from "@/hooks/useColaboradores";
import { formatPhone, validatePhone } from "../utils";
import type {
  Colaborador,
  ColaboradorFormData,
  StatusColaborador,
} from "../types";

const FormContainer = styled("div", {
  maxWidth: "800px",
  margin: "0 auto",
  marginTop: "2rem",
});

const FormGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
  marginBottom: "1.5rem",

  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
  },
});

const FullWidthField = styled("div", {
  gridColumn: "1 / -1",
});

const ActionsContainer = styled("div", {
  display: "flex",
  gap: "1rem",
  justifyContent: "flex-end",
  marginTop: "2rem",
});



interface ColaboradorFormProps {
  colaborador?: Colaborador | null;
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
}

const initialFormData: ColaboradorFormData = {
  nome: "",
  email: "",
  telefone: "",
  cargo: "",
  departamento: "",
  dataAdmissao: "",
  status: "ativo",
  observacoes: "",
};

export function ColaboradorForm({
  colaborador,
  isEditing,
  onSave,
  onCancel,
}: ColaboradorFormProps) {
  const [formData, setFormData] =
    useState<ColaboradorFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const { error } = useToast();
  const { createColaborador, updateColaborador } = useColaboradores();

  useEffect(() => {
    if (colaborador) {
      setFormData({
        nome: colaborador.nome,
        email: colaborador.email,
        telefone: colaborador.telefone,
        cargo: colaborador.cargo,
        departamento: colaborador.departamento,
        dataAdmissao: colaborador.dataAdmissao,
        status: colaborador.status,
        observacoes: colaborador.observacoes || "",
      });
    }
  }, [colaborador]);

  const handleInputChange = (
    field: keyof ColaboradorFormData,
    value: string
  ) => {
    let formattedValue = value;
    
    // Formatar telefone automaticamente
    if (field === 'telefone') {
      formattedValue = formatPhone(value);
    }
    
    setFormData((prev) => ({
      ...prev,
      [field]: formattedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      error(errors.join(", "));
      return;
    }

    setLoading(true);

    try {
      if (isEditing && colaborador) {
        await updateColaborador(colaborador.id, formData);
        onSave();
      } else {
        await createColaborador(formData);
        onSave();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido ao salvar colaborador";
      error(errorMessage);
      console.error("Erro ao salvar colaborador:", err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.nome.trim()) {
      errors.push("Nome é obrigatório");
    }

    if (!formData.email.trim()) {
      errors.push("Email é obrigatório");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push("Email inválido");
    }

    if (formData.telefone.trim() && !validatePhone(formData.telefone)) {
      errors.push("Telefone deve estar no formato (11) 99999-9999");
    }

    if (!formData.cargo.trim()) {
      errors.push("Cargo é obrigatório");
    }

    if (!formData.departamento.trim()) {
      errors.push("Departamento é obrigatório");
    }

    if (!formData.dataAdmissao) {
      errors.push("Data de admissão é obrigatória");
    }

    return errors;
  };

  return (
    <FormContainer>
      <Card maxWidth="lg">
        <TypographyTitle>
          {isEditing ? "Editar Colaborador" : "Novo Colaborador"}
        </TypographyTitle>

        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <TypographyText>
            {isEditing
              ? "Atualize as informações do colaborador"
              : "Preencha as informações para cadastrar um novo colaborador"}
          </TypographyText>
        </div>

        <form style={{ marginTop: "3rem" }} onSubmit={handleSubmit}>
          <FormGrid>
            <FullWidthField>
              <Input
                label="Nome Completo"
                placeholder="Digite o nome completo"
                value={formData.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                required
              />
            </FullWidthField>

            <FullWidthField>
              <Input
                label="E-mail"
                type="email"
                placeholder="Digite o e-mail"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </FullWidthField>

            <Input
              label="Telefone"
              placeholder="(11) 99999-9999"
              value={formData.telefone}
              onChange={(e) => handleInputChange("telefone", e.target.value)}
              required
            />

            <Input
              label="Cargo"
              placeholder="Digite o cargo"
              value={formData.cargo}
              onChange={(e) => handleInputChange("cargo", e.target.value)}
              required
            />

            <Input
              label="Departamento"
              placeholder="Digite o departamento"
              value={formData.departamento}
              onChange={(e) =>
                handleInputChange("departamento", e.target.value)
              }
              required
            />

            <Input
              label="Data de Admissão"
              type="date"
              value={formData.dataAdmissao}
              onChange={(e) =>
                handleInputChange("dataAdmissao", e.target.value)
              }
              required
            />

            <FullWidthField>
              <Select
                label="Status"
                value={formData.status}
                onChange={(e) =>
                  handleInputChange(
                    "status",
                    e.target.value as StatusColaborador
                  )
                }
                required
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
                <option value="suspenso">Suspenso</option>
              </Select>
            </FullWidthField>

            <FullWidthField>
              <Textarea
                label="Observações"
                placeholder="Observações adicionais..."
                value={formData.observacoes}
                onChange={(e) =>
                  handleInputChange("observacoes", e.target.value)
                }
                rows={4}
              />
            </FullWidthField>
          </FormGrid>

          <ActionsContainer>
                      <Button
            variant="cancel"
            type="button"
            onClick={onCancel}
            icon={<FiX size={18} />}
          >
            Cancelar
          </Button>
            <Button
              type="submit"
              loading={loading}
              disabled={validateForm().length > 0 || loading}
              icon={<FiSave />}
            >
              {isEditing ? "Atualizar" : "Cadastrar"}
            </Button>
          </ActionsContainer>
        </form>
      </Card>
    </FormContainer>
  );
}
