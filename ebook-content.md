# Ebook: Desenvolvimento Fullstack em TypeScript e JavaScript

## Índice

1. [Introdução](#introdução)
2. [Módulo 1: Fundamentos do JavaScript](#módulo-1-fundamentos-do-javascript)
3. [Módulo 2: Transição para TypeScript](#módulo-2-transição-para-typescript)
4. [Módulo 3: Ambiente e Ferramentas](#módulo-3-ambiente-e-ferramentas)
5. [Módulo 4: Back-end com TypeScript](#módulo-4-back-end-com-typescript)
6. [Módulo 5: Front-end com TypeScript](#módulo-5-front-end-com-typescript)
7. [Módulo 6: Mobile com TypeScript](#módulo-6-mobile-com-typescript)
8. [Módulo 7: Integração com IA](#módulo-7-integração-com-ia)
9. [Módulo 8: Boas Práticas e Design Patterns](#módulo-8-boas-práticas-e-design-patterns)
10. [Módulo 9: Deploy e CI/CD](#módulo-9-deploy-e-cicd)
11. [Conclusão](#conclusão)

---

## Introdução

Bem-vindo ao **Desenvolvimento Fullstack em TypeScript e JavaScript**! Este ebook foi criado para transformar você de um iniciante em um desenvolvedor fullstack profissional, capaz de construir aplicações web, mobile e com inteligência artificial do zero ao deploy.

### Por que TypeScript e JavaScript?

Imagine que você quer construir uma casa. JavaScript é como ter um martelo versátil que funciona para muitos trabalhos, mas às vezes você bate o dedo. TypeScript é como ter um martelo com um guia que avisa quando você está prestes a bater no dedo errado — antes de acontecer.

JavaScript é a linguagem da web. Desde 1995, ela domina o navegador. TypeScript, criado pela Microsoft em 2012, adiciona tipagem estática ao JavaScript, tornando o código mais seguro e previsível.

### O que você aprenderá

Ao final deste ebook, você será capaz de:

- Entender profundamente como JavaScript funciona nos navegadores e no servidor (Node.js)
- Dominar TypeScript e seus recursos avançados
- Construir APIs REST e GraphQL robustas com Node.js e Express
- Criar interfaces modernas com React e TypeScript
- Desenvolver aplicativos mobile com React Native
- Integrar inteligência artificial em suas aplicações
- Fazer deploy de aplicações em produção
- Aplicar padrões de design e boas práticas profissionais

### Metodologia de Ensino

Usamos a **Técnica de Feynman**: explicamos cada conceito como se estivéssemos ensinando para alguém sem experiência técnica, depois mostramos como aplicar em projetos reais. Você não vai decorar — vai **entender**.

---

## Módulo 1: Fundamentos do JavaScript

### 1.1 O que é JavaScript?

JavaScript é uma linguagem de programação interpretada, criada em 1995 por Brendan Eich. Inicialmente, era usada apenas para adicionar interatividade a páginas web. Hoje, com Node.js (criado em 2009), JavaScript também funciona no servidor.

**Analogia:** Se HTML é a estrutura de uma casa e CSS é a decoração, JavaScript é a eletricidade — torna tudo funcional e interativo.

### 1.2 Tipos de Dados

JavaScript tem 7 tipos primitivos:

| Tipo | Exemplo | Descrição |
|------|---------|-----------|
| **String** | `"Olá"` | Texto |
| **Number** | `42` | Números inteiros e decimais |
| **Boolean** | `true` | Verdadeiro ou falso |
| **Undefined** | `undefined` | Variável declarada mas sem valor |
| **Null** | `null` | Ausência intencional de valor |
| **Symbol** | `Symbol('id')` | Identificador único |
| **BigInt** | `123n` | Números muito grandes |

```javascript
// Exemplos práticos
const nome = "João"; // String
const idade = 30; // Number
const ativo = true; // Boolean
let vazio; // undefined
const nulo = null; // null

console.log(typeof nome); // "string"
console.log(typeof idade); // "number"
```

### 1.3 Variáveis: var, let e const

**var** (evitar): Escopo global ou de função. Pode ser redeclarada.

```javascript
var x = 1;
var x = 2; // Permitido, mas confuso
```

**let** (preferir): Escopo de bloco. Não pode ser redeclarada no mesmo escopo.

```javascript
let y = 1;
{
  let y = 2; // Escopo diferente
}
console.log(y); // 1
```

**const** (melhor): Escopo de bloco. Não pode ser redeclarada nem reatribuída.

```javascript
const z = 1;
z = 2; // Erro!
```

**Regra de Ouro:** Use `const` por padrão. Use `let` quando precisar reatribuir. Nunca use `var`.

### 1.4 Operadores

```javascript
// Aritméticos
console.log(10 + 5); // 15
console.log(10 - 5); // 5
console.log(10 * 5); // 50
console.log(10 / 5); // 2
console.log(10 % 3); // 1 (resto)
console.log(2 ** 3); // 8 (potência)

// Comparação
console.log(5 === 5); // true (igualdade estrita)
console.log(5 == "5"); // true (igualdade flexível - evitar)
console.log(5 !== 5); // false

// Lógicos
console.log(true && false); // false (E)
console.log(true || false); // true (OU)
console.log(!true); // false (NÃO)
```

### 1.5 Funções

Uma função é um bloco de código reutilizável.

```javascript
// Declaração tradicional
function saudacao(nome) {
  return `Olá, ${nome}!`;
}

// Arrow function (moderno)
const saudacao2 = (nome) => `Olá, ${nome}!`;

// Chamando
console.log(saudacao("Maria")); // Olá, Maria!
```

**Closures:** Funções podem acessar variáveis do escopo externo.

```javascript
function criarContador() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const contador = criarContador();
console.log(contador()); // 1
console.log(contador()); // 2
```

### 1.6 Objetos

Objetos são coleções de pares chave-valor.

```javascript
const pessoa = {
  nome: "João",
  idade: 30,
  saudacao: function() {
    return `Olá, meu nome é ${this.nome}`;
  }
};

console.log(pessoa.nome); // João
console.log(pessoa["idade"]); // 30
console.log(pessoa.saudacao()); // Olá, meu nome é João
```

### 1.7 Arrays

Arrays são listas ordenadas de valores.

```javascript
const numeros = [1, 2, 3, 4, 5];

// Métodos úteis
console.log(numeros.length); // 5
console.log(numeros[0]); // 1
numeros.push(6); // Adiciona ao final
numeros.pop(); // Remove o último

// Iteração
numeros.forEach((num) => console.log(num));

// Transformação
const dobrados = numeros.map((num) => num * 2);
const pares = numeros.filter((num) => num % 2 === 0);
```

### 1.8 Assincronismo: Callbacks, Promises e Async/Await

JavaScript é single-threaded, mas pode fazer operações assíncronas.

**Callbacks (evitar):**

```javascript
function buscarDados(callback) {
  setTimeout(() => {
    callback("Dados recebidos!");
  }, 1000);
}

buscarDados((dados) => console.log(dados));
```

**Promises (melhor):**

```javascript
function buscarDados() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Dados recebidos!");
    }, 1000);
  });
}

buscarDados()
  .then((dados) => console.log(dados))
  .catch((erro) => console.error(erro));
```

**Async/Await (melhor ainda):**

```javascript
async function buscarDados() {
  try {
    const dados = await fetch("https://api.exemplo.com/dados");
    const json = await dados.json();
    console.log(json);
  } catch (erro) {
    console.error(erro);
  }
}

buscarDados();
```

### 1.9 DOM e Eventos

O DOM (Document Object Model) permite manipular elementos HTML.

```javascript
// Selecionando elementos
const botao = document.getElementById("meuBotao");
const elementos = document.querySelectorAll(".item");

// Adicionando event listeners
botao.addEventListener("click", () => {
  console.log("Botão clicado!");
});

// Modificando conteúdo
botao.textContent = "Novo texto";
botao.classList.add("ativo");
```

### 1.10 Módulos: Import e Export

Organize seu código em módulos reutilizáveis.

```javascript
// math.js
export function somar(a, b) {
  return a + b;
}

// main.js
import { somar } from "./math.js";
console.log(somar(2, 3)); // 5
```

---

## Módulo 2: Transição para TypeScript

### 2.1 O que é TypeScript?

TypeScript é um **superset** do JavaScript que adiciona tipagem estática. Antes de executar, o código é compilado para JavaScript puro.

**Analogia:** Se JavaScript é dirigir de olhos fechados (confiando na sorte), TypeScript é dirigir com um GPS e sensores de colisão.

### 2.2 Tipos Básicos

```typescript
// String
const nome: string = "João";

// Number
const idade: number = 30;

// Boolean
const ativo: boolean = true;

// Array
const numeros: number[] = [1, 2, 3];
const strings: Array<string> = ["a", "b"];

// Any (evitar)
let qualquerCoisa: any = "pode ser qualquer coisa";
```

### 2.3 Interfaces

Interfaces definem a estrutura de um objeto.

```typescript
interface Pessoa {
  nome: string;
  idade: number;
  email?: string; // Opcional
}

const pessoa: Pessoa = {
  nome: "Maria",
  idade: 28
};
```

### 2.4 Tipos Genéricos

Genéricos permitem reutilizar código com diferentes tipos.

```typescript
function primeiro<T>(array: T[]): T {
  return array[0];
}

console.log(primeiro([1, 2, 3])); // 1
console.log(primeiro(["a", "b"])); // "a"
```

### 2.5 Classes e Herança

```typescript
class Animal {
  nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  fazer_som(): void {
    console.log("Som genérico");
  }
}

class Cachorro extends Animal {
  fazer_som(): void {
    console.log("Au au!");
  }
}

const dog = new Cachorro("Rex");
dog.fazer_som(); // Au au!
```

### 2.6 Enums

Enums definem um conjunto de constantes nomeadas.

```typescript
enum Status {
  Ativo = "ATIVO",
  Inativo = "INATIVO",
  Pendente = "PENDENTE"
}

const meuStatus: Status = Status.Ativo;
```

### 2.7 Tipos Union e Intersection

```typescript
// Union: pode ser um tipo OU outro
type ID = string | number;
const id: ID = 123;

// Intersection: combina múltiplos tipos
interface Nome {
  nome: string;
}

interface Idade {
  idade: number;
}

type Pessoa = Nome & Idade;
const pessoa: Pessoa = { nome: "João", idade: 30 };
```

### 2.8 Tratamento de Erros

```typescript
function dividir(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Divisão por zero!");
  }
  return a / b;
}

try {
  console.log(dividir(10, 0));
} catch (erro) {
  console.error((erro as Error).message);
}
```

---

## Módulo 3: Ambiente e Ferramentas

### 3.1 Instalação do Node.js

Node.js é o runtime que permite executar JavaScript fora do navegador.

1. Visite [nodejs.org](https://nodejs.org)
2. Baixe a versão LTS (Long Term Support)
3. Instale seguindo o assistente
4. Verifique: `node --version` e `npm --version`

### 3.2 NPM e Gerenciamento de Dependências

NPM (Node Package Manager) é o gerenciador de pacotes.

```bash
# Criar novo projeto
npm init -y

# Instalar pacote
npm install express

# Instalar como dependência de desenvolvimento
npm install --save-dev typescript

# Listar pacotes instalados
npm list
```

### 3.3 TypeScript Setup

```bash
# Instalar TypeScript globalmente
npm install -g typescript

# Criar arquivo de configuração
tsc --init

# Compilar arquivo
tsc arquivo.ts

# Compilar e observar mudanças
tsc --watch
```

**tsconfig.json básico:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### 3.4 Vite: Bundler Moderno

Vite é um bundler rápido e moderno para projetos web.

```bash
# Criar projeto React com Vite
npm create vite@latest meu-app -- --template react-ts

# Instalar dependências
cd meu-app
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

### 3.5 ESLint e Prettier

**ESLint** encontra problemas no código. **Prettier** formata automaticamente.

```bash
# Instalar
npm install --save-dev eslint prettier eslint-config-prettier

# Criar configuração
npx eslint --init

# Formatar código
npx prettier --write .
```

### 3.6 Jest: Testes Automatizados

```bash
npm install --save-dev jest @types/jest ts-jest

# Criar arquivo de teste
# arquivo.test.ts
test("soma dois números", () => {
  expect(2 + 2).toBe(4);
});

# Executar testes
npm test
```

---

## Módulo 4: Back-end com TypeScript

### 4.1 Node.js e Express

Express é um framework minimalista para criar APIs.

```typescript
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
```

### 4.2 Bancos de Dados com Prisma

Prisma é um ORM (Object-Relational Mapping) para TypeScript.

```bash
npm install @prisma/client
npm install -D prisma

# Inicializar
npx prisma init
```

**schema.prisma:**

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Usuario {
  id    Int     @id @default(autoincrement())
  email String  @unique
  nome  String
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  titulo    String
  conteudo  String
  usuarioId Int
  usuario   Usuario @relation(fields: [usuarioId], references: [id])
}
```

**Usando Prisma:**

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Criar
const usuario = await prisma.usuario.create({
  data: {
    email: "joao@exemplo.com",
    nome: "João"
  }
});

// Ler
const usuarios = await prisma.usuario.findMany();

// Atualizar
await prisma.usuario.update({
  where: { id: 1 },
  data: { nome: "João Silva" }
});

// Deletar
await prisma.usuario.delete({ where: { id: 1 } });
```

### 4.3 Autenticação JWT

JWT (JSON Web Token) é um padrão para autenticação.

```bash
npm install jsonwebtoken bcryptjs
npm install -D @types/jsonwebtoken @types/bcryptjs
```

```typescript
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

// Hash de senha
const senha = "minhasenha";
const hash = await bcryptjs.hash(senha, 10);

// Verificar senha
const valida = await bcryptjs.compare(senha, hash);

// Criar token
const token = jwt.sign(
  { id: 1, email: "joao@exemplo.com" },
  "seu-segredo-aqui",
  { expiresIn: "7d" }
);

// Verificar token
const payload = jwt.verify(token, "seu-segredo-aqui");
```

### 4.4 Middlewares

Middlewares são funções que processam requisições.

```typescript
// Middleware de autenticação
const autenticar = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  try {
    const payload = jwt.verify(token, "seu-segredo-aqui");
    req.usuario = payload;
    next();
  } catch (erro) {
    res.status(401).json({ erro: "Token inválido" });
  }
};

// Usando
app.get("/api/perfil", autenticar, (req, res) => {
  res.json({ usuario: req.usuario });
});
```

### 4.5 Validação de Entrada

```bash
npm install zod
```

```typescript
import { z } from "zod";

const schemaUsuario = z.object({
  email: z.string().email(),
  nome: z.string().min(3),
  idade: z.number().min(18)
});

app.post("/api/usuarios", (req, res) => {
  try {
    const dados = schemaUsuario.parse(req.body);
    // Dados validados
    res.json(dados);
  } catch (erro) {
    res.status(400).json({ erro: (erro as z.ZodError).errors });
  }
});
```

---

## Módulo 5: Front-end com TypeScript

### 5.1 React com TypeScript

React é uma biblioteca para construir interfaces.

```typescript
import React, { useState } from "react";

interface Props {
  titulo: string;
  onClick: () => void;
}

const Botao: React.FC<Props> = ({ titulo, onClick }) => {
  return <button onClick={onClick}>{titulo}</button>;
};

export default Botao;
```

### 5.2 Hooks

Hooks permitem usar estado em componentes funcionais.

```typescript
// useState
const [count, setCount] = useState<number>(0);

// useEffect
useEffect(() => {
  console.log("Componente montado");
  return () => console.log("Componente desmontado");
}, []);

// useContext
const tema = useContext(TemaContext);

// useReducer
const [state, dispatch] = useReducer(reducer, estadoInicial);
```

### 5.3 Consumindo APIs

```typescript
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
```

### 5.4 Componentização com Atomic Design

**Atoms** (menores unidades):

```typescript
const Botao: React.FC<{ label: string }> = ({ label }) => (
  <button>{label}</button>
);
```

**Molecules** (combinações):

```typescript
const CampoFormulario: React.FC = () => (
  <div>
    <label>Email</label>
    <input type="email" />
  </div>
);
```

**Organisms** (componentes complexos):

```typescript
const Formulario: React.FC = () => (
  <form>
    <CampoFormulario />
    <Botao label="Enviar" />
  </form>
);
```

### 5.5 TailwindCSS

TailwindCSS é um framework CSS utilitário.

```tsx
<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h1 className="text-2xl font-bold mb-4">Bem-vindo</h1>
    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      Clique aqui
    </button>
  </div>
</div>
```

---

## Módulo 6: Mobile com TypeScript

### 6.1 React Native

React Native permite criar apps mobile com JavaScript/TypeScript.

```bash
npx create-expo-app meu-app
cd meu-app
npm start
```

### 6.2 Componentes Básicos

```typescript
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
```

### 6.3 Navegação

```bash
npm install @react-navigation/native @react-navigation/bottom-tabs
```

```typescript
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Perfil" component={PerfilScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

### 6.4 Armazenamento Local

```bash
npm install @react-native-async-storage/async-storage
```

```typescript
import AsyncStorage from "@react-native-async-storage/async-storage";

// Salvar
await AsyncStorage.setItem("usuario", JSON.stringify(usuario));

// Recuperar
const usuario = await AsyncStorage.getItem("usuario");
```

---

## Módulo 7: Integração com IA

### 7.1 OpenAI API

```bash
npm install openai
```

```typescript
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
```

### 7.2 Integração no Backend

```typescript
app.post("/api/chat", async (req, res) => {
  const { mensagem } = req.body;

  try {
    const resposta = await gerarTexto(mensagem);
    res.json({ resposta });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao processar" });
  }
});
```

### 7.3 Frontend com IA

```typescript
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
```

---

## Módulo 8: Boas Práticas e Design Patterns

### 8.1 SOLID

**S**ingle Responsibility: Cada classe tem uma responsabilidade.

```typescript
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
```

**O**pen/Closed: Aberto para extensão, fechado para modificação.

```typescript
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
```

### 8.2 Design Patterns

**Singleton:** Uma única instância.

```typescript
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
```

**Factory:** Criar objetos sem especificar classes.

```typescript
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
```

### 8.3 Clean Code

- Use nomes descritivos
- Funções pequenas e focadas
- Evite duplicação
- Trate erros adequadamente
- Escreva testes

---

## Módulo 9: Deploy e CI/CD

### 9.1 Git e GitHub

```bash
# Inicializar repositório
git init

# Adicionar arquivos
git add .

# Commit
git commit -m "Mensagem descritiva"

# Push
git push origin main
```

### 9.2 Docker

Docker permite empacotar sua aplicação.

**Dockerfile:**

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# Build
docker build -t meu-app .

# Run
docker run -p 3000:3000 meu-app
```

### 9.3 Deploy em Produção

**Vercel (Frontend):**

```bash
npm install -g vercel
vercel
```

**Render (Backend):**

1. Conecte seu repositório GitHub
2. Crie um novo serviço web
3. Configure variáveis de ambiente
4. Deploy automático em cada push

### 9.4 CI/CD com GitHub Actions

**.github/workflows/deploy.yml:**

```yaml
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
```

---

## Conclusão

Você chegou ao final deste ebook! Parabéns! 🎉

Você agora possui conhecimento profundo em:

- **JavaScript e TypeScript** — as linguagens fundamentais
- **Backend** — construir APIs robustas
- **Frontend** — criar interfaces modernas
- **Mobile** — desenvolver apps nativos
- **IA** — integrar inteligência artificial
- **DevOps** — fazer deploy em produção

### Próximos Passos

1. **Pratique:** Construa os 3 projetos de conclusão
2. **Contribua:** Participe de projetos open source
3. **Aprenda:** Explore frameworks avançados como NestJS, Next.js
4. **Ensine:** Compartilhe seu conhecimento com outros

### Recursos Adicionais

- [MDN Web Docs](https://developer.mozilla.org)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [React Documentation](https://react.dev)
- [Node.js Documentation](https://nodejs.org/docs)

---

**Desenvolvido com ❤️ para desenvolvedores apaixonados por código.**
