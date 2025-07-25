import { styled, keyframes } from "@/styles/stitches.config";

const spin = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

const SpinnerContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});

const Spinner = styled("div", {
  width: "24px",
  height: "24px",
  border: "2px solid #1f2937",
  borderTop: "2px solid #6366f1",
  borderRadius: "50%",
  animation: `${spin} 1s linear infinite`,

  variants: {
    size: {
      sm: {
        width: "16px",
        height: "16px",
        borderWidth: "2px",
      },
      md: {
        width: "24px",
        height: "24px",
        borderWidth: "2px",
      },
      lg: {
        width: "32px",
        height: "32px",
        borderWidth: "3px",
      },
    },
    color: {
      primary: {
        borderTopColor: "#6366f1",
      },
      success: {
        borderTopColor: "#10b981",
      },
      error: {
        borderTopColor: "#ef4444",
      },
      white: {
        borderTopColor: "#e5e7eb",
      },
    },
  },

  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

const LoadingText = styled("span", {
  marginLeft: "0.75rem",
  fontSize: "0.875rem",
  color: "#9ca3af",
  fontWeight: "500",
});

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "success" | "error" | "white";
  text?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({
  size = "md",
  color = "primary",
  text,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const Container = fullScreen ? SpinnerContainer : "div";

  return (
    <Container>
      <Spinner size={size} color={color} />
      {text && <LoadingText>{text}</LoadingText>}
    </Container>
  );
} 