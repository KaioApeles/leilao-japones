# 🎰 BIDガチャ - Japanese Penny Auction

Site de leilão japonês (penny auction) com design inspirado em gacha/pachinko.

## 🚀 Setup Local

### 1. Clone/Copie os arquivos

```bash
# Crie uma nova pasta para o projeto
mkdir leilao-japones
cd leilao-japones
```

Copie todos os arquivos deste projeto para a pasta.

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações.

### 4. Execute o projeto

```bash
npm run dev
```

O projeto estará rodando em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
leilao-japones/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Header.tsx
│   │   ├── AuctionCard.tsx
│   │   └── UpcomingCard.tsx
│   ├── pages/              # Páginas/Rotas
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── MyBids.tsx
│   │   ├── BuyCredits.tsx
│   │   ├── Settings.tsx
│   │   └── Admin.tsx
│   ├── contexts/           # Context API
│   │   ├── AuthContext.tsx
│   │   └── LanguageContext.tsx
│   ├── types/              # TypeScript types
│   │   └── auction.ts
│   ├── data/               # Mock data (remover após integrar API)
│   │   └── mockData.ts
│   ├── styles/             # Estilos globais
│   │   └── globals.css
│   ├── App.tsx            # Componente principal
│   └── main.tsx           # Entry point
├── package.json
├── vite.config.ts
├── tsconfig.json
└── index.html
```

## 🔧 Próximos Passos - Integração Backend

### Opção 1: API REST Tradicional (Node.js/Express)

1. **Criar serviços de API:**

```typescript
// src/services/api.ts
const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  // Auth
  login: (email: string, password: string) => 
    fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }),
  
  // Auctions
  getActiveAuctions: () => 
    fetch(`${API_URL}/auctions/active`),
  
  placeBid: (itemId: string, token: string) =>
    fetch(`${API_URL}/bids`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ itemId }),
    }),
};
```

2. **WebSocket para atualizações em tempo real:**

```typescript
// src/services/websocket.ts
import { io } from 'socket.io-client';

const WS_URL = import.meta.env.VITE_WS_URL;

export const socket = io(WS_URL);

socket.on('bid_placed', (data) => {
  // Atualizar estado dos leilões
});
```

### Opção 2: Supabase (Recomendado para MVP rápido)

1. **Instalar Supabase:**

```bash
npm install @supabase/supabase-js
```

2. **Configurar cliente:**

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

3. **Schema do banco (SQL):**

```sql
-- Usuários (usa Supabase Auth)

-- Leilões
CREATE TABLE auctions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  current_price INTEGER DEFAULT 1,
  status TEXT DEFAULT 'upcoming',
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Lances
CREATE TABLE bids (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auction_id UUID REFERENCES auctions(id),
  user_id UUID REFERENCES auth.users(id),
  amount INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Créditos de usuário
CREATE TABLE user_credits (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  credits INTEGER DEFAULT 10,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Transações
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  type TEXT, -- 'purchase', 'bid', 'refund'
  amount INTEGER,
  credits INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

4. **Atualizar AuthContext para usar Supabase:**

```typescript
// src/contexts/AuthContext.tsx
import { supabase } from '../lib/supabase';

const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  
  // Buscar créditos do usuário
  const { data: credits } = await supabase
    .from('user_credits')
    .select('credits')
    .eq('user_id', data.user.id)
    .single();
  
  setUser({
    id: data.user.id,
    email: data.user.email,
    username: data.user.user_metadata.username,
    credits: credits?.credits || 0,
    isAdmin: data.user.user_metadata.is_admin || false,
  });
};
```

5. **Realtime para lances ao vivo:**

```typescript
// src/hooks/useRealtimeAuctions.ts
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useRealtimeAuctions() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    // Subscribe to changes
    const channel = supabase
      .channel('auctions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bids' },
        (payload) => {
          // Atualizar leilão quando novo lance
          console.log('New bid!', payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return auctions;
}
```

### Opção 3: Firebase

Similar ao Supabase, mas usando Firestore e Firebase Auth.

## 🎨 Tecnologias Utilizadas

- **React 18** - UI Framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **Motion** (Framer Motion) - Animations
- **React Router** - Routing
- **Lucide React** - Icons

## 💳 Integração de Pagamentos

Para a compra de créditos, você pode usar:

### PayPal

```bash
npm install @paypal/react-paypal-js
```

### Stripe

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

## 📱 Features

- ✅ Sistema de leilão em tempo real
- ✅ Multi-idioma (EN, PT, JA)
- ✅ Painel de usuário
- ✅ Painel administrativo
- ✅ Sistema de créditos
- ✅ Design responsivo
- ✅ Animações e efeitos visuais

## 🔐 Segurança

Lembre-se de implementar:

- [ ] Rate limiting
- [ ] CSRF protection
- [ ] Input validation
- [ ] SQL injection protection
- [ ] XSS protection
- [ ] Autenticação JWT ou session-based
- [ ] HTTPS em produção

## 📝 TODO - Backend

- [ ] Criar API REST ou usar Supabase
- [ ] Implementar autenticação real
- [ ] Sistema de pagamento (PayPal/Stripe)
- [ ] WebSocket/Realtime para lances
- [ ] Countdown automático dos leilões
- [ ] Sistema de notificações
- [ ] Email transacional
- [ ] Dashboard de analytics
- [ ] Sistema de refund
- [ ] Anti-fraud measures

## 🚀 Deploy

### Frontend (Vercel)

```bash
npm install -g vercel
vercel
```

### Backend Supabase

O Supabase já fornece hosting. Configure via dashboard.

### Backend Custom (Railway/Render/Heroku)

Deploy seu backend Node.js/Express normalmente.

---

**Demo Login:**
- Admin: admin@admin.com / admin
- User: qualquer email/senha (modo mock)

**Desenvolvido com ❤️ para leilões estilo japonês**
