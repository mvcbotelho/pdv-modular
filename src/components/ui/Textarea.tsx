import { styled } from "@/styles/stitches.config";
import type { TextareaHTMLAttributes } from "react";

const TextareaWrapper = styled("div", {
  marginBottom: "1rem",
});

const TextareaContainer = styled("div", {
  position: "relative",
  display: "flex",
  alignItems: "center",
});

const StyledTextarea = styled("textarea", {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--background)",
  color: "var(--text-primary)",
  fontSize: "0.9rem",
  outline: "none",
  transition: "all 0.3s ease",
  resize: "vertical",
  minHeight: "100px",
  fontFamily: "inherit",

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

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  status?: "success" | "error" | "warning";
  statusMessage?: string;
}

export function Textarea({
  label,
  status,
  statusMessage,
  id,
  ...props
}: TextareaProps) {
  return (
    <TextareaWrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <TextareaContainer>
        <StyledTextarea
          id={id}
          {...props}
        />
      </TextareaContainer>
      {statusMessage && status && (
        <StatusMessage status={status}>
          {statusMessage}
        </StatusMessage>
      )}
    </TextareaWrapper>
  );
} 