# 🛒 PDV Modular - Sistema de Ponto de Venda

Sistema de ponto de venda moderno e modular desenvolvido com React, TypeScript, Firebase e Stitches CSS-in-JS. Interface intuitiva com suporte completo a temas claro/escuro e navegação lateral colapsável.

## 🚀 Tecnologias

- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server
- **Firebase** - Autenticação e banco de dados
- **Stitches** - CSS-in-JS para estilização
- **React Router** - Roteamento da aplicação
- **React Icons** - Ícones para a interface

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ui/             # Componentes de interface (Button, Input, etc.)
│   ├── layout/         # Layouts (AuthLayout, DashboardLayout)
│   ├── auth/           # Componentes de autenticação
│   └── dashboard/      # Componentes do dashboard
├── config/             # Configurações (Firebase, etc.)
├── context/            # Contextos React (Auth, Theme)
├── modules/            # Módulos da aplicação
│   ├── auth/           # Páginas de autenticação
│   └── dashboard/      # Dashboard principal
├── routes/             # Configuração de rotas
├── services/           # Serviços e APIs
└── styles/             # Configuração de estilos (Stitches)
```

## 🛠️ Como Executar

1. **Instalar dependências:**
   ```bash
   pnpm install
   ```

2. **Executar em desenvolvimento:**
   ```bash
   pnpm dev
   ```

3. **Build para produção:**
   ```bash
   pnpm build
   ```

4. **Preview da build:**
   ```bash
   pnpm preview
   ```

## 🔧 Configuração do Firebase

Certifique-se de configurar as variáveis do Firebase no arquivo `src/config/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  // ... outras configurações
};
```

## 📱 Funcionalidades

### 🔐 Autenticação
- ✅ Login com email/senha
- ✅ Login com Google
- ✅ Recuperação de senha via email
- ✅ Proteção de rotas (PrivateRoute)
- ✅ Logout funcional

### 🎨 Interface e UX
- ✅ Tema escuro/claro com toggle
- ✅ Sidebar colapsável (280px ↔ 80px)
- ✅ Navegação lateral com ícones
- ✅ Feedback visual (spinners, toasts)
- ✅ Design responsivo
- ✅ Animações suaves

### 📊 Dashboard
- ✅ Layout modular e reutilizável
- ✅ Header com theme toggle
- ✅ Sidebar com navegação completa
- ✅ Conteúdo adaptativo ao sidebar
- ✅ Persistência do estado do menu

### 🧩 Componentes
- ✅ Sistema de componentes UI completo
- ✅ Formulários com validação
- ✅ Toast notifications
- ✅ Loading spinners
- ✅ Inputs com estados de erro
- ✅ Botões com variantes

### 🗂️ Módulos do Sistema
- 🏠 Dashboard - Página principal
- 📅 Agendamentos - Gestão de horários
- 📦 Estoque - Controle de produtos
- 💰 Caixa - Vendas e pagamentos
- 👥 Clientes - Cadastro de clientes
- 👤 Colaborador - Gestão de funcionários
- ⚙️ Configurações - Configurações do sistema

## 🎨 Design System

O projeto utiliza Stitches CSS-in-JS com sistema de design completo:

### 🎨 Temas
- **Tema Escuro** - Padrão da aplicação
- **Tema Claro** - Alternativa para melhor legibilidade
- **CSS Variables** - Cores dinâmicas e transições suaves

### 🧩 Componentes UI
- **Button** - Múltiplas variantes (primary, secondary, success, error)
- **Input** - Estados de erro, loading e validação
- **Card** - Containers com sombras e bordas
- **Typography** - Sistema tipográfico consistente
- **Toast** - Notificações temporárias
- **LoadingSpinner** - Indicadores de carregamento
- **ThemeToggle** - Alternador de temas

### 📐 Layout
- **AuthLayout** - Layout para páginas de autenticação
- **DashboardLayout** - Layout principal com sidebar
- **Responsivo** - Adaptação para diferentes telas

### 🎯 Cores
- **Primary**: Gradiente roxo/azul (#6366f1)
- **Background**: Escuro (#0f0f1a) / Claro (#ffffff)
- **Text**: Hierarquia de cores para legibilidade
- **Status**: Success, error, warning, info

## 🚀 Como Usar

### 🔐 Login
1. Acesse a aplicação
2. Use email/senha ou login com Google
3. Em caso de esquecimento, use "Esqueci minha senha"

### 🎨 Tema
- **Toggle no header**: Alterna entre tema escuro/claro
- **Persistência**: Lembra sua preferência
- **Padrão**: Tema escuro

### 📱 Navegação
- **Sidebar**: Menu lateral com todos os módulos
- **Colapsar**: Clique no ícone de menu para comprimir
- **Expandir**: Clique novamente para expandir
- **Persistência**: Estado do menu é mantido

### 🧩 Componentes
```tsx
// Exemplo de uso dos componentes
import { Button, Input, Card, useToast } from "@/components/ui";

function MyComponent() {
  const { success } = useToast();
  
  return (
    <Card>
      <Input label="Email" type="email" />
      <Button onClick={() => success("Sucesso!")}>
        Enviar
      </Button>
    </Card>
  );
}
```

## 📄 Licença

Este projeto é privado e de uso interno.
