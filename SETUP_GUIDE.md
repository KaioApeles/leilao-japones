# 🎯 Guia de Setup - Exportar para Local

## 📋 Passo a Passo

### 1️⃣ Baixar o Projeto

Você tem algumas opções:

**Opção A: Download Manual**
- Baixe todos os arquivos deste projeto
- Mantenha a estrutura de pastas

**Opção B: Git (se tiver repositório)**
```bash
git clone <seu-repositorio>
cd leilao-japones
```

### 2️⃣ Reorganizar Arquivos (IMPORTANTE!)

Mova os arquivos para seguir a estrutura do Vite:

```
ANTES (Figma Make):          →    DEPOIS (Vite):
/App.tsx                     →    /src/App.tsx
/components/                 →    /src/components/
/contexts/                   →    /src/contexts/
/pages/                      →    /src/pages/
/types/                      →    /src/types/
/data/                       →    /src/data/
/styles/                     →    /src/styles/
```

**Estrutura final:**
```
leilao-japones/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── types/
│   ├── data/
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env.example
└── README.md
```

### 3️⃣ Instalar Node.js

Se ainda não tiver, instale o Node.js:
- Baixe em: https://nodejs.org/
- Versão recomendada: 18.x ou superior

Verifique:
```bash
node --version
npm --version
```

### 4️⃣ Instalar Dependências

```bash
npm install
```

Isso vai instalar:
- React 18
- React Router DOM
- Motion (Framer Motion)
- Lucide Icons
- Tailwind CSS v4
- Vite
- TypeScript

### 5️⃣ Configurar Variáveis de Ambiente

```bash
cp .env.example .env
```

Edite `.env` conforme necessário.

### 6️⃣ Rodar o Projeto

```bash
npm run dev
```

Abra no navegador: `http://localhost:3000`

---

## 🔄 Integração com Backend

### Cenário 1: API REST própria (Node.js/Express)

#### Backend Setup

**1. Criar projeto backend:**
```bash
mkdir backend
cd backend
npm init -y
npm install express cors dotenv pg jsonwebtoken bcrypt
npm install -D typescript @types/node @types/express ts-node-dev
```

**2. Estrutura básica:**
```typescript
// backend/src/server.ts
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.post('/api/auth/login', async (req, res) => {
  // Implementar login
});

app.get('/api/auctions/active', async (req, res) => {
  // Retornar leilões ativos
});

app.post('/api/bids', async (req, res) => {
  // Registrar lance
});

app.listen(4000, () => {
  console.log('Backend rodando na porta 4000');
});
```

#### Frontend Integration

**3. Criar serviço de API:**
```bash
# No projeto frontend
mkdir src/services
```

Crie `src/services/api.ts`:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const api = {
  async login(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  async getActiveAuctions() {
    const res = await fetch(`${API_URL}/auctions/active`);
    return res.json();
  },

  async placeBid(itemId: string, token: string) {
    const res = await fetch(`${API_URL}/bids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ itemId }),
    });
    return res.json();
  },
};
```

**4. Atualizar AuthContext:**
```typescript
// src/contexts/AuthContext.tsx
import { api } from '../services/api';

const login = async (email: string, password: string) => {
  const data = await api.login(email, password);
  setUser(data.user);
  localStorage.setItem('token', data.token);
};
```

---

### Cenário 2: Supabase (Recomendado - Mais Rápido)

#### 1. Criar conta Supabase
- Acesse: https://supabase.com
- Crie um novo projeto
- Anote: `SUPABASE_URL` e `SUPABASE_ANON_KEY`

#### 2. Instalar no frontend
```bash
npm install @supabase/supabase-js
```

#### 3. Configurar cliente
```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

#### 4. Criar tabelas (SQL Editor no Supabase)
```sql
-- Criar tabelas conforme o README.md
-- Copie o schema SQL da seção "Supabase"
```

#### 5. Atualizar contextos

**AuthContext com Supabase:**
```typescript
import { supabase } from '../lib/supabase';

const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  
  // Buscar créditos
  const { data: userCredits } = await supabase
    .from('user_credits')
    .select('credits')
    .eq('user_id', data.user.id)
    .single();
  
  setUser({
    id: data.user.id,
    email: data.user.email!,
    username: data.user.user_metadata.username,
    credits: userCredits?.credits || 0,
    isAdmin: data.user.user_metadata.is_admin || false,
  });
};
```

**Buscar leilões ativos:**
```typescript
// src/pages/Home.tsx
import { supabase } from '../lib/supabase';

useEffect(() => {
  async function fetchAuctions() {
    const { data } = await supabase
      .from('auctions')
      .select('*')
      .eq('status', 'active')
      .order('end_time', { ascending: true });
    
    setActiveAuctions(data || []);
  }
  
  fetchAuctions();
}, []);
```

**Realtime bids:**
```typescript
useEffect(() => {
  const channel = supabase
    .channel('bids')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'bids' },
      (payload) => {
        // Atualizar leilão quando houver novo lance
        console.log('Novo lance!', payload);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

---

## 💳 Integração de Pagamento

### Stripe (Recomendado)

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

```typescript
// src/components/StripeCheckout.tsx
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Implementar checkout
```

### PayPal

```bash
npm install @paypal/react-paypal-js
```

```typescript
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
```

---

## 🚀 Deploy

### Frontend - Vercel (Recomendado)

```bash
npm install -g vercel
vercel login
vercel
```

Ou conecte seu GitHub ao Vercel.

### Backend - Railway

1. Crie conta em railway.app
2. Conecte seu repositório
3. Configure variáveis de ambiente
4. Deploy automático!

### Banco de Dados

- **Supabase**: Já inclui hosting
- **PostgreSQL**: Railway, Render, ou Supabase
- **MongoDB**: MongoDB Atlas

---

## ✅ Checklist

- [ ] Node.js instalado
- [ ] Arquivos na estrutura correta (`src/`)
- [ ] `npm install` executado
- [ ] `.env` configurado
- [ ] Projeto rodando (`npm run dev`)
- [ ] Backend escolhido (API própria ou Supabase)
- [ ] Banco de dados configurado
- [ ] Autenticação integrada
- [ ] Sistema de pagamento configurado
- [ ] Realtime/WebSocket implementado
- [ ] Deploy em produção

---

## 🆘 Problemas Comuns

**Erro: Cannot find module**
```bash
npm install
```

**Porta 3000 já em uso**
```bash
# Edite vite.config.ts e mude a porta
server: { port: 3001 }
```

**Tailwind não funciona**
```bash
# Verifique se @tailwindcss/vite está instalado
npm install -D tailwindcss@next @tailwindcss/vite@next
```

**TypeScript errors**
```bash
# Verifique tsconfig.json
# Certifique-se que os paths estão corretos
```

---

## 📚 Recursos Úteis

- [Documentação Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Motion Docs](https://motion.dev/)

---

**Dúvidas?** Consulte o README.md principal!
