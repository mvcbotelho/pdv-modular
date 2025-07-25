import { styled } from "@/styles/stitches.config";
import type { ReactNode } from "react";

const Container = styled("div", {
  minHeight: "100vh",
  backgroundColor: "var(--background)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
  transition: "background-color 0.3s ease",
});

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return <Container>{children}</Container>;
} 