import { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { createUserWithTemporaryPassword } from './authService';
import { sendWelcomeEmail } from './emailService';
import type { Colaborador } from '@/modules/colaborador/types';

const COLLECTION_NAME = 'colaboradores';

export interface CreateColaboradorData {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  departamento: string;
  dataAdmissao: string;
  status: 'ativo' | 'inativo' | 'suspenso';
  observacoes?: string;
}

/**
 * Verifica se um email já existe no Firestore
 */
async function checkEmailExists(email: string, excludeId?: string): Promise<boolean> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('email', '==', email)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (excludeId) {
      // Se estiver editando, excluir o próprio registro
      return querySnapshot.docs.some(doc => doc.id !== excludeId);
    }
    
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Erro ao verificar email:', error);
    return false;
  }
}



/**
 * Cria um novo colaborador com conta de usuário
 */
export async function createColaboradorWithAuth(colaboradorData: CreateColaboradorData): Promise<Colaborador> {
  try {
    console.log('🔄 Iniciando criação de colaborador:', colaboradorData.email);
    
    // 1. Verificar se email já existe
    const emailExists = await checkEmailExists(colaboradorData.email);
    if (emailExists) {
      console.log('❌ Email já existe no Firestore:', colaboradorData.email);
      throw new Error('Este email já está sendo usado por outro colaborador.');
    }

    console.log('✅ Email disponível, criando usuário no Auth...');

    // 2. Criar usuário no Firebase Auth com senha temporária
    const { user, temporaryPassword } = await createUserWithTemporaryPassword({
      email: colaboradorData.email,
      displayName: colaboradorData.nome,
      role: 'colaborador',
    });

    console.log('✅ Usuário criado no Auth:', user.uid);

    // 3. Criar documento do colaborador no Firestore
    const colaboradorDoc = {
      ...colaboradorData,
      id: user.uid, // Usar o UID do Auth como ID
      dataCriacao: new Date().toISOString(),
      dataUltimaAtualizacao: new Date().toISOString(),
      criadoPor: 'admin', // TODO: Pegar do usuário atual
      permissoes: [], // Permissões padrão
    };

    await addDoc(collection(db, COLLECTION_NAME), colaboradorDoc);
    console.log('✅ Colaborador salvo no Firestore');

    // 4. Enviar email de boas-vindas
    try {
      console.log('📧 Enviando email de boas-vindas...');
      await sendWelcomeEmail({
        email: colaboradorData.email,
        displayName: colaboradorData.nome,
        temporaryPassword,
        companyName: 'PDV System',
      });
      console.log('✅ Email enviado com sucesso');
    } catch (emailError) {
      console.error('⚠️ Erro ao enviar email:', emailError);
      // Não falhar a criação se o email falhar
    }

    console.log('🎉 Colaborador criado com sucesso!');
    return {
      ...colaboradorDoc,
      id: user.uid,
    } as Colaborador;

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('❌ Erro ao criar colaborador:', errorMessage);
    
    // Tratar erros específicos do Firebase Auth
    if (errorMessage.includes('auth/email-already-in-use')) {
      throw new Error('Este email já está sendo usado por outro usuário no sistema.');
    } else if (errorMessage.includes('auth/invalid-email')) {
      throw new Error('Email inválido. Verifique o formato do email.');
    } else if (errorMessage.includes('auth/weak-password')) {
      throw new Error('Senha muito fraca. Tente uma senha mais forte.');
    } else if (errorMessage.includes('auth/operation-not-allowed')) {
      throw new Error('Operação não permitida. Entre em contato com o administrador.');
    } else if (errorMessage.includes('auth/too-many-requests')) {
      throw new Error('Muitas tentativas. Tente novamente em alguns minutos.');
    }
    
    throw new Error(`Erro ao criar colaborador: ${errorMessage}`);
  }
}

/**
 * Busca todos os colaboradores
 */
export async function getAll(): Promise<Colaborador[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('nome', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    const colaboradores: Colaborador[] = [];
    
    querySnapshot.forEach((doc) => {
      colaboradores.push({
        id: doc.id,
        ...doc.data(),
      } as Colaborador);
    });
    
    return colaboradores;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro ao buscar colaboradores:', errorMessage);
    
    // Verificar se é erro de permissão ou rede
    if (errorMessage.includes('permission') || errorMessage.includes('network')) {
      throw new Error('Erro de conexão. Verifique sua internet e tente novamente.');
    }
    
    throw new Error(`Erro ao buscar colaboradores: ${errorMessage}`);
  }
}

/**
 * Busca colaboradores por status
 */
export async function getByStatus(status: 'ativo' | 'inativo' | 'suspenso'): Promise<Colaborador[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', status),
      orderBy('nome', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    const colaboradores: Colaborador[] = [];
    
    querySnapshot.forEach((doc) => {
      colaboradores.push({
        id: doc.id,
        ...doc.data(),
      } as Colaborador);
    });
    
    return colaboradores;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro ao buscar colaboradores por status:', errorMessage);
    throw new Error(`Erro ao buscar colaboradores: ${errorMessage}`);
  }
}

/**
 * Busca colaboradores por termo
 */
export async function searchByTerm(term: string): Promise<Colaborador[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('nome', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    const colaboradores: Colaborador[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const searchTerm = term.toLowerCase();
      
      // Buscar em nome, email, cargo e departamento
      if (
        data.nome.toLowerCase().includes(searchTerm) ||
        data.email.toLowerCase().includes(searchTerm) ||
        data.cargo.toLowerCase().includes(searchTerm) ||
        data.departamento.toLowerCase().includes(searchTerm)
      ) {
        colaboradores.push({
          id: doc.id,
          ...data,
        } as Colaborador);
      }
    });
    
    return colaboradores;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro ao buscar colaboradores por termo:', errorMessage);
    throw new Error(`Erro ao buscar colaboradores: ${errorMessage}`);
  }
}

/**
 * Busca um colaborador por ID
 */
export async function getById(id: string): Promise<Colaborador | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Colaborador;
    }
    
    return null;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro ao buscar colaborador por ID:', errorMessage);
    throw new Error(`Erro ao buscar colaborador: ${errorMessage}`);
  }
}

/**
 * Atualiza um colaborador
 */
export async function update(id: string, data: Partial<Colaborador>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...data,
      dataUltimaAtualizacao: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro ao atualizar colaborador:', errorMessage);
    throw new Error(`Erro ao atualizar colaborador: ${errorMessage}`);
  }
}

/**
 * Remove um colaborador
 */
export async function remove(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro ao remover colaborador:', errorMessage);
    throw new Error(`Erro ao remover colaborador: ${errorMessage}`);
  }
} 