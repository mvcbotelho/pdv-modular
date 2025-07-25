import { useState } from "react";

// Hook para gerenciar múltiplos toasts
export function useToast() {
  const [toasts, setToasts] = useState<Array<{
    id: string;
    type: "success" | "error" | "warning" | "info";
    message: string;
    duration?: number;
  }>>([]);

  const addToast = (type: "success" | "error" | "warning" | "info", message: string, duration?: number) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, type, message, duration }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const success = (message: string, duration?: number) => addToast("success", message, duration);
  const error = (message: string, duration?: number) => addToast("error", message, duration);
  const warning = (message: string, duration?: number) => addToast("warning", message, duration);
  const info = (message: string, duration?: number) => addToast("info", message, duration);

  return {
    toasts,
    success,
    error,
    warning,
    info,
    removeToast,
  };
} 