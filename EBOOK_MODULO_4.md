# Módulo 4: Back-end com TypeScript

## 🎯 Objetivo do Módulo

Neste módulo você aprenderá a criar APIs REST com Express e TypeScript. Você criará um **"Servidor Mágico"** que gerencia usuários e tarefas!

---

## 📖 Seção 1: Express Basics

### O que é Express?

Express é um framework minimalista para criar servidores web em Node.js.

### Criar Servidor Simples

```bash
npm install express
npm install -D @types/express
```

```typescript
import express from "express";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Rota GET
app.get("/", (req, res) => {
  res.json({ mensagem: "Olá, mundo!" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
```

---

## 📖 Seção 2: Rotas HTTP

### Métodos HTTP

```typescript
// GET - Obter dados
app.get("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  res.json({ id, nome: "João" });
});

// POST - Criar dados
app.post("/usuarios", (req, res) => {
  const { nome, email } = req.body;
  res.status(201).json({ id: 1, nome, email });
});

// PUT - Atualizar dados
app.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  res.json({ id, nome });
});

// DELETE - Deletar dados
app.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  res.json({ mensagem: `Usuário ${id} deletado` });
});

// PATCH - Atualização parcial
app.patch("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  res.json({ id, atualizado: true });
});
```

---

## 📖 Seção 3: Middlewares

Middlewares são funções que processam requisições.

```typescript
// Middleware de log
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Middleware de autenticação
const autenticar = (req: any, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }
  req.usuario = { id: 1, nome: "João" };
  next();
};

// Usar middleware em rota específica
app.get("/perfil", autenticar, (req: any, res) => {
  res.json(req.usuario);
});

// Middleware de erro
app.use((err: any, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: "Erro interno do servidor" });
});
```

---

## 📖 Seção 4: Validação de Dados

### Validar com Zod

```bash
npm install zod
```

```typescript
import { z } from "zod";

const UsuarioSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  idade: z.number().min(18)
});

app.post("/usuarios", (req, res) => {
  try {
    const dados = UsuarioSchema.parse(req.body);
    res.status(201).json(dados);
  } catch (erro) {
    res.status(400).json({ erro });
  }
});
```

---

## 📖 Seção 5: Estrutura MVC

```
src/
├── controllers/
│   └── usuarioController.ts
├── routes/
│   └── usuarioRoutes.ts
├── models/
│   └── Usuario.ts
├── middlewares/
│   └── autenticacao.ts
└── index.ts
```

### Exemplo Completo

**models/Usuario.ts:**
```typescript
export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

export class UsuarioModel {
  private usuarios: Usuario[] = [];
  private proximoId = 1;

  criar(nome: string, email: string): Usuario {
    const usuario: Usuario = {
      id: this.proximoId++,
      nome,
      email
    };
    this.usuarios.push(usuario);
    return usuario;
  }

  obterTodos(): Usuario[] {
    return this.usuarios;
  }

  obterPorId(id: number): Usuario | undefined {
    return this.usuarios.find(u => u.id === id);
  }
}
```

**controllers/usuarioController.ts:**
```typescript
import { Request, Response } from "express";
import { UsuarioModel } from "../models/Usuario";

const model = new UsuarioModel();

export const criar = (req: Request, res: Response) => {
  const { nome, email } = req.body;
  const usuario = model.criar(nome, email);
  res.status(201).json(usuario);
};

export const listar = (req: Request, res: Response) => {
  const usuarios = model.obterTodos();
  res.json(usuarios);
};

export const obter = (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = model.obterPorId(parseInt(id));
  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }
  res.json(usuario);
};
```

**routes/usuarioRoutes.ts:**
```typescript
import { Router } from "express";
import * as usuarioController from "../controllers/usuarioController";

const router = Router();

router.post("/", usuarioController.criar);
router.get("/", usuarioController.listar);
router.get("/:id", usuarioController.obter);

export default router;
```

**index.ts:**
```typescript
import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes";

const app = express();
app.use(express.json());

app.use("/usuarios", usuarioRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
```

---

## 🎮 DESAFIO FINAL: Crie o Servidor Mágico

Crie uma API que:

1. **Gerencia usuários** (criar, listar, obter, deletar)
2. **Gerencia tarefas** (criar, listar, marcar como concluída)
3. **Valida dados** com Zod
4. **Usa middlewares** para log e autenticação
5. **Segue padrão MVC**
6. **Retorna mensagens de sucesso/erro**

### Desafio Bônus:

Implemente um sistema de pontos onde:
- Criar usuário = +50 XP
- Criar tarefa = +10 XP
- Concluir tarefa = +25 XP

---

## 🎯 Resumo do Módulo

Você aprendeu:
- ✅ Express basics
- ✅ Rotas HTTP
- ✅ Middlewares
- ✅ Validação de dados
- ✅ Padrão MVC
- ✅ Estrutura de projeto

**Próximo Módulo:** Front-end com TypeScript - você aprenderá React!

**Parabéns por completar o Módulo 4! 🎉**

Você ganhou **100 XP** e desbloqueou o **Módulo 5: Front-end com TypeScript**!

**Progresso Total:** 4/9 módulos (44%)
