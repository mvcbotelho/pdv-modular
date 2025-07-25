import { styled } from "@/styles/stitches.config";
import { ReactNode } from "react";

const Content = styled("main", {
  flex: 1,
  padding: "2rem",
  backgroundColor: "var(--background)",
  minHeight: "calc(100vh - 80px)",
});

interface DashboardContentProps {
  children: ReactNode;
}

export function DashboardContent({ children }: DashboardContentProps) {
  return <Content>{children}</Content>;
} 