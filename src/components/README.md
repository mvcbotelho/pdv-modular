# Estrutura de Componentes

Esta pasta contém todos os componentes reutilizáveis da aplicação, organizados por categoria.

## 📁 Estrutura

```
src/components/
├── ui/                    # Componentes base da interface
│   ├── Button.tsx        # Botões com diferentes variantes
│   ├── Input.tsx         # Campos de entrada com validação
│   ├── Card.tsx          # Containers com estilo
│   ├── Divider.tsx       # Separadores visuais
│   ├── Typography.tsx    # Componentes de texto
│   ├── ErrorMessage.tsx  # Mensagens de erro
│   ├── Toast.tsx         # Notificações toast
│   ├── LoadingSpinner.tsx # Spinner de carregamento
│   ├── ProgressBar.tsx   # Barra de progresso
│   ├── ColorPalette.tsx  # Paleta de cores
│   └── index.ts          # Exportações dos componentes UI
├── layout/               # Componentes de layout
│   ├── AuthLayout.tsx    # Layout para páginas de autenticação
│   └── index.ts          # Exportações dos layouts
├── auth/                 # Componentes específicos de autenticação
│   └── LoginForm.tsx     # Formulário de login
├── dashboard/            # Componentes específicos do dashboard
│   ├── DashboardHeader.tsx
│   ├── DashboardContent.tsx
│   └── index.ts
└── index.ts              # Exportações principais
```

## 🎨 Componentes UI

### Button
Botão reutilizável com diferentes variantes e estados:
- `primary`: Botão principal com gradiente
- `secondary`: Botão secundário branco
- `ghost`: Botão transparente
- `success`: Botão de sucesso (verde)
- `error`: Botão de erro (vermelho)

```tsx
import { Button } from '@/components/ui';

<Button 
  variant="primary" 
  size="md" 
  loading={isLoading}
  onClick={handleClick}
>
  Clique aqui
</Button>
```

### Input
Campo de entrada com validação em tempo real:
```tsx
import { Input } from '@/components/ui';

<Input
  label="E-mail"
  type="email"
  placeholder="seu@email.com"
  status="success"
  statusMessage="Email válido ✓"
  icon={<Icon />}
  onIconClick={handleIconClick}
/>
```

### Toast
Sistema de notificações toast:
```tsx
import { useToast } from '@/components/ui';

const { success, error, warning, info } = useToast();

// Uso
success("Operação realizada com sucesso!");
error("Algo deu errado!");
warning("Atenção!");
info("Informação importante");
```

### LoadingSpinner
Spinner de carregamento:
```tsx
import { LoadingSpinner } from '@/components/ui';

<LoadingSpinner 
  size="md" 
  color="primary" 
  text="Carregando..." 
/>
```

### ProgressBar
Barra de progresso:
```tsx
import { ProgressBar } from '@/components/ui';

<ProgressBar 
  progress={75} 
  variant="success" 
  label="Upload" 
/>
```

### Card
Container com estilo consistente:
```tsx
import { Card } from '@/components/ui';

<Card maxWidth="md" size="lg">
  Conteúdo do card
</Card>
```

### Typography
Componentes de texto padronizados:
```tsx
import { TypographyTitle, TypographySubtitle, TypographyText } from '@/components/ui';

<TypographyTitle size="lg">Título</TypographyTitle>
<TypographySubtitle>Subtítulo</TypographySubtitle>
<TypographyText color="secondary">Texto normal</TypographyText>
```

## 🎨 Paleta de Cores

A aplicação utiliza uma paleta de cores consistente:

### Cores de Fundo
- **Primary:** `#0f0f1a` - Fundo principal
- **Secondary:** `#111827` - Fundo de cards
- **Border:** `#1f2937` - Bordas e divisores

### Cores Primárias
- **Main:** `#6366f1` - Cor primária
- **Gradient:** `#8b5cf6` → `#3b82f6` - Gradiente primário

### Cores de Texto
- **Primary:** `#e5e7eb` - Texto principal
- **Secondary:** `#9ca3af` - Texto secundário
- **Muted:** `#6b7280` - Placeholders

### Cores de Estado
- **Success:** `#10b981` - Sucesso
- **Error:** `#ef4444` - Erro
- **Warning:** `#f59e0b` - Aviso
- **Info:** `#3b82f6` - Informação

## 🔐 Componentes de Autenticação

### LoginForm
Formulário completo de login com:
- ✅ Validação em tempo real
- ✅ Estados visuais de feedback
- ✅ Tratamento de erros específicos
- ✅ Loading states
- ✅ Toast notifications
- ✅ Login com Google

## 📊 Componentes do Dashboard

### DashboardHeader
Cabeçalho do dashboard com título e área para ações.

### DashboardContent
Área de conteúdo principal do dashboard.

## 🎯 Feedback Visual

### Estados de Input
- **Success:** Borda verde com ícone de check
- **Error:** Borda vermelha com mensagem de erro
- **Warning:** Borda amarela com aviso

### Estados de Button
- **Loading:** Spinner interno + texto "Carregando..."
- **Disabled:** Opacidade reduzida + cursor not-allowed
- **Hover:** Elevação + sombra colorida

### Toast Notifications
- **Success:** Verde com ícone de check
- **Error:** Vermelho com ícone X
- **Warning:** Amarelo com ícone de alerta
- **Info:** Azul com ícone de informação

## 📦 Como usar

Importe os componentes conforme necessário:

```tsx
// Importação individual
import { Button } from '@/components/ui/Button';

// Importação do índice
import { Button, Input, Card } from '@/components/ui';

// Importação de todos os componentes
import * as UI from '@/components/ui';
```

## 🎯 Benefícios da Componentização

1. **Reutilização**: Componentes podem ser usados em múltiplas páginas
2. **Consistência**: Design uniforme em toda a aplicação
3. **Manutenibilidade**: Mudanças centralizadas nos componentes
4. **Testabilidade**: Componentes isolados são mais fáceis de testar
5. **Performance**: Componentes otimizados e memoizados quando necessário
6. **Feedback Visual**: Estados claros para melhor UX
7. **Acessibilidade**: Componentes com suporte a ARIA 