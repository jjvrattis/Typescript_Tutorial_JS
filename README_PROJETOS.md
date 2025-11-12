# Fullstack Academy - Projetos de Conclusão

Este documento contém instruções para setup e deploy dos 3 projetos de conclusão do curso de desenvolvimento fullstack em TypeScript e JavaScript.

---

## 📚 Projetos

### 1. **ToDo App Fullstack**
- **Arquivo:** `PROJETO_1_TODO_APP.md`
- **Stack:** Node.js + Express + React + Prisma + PostgreSQL
- **Funcionalidades:** CRUD de tarefas, autenticação JWT, banco de dados
- **Deploy:** Backend em Render, Frontend em Vercel

### 2. **App Mobile Controle Financeiro**
- **Arquivo:** `PROJETO_2_FINANCE_APP.md`
- **Stack:** React Native + TypeScript + Expo + AsyncStorage
- **Funcionalidades:** Registro de transações, gráficos, armazenamento local
- **Deploy:** App Store (iOS) e Google Play (Android)

### 3. **Chatbot com IA**
- **Arquivo:** `PROJETO_3_CHATBOT_IA.md`
- **Stack:** Node.js + Express + React + OpenAI API
- **Funcionalidades:** Chat em tempo real, integração com IA, histórico de conversas
- **Deploy:** Backend em Render, Frontend em Vercel

---

## 🚀 Quick Start

### Projeto 1: ToDo App

```bash
# Backend
cd todo-app/backend
npm install
npx prisma migrate dev
npx ts-node src/server.ts

# Frontend (em outro terminal)
cd ../frontend
npm install
npm run dev
```

### Projeto 2: Finance App

```bash
cd finance-app
npm install
npm start
```

### Projeto 3: Chatbot

```bash
# Backend
cd chatbot-ia/backend
npm install
npx ts-node src/server.ts

# Frontend (em outro terminal)
cd ../frontend
npm install
npm run dev
```

---

## 📋 Checklist de Deploy

### Backend (Render)

- [ ] Criar conta em [render.com](https://render.com)
- [ ] Conectar repositório GitHub
- [ ] Criar novo Web Service
- [ ] Configurar variáveis de ambiente
- [ ] Ativar auto-deploy em cada push
- [ ] Testar endpoints da API

### Frontend (Vercel)

- [ ] Criar conta em [vercel.com](https://vercel.com)
- [ ] Conectar repositório GitHub
- [ ] Configurar variáveis de ambiente
- [ ] Deploy automático
- [ ] Testar aplicação em produção

### Mobile (Expo)

- [ ] Criar conta em [expo.dev](https://expo.dev)
- [ ] Instalar EAS CLI: `npm install -g eas-cli`
- [ ] Fazer build: `eas build --platform ios` e `eas build --platform android`
- [ ] Submeter para app stores

---

## 🔐 Variáveis de Ambiente

### Backend (Render)

```
DATABASE_URL=postgresql://user:password@host:5432/db
JWT_SECRET=seu-segredo-super-secreto
OPENAI_API_KEY=sua-chave-openai
PORT=3001
FRONTEND_URL=https://seu-frontend.vercel.app
```

### Frontend (Vercel)

```
VITE_API_URL=https://seu-backend.render.com
VITE_OPENAI_KEY=sua-chave-openai
```

---

## 📚 Estrutura de Pastas

```
fullstack-ebook-site/
├── PROJETO_1_TODO_APP.md
├── PROJETO_2_FINANCE_APP.md
├── PROJETO_3_CHATBOT_IA.md
├── README_PROJETOS.md
├── ebook-content.md
├── client/
│   └── src/
│       ├── pages/
│       ├── components/
│       └── data/
└── todo.md
```

---

## 🎓 Aprendizado

Ao completar estes 3 projetos, você terá experiência com:

**Projeto 1 - Fullstack Web:**
- ✓ Arquitetura cliente-servidor
- ✓ Banco de dados relacional
- ✓ Autenticação e autorização
- ✓ API REST
- ✓ Deploy em produção

**Projeto 2 - Mobile:**
- ✓ Desenvolvimento mobile cross-platform
- ✓ Navegação e componentes nativos
- ✓ Armazenamento local
- ✓ Gráficos e visualizações
- ✓ Distribuição em app stores

**Projeto 3 - IA:**
- ✓ Integração com APIs externas
- ✓ Chat em tempo real
- ✓ Machine Learning (OpenAI)
- ✓ Gerenciamento de estado complexo
- ✓ Deploy serverless

---

## 🆘 Troubleshooting

### Erro de conexão com banco de dados

```bash
# Verificar se PostgreSQL está rodando
psql -U postgres

# Criar banco de dados
createdb todo_db

# Atualizar DATABASE_URL no .env
```

### Erro de autenticação JWT

```bash
# Gerar novo JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Erro de CORS

Certifique-se que o `FRONTEND_URL` está correto no backend e que o CORS está configurado:

```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL
}));
```

### Erro de OpenAI API

- Verificar se a chave está correta
- Verificar se a conta tem créditos
- Verificar rate limits

---

## 📞 Suporte

Para dúvidas sobre os projetos:

1. Consulte a documentação específica do projeto
2. Revise os módulos relevantes do ebook
3. Verifique a documentação oficial das tecnologias
4. Procure por issues no GitHub

---

## ✅ Conclusão

Parabéns por completar todos os 3 projetos! Você agora é um desenvolvedor fullstack capaz de:

- Construir aplicações web completas
- Desenvolver apps mobile
- Integrar IA em suas aplicações
- Fazer deploy em produção
- Trabalhar com TypeScript e JavaScript

**Próximos passos:**
- Contribuir em projetos open source
- Explorar frameworks avançados (NestJS, Next.js)
- Aprender sobre DevOps e CI/CD
- Construir seus próprios projetos

Boa sorte! 🚀
