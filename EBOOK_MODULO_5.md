# Módulo 5: Front-end com TypeScript

## 🎯 Objetivo do Módulo

Neste módulo você aprenderá React com TypeScript. Você criará uma **"Interface Mágica"** que se conecta com o servidor do módulo anterior!

---

## 📖 Seção 1: React Basics

### O que é React?

React é uma biblioteca JavaScript para criar interfaces de usuário com componentes reutilizáveis.

### Criar Projeto React

```bash
npm create vite@latest meu-app -- --template react-ts
cd meu-app
npm install
npm run dev
```

### Componente Simples

```typescript
import React from "react";

interface Props {
  nome: string;
  idade: number;
}

export const Saudacao: React.FC<Props> = ({ nome, idade }) => {
  return (
    <div>
      <h1>Olá, {nome}!</h1>
      <p>Você tem {idade} anos</p>
    </div>
  );
};

// Usar componente
export default function App() {
  return <Saudacao nome="Maria" idade={30} />;
}
```

---

## 📖 Seção 2: Hooks

### useState (Estado)

```typescript
import { useState } from "react";

export const Contador: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Contagem: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
    </div>
  );
};
```

### useEffect (Efeitos Colaterais)

```typescript
import { useEffect, useState } from "react";

interface Usuario {
  id: number;
  nome: string;
}

export const ListaUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar dados quando componente monta
    fetch("/api/usuarios")
      .then(res => res.json())
      .then(data => {
        setUsuarios(data);
        setLoading(false);
      });
  }, []); // Dependência vazia = executar uma vez

  if (loading) return <p>Carregando...</p>;

  return (
    <ul>
      {usuarios.map(u => (
        <li key={u.id}>{u.nome}</li>
      ))}
    </ul>
  );
};
```

### useContext (Contexto Global)

```typescript
import { createContext, useContext, ReactNode } from "react";

interface User {
  id: number;
  nome: string;
}

interface AuthContextType {
  usuario: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<User | null>(null);

  const login = (user: User) => setUsuario(user);
  const logout = () => setUsuario(null);

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};

// Usar
export const Perfil: React.FC = () => {
  const { usuario, logout } = useAuth();

  return (
    <div>
      <p>Olá, {usuario?.nome}</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
};
```

---

## 📖 Seção 3: Formulários

```typescript
import { useState } from "react";

interface FormData {
  nome: string;
  email: string;
}

export const Formulario: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    nome: "",
    email: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviando:", form);
    // Enviar para API
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nome"
        value={form.nome}
        onChange={handleChange}
        placeholder="Nome"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="submit">Enviar</button>
    </form>
  );
};
```

---

## 📖 Seção 4: Requisições HTTP

```typescript
import { useState, useEffect } from "react";

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

export const UsuariosAPI: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const buscarUsuarios = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/usuarios");
      if (!response.ok) throw new Error("Erro ao buscar");
      const data = await response.json();
      setUsuarios(data);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const criarUsuario = async (nome: string, email: string) => {
    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email })
      });
      const novoUsuario = await response.json();
      setUsuarios([...usuarios, novoUsuario]);
    } catch (err) {
      setErro("Erro ao criar usuário");
    }
  };

  const deletarUsuario = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: "DELETE"
      });
      setUsuarios(usuarios.filter(u => u.id !== id));
    } catch (err) {
      setErro("Erro ao deletar usuário");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <div>
      <h2>Usuários</h2>
      <ul>
        {usuarios.map(u => (
          <li key={u.id}>
            {u.nome} ({u.email})
            <button onClick={() => deletarUsuario(u.id)}>Deletar</button>
          </li>
        ))}
      </ul>
      <button onClick={() => criarUsuario("Novo", "novo@email.com")}>
        Adicionar Usuário
      </button>
    </div>
  );
};
```

---

## 📖 Seção 5: Roteamento

```bash
npm install react-router-dom
```

```typescript
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Home = () => <h1>Home</h1>;
const Sobre = () => <h1>Sobre</h1>;
const Contato = () => <h1>Contato</h1>;

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/contato">Contato</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 🎮 DESAFIO FINAL: Crie a Interface Mágica

Crie uma aplicação React que:

1. **Se conecta com a API** do Módulo 4
2. **Lista usuários** do servidor
3. **Permite criar novo usuário** (formulário)
4. **Permite deletar usuário**
5. **Mostra loading e erros**
6. **Usa TypeScript** em tudo
7. **Tem roteamento** (Home, Usuários, Sobre)

### Estrutura:

```
src/
├── pages/
│   ├── Home.tsx
│   ├── Usuarios.tsx
│   └── Sobre.tsx
├── components/
│   ├── Header.tsx
│   └── FormularioUsuario.tsx
├── services/
│   └── api.ts
├── App.tsx
└── main.tsx
```

---

## 🎯 Resumo do Módulo

Você aprendeu:
- ✅ React basics
- ✅ Hooks (useState, useEffect, useContext)
- ✅ Formulários
- ✅ Requisições HTTP
- ✅ Roteamento
- ✅ TypeScript em React

**Próximo Módulo:** Mobile com TypeScript - você aprenderá React Native!

**Parabéns por completar o Módulo 5! 🎉**

Você ganhou **100 XP** e desbloqueou o **Módulo 6: Mobile com TypeScript**!

**Progresso Total:** 5/9 módulos (56%)
