import { styled } from "@/styles/stitches.config";
import type { SelectHTMLAttributes, ReactNode } from "react";

const SelectWrapper = styled("div", {
  marginBottom: "1rem",
});

const SelectContainer = styled("div", {
  position: "relative",
  display: "flex",
  alignItems: "center",
});

const StyledSelect = styled("select", {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--background)",
  color: "var(--text-primary)",
  fontSize: "0.9rem",
  outline: "none",
  transition: "all 0.3s ease",
  cursor: "pointer",

  "&:hover": {
    borderColor: "var(--primary)",
    background: "var(--background-secondary)",
  },

  "&:focus": {
    borderColor: "var(--primary)",
    boxShadow: "0 0 0 2px var(--primary)",
    background: "var(--background-secondary)",
  },

  "& option": {
    background: "var(--background-secondary)",
    color: "var(--text-primary)",
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

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  status?: "success" | "error" | "warning";
  statusMessage?: string;
  children: ReactNode;
}

export function Select({
  label,
  status,
  statusMessage,
  id,
  children,
  ...props
}: SelectProps) {
  return (
    <SelectWrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <SelectContainer>
        <StyledSelect
          id={id}
          {...props}
        >
          {children}
        </StyledSelect>
      </SelectContainer>
      {statusMessage && status && (
        <StatusMessage status={status}>
          {statusMessage}
        </StatusMessage>
      )}
    </SelectWrapper>
  );
} 