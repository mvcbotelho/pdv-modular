# 🛒 PDV Modular - Sistema de Ponto de Venda

Sistema de ponto de venda moderno e modular desenvolvido com React, TypeScript, Firebase e Stitches CSS-in-JS. Interface intuitiva com suporte completo a temas claro/escuro e navegação lateral colapsável.

## 🚀 Tecnologias

- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server
- **Firebase** - Autenticação, Firestore e Functions
- **Stitches** - CSS-in-JS para estilização
- **React Router** - Roteamento da aplicação
- **React Icons** - Ícones para a interface
- **SendGrid** - Serviço de email (Firebase Functions)

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ui/             # Componentes de interface (Button, Input, etc.)
│   ├── layout/         # Layouts (AuthLayout, DashboardLayout)
│   ├── auth/           # Componentes de autenticação
│   └── dashboard/      # Componentes do dashboard
├── config/             # Configurações (Firebase)
├── context/            # Contextos React (Auth, Theme)
├── hooks/              # Hooks customizados
├── modules/            # Módulos da aplicação
│   ├── auth/           # Páginas de autenticação
│   ├── dashboard/      # Dashboard principal
│   ├── agendamentos/   # Gestão de agendamentos
│   ├── estoque/        # Controle de estoque
│   ├── caixa/          # Sistema de vendas
│   ├── clientes/       # Gestão de clientes
│   ├── colaborador/    # Gestão de colaboradores
│   └── configuracoes/  # Configurações do sistema
├── routes/             # Configuração de rotas
├── services/           # Serviços e APIs
├── styles/             # Configuração de estilos (Stitches)
└── utils/              # Utilitários

functions/              # Firebase Functions
├── src/               # Código fonte das funções
└── lib/               # Build das funções
```

## 🛠️ Como Executar

1. **Instalar dependências:**
   ```bash
   pnpm install
   ```

2. **Configurar variáveis de ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto:
   ```bash
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=sua_api_key
   VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=seu_projeto_id
   VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
   VITE_FIREBASE_APP_ID=seu_app_id
   VITE_FIREBASE_MEASUREMENT_ID=seu_measurement_id
   ```

3. **Executar em desenvolvimento:**
   ```bash
   pnpm dev
   ```
   A aplicação estará disponível em `http://localhost:5173` (ou próxima porta disponível)

4. **Build para produção:**
   ```bash
   pnpm build
   ```

5. **Preview da build:**
   ```bash
   pnpm preview
   ```

6. **Linting:**
   ```bash
   pnpm lint
   ```

## 🔧 Configuração do Firebase

### 1. **Criar Projeto no Firebase Console**
- Acesse [Firebase Console](https://console.firebase.google.com)
- Crie um novo projeto
- Ative Authentication, Firestore e Functions

### 2. **Configurar Firebase Functions**
```bash
# Login no Firebase
firebase login

# Inicializar Functions
firebase init functions

# Configurar variáveis de ambiente
firebase functions:config:set sendgrid.key="SUA_SENDGRID_API_KEY"
firebase functions:config:set sendgrid.from="seu_email@dominio.com"
```

### 3. **Configurar SendGrid**
- Crie uma conta no [SendGrid](https://sendgrid.com)
- Gere uma API Key
- Configure o domínio de envio

### 4. **Deploy das Functions**
```bash
firebase deploy --only functions
```

**⚠️ IMPORTANTE:** 
- Nunca commite arquivos `.env` no repositório
- Mantenha as credenciais seguras
- Use variáveis de ambiente em produção

## 📱 Funcionalidades

### 🔐 Autenticação
- ✅ Login com email/senha
- ✅ Login com Google OAuth
- ✅ Recuperação de senha via email
- ✅ Proteção de rotas (PrivateRoute)
- ✅ Logout funcional
- ✅ Primeiro login com troca obrigatória de senha

### 🎨 Interface e UX
- ✅ Tema escuro/claro com toggle
- ✅ Sidebar colapsável (280px ↔ 80px)
- ✅ Navegação lateral com ícones
- ✅ Feedback visual (spinners, toasts)
- ✅ Design responsivo
- ✅ Animações suaves
- ✅ Persistência de preferências

### 📊 Dashboard
- ✅ Layout modular e reutilizável
- ✅ Header com theme toggle
- ✅ Sidebar com navegação completa
- ✅ Conteúdo adaptativo ao sidebar
- ✅ Persistência do estado do menu
- ✅ Lazy loading de módulos

### 🧩 Componentes UI
- ✅ Sistema de componentes completo
- ✅ Formulários com validação
- ✅ Toast notifications
- ✅ Loading spinners
- ✅ Inputs com estados de erro
- ✅ Botões com múltiplas variantes
- ✅ Cards e containers
- ✅ Typography system

### 🗂️ Módulos do Sistema
- 🏠 **Dashboard** - Página principal com visão geral
- 📅 **Agendamentos** - Gestão de horários e compromissos
- 📦 **Estoque** - Controle de produtos e inventário
- 💰 **Caixa** - Vendas, pagamentos e transações
- 👥 **Clientes** - Cadastro e gestão de clientes
- 👤 **Colaborador** - Gestão completa de funcionários
- ⚙️ **Configurações** - Configurações do sistema

### 🔥 Firebase Functions
- ✅ **sendWelcomeEmail** - Email de boas-vindas com credenciais
- ✅ **sendPasswordResetEmail** - Reset de senha via email
- ✅ **sendStatusChangeEmail** - Notificação de mudança de status
- ✅ Integração com SendGrid para envio de emails

## 🎨 Design System

O projeto utiliza Stitches CSS-in-JS com sistema de design completo:

### 🎨 Temas
- **Tema Escuro** - Padrão da aplicação (#0f0f1a)
- **Tema Claro** - Alternativa para melhor legibilidade (#ffffff)
- **CSS Variables** - Cores dinâmicas e transições suaves
- **Persistência** - Lembra a preferência do usuário

### 🧩 Componentes UI
- **Button** - Múltiplas variantes (primary, secondary, success, error, cancel, edit, permissions, fixed, filter)
- **Input** - Estados de erro, loading e validação
- **Card** - Containers com sombras e bordas
- **Typography** - Sistema tipográfico consistente
- **Toast** - Notificações temporárias
- **LoadingSpinner** - Indicadores de carregamento
- **ThemeToggle** - Alternador de temas
- **Select** - Dropdowns customizados
- **Textarea** - Campos de texto multilinha
- **ProgressBar** - Barras de progresso
- **ErrorMessage** - Exibição de erros

### 📐 Layout
- **AuthLayout** - Layout para páginas de autenticação
- **DashboardLayout** - Layout principal com sidebar
- **Responsivo** - Adaptação para diferentes telas
- **ErrorBoundary** - Tratamento de erros

### 🎯 Cores
- **Primary**: Gradiente roxo/azul (#6366f1)
- **Background**: Escuro (#0f0f1a) / Claro (#ffffff)
- **Text**: Hierarquia de cores para legibilidade
- **Status**: Success (#10b981), error (#ef4444), warning (#f59e0b), info (#3b82f6)

## 🚀 Como Usar

### 🔐 Login
1. Acesse a aplicação
2. Use email/senha ou login com Google
3. Em caso de esquecimento, use "Esqueci minha senha"
4. No primeiro login, será obrigatório trocar a senha

### 🎨 Tema
- **Toggle no header**: Alterna entre tema escuro/claro
- **Persistência**: Lembra sua preferência
- **Padrão**: Tema escuro

### 📱 Navegação
- **Sidebar**: Menu lateral com todos os módulos
- **Colapsar**: Clique no ícone de menu para comprimir
- **Expandir**: Clique novamente para expandir
- **Persistência**: Estado do menu é mantido
- **Lazy Loading**: Módulos carregados sob demanda

### 🧩 Componentes
```tsx
// Exemplo de uso dos componentes
import { Button, Input, Card, useToast } from "@/components/ui";

function MyComponent() {
  const { success } = useToast();
  
  return (
    <Card maxWidth="md">
      <Input 
        label="Email" 
        type="email" 
        placeholder="seu@email.com"
        required 
      />
      <Button 
        variant="primary" 
        onClick={() => success("Sucesso!")}
      >
        Enviar
      </Button>
    </Card>
  );
}
```

### 🔥 Firebase Functions
```typescript
// Exemplo de uso das Functions
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();
const sendWelcomeEmail = httpsCallable(functions, 'sendWelcomeEmail');

// Enviar email de boas-vindas
await sendWelcomeEmail({
  email: "usuario@exemplo.com",
  displayName: "João Silva",
  temporaryPassword: "senha123",
  companyName: "PDV System"
});
```

## 🛠️ Desenvolvimento

### Scripts Disponíveis
```bash
pnpm dev          # Servidor de desenvolvimento
pnpm build        # Build para produção
pnpm preview      # Preview da build
pnpm lint         # Executar ESLint
```

### Estrutura de Desenvolvimento
- **TypeScript** - Tipagem estática
- **ESLint** - Linting de código
- **Vite** - Build tool rápido
- **Hot Reload** - Recarregamento automático
- **Path Mapping** - Imports com `@/`

## 📄 Licença

Este projeto é privado e de uso interno.

---

**🎉 Status do Projeto: ✅ PRONTO PARA PRODUÇÃO**
