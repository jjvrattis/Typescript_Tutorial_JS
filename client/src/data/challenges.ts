import { Challenge } from "@/types/gamification";

export const challenges: Record<number, Challenge> = {
  1: {
    id: "modulo-1-chave-magica",
    title: "Crie a Chave Mágica",
    description: "Crie um programa que gera uma chave mágica combinando números e validando se a soma é par ou ímpar.",
    difficulty: "easy",
    initialCode: `// TODO: Defina 3 constantes com números
const num1 = ?;
const num2 = ?;
const num3 = ?;

// TODO: Calcule a soma
const soma = ?;

// TODO: Verifique se é par ou ímpar
const tipo = ?;

// TODO: Crie a chave
const chave = ?;

// TODO: Exiba no console
console.log(chave);`,
    testCases: [
      {
        id: "test-1",
        input: "5, 10, 7",
        expectedOutput: "CHAVE_5-10-7_PAR_22",
        description: "Teste com números pares"
      },
      {
        id: "test-2",
        input: "1, 2, 3",
        expectedOutput: "CHAVE_1-2-3_PAR_6",
        description: "Teste com soma par"
      },
      {
        id: "test-3",
        input: "2, 3, 4",
        expectedOutput: "CHAVE_2-3-4_ÍMPAR_9",
        description: "Teste com soma ímpar"
      }
    ],
    hints: [
      "Use const para declarar as variáveis",
      "A soma é calculada com o operador +",
      "Use o operador % (módulo) para verificar se é par ou ímpar",
      "Use template literals (backticks) para criar a string da chave"
    ],
    solution: `const num1 = 5;
const num2 = 10;
const num3 = 7;

const soma = num1 + num2 + num3;
const tipo = soma % 2 === 0 ? "PAR" : "ÍMPAR";
const chave = \`CHAVE_\${num1}-\${num2}-\${num3}_\${tipo}_\${soma}\`;

console.log(chave);`,
    xpReward: 100,
    timeLimit: 300
  },

  2: {
    id: "modulo-2-escudo-magico",
    title: "Crie o Escudo Mágico",
    description: "Usando TypeScript, crie um escudo que valida a chave do módulo anterior e calcula sua força.",
    difficulty: "medium",
    initialCode: `// TODO: Defina uma interface ChaveMagica
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
// const escudo = new EscudoMagico(...)`,
    testCases: [
      {
        id: "test-1",
        input: "CHAVE_5-10-7_PAR_22, DIAMANTE",
        expectedOutput: "Escudo Mágico criado com sucesso! ⚔️\nForça: 1000",
        description: "Criar escudo de diamante"
      }
    ],
    hints: [
      "Uma interface define a estrutura de um objeto",
      "Um enum é um conjunto de constantes nomeadas",
      "Uma classe é um molde para criar objetos",
      "Use o modificador 'private' para propriedades privadas"
    ],
    solution: `interface ChaveMagica {
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
    return \`Escudo Mágico criado com sucesso! ⚔️\\nForça: \${this.obterForca()}\`;
  }
}

const minhaChave: ChaveMagica = {
  numeros: [5, 10, 7],
  soma: 22,
  tipo: "PAR"
};

const escudo = new EscudoMagico(minhaChave, TipoEscudo.DIAMANTE);
console.log(escudo.criar());`,
    xpReward: 100,
    timeLimit: 300
  },

  3: {
    id: "modulo-3-feitico-setup",
    title: "Crie o Feitiço de Setup",
    description: "Crie um script que automatiza a criação de um projeto Node.js com estrutura completa.",
    difficulty: "medium",
    initialCode: `// TODO: Importar módulos necessários
// import fs from "fs";
// import path from "path";

// TODO: Criar função que gera o projeto
// function criarProjeto(nome: string): void {
//   ...
// }

// TODO: Executar
// criarProjeto("meu-novo-projeto");`,
    testCases: [
      {
        id: "test-1",
        input: "meu-projeto",
        expectedOutput: "✨ Projeto \"meu-projeto\" criado com sucesso!",
        description: "Criar novo projeto"
      }
    ],
    hints: [
      "Use fs.mkdirSync para criar pastas",
      "Use fs.writeFileSync para criar arquivos",
      "Crie as pastas: src, dist",
      "Crie os arquivos: tsconfig.json, .env, .gitignore"
    ],
    solution: `import fs from "fs";
import path from "path";

function criarProjeto(nome: string): void {
  const caminhoBase = path.join(process.cwd(), nome);

  if (!fs.existsSync(caminhoBase)) {
    fs.mkdirSync(caminhoBase, { recursive: true });
  }

  fs.mkdirSync(path.join(caminhoBase, "src"), { recursive: true });
  fs.mkdirSync(path.join(caminhoBase, "dist"), { recursive: true });

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

  fs.writeFileSync(
    path.join(caminhoBase, ".env"),
    "PORT=3000\\nNODE_ENV=development\\n"
  );

  fs.writeFileSync(
    path.join(caminhoBase, ".gitignore"),
    "node_modules/\\ndist/\\n.env\\n"
  );

  console.log(\`✨ Projeto "\${nome}" criado com sucesso!\`);
}

criarProjeto("meu-novo-projeto");`,
    xpReward: 100,
    timeLimit: 300
  }
};

/**
 * Obter desafio por ID do módulo
 */
export function getChallengeByModuleId(moduleId: number): Challenge | undefined {
  return challenges[moduleId];
}

/**
 * Obter todos os desafios
 */
export function getAllChallenges(): Challenge[] {
  return Object.values(challenges);
}
