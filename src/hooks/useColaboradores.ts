import { useState, useEffect, useCallback } from "react";
import { 
  getAll, 
  getByStatus, 
  searchByTerm, 
  createColaboradorWithAuth,
  update,
  remove,
  getById
} from "@/services/colaboradorService";
import type { Colaborador } from "@/modules/colaborador/types";

export function useColaboradores() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar todos os colaboradores
  const loadColaboradores = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getAll();
      setColaboradores(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao carregar colaboradores:', errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar colaboradores por status
  const loadColaboradoresByStatus = useCallback(async (status: 'ativo' | 'inativo' | 'suspenso') => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getByStatus(status);
      setColaboradores(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao carregar colaboradores por status:', errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar colaboradores por termo
  const searchColaboradores = useCallback(async (term: string) => {
    if (!term.trim()) {
      await loadColaboradores();
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await searchByTerm(term);
      setColaboradores(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao buscar colaboradores:', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [loadColaboradores]);

  // Criar novo colaborador com autenticação
  const createColaborador = useCallback(async (colaboradorData: {
    nome: string;
    email: string;
    telefone: string;
    cargo: string;
    departamento: string;
    dataAdmissao: string;
    status: 'ativo' | 'inativo' | 'suspenso';
    observacoes?: string;
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      const novoColaborador = await createColaboradorWithAuth(colaboradorData);
      setColaboradores(prev => [...prev, novoColaborador]);
      return novoColaborador;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao criar colaborador:', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualizar colaborador
  const updateColaborador = useCallback(async (id: string, data: Partial<Colaborador>) => {
    setLoading(true);
    setError(null);
    
    try {
      await update(id, data);
      setColaboradores(prev => 
        prev.map(col => col.id === id ? { ...col, ...data } : col)
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao atualizar colaborador:', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Deletar colaborador
  const deleteColaborador = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await remove(id);
      setColaboradores(prev => prev.filter(col => col.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao deletar colaborador:', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar colaborador por ID
  const getColaboradorById = useCallback(async (id: string) => {
    try {
      return await getById(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error('Erro ao buscar colaborador por ID:', errorMessage);
      throw err;
    }
  }, []);

  // Carregar dados iniciais
  useEffect(() => {
    loadColaboradores();
  }, [loadColaboradores]);

  return {
    colaboradores,
    loading,
    error,
    loadColaboradores,
    loadColaboradoresByStatus,
    searchColaboradores,
    createColaborador,
    updateColaborador,
    deleteColaborador,
    getColaboradorById,
  };
} 