export const modules = [
  {
    id: 1,
    title: "Fundamentos do JavaScript",
    description: "Tipos, funções, objetos, DOM e assincronismo",
    content: `
# Módulo 1: Fundamentos do JavaScript

## O que é JavaScript?

JavaScript é uma linguagem de programação interpretada, criada em 1995 por Brendan Eich. Inicialmente, era usada apenas para adicionar interatividade a páginas web. Hoje, com Node.js (criado em 2009), JavaScript também funciona no servidor.

**Analogia:** Se HTML é a estrutura de uma casa e CSS é a decoração, JavaScript é a eletricidade — torna tudo funcional e interativo.

## Tipos de Dados

JavaScript tem 7 tipos primitivos:

| Tipo | Exemplo | Descrição |
|------|---------|-----------|
| **String** | \`"Olá"\` | Texto |
| **Number** | \`42\` | Números inteiros e decimais |
| **Boolean** | \`true\` | Verdadeiro ou falso |
| **Undefined** | \`undefined\` | Variável declarada mas sem valor |
| **Null** | \`null\` | Ausência intencional de valor |
| **Symbol** | \`Symbol('id')\` | Identificador único |
| **BigInt** | \`123n\` | Números muito grandes |

## Variáveis: var, let e const

**var** (evitar): Escopo global ou de função. Pode ser redeclarada.

**let** (preferir): Escopo de bloco. Não pode ser redeclarada no mesmo escopo.

**const** (melhor): Escopo de bloco. Não pode ser redeclarada nem reatribuída.

**Regra de Ouro:** Use \`const\` por padrão. Use \`let\` quando precisar reatribuir. Nunca use \`var\`.
    `
  },
  {
    id: 2,
    title: "Transição para TypeScript",
    description: "Tipagem, interfaces, genéricos e classes",
    content: `
# Módulo 2: Transição para TypeScript

## O que é TypeScript?

TypeScript é um **superset** do JavaScript que adiciona tipagem estática. Antes de executar, o código é compilado para JavaScript puro.

**Analogia:** Se JavaScript é dirigir de olhos fechados (confiando na sorte), TypeScript é dirigir com um GPS e sensores de colisão.

## Tipos Básicos

\`\`\`typescript
// String
const nome: string = "João";

// Number
const idade: number = 30;

// Boolean
const ativo: boolean = true;

// Array
const numeros: number[] = [1, 2, 3];
\`\`\`

## Interfaces

Interfaces definem a estrutura de um objeto.

\`\`\`typescript
interface Pessoa {
  nome: string;
  idade: number;
  email?: string; // Opcional
}
\`\`\`

## Tipos Genéricos

Genéricos permitem reutilizar código com diferentes tipos.

\`\`\`typescript
function primeiro<T>(array: T[]): T {
  return array[0];
}
\`\`\`
    `
  },
  {
    id: 3,
    title: "Ambiente e Ferramentas",
    description: "Node.js, npm, Vite, ESLint e Jest",
    content: `
# Módulo 3: Ambiente e Ferramentas

## Instalação do Node.js

Node.js é o runtime que permite executar JavaScript fora do navegador.

1. Visite [nodejs.org](https://nodejs.org)
2. Baixe a versão LTS (Long Term Support)
3. Instale seguindo o assistente
4. Verifique: \`node --version\` e \`npm --version\`

## NPM e Gerenciamento de Dependências

NPM (Node Package Manager) é o gerenciador de pacotes.

\`\`\`bash
# Criar novo projeto
npm init -y

# Instalar pacote
npm install express

# Instalar como dependência de desenvolvimento
npm install --save-dev typescript
\`\`\`

## TypeScript Setup

\`\`\`bash
# Instalar TypeScript globalmente
npm install -g typescript

# Criar arquivo de configuração
tsc --init
\`\`\`

## Vite: Bundler Moderno

Vite é um bundler rápido e moderno para projetos web.

\`\`\`bash
# Criar projeto React com Vite
npm create vite@latest meu-app -- --template react-ts
\`\`\`
    `
  },
  {
    id: 4,
    title: "Back-end com TypeScript",
    description: "Express, Prisma, JWT e middlewares",
    content: `
# Módulo 4: Back-end com TypeScript

## Node.js e Express

Express é um framework minimalista para criar APIs.

\`\`\`typescript
import express from "express";

const app = express();
app.use(express.json());

// Rota GET
app.get("/api/usuarios", (req, res) => {
  res.json({ usuarios: [] });
});

// Rota POST
app.post("/api/usuarios", (req, res) => {
  const { nome } = req.body;
  res.status(201).json({ id: 1, nome });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
\`\`\`

## Bancos de Dados com Prisma

Prisma é um ORM (Object-Relational Mapping) para TypeScript.

\`\`\`bash
npm install @prisma/client
npm install -D prisma

# Inicializar
npx prisma init
\`\`\`

## Autenticação JWT

JWT (JSON Web Token) é um padrão para autenticação.

\`\`\`bash
npm install jsonwebtoken bcryptjs
\`\`\`
    `
  },
  {
    id: 5,
    title: "Front-end com TypeScript",
    description: "React, Hooks, TailwindCSS e componentização",
    content: `
# Módulo 5: Front-end com TypeScript

## React com TypeScript

React é uma biblioteca para construir interfaces.

\`\`\`typescript
import React, { useState } from "react";

interface Props {
  titulo: string;
  onClick: () => void;
}

const Botao: React.FC<Props> = ({ titulo, onClick }) => {
  return <button onClick={onClick}>{titulo}</button>;
};

export default Botao;
\`\`\`

## Hooks

Hooks permitem usar estado em componentes funcionais.

\`\`\`typescript
// useState
const [count, setCount] = useState<number>(0);

// useEffect
useEffect(() => {
  console.log("Componente montado");
  return () => console.log("Componente desmontado");
}, []);

// useContext
const tema = useContext(TemaContext);
\`\`\`

## Consumindo APIs

\`\`\`typescript
useEffect(() => {
  const buscarDados = async () => {
    try {
      const resposta = await fetch("/api/usuarios");
      const dados = await resposta.json();
      setUsuarios(dados);
    } catch (erro) {
      console.error(erro);
    }
  };

  buscarDados();
}, []);
\`\`\`

## TailwindCSS

TailwindCSS é um framework CSS utilitário.

\`\`\`tsx
<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h1 className="text-2xl font-bold mb-4">Bem-vindo</h1>
    <button className="bg-blue-500 text-white px-4 py-2 rounded">
      Clique aqui
    </button>
  </div>
</div>
\`\`\`
    `
  },
  {
    id: 6,
    title: "Mobile com TypeScript",
    description: "React Native, navegação e armazenamento local",
    content: `
# Módulo 6: Mobile com TypeScript

## React Native

React Native permite criar apps mobile com JavaScript/TypeScript.

\`\`\`bash
npx create-expo-app meu-app
cd meu-app
npm start
\`\`\`

## Componentes Básicos

\`\`\`typescript
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Olá, Mobile!</Text>
      <Button title="Pressione" onPress={() => alert("Pressionado!")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold"
  }
});
\`\`\`

## Navegação

\`\`\`bash
npm install @react-navigation/native @react-navigation/bottom-tabs
\`\`\`

## Armazenamento Local

\`\`\`bash
npm install @react-native-async-storage/async-storage
\`\`\`
    `
  },
  {
    id: 7,
    title: "Integração com IA",
    description: "OpenAI API, chatbots e geração de conteúdo",
    content: `
# Módulo 7: Integração com IA

## OpenAI API

\`\`\`bash
npm install openai
\`\`\`

\`\`\`typescript
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function gerarTexto(prompt: string) {
  const resposta = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "user", content: prompt }
    ]
  });

  return resposta.choices[0].message.content;
}
\`\`\`

## Integração no Backend

\`\`\`typescript
app.post("/api/chat", async (req, res) => {
  const { mensagem } = req.body;

  try {
    const resposta = await gerarTexto(mensagem);
    res.json({ resposta });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao processar" });
  }
});
\`\`\`

## Frontend com IA

\`\`\`typescript
const [resposta, setResposta] = useState("");

const enviarMensagem = async (mensagem: string) => {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mensagem })
  });

  const dados = await res.json();
  setResposta(dados.resposta);
};
\`\`\`
    `
  },
  {
    id: 8,
    title: "Boas Práticas e Design Patterns",
    description: "SOLID, Design Patterns e Clean Architecture",
    content: `
# Módulo 8: Boas Práticas e Design Patterns

## SOLID

**S**ingle Responsibility: Cada classe tem uma responsabilidade.

\`\`\`typescript
// ❌ Ruim
class Usuario {
  criar() { }
  enviarEmail() { }
  salvarBD() { }
}

// ✅ Bom
class Usuario { criar() { } }
class EmailService { enviar() { } }
class UsuarioRepository { salvar() { } }
\`\`\`

**O**pen/Closed: Aberto para extensão, fechado para modificação.

\`\`\`typescript
// ✅ Bom
interface Pagamento {
  processar(): Promise<void>;
}

class PagamentoCartao implements Pagamento {
  async processar() { }
}

class PagamentoPix implements Pagamento {
  async processar() { }
}
\`\`\`

## Design Patterns

**Singleton:** Uma única instância.

\`\`\`typescript
class Database {
  private static instancia: Database;

  private constructor() { }

  static obter(): Database {
    if (!Database.instancia) {
      Database.instancia = new Database();
    }
    return Database.instancia;
  }
}
\`\`\`

**Factory:** Criar objetos sem especificar classes.

\`\`\`typescript
interface Veiculo {
  dirigir(): void;
}

class Carro implements Veiculo {
  dirigir() { console.log("Dirigindo carro"); }
}

class FabricaVeiculo {
  static criar(tipo: string): Veiculo {
    if (tipo === "carro") return new Carro();
    throw new Error("Tipo desconhecido");
  }
}
\`\`\`

## Clean Code

- Use nomes descritivos
- Funções pequenas e focadas
- Evite duplicação
- Trate erros adequadamente
- Escreva testes
    `
  },
  {
    id: 9,
    title: "Deploy e CI/CD",
    description: "Git, Docker, GitHub Actions e produção",
    content: `
# Módulo 9: Deploy e CI/CD

## Git e GitHub

\`\`\`bash
# Inicializar repositório
git init

# Adicionar arquivos
git add .

# Commit
git commit -m "Mensagem descritiva"

# Push
git push origin main
\`\`\`

## Docker

Docker permite empacotar sua aplicação.

**Dockerfile:**

\`\`\`dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

\`\`\`bash
# Build
docker build -t meu-app .

# Run
docker run -p 3000:3000 meu-app
\`\`\`

## Deploy em Produção

**Vercel (Frontend):**

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

**Render (Backend):**

1. Conecte seu repositório GitHub
2. Crie um novo serviço web
3. Configure variáveis de ambiente
4. Deploy automático em cada push

## CI/CD com GitHub Actions

**.github/workflows/deploy.yml:**

\`\`\`yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run build
\`\`\`
    `
  }
];

export default modules;
