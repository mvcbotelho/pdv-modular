import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TypographyText } from "@/components/ui/Typography";

export function Dashboard() {
  return (
    <DashboardLayout title="Dashboard">
      <TypographyText size="lg">
        Bem-vindo ao Dashboard 🎉
      </TypographyText>
      <TypographyText>
        O tema escuro é o padrão, mas você pode alternar usando o toggle no header!
      </TypographyText>
      <TypographyText>
        Use o menu lateral para navegar entre as diferentes seções do sistema.
      </TypographyText>
    </DashboardLayout>
  );
}
  