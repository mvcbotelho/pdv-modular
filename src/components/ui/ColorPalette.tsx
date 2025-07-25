import { styled } from "@/styles/stitches.config";

const ColorGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "1rem",
  padding: "1rem",
});

const ColorCard = styled("div", {
  padding: "1rem",
  borderRadius: 8,
  border: "1px solid #1f2937",
  background: "#111827",
});

const ColorSwatch = styled("div", {
  width: "100%",
  height: "60px",
  borderRadius: 6,
  marginBottom: "0.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "0.875rem",
});

const ColorInfo = styled("div", {
  fontSize: "0.875rem",
});

const ColorName = styled("div", {
  fontWeight: "600",
  color: "#e5e7eb",
  marginBottom: "0.25rem",
});

const ColorHex = styled("div", {
  color: "#9ca3af",
  fontFamily: "monospace",
});

interface ColorPaletteProps {
  showPalette?: boolean;
}

export function ColorPalette({ showPalette = false }: ColorPaletteProps) {
  if (!showPalette) return null;

  const colors = [
    {
      name: "Background Primary",
      hex: "#0f0f1a",
      description: "Fundo principal da aplicação",
    },
    {
      name: "Background Secondary",
      hex: "#111827",
      description: "Fundo de cards e containers",
    },
    {
      name: "Border",
      hex: "#1f2937",
      description: "Bordas e divisores",
    },
    {
      name: "Primary",
      hex: "#6366f1",
      description: "Cor primária - títulos e links",
    },
    {
      name: "Primary Gradient Start",
      hex: "#8b5cf6",
      description: "Início do gradiente primário",
    },
    {
      name: "Primary Gradient End",
      hex: "#3b82f6",
      description: "Fim do gradiente primário",
    },
    {
      name: "Text Primary",
      hex: "#e5e7eb",
      description: "Texto principal",
    },
    {
      name: "Text Secondary",
      hex: "#9ca3af",
      description: "Texto secundário e subtítulos",
    },
    {
      name: "Text Muted",
      hex: "#6b7280",
      description: "Placeholders e texto desabilitado",
    },
    {
      name: "Success",
      hex: "#10b981",
      description: "Estados de sucesso",
    },
    {
      name: "Error",
      hex: "#ef4444",
      description: "Estados de erro",
    },
    {
      name: "Warning",
      hex: "#f59e0b",
      description: "Estados de aviso",
    },
    {
      name: "Info",
      hex: "#3b82f6",
      description: "Estados informativos",
    },
  ];

  return (
    <ColorGrid>
      {colors.map((color) => (
        <ColorCard key={color.hex}>
          <ColorSwatch style={{ backgroundColor: color.hex }}>
            {color.hex}
          </ColorSwatch>
          <ColorInfo>
            <ColorName>{color.name}</ColorName>
            <ColorHex>{color.hex}</ColorHex>
          </ColorInfo>
        </ColorCard>
      ))}
    </ColorGrid>
  );
} 