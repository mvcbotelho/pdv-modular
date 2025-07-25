import { styled, keyframes } from "@/styles/stitches.config";
import { useEffect, useState } from "react";
import { FiCheck, FiX, FiAlertTriangle, FiInfo } from "react-icons/fi";

const slideIn = keyframes({
  from: {
    transform: "translateX(100%)",
    opacity: 0,
  },
  to: {
    transform: "translateX(0)",
    opacity: 1,
  },
});

const slideOut = keyframes({
  from: {
    transform: "translateX(0)",
    opacity: 1,
  },
  to: {
    transform: "translateX(100%)",
    opacity: 0,
  },
});

const ToastItem = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  padding: "1rem 1.5rem",
  borderRadius: 8,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  minWidth: 300,
  maxWidth: 400,
  animation: `${slideIn} 0.3s ease-out`,

  variants: {
    type: {
      success: {
        background: "#111827",
        border: "1px solid #10b981",
        color: "#10b981",
      },
      error: {
        background: "#111827",
        border: "1px solid #ef4444",
        color: "#ef4444",
      },
      warning: {
        background: "#111827",
        border: "1px solid #f59e0b",
        color: "#f59e0b",
      },
      info: {
        background: "#111827",
        border: "1px solid #3b82f6",
        color: "#3b82f6",
      },
    },
    isExiting: {
      true: {
        animation: `${slideOut} 0.3s ease-in forwards`,
      },
    },
  },
});

const IconWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 20,
  height: 20,
  flexShrink: 0,
});

const Content = styled("div", {
  flex: 1,
  fontSize: "0.875rem",
  fontWeight: "500",
});

const CloseButton = styled("button", {
  background: "transparent",
  border: "none",
  color: "inherit",
  cursor: "pointer",
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 20,
  height: 20,
  opacity: 0.7,
  transition: "opacity 0.2s ease",

  "&:hover": {
    opacity: 1,
  },
});

interface ToastProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
  onClose: () => void;
}

const getIcon = (type: ToastProps["type"]) => {
  switch (type) {
    case "success":
      return <FiCheck size={20} />;
    case "error":
      return <FiX size={20} />;
    case "warning":
      return <FiAlertTriangle size={20} />;
    case "info":
      return <FiInfo size={20} />;
  }
};

export function Toast({ type, message, duration = 5000, onClose }: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <ToastItem type={type} isExiting={isExiting}>
      <IconWrapper>{getIcon(type)}</IconWrapper>
      <Content>{message}</Content>
      <CloseButton onClick={() => {
        setIsExiting(true);
        setTimeout(onClose, 300);
      }}>
        <FiX size={16} />
      </CloseButton>
    </ToastItem>
  );
} 