import { styled } from "@/styles/stitches.config";
import { useState } from "react";
import type { ReactNode } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Sidebar } from "@/components/dashboard/Sidebar";

const Layout = styled("div", {
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "var(--background)",
});

const Main = styled("main", {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  marginLeft: "280px",
  transition: "margin-left 0.3s ease",
  width: "calc(100vw - 280px)",

  variants: {
    sidebarCollapsed: {
      true: {
        marginLeft: "80px",
        width: "calc(100vw - 80px)",
      },
    },
  },
});

const Content = styled("div", {
  flex: 1,
  padding: "2rem",
  backgroundColor: "var(--background)",
  minHeight: "calc(100vh - 80px)",
});

interface DashboardLayoutProps {
  title: string;
  children: ReactNode;
}

export function DashboardLayout({ title, children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  return (
    <Layout>
      <Sidebar 
        onCollapsedChange={(collapsed) => {
          setSidebarCollapsed(collapsed);
        }}
      />
      <Main sidebarCollapsed={sidebarCollapsed}>
        <DashboardHeader title={title} />
        <Content>{children}</Content>
      </Main>
    </Layout>
  );
} 