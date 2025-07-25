import { styled } from "@/styles/stitches.config";
import type { ReactNode } from "react";

const Title = styled("h1", {
  fontSize: "1.5rem",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: "0.5rem",
  color: "#6366f1",

  variants: {
    size: {
      sm: {
        fontSize: "1.25rem",
      },
      md: {
        fontSize: "1.5rem",
      },
      lg: {
        fontSize: "2rem",
      },
    },
    align: {
      left: {
        textAlign: "left",
      },
      center: {
        textAlign: "center",
      },
      right: {
        textAlign: "right",
      },
    },
  },

  defaultVariants: {
    size: "md",
    align: "center",
  },
});

const Subtitle = styled("p", {
  textAlign: "center",
  fontSize: "0.9rem",
  marginBottom: "2rem",
  color: "#9ca3af",

  variants: {
    size: {
      sm: {
        fontSize: "0.8rem",
      },
      md: {
        fontSize: "0.9rem",
      },
      lg: {
        fontSize: "1rem",
      },
    },
    align: {
      left: {
        textAlign: "left",
      },
      center: {
        textAlign: "center",
      },
      right: {
        textAlign: "right",
      },
    },
  },

  defaultVariants: {
    size: "md",
    align: "center",
  },
});

const Text = styled("p", {
  color: "#e5e7eb",
  lineHeight: 1.6,

  variants: {
    size: {
      sm: {
        fontSize: "0.875rem",
      },
      md: {
        fontSize: "1rem",
      },
      lg: {
        fontSize: "1.125rem",
      },
    },
    color: {
      primary: {
        color: "#6366f1",
      },
      secondary: {
        color: "#9ca3af",
      },
      white: {
        color: "#e5e7eb",
      },
    },
  },

  defaultVariants: {
    size: "md",
    color: "white",
  },
});

interface TypographyProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  align?: "left" | "center" | "right";
  color?: "primary" | "secondary" | "white";
}

export function TypographyTitle({
  children,
  size = "md",
  align = "center",
}: TypographyProps) {
  return (
    <Title size={size} align={align}>
      {children}
    </Title>
  );
}

export function TypographySubtitle({
  children,
  size = "md",
  align = "center",
}: TypographyProps) {
  return (
    <Subtitle size={size} align={align}>
      {children}
    </Subtitle>
  );
}

export function TypographyText({
  children,
  size = "md",
  color = "white",
}: TypographyProps) {
  return (
    <Text size={size} color={color}>
      {children}
    </Text>
  );
} 