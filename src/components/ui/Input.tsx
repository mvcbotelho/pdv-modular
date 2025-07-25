import { styled } from "@/styles/stitches.config";
import type { InputHTMLAttributes, ReactNode } from "react";

const InputWrapper = styled("div", {
  marginBottom: "1rem",
});

const InputContainer = styled("div", {
  position: "relative",
  display: "flex",
  alignItems: "center",
});

const StyledInput = styled("input", {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--background)",
  color: "var(--text-primary)",
  fontSize: "0.9rem",
  outline: "none",
  transition: "all 0.3s ease",

  "&:hover": {
    borderColor: "var(--primary)",
    background: "var(--background-secondary)",
  },

  "&:focus": {
    borderColor: "var(--primary)",
    boxShadow: "0 0 0 2px var(--primary)",
    background: "var(--background-secondary)",
  },

  "&::placeholder": {
    color: "var(--text-muted)",
  },

  variants: {
    hasIcon: {
      true: {
        paddingRight: "2.5rem",
      },
    },
    status: {
      success: {
        boxShadow: "0 0 0 2px var(--success)",
        "&:focus": {
          boxShadow: "0 0 0 2px var(--success)",
        },
      },
      error: {
        boxShadow: "0 0 0 2px var(--error)",
        "&:focus": {
          boxShadow: "0 0 0 2px var(--error)",
        },
      },
      warning: {
        boxShadow: "0 0 0 2px var(--warning)",
        "&:focus": {
          boxShadow: "0 0 0 2px var(--warning)",
        },
      },
    },
  },
});

const Label = styled("label", {
  fontSize: "0.875rem",
  display: "block",
  marginBottom: "0.5rem",
  color: "var(--text-primary)",
  fontWeight: "600",
  letterSpacing: "0.025em",
});

const IconWrapper = styled("div", {
  position: "absolute",
  right: "0.75rem",
  color: "var(--text-secondary)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "20px",
  height: "20px",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "var(--text-primary)",
  },
});

const StatusMessage = styled("p", {
  fontSize: "0.75rem",
  marginTop: "0.25rem",
  fontWeight: "500",

  variants: {
    status: {
      success: {
        color: "var(--success)",
      },
      error: {
        color: "var(--error)",
      },
      warning: {
        color: "var(--warning)",
      },
    },
  },
});

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  onIconClick?: () => void;
  status?: "success" | "error" | "warning";
  statusMessage?: string;
}

export function Input({
  label,
  icon,
  onIconClick,
  status,
  statusMessage,
  id,
  ...props
}: InputProps) {
  return (
    <InputWrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <InputContainer>
        <StyledInput
          id={id}
          hasIcon={!!icon}
          status={status}
          {...props}
        />
        {icon && (
          <IconWrapper onClick={onIconClick}>
            {icon}
          </IconWrapper>
        )}
      </InputContainer>
      {statusMessage && status && (
        <StatusMessage status={status}>
          {statusMessage}
        </StatusMessage>
      )}
    </InputWrapper>
  );
} 