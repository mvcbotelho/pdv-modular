import { styled, keyframes } from "@/styles/stitches.config";
import type { ReactNode } from "react";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const SpinnerContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  padding: "1rem",

  variants: {
    size: {
      sm: {
        fontSize: "0.875rem",
      },
      md: {
        fontSize: "1rem",
      },
      lg: {
        fontSize: "1.25rem",
      },
    },
    fullScreen: {
      true: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
      },
    },
  },

  defaultVariants: {
    size: "md",
    fullScreen: false,
  },
});

const Spinner = styled("div", {
  width: "1em",
  height: "1em",
  border: "2px solid transparent",
  borderTop: "2px solid currentColor",
  borderRadius: "50%",
  animation: `${spin} 1s linear infinite`,
  color: "var(--primary)",
});

const LoadingText = styled("span", {
  color: "var(--text-secondary)",
  fontWeight: "500",
});

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
  children?: ReactNode;
}

export function LoadingSpinner({ 
  size = "md", 
  text = "Carregando...", 
  fullScreen = false,
  children 
}: LoadingSpinnerProps) {
  return (
    <SpinnerContainer size={size} fullScreen={fullScreen}>
      <Spinner />
      {text && <LoadingText>{text}</LoadingText>}
      {children}
    </SpinnerContainer>
  );
} 