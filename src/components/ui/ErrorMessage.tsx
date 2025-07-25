import { styled } from "@/styles/stitches.config";

const ErrorContainer = styled("div", {
  padding: "0.75rem 1rem",
  borderRadius: 8,
  backgroundColor: "#1f2937",
  border: "1px solid #ef4444",
  color: "#ef4444",
  fontSize: "0.875rem",
  marginBottom: "1rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <ErrorContainer>
      <span>⚠️</span>
      {message}
    </ErrorContainer>
  );
} 