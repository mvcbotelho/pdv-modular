import { styled } from "@/styles/stitches.config";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/ui";
import { FiMenu } from "react-icons/fi";

const Header = styled("header", {
  background: "var(--background-secondary)",
  borderBottom: "1px solid var(--border)",
  padding: "1rem 2rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const Title = styled("h1", {
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "var(--primary)",
  margin: 0,
});

const Actions = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

const SidebarToggle = styled("button", {
  background: "none",
  border: "none",
  color: "var(--text-secondary)",
  cursor: "pointer",
  padding: "0.5rem",
  borderRadius: "4px",
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    color: "var(--text-primary)",
    backgroundColor: "var(--border)",
  },
});

interface DashboardHeaderProps {
  title: string;
  actions?: ReactNode;
  onSidebarToggle?: () => void;
}

export function DashboardHeader({ title, actions, onSidebarToggle }: DashboardHeaderProps) {
  return (
    <Header>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {onSidebarToggle && (
          <SidebarToggle onClick={onSidebarToggle}>
            <FiMenu size={20} />
          </SidebarToggle>
        )}
        <Title>{title}</Title>
      </div>
      <Actions>
        <ThemeToggle />
        {actions}
      </Actions>
    </Header>
  );
} 