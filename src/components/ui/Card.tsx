import { styled } from "@/styles/stitches.config";
import type { ReactNode } from "react";

const StyledCard = styled("div", {
  background: "var(--background-secondary)",
  borderRadius: 12,
  padding: "2rem",
  boxShadow: "0 0 0 1px var(--border)",
  transition: "all 0.3s ease",

  variants: {
    size: {
      sm: {
        padding: "1rem",
      },
      md: {
        padding: "2rem",
      },
      lg: {
        padding: "3rem",
      },
    },
    width: {
      full: {
        width: "100%",
      },
      auto: {
        width: "auto",
      },
    },
    maxWidth: {
      sm: {
        maxWidth: 320,
      },
      md: {
        maxWidth: 420,
      },
      lg: {
        maxWidth: 640,
      },
      xl: {
        maxWidth: 768,
      },
    },
  },

  defaultVariants: {
    size: "md",
    width: "full",
  },

  "@media (max-width: 480px)": {
    padding: "1.5rem",
  },
});

interface CardProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  width?: "full" | "auto";
  maxWidth?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Card({
  children,
  size = "md",
  width = "full",
  maxWidth,
  className,
}: CardProps) {
  return (
    <StyledCard
      size={size}
      width={width}
      maxWidth={maxWidth}
      className={className}
    >
      {children}
    </StyledCard>
  );
} 