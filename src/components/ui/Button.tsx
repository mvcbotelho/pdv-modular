import { styled, keyframes } from "@/styles/stitches.config";
import type { ReactNode } from "react";

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const StyledButton = styled("button", {
  padding: "0.75rem 1rem",
  borderRadius: 8,
  fontWeight: "bold",
  fontSize: "1rem",
  border: "none",
  cursor: "pointer",
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  width: "100%",
  position: "relative",
  overflow: "hidden",

  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
    transform: "none",
  },

  variants: {
    variant: {
      primary: {
        background: "linear-gradient(to right, #8b5cf6, #3b82f6)",
        color: "#fff",
        "&:hover:not(:disabled)": {
          opacity: 0.9,
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
        },
        "&:active:not(:disabled)": {
          transform: "translateY(0)",
        },
      },
      secondary: {
        backgroundColor: "#fff",
        color: "#111827",
        border: "1px solid #d1d5db",
        "&:hover:not(:disabled)": {
          backgroundColor: "#f3f4f6",
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
        "&:active:not(:disabled)": {
          transform: "translateY(0)",
        },
      },
      ghost: {
        background: "transparent",
        color: "#a78bfa",
        "&:hover:not(:disabled)": {
          textDecoration: "underline",
          backgroundColor: "rgba(167, 139, 250, 0.1)",
        },
      },
      success: {
        background: "#10b981",
        color: "#fff",
        "&:hover:not(:disabled)": {
          backgroundColor: "#059669",
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
        },
        "&:active:not(:disabled)": {
          transform: "translateY(0)",
        },
      },
      error: {
        background: "#ef4444",
        color: "#fff",
        "&:hover:not(:disabled)": {
          backgroundColor: "#dc2626",
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
        },
        "&:active:not(:disabled)": {
          transform: "translateY(0)",
        },
      },
      cancel: {
        background: "#ef4444",
        color: "#fff",
        border: "1px solid #ef4444",
        "&:hover:not(:disabled)": {
          backgroundColor: "#dc2626",
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
        },
        "&:active:not(:disabled)": {
          transform: "translateY(0)",
        },
      },
      edit: {
        background: "#10b981",
        color: "#fff",
        border: "1px solid #10b981",
        "&:hover:not(:disabled)": {
          backgroundColor: "#059669",
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
        },
        "&:active:not(:disabled)": {
          transform: "translateY(0)",
        },
      },
      permissions: {
        background: "#3b82f6",
        color: "#fff",
        border: "1px solid #3b82f6",
        "&:hover:not(:disabled)": {
          backgroundColor: "#2563eb",
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
        },
        "&:active:not(:disabled)": {
          transform: "translateY(0)",
        },
      },
      fixed: {
        background: "linear-gradient(to right, #8b5cf6, #3b82f6)",
        color: "#fff",
        width: "auto",
        minWidth: "fit-content",
        "&:hover:not(:disabled)": {
          opacity: 0.9,
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
        },
        "&:active:not(:disabled)": {
          transform: "translateY(0)",
        },
      },
      filter: {
        padding: "0.625rem 1rem",
        fontSize: "0.875rem",
        fontWeight: "500",
        minWidth: "auto",
        width: "auto",
        height: "40px",
        borderRadius: "6px",
        border: "1px solid #d1d5db",
        backgroundColor: "#fff",
        color: "#111827",
        "&:hover:not(:disabled)": {
          backgroundColor: "#f3f4f6",
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
        "&:active:not(:disabled)": {
          transform: "translateY(0)",
        },
      },
    },
    size: {
      sm: {
        padding: "0.5rem 0.75rem",
        fontSize: "0.875rem",
      },
      md: {
        padding: "0.75rem 1rem",
        fontSize: "1rem",
      },
      lg: {
        padding: "1rem 1.5rem",
        fontSize: "1.125rem",
      },
    },
    loading: {
      true: {
        cursor: "wait",
        color: "transparent",
        "& > *": {
          opacity: 0,
          visibility: "hidden",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "20px",
          height: "20px",
          marginTop: "-10px",
          marginLeft: "-10px",
          border: "2px solid transparent",
          borderTop: "2px solid #fff",
          borderRadius: "50%",
          animation: `${spin} 1s linear infinite`,
        },
      },
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "success" | "error" | "cancel" | "edit" | "permissions" | "fixed" | "filter";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  style?: React.CSSProperties;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  icon,
  style,
}: ButtonProps) {
  return (
    <StyledButton
      variant={variant}
      size={size}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      loading={loading}
      style={style}
    >
      {!loading && icon}
      {children}
    </StyledButton>
  );
} 