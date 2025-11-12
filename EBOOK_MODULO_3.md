# Módulo 3: Ambiente e Ferramentas

## 🎯 Objetivo do Módulo

Neste módulo você aprenderá a configurar seu ambiente de desenvolvimento com Node.js, npm, TypeScript e ferramentas essenciais. Você criará um **"Feitiço de Setup"** automatizado!

---

## 📖 Seção 1: Node.js e npm

### O que é Node.js?

Node.js é um runtime que permite executar JavaScript fora do navegador. Ele usa o motor V8 do Chrome.

### npm (Node Package Manager)

npm é o gerenciador de pacotes do Node.js. Permite instalar bibliotecas.

```bash
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
```

---

## 📖 Seção 2: package.json

O `package.json` é o coração do seu projeto Node.js.

```json
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
```

### Scripts Úteis

```bash
npm run start    # Executa o script "start"
npm run dev      # Executa o script "dev"
npm run build    # Compila TypeScript para JavaScript
npm run test     # Executa testes
```

---

## 📖 Seção 3: TypeScript Setup

### tsconfig.json

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
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Compilar TypeScript

```bash
# Compilar uma vez
npx tsc

# Compilar em modo watch (observa mudanças)
npx tsc --watch

# Compilar e executar com ts-node
npx ts-node src/index.ts
```

---

## 📖 Seção 4: Git e Controle de Versão

### Inicializar Git

```bash
# Inicializar repositório
git init

# Configurar usuário
git config user.name "Seu Nome"
git config user.email "seu@email.com"

# Ver configuração
git config --list
```

### Comandos Básicos

```bash
# Ver status
git status

# Adicionar arquivos
git add .
git add arquivo.js

# Fazer commit
git commit -m "Mensagem do commit"

# Ver histórico
git log

# Criar branch
git branch minha-feature
git checkout minha-feature

# Mergear branch
git merge minha-feature

# Push para repositório remoto
git push origin main

# Pull de repositório remoto
git pull origin main
```

### .gitignore

```
node_modules/
dist/
.env
.env.local
*.log
.DS_Store
```

---

## 📖 Seção 5: Variáveis de Ambiente

### Arquivo .env

```
DATABASE_URL=postgresql://user:password@localhost:5432/db
API_KEY=sua-chave-secreta
NODE_ENV=development
PORT=3000
```

### Usar dotenv

```bash
npm install dotenv
```

```typescript
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

console.log(`Servidor rodando na porta ${port}`);
```

---

## 📖 Seção 6: ESLint e Prettier

### ESLint (Verificar Código)

```bash
npm install -D eslint
npx eslint --init

# Executar
npx eslint src/
npx eslint src/ --fix
```

### Prettier (Formatar Código)

```bash
npm install -D prettier

# Formatar
npx prettier --write src/
```

---

## 📖 Seção 7: Estrutura de Projeto

```
meu-projeto/
├── src/
│   ├── index.ts
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   └── utils/
├── dist/
├── tests/
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🎮 DESAFIO FINAL: Crie o Feitiço de Setup

Crie um **script automatizado** que:

1. **Inicializa um projeto Node.js**
2. **Instala dependências** (express, dotenv, typescript)
3. **Cria a estrutura de pastas**
4. **Gera arquivos de configuração**
5. **Cria um arquivo index.ts** inicial
6. **Exibe mensagem de sucesso**

### Seu Código Aqui:

```typescript
import fs from "fs";
import path from "path";

// TODO: Criar função que gera o projeto
// function criarProjeto(nome: string): void {
//   ...
// }

// TODO: Executar
// criarProjeto("meu-novo-projeto");
```

### Solução (Não olhe antes de tentar!):

```typescript
import fs from "fs";
import path from "path";

function criarProjeto(nome: string): void {
  const caminhoBase = path.join(process.cwd(), nome);

  // Criar pasta
  if (!fs.existsSync(caminhoBase)) {
    fs.mkdirSync(caminhoBase, { recursive: true });
  }

  // Criar pastas
  fs.mkdirSync(path.join(caminhoBase, "src"), { recursive: true });
  fs.mkdirSync(path.join(caminhoBase, "dist"), { recursive: true });

  // Criar tsconfig.json
  fs.writeFileSync(
    path.join(caminhoBase, "tsconfig.json"),
    JSON.stringify({
      compilerOptions: {
        target: "ES2020",
        module: "commonjs",
        outDir: "./dist",
        rootDir: "./src",
        strict: true
      }
    }, null, 2)
  );

  // Criar .env
  fs.writeFileSync(
    path.join(caminhoBase, ".env"),
    "PORT=3000\nNODE_ENV=development\n"
  );

  // Criar .gitignore
  fs.writeFileSync(
    path.join(caminhoBase, ".gitignore"),
    "node_modules/\ndist/\n.env\n"
  );

  // Criar index.ts
  fs.writeFileSync(
    path.join(caminhoBase, "src", "index.ts"),
    `console.log("Feitiço de Setup funcionando! ✨");\n`
  );

  console.log(`✨ Projeto "${nome}" criado com sucesso!`);
  console.log(`📁 Pasta: ${caminhoBase}`);
}

criarProjeto("meu-novo-projeto");
```

---

## 🎯 Resumo do Módulo

Você aprendeu:
- ✅ Node.js e npm
- ✅ package.json e scripts
- ✅ TypeScript setup
- ✅ Git e controle de versão
- ✅ Variáveis de ambiente
- ✅ ESLint e Prettier
- ✅ Estrutura de projeto

**Próximo Módulo:** Back-end com TypeScript - você aprenderá a criar APIs REST!

**Parabéns por completar o Módulo 3! 🎉**

Você ganhou **100 XP** e desbloqueou o **Módulo 4: Back-end com TypeScript**!

**Progresso Total:** 3/9 módulos (33%)
