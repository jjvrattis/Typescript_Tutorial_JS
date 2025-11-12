# Módulo 1: Fundamentos do JavaScript

## 🎯 Objetivo do Módulo

Neste módulo você aprenderá os conceitos fundamentais do JavaScript: tipos de dados, variáveis, operadores e lógica básica. Ao final, você criará um **mini-projeto que gera uma "chave mágica"** para desbloquear o próximo módulo!

---

## 📖 Seção 1: O que é JavaScript?

JavaScript é uma linguagem de programação criada em 1995 por Brendan Eich. Inicialmente desenvolvida para adicionar interatividade a páginas web no navegador, hoje é usada em praticamente todos os lugares: navegadores, servidores (Node.js), aplicativos mobile e até sistemas embarcados.

**Por que aprender JavaScript?**

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

```javascript
const nome = "João";
const sobrenome = 'Silva';
const mensagem = `Olá, ${nome} ${sobrenome}!`; // Template literal

console.log(mensagem); // Olá, João Silva!
```

**Dica:** Use template literals (backticks) para inserir variáveis dentro de strings com `${variavel}`.

### Number (Número)

Numbers representam valores numéricos, tanto inteiros quanto decimais.

```javascript
const idade = 25;
const altura = 1.75;
const temperatura = -5;

console.log(idade + 5); // 30
console.log(altura * 2); // 3.5
```

### Boolean (Verdadeiro ou Falso)

Um boolean é simples: `true` ou `false`. Usado para tomar decisões no código.

```javascript
const estaLogado = true;
const ehMaiorDeIdade = false;

console.log(estaLogado); // true
console.log(!ehMaiorDeIdade); // true (! inverte o valor)
```

### Undefined

Uma variável declarada mas sem valor atribuído é `undefined`.

```javascript
let x;
console.log(x); // undefined
```

### Null

`null` representa a ausência intencional de valor. É diferente de `undefined`.

```javascript
let usuario = null; // Intencionalmente vazio
console.log(usuario); // null
```

### Symbol e BigInt

Estes são tipos mais avançados que você aprenderá depois. Por enquanto, saiba que existem!

---

## 📖 Seção 3: Variáveis

Variáveis são "caixas" onde você guarda valores. Em JavaScript, existem 3 formas de criar variáveis: `var`, `let` e `const`.

### const (Constante - Recomendado)

Use `const` por padrão. Uma constante não pode ser reatribuída.

```javascript
const nome = "Maria";
nome = "João"; // ❌ ERRO! Não pode reatribuir

const pessoa = { nome: "Maria" };
pessoa.nome = "João"; // ✅ OK! Pode modificar propriedades
```

### let (Variável com Escopo de Bloco)

Use `let` quando precisar reatribuir um valor. Tem escopo de bloco (só existe dentro de `{}`).

```javascript
let contador = 0;
contador = 1; // ✅ OK
contador = 2; // ✅ OK

if (true) {
  let x = 10;
}
console.log(x); // ❌ ERRO! x não existe fora do bloco
```

### var (Evitar)

`var` é a forma antiga. Tem comportamentos estranhos. **Não use!**

```javascript
var x = 1;
var x = 2; // ❌ Pode redeclarar (confuso!)
```

**Regra de Ouro:** Use `const` sempre. Use `let` quando precisar reatribuir. Nunca use `var`.

---

## 📖 Seção 4: Operadores

Operadores são símbolos que realizam ações sobre valores.

### Operadores Aritméticos

```javascript
console.log(10 + 5);  // 15 (adição)
console.log(10 - 5);  // 5 (subtração)
console.log(10 * 5);  // 50 (multiplicação)
console.log(10 / 5);  // 2 (divisão)
console.log(10 % 3);  // 1 (resto da divisão)
console.log(2 ** 3);  // 8 (potência)
```

### Operadores de Comparação

```javascript
console.log(5 === 5);   // true (igualdade estrita)
console.log(5 == "5");  // true (igualdade flexível - evitar!)
console.log(5 !== 5);   // false (desigualdade)
console.log(5 > 3);     // true (maior que)
console.log(5 < 3);     // false (menor que)
console.log(5 >= 5);    // true (maior ou igual)
```

### Operadores Lógicos

```javascript
console.log(true && false);  // false (E lógico)
console.log(true || false);  // true (OU lógico)
console.log(!true);          // false (NÃO lógico)
```

---

## 📖 Seção 5: Estruturas de Controle

### if/else (Decisões)

```javascript
const idade = 18;

if (idade >= 18) {
  console.log("Você é maior de idade");
} else if (idade >= 13) {
  console.log("Você é adolescente");
} else {
  console.log("Você é criança");
}
```

### switch (Múltiplas Opções)

```javascript
const diaDaSemana = "segunda";

switch (diaDaSemana) {
  case "segunda":
    console.log("Início da semana");
    break;
  case "sexta":
    console.log("Quase fim de semana!");
    break;
  default:
    console.log("Dia comum");
}
```

### Loops (Repetição)

**for:**
```javascript
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
```

**while:**
```javascript
let contador = 0;
while (contador < 5) {
  console.log(contador);
  contador++;
}
```

---

## 📖 Seção 6: Funções

Funções são blocos de código reutilizáveis.

```javascript
// Declaração de função
function saudar(nome) {
  return `Olá, ${nome}!`;
}

console.log(saudar("Maria")); // Olá, Maria!

// Arrow function (moderna)
const saudar2 = (nome) => `Olá, ${nome}!`;
console.log(saudar2("João")); // Olá, João!
```

### Parâmetros Padrão

```javascript
function criarUsuario(nome, idade = 18) {
  return { nome, idade };
}

console.log(criarUsuario("Ana"));        // { nome: "Ana", idade: 18 }
console.log(criarUsuario("Bob", 25));   // { nome: "Bob", idade: 25 }
```

---

## 📖 Seção 7: Objetos e Arrays

### Objetos (Coleções de Propriedades)

```javascript
const pessoa = {
  nome: "Maria",
  idade: 30,
  email: "maria@email.com",
  saudar: function() {
    return `Olá, meu nome é ${this.nome}`;
  }
};

console.log(pessoa.nome);        // Maria
console.log(pessoa["email"]);    // maria@email.com
console.log(pessoa.saudar());    // Olá, meu nome é Maria
```

### Arrays (Listas)

```javascript
const numeros = [1, 2, 3, 4, 5];

console.log(numeros[0]);       // 1
console.log(numeros.length);   // 5
numeros.push(6);               // Adiciona ao final
numeros.pop();                 // Remove do final

// Iteração
numeros.forEach((num) => {
  console.log(num * 2);
});

// Transformação
const dobrados = numeros.map((num) => num * 2);
console.log(dobrados); // [2, 4, 6, 8, 10]
```

---

## 🎮 DESAFIO FINAL: Crie a Chave Mágica

Agora é sua vez! Você precisa criar um programa que:

1. **Defina 3 números** (você escolhe os valores)
2. **Calcule a soma** desses números
3. **Verifique se a soma é par ou ímpar**
4. **Gere uma "chave"** combinando os números e o resultado
5. **Exiba a chave** no console

**Exemplo de saída esperada:**
```
Números: 5, 10, 7
Soma: 22 (PAR)
Chave Mágica: CHAVE_5-10-7_PAR_22
```

### Seu Código Aqui:

```javascript
// TODO: Defina 3 constantes com números
// const num1 = ?
// const num2 = ?
// const num3 = ?

// TODO: Calcule a soma
// const soma = ?

// TODO: Verifique se é par ou ímpar
// const tipo = ?

// TODO: Crie a chave
// const chave = ?

// TODO: Exiba no console
// console.log(?)
```

### Solução (Não olhe antes de tentar!):

```javascript
const num1 = 5;
const num2 = 10;
const num3 = 7;

const soma = num1 + num2 + num3;
const tipo = soma % 2 === 0 ? "PAR" : "ÍMPAR";
const chave = `CHAVE_${num1}-${num2}-${num3}_${tipo}_${soma}`;

console.log(chave);
// CHAVE_5-10-7_PAR_22
```

---

## 🎯 Resumo do Módulo

Você aprendeu:
- ✅ Tipos de dados (string, number, boolean, undefined, null)
- ✅ Variáveis (const, let, var)
- ✅ Operadores (aritméticos, comparação, lógicos)
- ✅ Estruturas de controle (if/else, switch, loops)
- ✅ Funções
- ✅ Objetos e Arrays

**Próximo Módulo:** Transição para TypeScript - você aprenderá a adicionar tipagem estática ao seu código!

---

## 💡 Dicas de Estudo

1. **Pratique no console do navegador** - Abra DevTools (F12) e teste todo o código
2. **Modifique os exemplos** - Mude valores, teste diferentes cenários
3. **Crie seus próprios exemplos** - Quanto mais você escrever, mais aprenderá
4. **Não decore** - Entenda o "por quê" de cada coisa
5. **Cometa erros** - Erros são oportunidades de aprender!

---

## 🔗 Recursos Extras

- [MDN Web Docs - JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)
- [Eloquent JavaScript (Livro Gratuito)](https://eloquentjavascript.net/)

**Parabéns por completar o Módulo 1! 🎉**

Você ganhou **100 XP** e desbloqueou o **Módulo 2: Transição para TypeScript**!
