/**
 * Dados estruturados dos 9 módulos do ebook
 * Cada módulo contém o conteúdo completo em markdown
 */

export interface ModuleData {
  id: number;
  title: string;
  description: string;
  content: string;
  xpReward: number;
  estimatedTime: number;
  difficulty: "easy" | "medium" | "hard";
  prerequisites: number[];
}

export const ebookModules: ModuleData[] = [
  {
    id: 1,
    title: "Fundamentos do JavaScript",
    description: "Aprenda os conceitos fundamentais do JavaScript: tipos de dados, variáveis, operadores e lógica básica.",
    difficulty: "easy",
    xpReward: 100,
    estimatedTime: 45,
    prerequisites: [],
    content: `# Módulo 1: Fundamentos do JavaScript

## 🎯 Objetivo do Módulo

Neste módulo você aprenderá os conceitos fundamentais do JavaScript: tipos de dados, variáveis, operadores e lógica básica. Ao final, você criará um **mini-projeto que gera uma "chave mágica"** para desbloquear o próximo módulo!

---

## 📖 Seção 1: O que é JavaScript?

JavaScript é uma linguagem de programação criada em 1995 por Brendan Eich. Inicialmente desenvolvida para adicionar interatividade a páginas web no navegador, hoje é usada em praticamente todos os lugares: navegadores, servidores (Node.js), aplicativos mobile e até sistemas embarcados.

### Por que aprender JavaScript?

- É a linguagem da web - todo navegador a executa
- Sintaxe simples e acessível para iniciantes
- Comunidade enorme com muitos recursos
- Possibilita criar aplicações completas (frontend + backend)
- Altamente procurada no mercado de trabalho

---

## 📖 Seção 2: Tipos de Dados Primitivos

JavaScript possui 7 tipos primitivos. Pense neles como as "peças de Lego" com as quais você constrói seus programas.

### String (Texto)

Uma string é um texto. Você a cria colocando caracteres entre aspas (simples ou duplas).

\`\`\`javascript
const nome = "João";
const sobrenome = 'Silva';
const mensagem = \`Olá, \${nome} \${sobrenome}!\`; // Template literal

console.log(mensagem); // Olá, João Silva!
\`\`\`

### Number (Número)

Numbers representam valores numéricos, tanto inteiros quanto decimais.

\`\`\`javascript
const idade = 25;
const altura = 1.75;
const temperatura = -5;

console.log(idade + 5); // 30
console.log(altura * 2); // 3.5
\`\`\`

### Boolean (Verdadeiro ou Falso)

Um boolean é simples: \`true\` ou \`false\`. Usado para tomar decisões no código.

\`\`\`javascript
const estaLogado = true;
const ehMaiorDeIdade = false;

console.log(estaLogado); // true
console.log(!ehMaiorDeIdade); // true (! inverte o valor)
\`\`\`

---

## 📖 Seção 3: Variáveis

Variáveis são "caixas" onde você guarda valores. Em JavaScript, existem 3 formas de criar variáveis: \`var\`, \`let\` e \`const\`.

### const (Constante - Recomendado)

Use \`const\` por padrão. Uma constante não pode ser reatribuída.

\`\`\`javascript
const nome = "Maria";
nome = "João"; // ❌ ERRO! Não pode reatribuir

const pessoa = { nome: "Maria" };
pessoa.nome = "João"; // ✅ OK! Pode modificar propriedades
\`\`\`

### let (Variável com Escopo de Bloco)

Use \`let\` quando precisar reatribuir um valor. Tem escopo de bloco (só existe dentro de \`{}\`).

\`\`\`javascript
let contador = 0;
contador = 1; // ✅ OK
contador = 2; // ✅ OK

if (true) {
  let x = 10;
}
console.log(x); // ❌ ERRO! x não existe fora do bloco
\`\`\`

---

## 📖 Seção 4: Operadores

Operadores são símbolos que realizam ações sobre valores.

### Operadores Aritméticos

\`\`\`javascript
console.log(10 + 5);  // 15 (adição)
console.log(10 - 5);  // 5 (subtração)
console.log(10 * 5);  // 50 (multiplicação)
console.log(10 / 5);  // 2 (divisão)
console.log(10 % 3);  // 1 (resto da divisão)
console.log(2 ** 3);  // 8 (potência)
\`\`\`

### Operadores de Comparação

\`\`\`javascript
console.log(5 === 5);   // true (igualdade estrita)
console.log(5 == "5");  // true (igualdade flexível - evitar!)
console.log(5 !== 5);   // false (desigualdade)
console.log(5 > 3);     // true (maior que)
console.log(5 < 3);     // false (menor que)
console.log(5 >= 5);    // true (maior ou igual)
\`\`\`

---

## 🎮 DESAFIO FINAL: Crie a Chave Mágica

Agora é sua vez! Você precisa criar um programa que:

1. **Defina 3 números** (você escolhe os valores)
2. **Calcule a soma** desses números
3. **Verifique se a soma é par ou ímpar**
4. **Gere uma "chave"** combinando os números e o resultado
5. **Exiba a chave** no console

**Exemplo de saída esperada:**
\`\`\`
Números: 5, 10, 7
Soma: 22 (PAR)
Chave Mágica: CHAVE_5-10-7_PAR_22
\`\`\`

---

## 🎯 Resumo do Módulo

Você aprendeu:
- ✅ Tipos de dados (string, number, boolean, undefined, null)
- ✅ Variáveis (const, let, var)
- ✅ Operadores (aritméticos, comparação, lógicos)
- ✅ Estruturas de controle básicas

**Próximo Módulo:** Transição para TypeScript - você aprenderá a adicionar tipagem estática ao seu código!

**Parabéns por completar o Módulo 1! 🎉**

Você ganhou **100 XP** e desbloqueou o **Módulo 2: Transição para TypeScript**!`
  },

  {
    id: 2,
    title: "Transição para TypeScript",
    description: "Aprenda TypeScript, uma linguagem que adiciona tipagem estática ao JavaScript.",
    difficulty: "medium",
    xpReward: 100,
    estimatedTime: 50,
    prerequisites: [1],
    content: `# Módulo 2: Transição para TypeScript

## 🎯 Objetivo do Módulo

Neste módulo você aprenderá TypeScript, uma linguagem que adiciona **tipagem estática** ao JavaScript. Você criará um **"Escudo Mágico"** que valida e protege os dados da sua chave anterior!

---

## 📖 Seção 1: O que é TypeScript?

TypeScript é um **superconjunto** do JavaScript que adiciona tipagem estática. Isso significa que você define que tipo de valor cada variável deve ter.

### Por que usar TypeScript?

- Detecta erros **antes** de executar o código
- Código mais legível e documentado
- Melhor autocompletar em editores
- Refatoração mais segura
- Muito usado em projetos profissionais

---

## 📖 Seção 2: Tipos Primitivos em TypeScript

### Declarar Tipos

\`\`\`typescript
// String
const nome: string = "Maria";
const nome2 = "João"; // TypeScript infere que é string

// Number
const idade: number = 25;
const altura: number = 1.75;

// Boolean
const estaLogado: boolean = true;

// Any (evitar!)
let qualquerCoisa: any = "pode ser qualquer coisa";
qualquerCoisa = 123; // ✅ Permitido (mas não recomendado)
\`\`\`

### Union Types (Múltiplos Tipos)

\`\`\`typescript
let id: string | number;
id = "ABC123"; // ✅ OK
id = 123;      // ✅ OK
id = true;     // ❌ ERRO!
\`\`\`

---

## 📖 Seção 3: Interfaces e Types

### Interfaces (Estruturas de Dados)

\`\`\`typescript
interface Usuario {
  nome: string;
  email: string;
  idade: number;
  ativo?: boolean; // Propriedade opcional
}

const usuario: Usuario = {
  nome: "Ana",
  email: "ana@email.com",
  idade: 30
};
\`\`\`

### Types (Mais Flexível)

\`\`\`typescript
type Pessoa = {
  nome: string;
  sobrenome: string;
};

type Contato = {
  email: string;
  telefone: string;
};

// Combinar types
type Usuario = Pessoa & Contato;
\`\`\`

---

## 📖 Seção 4: Classes

\`\`\`typescript
class Pessoa {
  nome: string;
  idade: number;
  private email: string; // Privado

  constructor(nome: string, idade: number, email: string) {
    this.nome = nome;
    this.idade = idade;
    this.email = email;
  }

  apresentar(): string {
    return \`Olá, meu nome é \${this.nome}\`;
  }

  private validarEmail(): boolean {
    return this.email.includes("@");
  }

  getEmail(): string {
    if (this.validarEmail()) {
      return this.email;
    }
    return "Email inválido";
  }
}

const pessoa = new Pessoa("Maria", 30, "maria@email.com");
console.log(pessoa.apresentar()); // Olá, meu nome é Maria
\`\`\`

---

## 🎮 DESAFIO FINAL: Crie o Escudo Mágico

Usando TypeScript, você deve criar um **"Escudo Mágico"** que:

1. **Defina uma interface** \`ChaveMagica\` com as propriedades da chave do módulo anterior
2. **Crie um enum** com os tipos de escudo (FERRO, AÇO, DIAMANTE)
3. **Crie uma classe** \`EscudoMagico\` que valida a chave e calcula a força
4. **Exiba o resultado** no console

---

## 🎯 Resumo do Módulo

Você aprendeu:
- ✅ Tipos primitivos em TypeScript
- ✅ Interfaces e Types
- ✅ Funções tipadas
- ✅ Classes

**Próximo Módulo:** Ambiente e Ferramentas - você aprenderá a configurar Node.js, npm e ferramentas de desenvolvimento!

**Parabéns por completar o Módulo 2! 🎉**

Você ganhou **100 XP** e desbloqueou o **Módulo 3: Ambiente e Ferramentas**!

**Progresso Total:** 2/9 módulos (22%)`
  },

  {
    id: 3,
    title: "Ambiente e Ferramentas",
    description: "Configure seu ambiente de desenvolvimento com Node.js, npm, TypeScript e ferramentas essenciais.",
    difficulty: "medium",
    xpReward: 100,
    estimatedTime: 40,
    prerequisites: [1, 2],
    content: `# Módulo 3: Ambiente e Ferramentas

## 🎯 Objetivo do Módulo

Neste módulo você aprenderá a configurar seu ambiente de desenvolvimento com Node.js, npm, TypeScript e ferramentas essenciais.

---

## 📖 Seção 1: Node.js e npm

### O que é Node.js?

Node.js é um runtime que permite executar JavaScript fora do navegador. Ele usa o motor V8 do Chrome.

### npm (Node Package Manager)

npm é o gerenciador de pacotes do Node.js. Permite instalar bibliotecas.

\`\`\`bash
# Verificar versão
node --version
npm --version

# Criar novo projeto
npm init -y

# Instalar pacote
npm install express

# Instalar como dependência de desenvolvimento
npm install -D typescript

# Listar pacotes instalados
npm list

# Remover pacote
npm uninstall express
\`\`\`

---

## 📖 Seção 2: package.json

O \`package.json\` é o coração do seu projeto Node.js.

\`\`\`json
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "description": "Descrição do projeto",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "ts-node": "^10.0.0"
  }
}
\`\`\`

---

## 📖 Seção 3: TypeScript Setup

### tsconfig.json

\`\`\`json
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
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
\`\`\`

---

## 📖 Seção 4: Git e Controle de Versão

### Inicializar Git

\`\`\`bash
# Inicializar repositório
git init

# Configurar usuário
git config user.name "Seu Nome"
git config user.email "seu@email.com"

# Ver status
git status

# Adicionar arquivos
git add .

# Fazer commit
git commit -m "Mensagem do commit"

# Ver histórico
git log
\`\`\`

---

## 🎯 Resumo do Módulo

Você aprendeu:
- ✅ Node.js e npm
- ✅ package.json e scripts
- ✅ TypeScript setup
- ✅ Git e controle de versão

**Próximo Módulo:** Back-end com TypeScript - você aprenderá a criar APIs REST!

**Parabéns por completar o Módulo 3! 🎉**

Você ganhou **100 XP** e desbloqueou o **Módulo 4: Back-end com TypeScript**!

**Progresso Total:** 3/9 módulos (33%)`
  },

  {
    id: 4,
    title: "Back-end com TypeScript",
    description: "Crie APIs REST com Express e TypeScript.",
    difficulty: "hard",
    xpReward: 100,
    estimatedTime: 60,
    prerequisites: [1, 2, 3],
    content: `# Módulo 4: Back-end com TypeScript

## 🎯 Objetivo do Módulo

Neste módulo você aprenderá a criar APIs REST com Express e TypeScript. Você criará um **"Servidor Mágico"** que gerencia usuários e tarefas!

---

## 📖 Seção 1: Express Basics

### O que é Express?

Express é um framework minimalista para criar servidores web em Node.js.

### Criar Servidor Simples

\`\`\`bash
npm install express
npm install -D @types/express
\`\`\`

\`\`\`typescript
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
  console.log(\`Servidor rodando em http://localhost:\${PORT}\`);
});
\`\`\`

---

## 📖 Seção 2: Rotas HTTP

### Métodos HTTP

\`\`\`typescript
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
  res.json({ mensagem: \`Usuário \${id} deletado\` });
});
\`\`\`

---

## 📖 Seção 3: Middlewares

Middlewares são funções que processam requisições.

\`\`\`typescript
// Middleware de log
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`);
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
\`\`\`

---

## 🎯 Resumo do Módulo

Você aprendeu:
- ✅ Express basics
- ✅ Rotas HTTP
- ✅ Middlewares
- ✅ Estrutura de projeto

**Próximo Módulo:** Front-end com TypeScript - você aprenderá React!

**Parabéns por completar o Módulo 4! 🎉**

Você ganhou **100 XP** e desbloqueou o **Módulo 5: Front-end com TypeScript**!

**Progresso Total:** 4/9 módulos (44%)`
  },

  {
    id: 5,
    title: "Front-end com TypeScript",
    description: "Crie interfaces com React e TypeScript.",
    difficulty: "hard",
    xpReward: 100,
    estimatedTime: 60,
    prerequisites: [1, 2, 3, 4],
    content: `# Módulo 5: Front-end com TypeScript

## 🎯 Objetivo do Módulo

Neste módulo você aprenderá React com TypeScript. Você criará uma **"Interface Mágica"** que se conecta com o servidor do módulo anterior!

---

## 📖 Seção 1: React Basics

### O que é React?

React é uma biblioteca JavaScript para criar interfaces de usuário com componentes reutilizáveis.

### Componente Simples

\`\`\`typescript
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
\`\`\`

---

## 📖 Seção 2: Hooks

### useState (Estado)

\`\`\`typescript
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
\`\`\`

### useEffect (Efeitos Colaterais)

\`\`\`typescript
import { useEffect, useState } from "react";

export const ListaUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/usuarios")
      .then(res => res.json())
      .then(data => {
        setUsuarios(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <ul>
      {usuarios.map((u: any) => (
        <li key={u.id}>{u.nome}</li>
      ))}
    </ul>
  );
};
\`\`\`

---

## 🎯 Resumo do Módulo

Você aprendeu:
- ✅ React basics
- ✅ Hooks (useState, useEffect)
- ✅ Componentes tipados
- ✅ Requisições HTTP

**Próximo Módulo:** Mobile com TypeScript - você aprenderá React Native!

**Parabéns por completar o Módulo 5! 🎉**

Você ganhou **100 XP** e desbloqueou o **Módulo 6: Mobile com TypeScript**!

**Progresso Total:** 5/9 módulos (56%)`
  },

  {
    id: 6,
    title: "Mobile com TypeScript",
    description: "Crie aplicativos mobile com React Native.",
    difficulty: "hard",
    xpReward: 100,
    estimatedTime: 60,
    prerequisites: [1, 2, 3, 4, 5],
    content: `# Módulo 6: Mobile com TypeScript

## 🎯 Objetivo do Módulo

Neste módulo você aprenderá React Native para criar aplicativos mobile que funcionam em iOS e Android.

---

## 📖 Seção 1: React Native Basics

### Criar Projeto

\`\`\`bash
npx create-expo-app meu-app
cd meu-app
npm start
\`\`\`

### Componente Simples

\`\`\`typescript
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function App() {
  const [count, setCount] = React.useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contador: {count}</Text>
      <Button
        title="Incrementar"
        onPress={() => setCount(count + 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold"
  }
});
\`\`\`

---

## 📖 Seção 2: Navegação

\`\`\`typescript
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detalhes" component={DetalhesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
\`\`\`

---

## 🎯 Resumo do Módulo

Você aprendeu:
- ✅ React Native basics
- ✅ Componentes nativos
- ✅ Navegação
- ✅ Styling

**Próximo Módulo:** Integração com IA - você aprenderá a usar APIs de IA!

**Parabéns por completar o Módulo 6! 🎉**

Você ganhou **100 XP** e desbloqueou o **Módulo 7: Integração com IA**!

**Progresso Total:** 6/9 módulos (67%)`
  },

  {
    id: 7,
    title: "Integração com IA",
    description: "Integre APIs de IA (OpenAI) em suas aplicações.",
    difficulty: "hard",
    xpReward: 100,
    estimatedTime: 50,
    prerequisites: [1, 2, 3, 4],
    content: `# Módulo 7: Integração com IA

## 🎯 Objetivo do Módulo

Neste módulo você aprenderá a integrar APIs de IA (OpenAI) em suas aplicações.

---

## 📖 Seção 1: OpenAI API

### Instalação

\`\`\`bash
npm install openai
\`\`\`

### Usar GPT

\`\`\`typescript
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function gerarTexto(prompt: string): Promise<string> {
  const message = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: prompt }
    ]
  });

  return message.choices[0].message.content || "";
}

// Usar
const resposta = await gerarTexto("Explique TypeScript em uma frase");
console.log(resposta);
\`\`\`

---

## 📖 Seção 2: Chatbot com Histórico

\`\`\`typescript
interface Message {
  role: "user" | "assistant";
  content: string;
}

class Chatbot {
  private historico: Message[] = [];
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  async enviarMensagem(conteudo: string): Promise<string> {
    this.historico.push({ role: "user", content: conteudo });

    const resposta = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: this.historico
    });

    const conteudoResposta = resposta.choices[0].message.content || "";
    this.historico.push({ role: "assistant", content: conteudoResposta });

    return conteudoResposta;
  }
}
\`\`\`

---

## 🎯 Resumo do Módulo

Você aprendeu:
- ✅ OpenAI API
- ✅ Chatbots com histórico
- ✅ Integração em aplicações
- ✅ Boas práticas

**Próximo Módulo:** Boas Práticas - você aprenderá padrões de design!

**Parabéns por completar o Módulo 7! 🎉**

Você ganhou **100 XP** e desbloqueou o **Módulo 8: Boas Práticas**!

**Progresso Total:** 7/9 módulos (78%)`
  },

  {
    id: 8,
    title: "Boas Práticas",
    description: "Aprenda padrões de design e arquitetura profissional.",
    difficulty: "hard",
    xpReward: 100,
    estimatedTime: 55,
    prerequisites: [1, 2, 3, 4, 5, 6, 7],
    content: `# Módulo 8: Boas Práticas

## 🎯 Objetivo do Módulo

Neste módulo você aprenderá padrões de design e arquitetura profissional.

---

## 📖 Seção 1: SOLID Principles

### S - Single Responsibility

\`\`\`typescript
// ❌ Ruim
class Usuario {
  criar() { /* ... */ }
  salvarNoBD() { /* ... */ }
  enviarEmail() { /* ... */ }
}

// ✅ Bom
class Usuario {
  nome: string;
  email: string;
}

class RepositorioUsuario {
  salvar(usuario: Usuario) { /* ... */ }
}

class ServicoEmail {
  enviar(email: string) { /* ... */ }
}
\`\`\`

### O - Open/Closed

\`\`\`typescript
// ✅ Aberto para extensão, fechado para modificação
abstract class Pagamento {
  abstract processar(valor: number): void;
}

class PagamentoCartao extends Pagamento {
  processar(valor: number) {
    console.log(\`Processando \${valor} via cartão\`);
  }
}

class PagamentoPix extends Pagamento {
  processar(valor: number) {
    console.log(\`Processando \${valor} via Pix\`);
  }
}
\`\`\`

---

## 📖 Seção 2: Design Patterns

### Factory Pattern

\`\`\`typescript
interface Veiculo {
  dirigir(): void;
}

class Carro implements Veiculo {
  dirigir() { console.log("Dirigindo carro"); }
}

class FabricaVeiculo {
  criar(tipo: "carro" | "bicicleta"): Veiculo {
    if (tipo === "carro") return new Carro();
    return new Bicicleta();
  }
}
\`\`\`

---

## 🎯 Resumo do Módulo

Você aprendeu:
- ✅ SOLID principles
- ✅ Design patterns
- ✅ Clean code
- ✅ Arquitetura

**Próximo Módulo:** Deploy e CI/CD - você aprenderá a fazer deploy em produção!

**Parabéns por completar o Módulo 8! 🎉**

Você ganhou **100 XP** e desbloqueou o **Módulo 9: Deploy e CI/CD**!

**Progresso Total:** 8/9 módulos (89%)`
  },

  {
    id: 9,
    title: "Deploy e CI/CD",
    description: "Faça deploy de aplicações em produção com automação.",
    difficulty: "hard",
    xpReward: 100,
    estimatedTime: 60,
    prerequisites: [1, 2, 3, 4, 5, 6, 7, 8],
    content: `# Módulo 9: Deploy e CI/CD

## 🎯 Objetivo do Módulo

Neste módulo você aprenderá a fazer deploy de aplicações em produção com automação.

---

## 📖 Seção 1: Docker

### Dockerfile

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

### Build e Run

\`\`\`bash
docker build -t meu-app .
docker run -p 3000:3000 meu-app
\`\`\`

---

## 📖 Seção 2: GitHub Actions

### CI/CD Pipeline

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

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 18

      - name: Instalar dependências
        run: npm install

      - name: Executar testes
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy
        run: npm run deploy
\`\`\`

---

## 📖 Seção 3: Deploy em Produção

### Render (Backend)

1. Push código para GitHub
2. Conectar repositório no Render
3. Configurar variáveis de ambiente
4. Deploy automático

### Vercel (Frontend)

1. Conectar repositório GitHub
2. Configurar build settings
3. Deploy automático em cada push

---

## 🏆 Parabéns!

Você completou todos os 9 módulos! 🎉

**Progresso Total:** 9/9 módulos (100%)

### O que você aprendeu:

✅ JavaScript fundamentals
✅ TypeScript avançado
✅ Ambiente de desenvolvimento
✅ Backend com Express
✅ Frontend com React
✅ Mobile com React Native
✅ Integração com IA
✅ Boas práticas e patterns
✅ Deploy e CI/CD

### Próximos passos:

1. **Construa seus próprios projetos** - Aplique tudo que aprendeu
2. **Contribua em open source** - Ganhe experiência real
3. **Explore frameworks avançados** - NestJS, Next.js, etc
4. **Aprofunde em DevOps** - Kubernetes, AWS, etc
5. **Especialize em uma área** - Backend, Frontend, Mobile, etc

---

**Obrigado por estudar conosco!**

Continue aprendendo, continue evoluindo! 💪`
  }
];

/**
 * Obter módulo por ID
 */
export function getModuleById(id: number): ModuleData | undefined {
  return ebookModules.find(m => m.id === id);
}

/**
 * Obter todos os módulos
 */
export function getAllModules(): ModuleData[] {
  return ebookModules;
}

/**
 * Verificar se um módulo está desbloqueado
 */
export function isModuleUnlocked(moduleId: number, completedModules: number[]): boolean {
  const module = getModuleById(moduleId);
  if (!module) return false;
  
  // Se não tem pré-requisitos, está desbloqueado
  if (module.prerequisites.length === 0) return true;
  
  // Verificar se todos os pré-requisitos foram completados
  return module.prerequisites.every(prereq => completedModules.includes(prereq));
}
