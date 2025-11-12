# Projeto 3: Chatbot com IA

## Visão Geral

Um assistente inteligente de estudos usando OpenAI API com autenticação, histórico de conversas e deploy em Vercel.

**Tecnologias:** Node.js, Express, React, TypeScript, OpenAI API, JWT, Vercel

**Funcionalidades:**
- ✓ Chat em tempo real
- ✓ Integração com OpenAI
- ✓ Histórico de conversas
- ✓ Autenticação de usuários
- ✓ Deploy automático
- ✓ Interface moderna

---

## Arquitetura

```
chatbot-ia/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── chatController.ts
│   │   ├── routes/
│   │   │   └── chat.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatMessage.tsx
│   │   │   └── ChatInput.tsx
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   └── ChatPage.tsx
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

---

## Backend Setup

### 1. Inicializar Projeto

```bash
mkdir chatbot-ia && cd chatbot-ia
mkdir backend && cd backend
npm init -y
npm install express cors dotenv openai
npm install -D typescript @types/express @types/node ts-node
npx tsc --init
```

### 2. Configurar Variáveis de Ambiente

**`.env`:**

```
OPENAI_API_KEY=sua-chave-openai
JWT_SECRET=seu-segredo-super-secreto
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### 3. Middleware de Autenticação

**`src/middleware/auth.ts`:**

```typescript
import jwt from "jsonwebtoken";

export const autenticar = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.usuario = payload;
    next();
  } catch (erro) {
    res.status(401).json({ erro: "Token inválido" });
  }
};
```

### 4. Controller de Chat

**`src/controllers/chatController.ts`:**

```typescript
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Armazenar conversas em memória (em produção, usar banco de dados)
const conversas: Record<string, any[]> = {};

export const enviarMensagem = async (req: any, res: any) => {
  try {
    const { mensagem, conversaId } = req.body;
    const usuarioId = req.usuario.id;

    // Inicializar conversa se não existir
    if (!conversas[conversaId]) {
      conversas[conversaId] = [];
    }

    // Adicionar mensagem do usuário
    conversas[conversaId].push({
      role: "user",
      content: mensagem
    });

    // Chamar OpenAI
    const resposta = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversas[conversaId],
      temperature: 0.7,
      max_tokens: 500
    });

    const respostaTexto = resposta.choices[0].message.content || "";

    // Adicionar resposta da IA
    conversas[conversaId].push({
      role: "assistant",
      content: respostaTexto
    });

    res.json({
      resposta: respostaTexto,
      conversaId
    });
  } catch (erro) {
    console.error("Erro ao processar mensagem", erro);
    res.status(500).json({ erro: "Erro ao processar mensagem" });
  }
};

export const obterHistorico = async (req: any, res: any) => {
  try {
    const { conversaId } = req.params;

    if (!conversas[conversaId]) {
      return res.json({ mensagens: [] });
    }

    res.json({ mensagens: conversas[conversaId] });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao obter histórico" });
  }
};

export const limparConversa = async (req: any, res: any) => {
  try {
    const { conversaId } = req.params;

    if (conversas[conversaId]) {
      delete conversas[conversaId];
    }

    res.json({ mensagem: "Conversa limpa" });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao limpar conversa" });
  }
};
```

### 5. Rotas

**`src/routes/chat.ts`:**

```typescript
import express from "express";
import { autenticar } from "../middleware/auth";
import {
  enviarMensagem,
  obterHistorico,
  limparConversa
} from "../controllers/chatController";

const router = express.Router();

router.post("/mensagem", autenticar, enviarMensagem);
router.get("/historico/:conversaId", autenticar, obterHistorico);
router.delete("/limpar/:conversaId", autenticar, limparConversa);

export default router;
```

### 6. Servidor Principal

**`src/server.ts`:**

```typescript
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import chatRoutes from "./routes/chat";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));
app.use(express.json());

// Rota de login (simplificada para demo)
app.post("/api/auth/login", (req, res) => {
  try {
    const { email, senha } = req.body;

    // Em produção, verificar no banco de dados
    if (!email || !senha) {
      return res.status(400).json({ erro: "Email e senha obrigatórios" });
    }

    const token = jwt.sign(
      { id: Date.now(), email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    res.json({ token, usuario: { email } });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao fazer login" });
  }
});

// Rotas de chat
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
```

---

## Frontend Setup

### 1. Criar Projeto React

```bash
cd ..
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm install axios
```

### 2. Componentes

**`src/components/ChatMessage.tsx`:**

```typescript
import React from "react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <div
      className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isUser
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-900"
        }`}
      >
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};
```

**`src/components/ChatInput.tsx`:**

```typescript
import React, { useState } from "react";

interface ChatInputProps {
  onSend: (mensagem: string) => void;
  loading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, loading }) => {
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mensagem.trim()) {
      onSend(mensagem);
      setMensagem("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
      <input
        type="text"
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        placeholder="Digite sua mensagem..."
        disabled={loading}
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
};
```

### 3. Páginas

**`src/pages/LoginPage.tsx`:**

```typescript
import React, { useState } from "react";
import axios from "axios";

interface LoginPageProps {
  onLogin: (token: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro("");

    try {
      const resposta = await axios.post(
        "http://localhost:3001/api/auth/login",
        { email, senha }
      );

      onLogin(resposta.data.token);
    } catch (erro) {
      setErro("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Chatbot IA</h1>

        {erro && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};
```

**`src/pages/ChatPage.tsx`:**

```typescript
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ChatMessage } from "../components/ChatMessage";
import { ChatInput } from "../components/ChatInput";

interface ChatPageProps {
  token: string;
  onLogout: () => void;
}

interface Mensagem {
  role: "user" | "assistant";
  content: string;
}

export const ChatPage: React.FC<ChatPageProps> = ({ token, onLogout }) => {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [loading, setLoading] = useState(false);
  const [conversaId] = useState(Date.now().toString());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mensagens]);

  const handleEnviarMensagem = async (mensagem: string) => {
    setMensagens([...mensagens, { role: "user", content: mensagem }]);
    setLoading(true);

    try {
      const resposta = await axios.post(
        "http://localhost:3001/api/chat/mensagem",
        { mensagem, conversaId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMensagens((prev) => [
        ...prev,
        { role: "assistant", content: resposta.data.resposta }
      ]);
    } catch (erro) {
      console.error("Erro ao enviar mensagem", erro);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Assistente de Estudos</h1>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Sair
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 bg-gray-50"
      >
        {mensagens.length === 0 && (
          <div className="h-full flex items-center justify-center text-gray-400">
            <p>Comece uma conversa com o assistente</p>
          </div>
        )}

        {mensagens.map((msg, idx) => (
          <ChatMessage key={idx} role={msg.role} content={msg.content} />
        ))}
      </div>

      <ChatInput onSend={handleEnviarMensagem} loading={loading} />
    </div>
  );
};
```

### 4. App Principal

**`src/App.tsx`:**

```typescript
import React, { useState } from "react";
import { LoginPage } from "./pages/LoginPage";
import { ChatPage } from "./pages/ChatPage";

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const handleLogin = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <>
      {token ? (
        <ChatPage token={token} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
```

---

## Deploy

### Backend (Render)

1. Push código para GitHub
2. Conecte repositório no Render
3. Configure variáveis de ambiente:
   - `OPENAI_API_KEY`
   - `JWT_SECRET`
   - `FRONTEND_URL`
4. Deploy automático

### Frontend (Vercel)

```bash
npm install -g vercel
vercel
```

Configure variável de ambiente:
- `VITE_API_URL=https://seu-backend.render.com`

---

## Conclusão

Este projeto demonstra:
- ✓ Integração com OpenAI API
- ✓ Autenticação JWT
- ✓ Chat em tempo real
- ✓ Histórico de conversas
- ✓ Frontend responsivo
- ✓ Deploy em produção

Parabéns por completar o Projeto 3! 🎉
