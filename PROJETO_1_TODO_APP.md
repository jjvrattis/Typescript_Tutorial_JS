# Projeto 1: ToDo App Fullstack

## Visão Geral

Uma aplicação completa de gerenciamento de tarefas com backend robusto em Node.js + Express + Prisma e frontend moderno em React + TypeScript.

**Tecnologias:** Node.js, Express, React, TypeScript, Prisma, PostgreSQL, JWT, TailwindCSS

**Funcionalidades:**
- ✓ CRUD completo de tarefas
- ✓ Autenticação JWT
- ✓ Banco de dados PostgreSQL
- ✓ API REST
- ✓ Interface responsiva
- ✓ Deploy em produção

---

## Arquitetura

```
todo-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── server.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

---

## Backend Setup

### 1. Inicializar Projeto

```bash
mkdir todo-app && cd todo-app
mkdir backend && cd backend
npm init -y
npm install express cors dotenv
npm install -D typescript @types/express @types/node ts-node
npx tsc --init
```

### 2. Instalar Prisma

```bash
npm install @prisma/client
npm install -D prisma
npx prisma init
```

### 3. Configurar Banco de Dados

**`.env`:**

```
DATABASE_URL="postgresql://user:password@localhost:5432/todo_db"
JWT_SECRET="seu-segredo-super-secreto"
PORT=3001
```

**`prisma/schema.prisma`:**

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  password String
  name  String
  todos Todo[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Todo {
  id    Int     @id @default(autoincrement())
  title String
  description String?
  completed Boolean @default(false)
  userId Int
  user  User @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 4. Executar Migrations

```bash
npx prisma migrate dev --name init
```

### 5. Criar Servidor Express

**`src/server.ts`:**

```typescript
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Middleware de autenticação
const autenticar = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.usuario = payload;
    next();
  } catch (erro) {
    res.status(401).json({ erro: "Token inválido" });
  }
};

// Registro
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    const usuarioExistente = await prisma.user.findUnique({
      where: { email }
    });

    if (usuarioExistente) {
      return res.status(400).json({ erro: "Usuário já existe" });
    }

    const senhaHash = await bcryptjs.hash(password, 10);

    const usuario = await prisma.user.create({
      data: {
        email,
        password: senhaHash,
        name
      }
    });

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, usuario: { id: usuario.id, email: usuario.email, name: usuario.name } });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao registrar" });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await prisma.user.findUnique({
      where: { email }
    });

    if (!usuario) {
      return res.status(401).json({ erro: "Credenciais inválidas" });
    }

    const senhaValida = await bcryptjs.compare(password, usuario.password);

    if (!senhaValida) {
      return res.status(401).json({ erro: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, usuario: { id: usuario.id, email: usuario.email, name: usuario.name } });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao fazer login" });
  }
});

// Criar tarefa
app.post("/api/todos", autenticar, async (req: any, res) => {
  try {
    const { title, description } = req.body;

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        userId: req.usuario.id
      }
    });

    res.status(201).json(todo);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao criar tarefa" });
  }
});

// Listar tarefas
app.get("/api/todos", autenticar, async (req: any, res) => {
  try {
    const todos = await prisma.todo.findMany({
      where: { userId: req.usuario.id },
      orderBy: { createdAt: "desc" }
    });

    res.json(todos);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao listar tarefas" });
  }
});

// Atualizar tarefa
app.put("/api/todos/:id", autenticar, async (req: any, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todo = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: { title, description, completed }
    });

    res.json(todo);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao atualizar tarefa" });
  }
});

// Deletar tarefa
app.delete("/api/todos/:id", autenticar, async (req: any, res) => {
  try {
    const { id } = req.params;

    await prisma.todo.delete({
      where: { id: parseInt(id) }
    });

    res.json({ mensagem: "Tarefa deletada" });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao deletar tarefa" });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
```

### 6. Instalar Dependências Adicionais

```bash
npm install jsonwebtoken bcryptjs
npm install -D @types/jsonwebtoken @types/bcryptjs
```

### 7. Executar Servidor

```bash
npx ts-node src/server.ts
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

### 2. Estrutura de Componentes

**`src/components/TodoForm.tsx`:**

```typescript
import React, { useState } from "react";
import axios from "axios";

interface TodoFormProps {
  onTodoCreated: () => void;
  token: string;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onTodoCreated, token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3001/api/todos",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTitle("");
      setDescription("");
      onTodoCreated();
    } catch (erro) {
      console.error("Erro ao criar tarefa", erro);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded shadow">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Criar Tarefa
      </button>
    </form>
  );
};
```

**`src/components/TodoList.tsx`:**

```typescript
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TodoListProps {
  token: string;
  refresh: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({ token, refresh }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const buscarTarefas = async () => {
      try {
        const resposta = await axios.get("http://localhost:3001/api/todos", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setTodos(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar tarefas", erro);
      }
    };

    buscarTarefas();
  }, [token, refresh]);

  const handleToggle = async (id: number, completed: boolean) => {
    try {
      await axios.put(
        `http://localhost:3001/api/todos/${id}`,
        { completed: !completed },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } catch (erro) {
      console.error("Erro ao atualizar tarefa", erro);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (erro) {
      console.error("Erro ao deletar tarefa", erro);
    }
  };

  return (
    <div>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="mb-2 p-4 bg-white rounded shadow flex justify-between items-center"
        >
          <div>
            <h3
              className={`font-bold ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.title}
            </h3>
            <p className="text-gray-600">{todo.description}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleToggle(todo.id, todo.completed)}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {todo.completed ? "Desfazer" : "Concluir"}
            </button>
            <button
              onClick={() => handleDelete(todo.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Deletar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
```

---

## Deploy

### Backend (Render)

1. Push código para GitHub
2. Conecte repositório no Render
3. Configure variáveis de ambiente
4. Deploy automático

### Frontend (Vercel)

```bash
npm install -g vercel
vercel
```

---

## Conclusão

Este projeto demonstra:
- ✓ Estrutura fullstack completa
- ✓ Autenticação JWT
- ✓ CRUD com Prisma
- ✓ API REST
- ✓ Frontend responsivo
- ✓ Deploy em produção

Parabéns por completar o Projeto 1! 🎉
