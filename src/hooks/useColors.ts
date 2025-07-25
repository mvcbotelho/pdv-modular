// Hook para acessar as cores programaticamente
export const useColors = () => {
  return {
    background: {
      primary: "#0f0f1a",
      secondary: "#111827",
    },
    border: "#1f2937",
    primary: {
      main: "#6366f1",
      gradient: {
        start: "#8b5cf6",
        end: "#3b82f6",
      },
    },
    text: {
      primary: "#e5e7eb",
      secondary: "#9ca3af",
      muted: "#6b7280",
    },
    status: {
      success: "#10b981",
      error: "#ef4444",
      warning: "#f59e0b",
      info: "#3b82f6",
    },
  };
}; 