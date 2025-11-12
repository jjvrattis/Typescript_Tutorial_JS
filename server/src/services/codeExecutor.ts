import { Worker } from "worker_threads";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
  testResults: TestResult[];
}

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  expected: string;
  actual: string;
  error?: string;
}

export interface CodeExecutionRequest {
  code: string;
  testCases: Array<{
    id: string;
    input: string;
    expectedOutput: string;
  }>;
  timeout?: number; // em ms
}

/**
 * Executor de código seguro usando Worker Threads
 * Cada execução roda em um processo isolado
 */
export class CodeExecutor {
  private timeout: number = 5000; // 5 segundos padrão
  private maxMemory: number = 128 * 1024 * 1024; // 128 MB

  constructor(timeout?: number) {
    if (timeout) {
      this.timeout = timeout;
    }
  }

  /**
   * Executa código JavaScript/TypeScript de forma segura
   */
  async execute(request: CodeExecutionRequest): Promise<ExecutionResult> {
    const startTime = Date.now();

    try {
      // Validar código antes de executar
      this.validateCode(request.code);

      // Executar em worker thread
      const output = await this.executeInWorker(request.code, request.timeout || this.timeout);

      // Validar testes
      const testResults = this.validateTests(output, request.testCases);

      const executionTime = Date.now() - startTime;

      return {
        success: testResults.every(t => t.passed),
        output,
        executionTime,
        testResults
      };
    } catch (erro) {
      const executionTime = Date.now() - startTime;
      const errorMessage = erro instanceof Error ? erro.message : "Erro desconhecido";

      return {
        success: false,
        output: "",
        error: errorMessage,
        executionTime,
        testResults: []
      };
    }
  }

  /**
   * Validações básicas de segurança no código
   */
  private validateCode(code: string): void {
    // Bloquear comandos perigosos
    const blockedPatterns = [
      /require\s*\(\s*['"]fs['"]\s*\)/gi, // File system
      /require\s*\(\s*['"]child_process['"]\s*\)/gi, // Process execution
      /require\s*\(\s*['"]os['"]\s*\)/gi, // OS access
      /require\s*\(\s*['"]path['"]\s*\)/gi, // Path manipulation
      /eval\s*\(/gi, // eval()
      /Function\s*\(/gi, // Function constructor
      /process\./gi, // process object
      /global\./gi, // global object
      /__dirname/gi, // directory access
      /__filename/gi // file access
    ];

    for (const pattern of blockedPatterns) {
      if (pattern.test(code)) {
        throw new Error(`Código contém operações não permitidas: ${pattern}`);
      }
    }

    // Verificar tamanho do código
    if (code.length > 50000) {
      throw new Error("Código muito grande (máximo 50KB)");
    }
  }

  /**
   * Executa código em uma Worker Thread isolada
   */
  private executeInWorker(code: string, timeout: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const workerPath = path.resolve(__dirname, "codeWorker.js");

      const worker = new Worker(workerPath);
      let completed = false;

      // Timeout
      const timeoutId = setTimeout(() => {
        if (!completed) {
          completed = true;
          worker.terminate();
          reject(new Error(`Execução excedeu o tempo limite de ${timeout}ms`));
        }
      }, timeout);

      worker.on("message", (output: string) => {
        if (!completed) {
          completed = true;
          clearTimeout(timeoutId);
          worker.terminate();
          resolve(output);
        }
      });

      worker.on("error", (erro) => {
        if (!completed) {
          completed = true;
          clearTimeout(timeoutId);
          worker.terminate();
          reject(erro);
        }
      });

      worker.on("exit", (code) => {
        if (!completed) {
          completed = true;
          clearTimeout(timeoutId);
          reject(new Error(`Worker encerrou com código ${code}`));
        }
      });

      // Enviar código para executar
      worker.postMessage({ code });
    });
  }

  /**
   * Valida os testes contra o output do código
   */
  private validateTests(
    output: string,
    testCases: Array<{
      id: string;
      input: string;
      expectedOutput: string;
    }>
  ): TestResult[] {
    return testCases.map(testCase => {
      const actualOutput = output.trim();
      const expectedOutput = testCase.expectedOutput.trim();
      const passed = this.compareOutputs(actualOutput, expectedOutput);

      return {
        testCaseId: testCase.id,
        passed,
        expected: expectedOutput,
        actual: actualOutput,
        error: passed ? undefined : "Output não corresponde ao esperado"
      };
    });
  }

  /**
   * Compara outputs (suporta múltiplas linhas e variações)
   */
  private compareOutputs(actual: string, expected: string): boolean {
    // Normalizar espaços em branco
    const normalizeOutput = (str: string) => {
      return str
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join("\n")
        .trim();
    };

    const normalizedActual = normalizeOutput(actual);
    const normalizedExpected = normalizeOutput(expected);

    return normalizedActual === normalizedExpected;
  }

  /**
   * Executa múltiplos códigos em paralelo (para testes)
   */
  async executeMultiple(
    requests: CodeExecutionRequest[]
  ): Promise<ExecutionResult[]> {
    return Promise.all(requests.map(req => this.execute(req)));
  }
}

/**
 * Instância singleton do executor
 */
export const codeExecutor = new CodeExecutor();
