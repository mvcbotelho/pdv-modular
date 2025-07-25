/**
 * Formata um número de telefone para o formato brasileiro
 * @param phone - Número de telefone (apenas números)
 * @returns Telefone formatado ou string vazia se inválido
 */
export function formatPhone(phone: string): string {
  if (!phone) return '';
  
  // Remove todos os caracteres não numéricos
  const numbers = phone.replace(/\D/g, '');
  
  // Se não tem números, retorna vazio
  if (numbers.length === 0) return '';
  
  // Formata baseado no número de dígitos
  if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  } else if (numbers.length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  } else if (numbers.length <= 11) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  } else {
    // Se tem mais de 11 dígitos, retorna apenas os primeiros 11
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  }
}

/**
 * Valida se um telefone está no formato correto
 * @param phone - Telefone para validar
 * @returns true se o formato está correto
 */
export function validatePhone(phone: string): boolean {
  if (!phone.trim()) return true; // Telefone é opcional
  return /^\(\d{2}\) \d{4,5}-\d{4}$/.test(phone);
}

/**
 * Remove a formatação do telefone, deixando apenas números
 * @param phone - Telefone formatado
 * @returns Apenas números
 */
export function unformatPhone(phone: string): string {
  return phone.replace(/\D/g, '');
} 