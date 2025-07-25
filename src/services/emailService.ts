import { httpsCallable } from 'firebase/functions';
import { functions } from '@/config/firebase';

export interface WelcomeEmailData {
  email: string;
  displayName: string;
  temporaryPassword: string;
  companyName?: string;
}

export interface PasswordResetEmailData {
  email: string;
  displayName: string;
  resetLink: string;
}

/**
 * Envia email de boas-vindas com senha temporária
 */
export async function sendWelcomeEmail(data: WelcomeEmailData): Promise<void> {
  try {
    const sendWelcomeEmailFn = httpsCallable(functions, 'sendWelcomeEmail');
    await sendWelcomeEmailFn(data);
    console.log('✅ Email de boas-vindas enviado para:', data.email);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('❌ Erro ao enviar email de boas-vindas:', errorMessage);
    throw new Error(`Erro ao enviar email: ${errorMessage}`);
  }
}

/**
 * Envia email de reset de senha
 */
export async function sendPasswordResetEmail(data: PasswordResetEmailData): Promise<void> {
  try {
    const sendPasswordResetEmailFn = httpsCallable(functions, 'sendPasswordResetEmail');
    await sendPasswordResetEmailFn(data);
    console.log('✅ Email de reset enviado para:', data.email);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('❌ Erro ao enviar email de reset:', errorMessage);
    throw new Error(`Erro ao enviar email de reset: ${errorMessage}`);
  }
}

/**
 * Envia email de notificação de mudança de status
 */
export async function sendStatusChangeEmail(email: string, displayName: string, newStatus: string): Promise<void> {
  try {
    const sendStatusChangeEmailFn = httpsCallable(functions, 'sendStatusChangeEmail');
    await sendStatusChangeEmailFn({ email, displayName, newStatus });
    console.log('✅ Email de mudança de status enviado para:', email);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('❌ Erro ao enviar email de mudança de status:', errorMessage);
    throw new Error(`Erro ao enviar email de mudança de status: ${errorMessage}`);
  }
} 