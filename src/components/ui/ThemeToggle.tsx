import { styled } from "@/styles/stitches.config";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";

const ToggleContainer = styled("button", {
  position: "relative",
  width: "48px",
  height: "24px",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
  padding: "2px",
  background: "var(--border)",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  "&:hover": {
    background: "var(--text-secondary)",
  },

  "&:focus": {
    outline: "none",
    boxShadow: "0 0 0 2px var(--primary)",
  },
});

const ToggleThumb = styled("div", {
  position: "absolute",
  top: "2px",
  left: "2px",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  background: "var(--background-secondary)",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--text-primary)",
  fontSize: "12px",

  variants: {
    isLight: {
      true: {
        transform: "translateX(24px)",
      },
    },
  },
});

const IconContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "20px",
  height: "20px",
  color: "var(--text-secondary)",
  fontSize: "12px",
  transition: "color 0.3s ease",
});

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <ToggleContainer onClick={toggleTheme} aria-label={`Mudar para modo ${isLight ? "escuro" : "claro"}`}>
      <IconContainer>
        <FiMoon size={12} />
      </IconContainer>
      <IconContainer>
        <FiSun size={12} />
      </IconContainer>
      <ToggleThumb isLight={isLight}>
        {isLight ? <FiSun size={10} /> : <FiMoon size={10} />}
      </ToggleThumb>
    </ToggleContainer>
  );
} 