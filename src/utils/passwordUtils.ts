/**
 * Gera uma senha temporária segura
 * @returns Senha temporária de 8 caracteres
 */
export function generateTemporaryPassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  
  // Garantir pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial
  password += chars.charAt(Math.floor(Math.random() * 26)); // Letra maiúscula
  password += chars.charAt(26 + Math.floor(Math.random() * 26)); // Letra minúscula
  password += chars.charAt(52 + Math.floor(Math.random() * 10)); // Número
  password += chars.charAt(62 + Math.floor(Math.random() * 8)); // Caractere especial
  
  // Completar com caracteres aleatórios
  for (let i = 4; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  // Embaralhar a senha
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

/**
 * Valida se uma senha é forte o suficiente
 * @param password - Senha para validar
 * @returns true se a senha é forte
 */
export function validatePasswordStrength(password: string): boolean {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return password.length >= minLength && 
         hasUpperCase && 
         hasLowerCase && 
         hasNumbers && 
         hasSpecialChar;
}

/**
 * Gera uma mensagem de erro para senha fraca
 * @param password - Senha para validar
 * @returns Mensagem de erro ou null se a senha é válida
 */
export function getPasswordErrorMessage(password: string): string | null {
  if (password.length < 8) {
    return 'A senha deve ter pelo menos 8 caracteres';
  }
  
  if (!/[A-Z]/.test(password)) {
    return 'A senha deve conter pelo menos uma letra maiúscula';
  }
  
  if (!/[a-z]/.test(password)) {
    return 'A senha deve conter pelo menos uma letra minúscula';
  }
  
  if (!/\d/.test(password)) {
    return 'A senha deve conter pelo menos um número';
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'A senha deve conter pelo menos um caractere especial';
  }
  
  return null;
} 