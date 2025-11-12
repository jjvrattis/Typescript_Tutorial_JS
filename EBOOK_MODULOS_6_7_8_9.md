# Módulos 6-9: Conclusão do Ebook

## Módulo 6: Mobile com TypeScript

### 🎯 Objetivo

Criar aplicativos mobile com React Native que funcionam em iOS e Android.

### Conceitos Principais

**React Native Basics:**
```typescript
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
```

**Navegação:**
```typescript
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
```

### 🎮 Desafio Final

Crie um app mobile que:
- Exibe lista de tarefas
- Permite adicionar/remover tarefas
- Armazena dados localmente com AsyncStorage
- Usa navegação entre telas

**Você ganhou 100 XP!**

---

## Módulo 7: Integração com IA

### 🎯 Objetivo

Integrar APIs de IA (OpenAI) em suas aplicações.

### OpenAI API

```typescript
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
```

### Chatbot com Histórico

```typescript
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

  obterHistorico(): Message[] {
    return this.historico;
  }
}

// Usar
const bot = new Chatbot(process.env.OPENAI_API_KEY!);
console.log(await bot.enviarMensagem("Olá!"));
console.log(await bot.enviarMensagem("Como você está?"));
```

### 🎮 Desafio Final

Crie um assistente de estudos que:
- Responde perguntas sobre os módulos anteriores
- Mantém histórico de conversas
- Fornece dicas e explicações
- Integra com seu app React

**Você ganhou 100 XP!**

---

## Módulo 8: Boas Práticas

### 🎯 Objetivo

Aprender padrões de design e arquitetura profissional.

### SOLID Principles

**S - Single Responsibility:**
```typescript
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
```

**O - Open/Closed:**
```typescript
// ✅ Aberto para extensão, fechado para modificação
abstract class Pagamento {
  abstract processar(valor: number): void;
}

class PagamentoCartao extends Pagamento {
  processar(valor: number) {
    console.log(`Processando ${valor} via cartão`);
  }
}

class PagamentoPix extends Pagamento {
  processar(valor: number) {
    console.log(`Processando ${valor} via Pix`);
  }
}
```

**D - Dependency Injection:**
```typescript
// ✅ Bom
class Servico {
  constructor(private repositorio: Repositorio) {}

  obter(id: number) {
    return this.repositorio.buscar(id);
  }
}

const repo = new RepositorioSQL();
const servico = new Servico(repo);
```

### Design Patterns

**Factory Pattern:**
```typescript
interface Veiculo {
  dirigir(): void;
}

class Carro implements Veiculo {
  dirigir() { console.log("Dirigindo carro"); }
}

class Bicicleta implements Veiculo {
  dirigir() { console.log("Pedalando"); }
}

class FabricaVeiculo {
  criar(tipo: "carro" | "bicicleta"): Veiculo {
    if (tipo === "carro") return new Carro();
    return new Bicicleta();
  }
}
```

**Observer Pattern:**
```typescript
interface Observer {
  atualizar(dados: any): void;
}

class Observavel {
  private observers: Observer[] = [];

  adicionar(observer: Observer) {
    this.observers.push(observer);
  }

  notificar(dados: any) {
    this.observers.forEach(o => o.atualizar(dados));
  }
}
```

### Clean Code

- Use nomes descritivos
- Funções pequenas e focadas
- Evite duplicação
- Trate erros adequadamente
- Escreva testes

### 🎮 Desafio Final

Refatore um projeto anterior seguindo:
- SOLID principles
- Design patterns apropriados
- Clean code practices
- Adicione testes unitários

**Você ganhou 100 XP!**

---

## Módulo 9: Deploy e CI/CD

### 🎯 Objetivo

Fazer deploy de aplicações em produção com automação.

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**Build e Run:**
```bash
docker build -t meu-app .
docker run -p 3000:3000 meu-app
```

### GitHub Actions (CI/CD)

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
```

### Deploy em Produção

**Render (Backend):**
1. Push código para GitHub
2. Conectar repositório no Render
3. Configurar variáveis de ambiente
4. Deploy automático

**Vercel (Frontend):**
1. Conectar repositório GitHub
2. Configurar build settings
3. Deploy automático em cada push

### 🎮 Desafio Final

Faça deploy completo de:
- Backend em Render
- Frontend em Vercel
- Configure CI/CD com GitHub Actions
- Implemente testes automatizados
- Configure variáveis de ambiente seguras

**Você ganhou 100 XP!**

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

### Certificado

Você ganhou **900 XP** e completou o curso **Fullstack Academy**! 🚀

---

**Obrigado por estudar conosco!**

Continue aprendendo, continue evoluindo! 💪
