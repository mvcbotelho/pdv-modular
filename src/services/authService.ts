import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  updatePassword
} from 'firebase/auth';
import type { UserCredential, User } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { generateTemporaryPassword } from '@/utils/passwordUtils';

export interface AuthUser {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'colaborador';
  colaboradorId?: string;
  isFirstLogin: boolean;
}

export interface CreateUserData {
  email: string;
  displayName: string;
  role: 'admin' | 'colaborador';
  colaboradorId?: string;
}

/**
 * Cria um novo usuário no Firebase Auth com senha temporária
 */
export async function createUserWithTemporaryPassword(userData: CreateUserData): Promise<{ user: User; temporaryPassword: string }> {
  try {
    // Gerar senha temporária
    const temporaryPassword = generateTemporaryPassword();
    
    // Criar usuário no Firebase Auth
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      temporaryPassword
    );
    
    const user = userCredential.user;
    
    // Criar documento do usuário no Firestore
    const userDoc = {
      uid: user.uid,
      email: userData.email,
      displayName: userData.displayName,
      role: userData.role,
      isFirstLogin: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...(userData.colaboradorId && { colaboradorId: userData.colaboradorId }),
    };
    
    await setDoc(doc(db, 'users', user.uid), userDoc);
    
    // Enviar email com senha temporária
    await sendTemporaryPasswordEmail(userData.email, temporaryPassword, userData.displayName);
    
    return { user, temporaryPassword };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro ao criar usuário:', error);
    throw new Error(`Erro ao criar usuário: ${errorMessage}`);
  }
}

/**
 * Envia email com senha temporária
 */
async function sendTemporaryPasswordEmail(email: string, password: string, _displayName: string): Promise<void> {
  try {
    // Usar Firebase Auth para enviar email de reset (simula envio de senha temporária)
    await sendPasswordResetEmail(auth, email);
    
    // Em produção, você pode usar Firebase Functions ou um serviço de email
    // para enviar um email personalizado com a senha temporária
    console.log(`Email enviado para ${email} com senha temporária: ${password}`);
    
    // TODO: Implementar envio real de email com senha temporária
    // Pode usar Firebase Functions + SendGrid, Mailgun, etc.
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro ao enviar email:', error);
    throw new Error(`Erro ao enviar email: ${errorMessage}`);
  }
}

/**
 * Faz login do usuário
 */
export async function signInUser(email: string, password: string): Promise<AuthUser> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Buscar dados do usuário no Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      throw new Error('Dados do usuário não encontrados');
    }
    
    const userData = userDoc.data() as AuthUser;
    
    // Se for primeiro login, marcar como não é mais primeiro login
    if (userData.isFirstLogin) {
      await updateDoc(doc(db, 'users', user.uid), {
        isFirstLogin: false,
        updatedAt: new Date().toISOString(),
      });
    }
    
    return userData;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro no login:', error);
    throw new Error(`Erro no login: ${errorMessage}`);
  }
}

/**
 * Atualiza a senha do usuário
 */
export async function updateUserPassword(newPassword: string): Promise<void> {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    
    await updatePassword(user, newPassword);
    
    // Atualizar timestamp no Firestore
    await updateDoc(doc(db, 'users', user.uid), {
      updatedAt: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro ao atualizar senha:', error);
    throw new Error(`Erro ao atualizar senha: ${errorMessage}`);
  }
}

/**
 * Busca dados do usuário atual
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const user = auth.currentUser;
    if (!user) return null;
    
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      return null;
    }
    
    return userDoc.data() as AuthUser;
  } catch (error: unknown) {
    console.error('Erro ao buscar usuário atual:', error);
    return null;
  }
}

/**
 * Verifica se o usuário precisa trocar a senha (primeiro login)
 */
export async function needsPasswordChange(): Promise<boolean> {
  try {
    const user = await getCurrentUser();
    return user?.isFirstLogin || false;
  } catch {
    return false;
  }
} 

 