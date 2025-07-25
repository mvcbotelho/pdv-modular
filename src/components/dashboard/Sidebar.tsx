import { styled } from "@/styles/stitches.config";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui";
import {
  FiHome,
  FiCalendar,
  FiPackage,
  FiDollarSign,
  FiUsers,
  FiUser,
  FiSettings,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";

const SidebarContainer = styled("aside", {
  width: "280px",
  backgroundColor: "var(--background-secondary)",
  borderRight: "1px solid var(--border)",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s ease",
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  zIndex: 1000,
  overflow: "hidden",

  variants: {
    collapsed: {
      true: {
        width: "80px",
      },
    },
  },
});

const SidebarHeader = styled("div", {
  padding: "1.5rem",
  borderBottom: "1px solid var(--border)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  overflow: "hidden",
  position: "relative",
  zIndex: 5,
});

const Logo = styled("div", {
  fontSize: "1.25rem",
  fontWeight: "bold",
  color: "var(--primary)",
  whiteSpace: "nowrap",
  transition: "opacity 0.3s ease",

  variants: {
    collapsed: {
      true: {
        opacity: 0,
        width: 0,
      },
    },
  },
});

const ToggleButton = styled("button", {
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
  zIndex: 10,
  position: "relative",

  "&:hover": {
    color: "var(--text-primary)",
    backgroundColor: "var(--border)",
  },
});

const Nav = styled("nav", {
  flex: 1,
  padding: "1rem 0",
});

const NavList = styled("ul", {
  listStyle: "none",
  margin: 0,
  padding: 0,
});

const NavItem = styled("li", {
  margin: "0.25rem 1rem",
});

const NavLink = styled(Link, {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  padding: "0.75rem 1rem",
  color: "var(--text-secondary)",
  textDecoration: "none",
  borderRadius: "8px",
  transition: "all 0.2s ease",
  fontSize: "0.875rem",
  fontWeight: "500",
  whiteSpace: "nowrap",
  overflow: "hidden",

  "&:hover": {
    color: "var(--text-primary)",
    backgroundColor: "var(--border)",
  },

  variants: {
    active: {
      true: {
        backgroundColor: "var(--primary)",
        color: "white",
      },
    },
    collapsed: {
      true: {
        justifyContent: "center",
        padding: "0.75rem",
        gap: 0,
      },
    },
  },
});

const LinkText = styled("span", {
  transition: "opacity 0.3s ease",

  variants: {
    collapsed: {
      true: {
        opacity: 0,
        width: 0,
        overflow: "hidden",
      },
    },
  },
});

const LogoutButton = styled("button", {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  padding: "0.75rem 1rem",
  margin: "1rem",
  color: "var(--error)",
  textDecoration: "none",
  borderRadius: "8px",
  transition: "all 0.2s ease",
  fontSize: "0.875rem",
  fontWeight: "500",
  background: "none",
  border: "none",
  cursor: "pointer",
  width: "calc(100% - 2rem)",
  whiteSpace: "nowrap",
  overflow: "hidden",

  "&:hover": {
    backgroundColor: "var(--error)",
    color: "white",
  },

  variants: {
    collapsed: {
      true: {
        justifyContent: "center",
        padding: "0.75rem",
        gap: 0,
        width: "calc(100% - 1rem)",
        margin: "0.5rem",
      },
    },
  },
});

const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: FiHome },
  { path: "/agendamentos", label: "Agendamentos", icon: FiCalendar },
  { path: "/estoque", label: "Estoque", icon: FiPackage },
  { path: "/caixa", label: "Caixa", icon: FiDollarSign },
  { path: "/clientes", label: "Clientes", icon: FiUsers },
  { path: "/colaborador", label: "Colaborador", icon: FiUser },
  { path: "/configuracoes", label: "Configurações", icon: FiSettings },
];

interface SidebarProps {
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function Sidebar({ onCollapsedChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { success } = useToast();

  const handleCollapsedChange = (newCollapsed: boolean) => {
    setCollapsed(newCollapsed);
    localStorage.setItem('sidebar-collapsed', JSON.stringify(newCollapsed));
    onCollapsedChange?.(newCollapsed);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      success("Logout realizado com sucesso! 👋");
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <SidebarContainer collapsed={collapsed}>
      <SidebarHeader>
        <Logo collapsed={collapsed}>PDV Modular</Logo>
        <ToggleButton 
          onClick={() => {
            handleCollapsedChange(!collapsed);
          }}
        >
          <FiMenu size={20} />
        </ToggleButton>
      </SidebarHeader>

      <Nav>
        <NavList>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <NavItem key={item.path}>
                <NavLink 
                  to={item.path} 
                  active={isActive} 
                  collapsed={collapsed}
                >
                  <Icon size={18} />
                  <LinkText collapsed={collapsed}>{item.label}</LinkText>
                </NavLink>
              </NavItem>
            );
          })}
        </NavList>
      </Nav>

      <LogoutButton onClick={handleLogout} collapsed={collapsed}>
        <FiLogOut size={18} />
        <LinkText collapsed={collapsed}>Sair</LinkText>
      </LogoutButton>
    </SidebarContainer>
  );
} 