import { styled } from "@/styles/stitches.config";
import { Toast } from "./Toast";
import { useToast } from "@/hooks/useToast";

const ToastWrapper = styled("div", {
  position: "fixed",
  top: "1rem",
  right: "1rem",
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

// Componente para renderizar todos os toasts
export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <ToastWrapper>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastWrapper>
  );
} 