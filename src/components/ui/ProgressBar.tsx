import { styled } from "@/styles/stitches.config";

const ProgressContainer = styled("div", {
  width: "100%",
  background: "#1f2937",
  borderRadius: 8,
  overflow: "hidden",
  height: "8px",
});

const ProgressBar = styled("div", {
  height: "100%",
  borderRadius: 8,
  transition: "width 0.3s ease",

  variants: {
    variant: {
      primary: {
        background: "linear-gradient(to right, #8b5cf6, #3b82f6)",
      },
      success: {
        background: "#10b981",
      },
      error: {
        background: "#ef4444",
      },
      warning: {
        background: "#f59e0b",
      },
    },
  },

  defaultVariants: {
    variant: "primary",
  },
});

const ProgressLabel = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "0.5rem",
  fontSize: "0.875rem",
  color: "#9ca3af",
});

const ProgressText = styled("span", {
  fontWeight: "500",
});

const ProgressPercentage = styled("span", {
  color: "#6366f1",
  fontWeight: "600",
});

interface ProgressBarProps {
  progress: number; // 0-100
  variant?: "primary" | "success" | "error" | "warning";
  label?: string;
  showPercentage?: boolean;
}

export function ProgressBarComponent({
  progress,
  variant = "primary",
  label,
  showPercentage = true,
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div>
      {(label || showPercentage) && (
        <ProgressLabel>
          {label && <ProgressText>{label}</ProgressText>}
          {showPercentage && (
            <ProgressPercentage>{Math.round(clampedProgress)}%</ProgressPercentage>
          )}
        </ProgressLabel>
      )}
      <ProgressContainer>
        <ProgressBar
          variant={variant}
          style={{ width: `${clampedProgress}%` }}
        />
      </ProgressContainer>
    </div>
  );
} 