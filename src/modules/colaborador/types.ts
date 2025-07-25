export type StatusColaborador = "ativo" | "inativo" | "suspenso";

export type ModuloSistema = 
  | "dashboard"
  | "agendamentos"
  | "estoque"
  | "caixa"
  | "clientes"
  | "colaborador"
  | "configuracoes";

export interface Permissao {
  modulo: ModuloSistema;
  visualizar: boolean;
  criar: boolean;
  editar: boolean;
  excluir: boolean;
}

export interface Colaborador {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  departamento: string;
  dataAdmissao: string;
  status: StatusColaborador;
  permissoes: Permissao[];
  dataCriacao: string;
  dataUltimaAtualizacao: string;
  criadoPor: string;
  observacoes?: string;
}

export interface ColaboradorFormData {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  departamento: string;
  dataAdmissao: string;
  status: StatusColaborador;
  observacoes?: string;
} 