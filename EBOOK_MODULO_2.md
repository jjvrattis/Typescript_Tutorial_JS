# Módulo 2: Transição para TypeScript

## 🎯 Objetivo do Módulo

Neste módulo você aprenderá TypeScript, uma linguagem que adiciona **tipagem estática** ao JavaScript. Você criará um **"Escudo Mágico"** que valida e protege os dados da sua chave anterior!

---

## 📖 Seção 1: O que é TypeScript?

TypeScript é um **superconjunto** do JavaScript que adiciona tipagem estática. Isso significa que você define que tipo de valor cada variável deve ter.

**Por que usar TypeScript?**

- Detecta erros **antes** de executar o código
- Código mais legível e documentado
- Melhor autocompletar em editores
- Refatoração mais segura
- Muito usado em projetos profissionais

**Como funciona:**

```
TypeScript → Compilador → JavaScript → Navegador/Node.js
```

Você escreve em TypeScript, o compilador transforma em JavaScript, e o navegador/Node.js executa.

---

## 📖 Seção 2: Tipos Primitivos em TypeScript

### Declarar Tipos

```typescript
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
```

### Union Types (Múltiplos Tipos)

```typescript
let id: string | number;
id = "ABC123"; // ✅ OK
id = 123;      // ✅ OK
id = true;     // ❌ ERRO!

let resultado: string | null = null;
resultado = "sucesso";
```

### Literal Types

```typescript
type Status = "ativo" | "inativo" | "pendente";
const meuStatus: Status = "ativo"; // ✅ OK
const outroStatus: Status = "erro"; // ❌ ERRO!
```

---

## 📖 Seção 3: Interfaces e Types

### Interfaces (Estruturas de Dados)

```typescript
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
```

### Types (Mais Flexível)

```typescript
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

const user: Usuario = {
  nome: "João",
  sobrenome: "Silva",
  email: "joao@email.com",
  telefone: "11999999999"
};
```

### Diferença entre Interface e Type

| Interface | Type |
|-----------|------|
| Apenas para objetos | Para qualquer tipo |
| Pode ser estendida | Pode ser combinado com & |
| Melhor para OOP | Mais flexível |

---

## 📖 Seção 4: Arrays com Tipos

```typescript
// Array de números
const numeros: number[] = [1, 2, 3];
const numeros2: Array<number> = [1, 2, 3]; // Sintaxe alternativa

// Array de strings
const nomes: string[] = ["Ana", "Bruno", "Carlos"];

// Array de objetos
interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
}

const tarefas: Tarefa[] = [
  { id: 1, titulo: "Estudar TypeScript", concluida: false },
  { id: 2, titulo: "Fazer exercício", concluida: true }
];

// Array de múltiplos tipos
const misto: (string | number)[] = ["texto", 123, "mais texto"];

// Tupla (tamanho e tipos fixos)
const coordenada: [number, number] = [10, 20];
const resposta: [string, number, boolean] = ["ok", 200, true];
```

---

## 📖 Seção 5: Funções com Tipos

### Tipagem de Parâmetros e Retorno

```typescript
// Função simples
function somar(a: number, b: number): number {
  return a + b;
}

console.log(somar(5, 3)); // 8
console.log(somar("5", 3)); // ❌ ERRO!

// Função que retorna void (sem retorno)
function exibir(mensagem: string): void {
  console.log(mensagem);
}

// Função com parâmetros opcionais
function criar(nome: string, idade?: number): void {
  console.log(`Nome: ${nome}, Idade: ${idade || "não informada"}`);
}

criar("Maria"); // ✅ OK
criar("João", 25); // ✅ OK

// Função com parâmetros padrão
function criar2(nome: string, idade: number = 18): void {
  console.log(`${nome} tem ${idade} anos`);
}

// Arrow functions
const multiplicar = (a: number, b: number): number => a * b;

// Função que pode retornar múltiplos tipos
function processar(valor: string | number): string {
  if (typeof valor === "string") {
    return valor.toUpperCase();
  }
  return valor.toString();
}
```

### Overloading (Múltiplas Assinaturas)

```typescript
function processar(valor: string): string;
function processar(valor: number): number;
function processar(valor: string | number): string | number {
  if (typeof valor === "string") {
    return valor.toUpperCase();
  }
  return valor * 2;
}

console.log(processar("hello")); // HELLO
console.log(processar(5)); // 10
```

---

## 📖 Seção 6: Genéricos

Genéricos permitem criar código reutilizável que funciona com qualquer tipo.

```typescript
// Função genérica simples
function primeiro<T>(array: T[]): T {
  return array[0];
}

console.log(primeiro([1, 2, 3])); // 1
console.log(primeiro(["a", "b", "c"])); // "a"

// Interface genérica
interface Resposta<T> {
  sucesso: boolean;
  dados: T;
}

const resposta1: Resposta<string> = {
  sucesso: true,
  dados: "Operação concluída"
};

const resposta2: Resposta<number[]> = {
  sucesso: true,
  dados: [1, 2, 3]
};

// Classe genérica
class Caixa<T> {
  private conteudo: T;

  constructor(valor: T) {
    this.conteudo = valor;
  }

  obter(): T {
    return this.conteudo;
  }
}

const caixa1 = new Caixa<string>("tesouro");
const caixa2 = new Caixa<number>(100);
```

---

## 📖 Seção 7: Enums

Enums permitem definir um conjunto de constantes nomeadas.

```typescript
// Enum numérico
enum Direcao {
  Cima = 0,
  Direita = 1,
  Baixo = 2,
  Esquerda = 3
}

let moverPara: Direcao = Direcao.Cima;

// Enum string
enum Status {
  Ativo = "ATIVO",
  Inativo = "INATIVO",
  Pendente = "PENDENTE"
}

let meuStatus: Status = Status.Ativo;
console.log(meuStatus); // ATIVO

// Usando em funções
function processar(status: Status): void {
  if (status === Status.Ativo) {
    console.log("Processando...");
  }
}
```

---

## 📖 Seção 8: Classes

```typescript
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
    return `Olá, meu nome é ${this.nome}`;
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
console.log(pessoa.getEmail()); // maria@email.com
// console.log(pessoa.email); // ❌ ERRO! É privado
```

---

## 🎮 DESAFIO FINAL: Crie o Escudo Mágico

Usando TypeScript, você deve criar um **"Escudo Mágico"** que:

1. **Defina uma interface** `ChaveMagica` com as propriedades da chave do módulo anterior
2. **Crie uma função** que valida se a chave é válida
3. **Implemente um enum** com os tipos de escudo (FERRO, AÇO, DIAMANTE)
4. **Crie uma classe** `EscudoMagico` que:
   - Recebe uma chave e um tipo de escudo
   - Valida a chave
   - Calcula a força do escudo baseado no tipo
   - Retorna uma mensagem de sucesso
5. **Exiba o resultado** no console

**Exemplo de saída:**
```
Chave: CHAVE_5-10-7_PAR_22
Tipo: DIAMANTE
Força do Escudo: 1000
Escudo Mágico criado com sucesso! ⚔️
```

### Seu Código Aqui:

```typescript
// TODO: Defina a interface ChaveMagica
// interface ChaveMagica {
//   ...
// }

// TODO: Crie um enum para tipos de escudo
// enum TipoEscudo {
//   ...
// }

// TODO: Crie a classe EscudoMagico
// class EscudoMagico {
//   ...
// }

// TODO: Teste criando um escudo
// const escudo = new EscudoMagico(...)
```

### Solução (Não olhe antes de tentar!):

```typescript
interface ChaveMagica {
  numeros: number[];
  soma: number;
  tipo: "PAR" | "ÍMPAR";
}

enum TipoEscudo {
  FERRO = 100,
  AÇO = 500,
  DIAMANTE = 1000
}

class EscudoMagico {
  private chave: ChaveMagica;
  private tipo: TipoEscudo;

  constructor(chave: ChaveMagica, tipo: TipoEscudo) {
    this.chave = chave;
    this.tipo = tipo;
    this.validar();
  }

  private validar(): void {
    if (!this.chave.numeros || this.chave.soma === undefined) {
      throw new Error("Chave inválida!");
    }
  }

  obterForca(): number {
    return this.tipo;
  }

  criar(): string {
    return `Escudo Mágico criado com sucesso! ⚔️\nForça: ${this.obterForca()}`;
  }
}

// Teste
const minhaChave: ChaveMagica = {
  numeros: [5, 10, 7],
  soma: 22,
  tipo: "PAR"
};

const escudo = new EscudoMagico(minhaChave, TipoEscudo.DIAMANTE);
console.log(escudo.criar());
```

---

## 🎯 Resumo do Módulo

Você aprendeu:
- ✅ Tipos primitivos em TypeScript
- ✅ Interfaces e Types
- ✅ Arrays com tipos
- ✅ Funções tipadas
- ✅ Genéricos
- ✅ Enums
- ✅ Classes

**Próximo Módulo:** Ambiente e Ferramentas - você aprenderá a configurar Node.js, npm e ferramentas de desenvolvimento!

---

## 💡 Dicas de Estudo

1. **Use um editor com suporte a TypeScript** - VS Code é o melhor
2. **Ative o strict mode** - `"strict": true` no `tsconfig.json`
3. **Não use `any`** - Sempre especifique tipos
4. **Pratique com interfaces** - Elas são fundamentais em projetos reais
5. **Explore o playground** - [TypeScript Playground](https://www.typescriptlang.org/play)

---

## 🔗 Recursos Extras

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Total TypeScript (Curso)](https://www.totaltypescript.com/)

**Parabéns por completar o Módulo 2! 🎉**

Você ganhou **100 XP** e desbloqueou o **Módulo 3: Ambiente e Ferramentas**!

**Progresso Total:** 2/9 módulos (22%)
