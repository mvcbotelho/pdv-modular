import { styled } from "@/styles/stitches.config";
import type { ReactNode } from "react";

const StyledDivider = styled("div", {
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  margin: "2rem 0 1rem",
  color: "#9ca3af",
  fontSize: "0.875rem",

  "&::before, &::after": {
    content: '""',
    flex: 1,
    height: "1px",
    background: "#374151",
  },

  "&::before": {
    marginRight: "1rem",
  },
  "&::after": {
    marginLeft: "1rem",
  },
});

interface DividerProps {
  children?: ReactNode;
}

export function Divider({ children }: DividerProps) {
  return <StyledDivider>{children}</StyledDivider>;
} 