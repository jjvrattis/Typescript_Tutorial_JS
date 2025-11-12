import { TestResult } from "@/types/gamification";

export interface CodeExecutionResponse {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
  testResults: TestResult[];
}

export interface ChallengeValidationResponse extends CodeExecutionResponse {
  xpEarned: number;
  challengePassed: boolean;
}

export interface SyntaxCheckResponse {
  valid: boolean;
  error: string | null;
}

export interface FormatCodeResponse {
  formatted: string;
}

/**
 * Serviço para comunicação com o backend de execução de código
 */
class CodeExecutorService {
  private baseUrl: string;

  constructor(baseUrl: string = "/api/code") {
    this.baseUrl = baseUrl;
  }

  /**
   * Executa código e valida contra testes
   */
  async executeCode(
    code: string,
    testCases: Array<{
      id: string;
      input: string;
      expectedOutput: string;
    }>,
    timeout?: number
  ): Promise<CodeExecutionResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          code,
          testCases,
          timeout: timeout || 5000
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao executar código");
      }

      return await response.json();
    } catch (erro) {
      const errorMessage = erro instanceof Error ? erro.message : "Erro desconhecido";
      return {
        success: false,
        output: "",
        error: errorMessage,
        executionTime: 0,
        testResults: []
      };
    }
  }

  /**
   * Valida solução de um desafio específico
   */
  async validateChallenge(
    code: string,
    challengeId: string,
    testCases: Array<{
      id: string;
      input: string;
      expectedOutput: string;
    }>
  ): Promise<ChallengeValidationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/validate-challenge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          code,
          challengeId,
          testCases
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao validar desafio");
      }

      return await response.json();
    } catch (erro) {
      const errorMessage = erro instanceof Error ? erro.message : "Erro desconhecido";
      return {
        success: false,
        output: "",
        error: errorMessage,
        executionTime: 0,
        testResults: [],
        xpEarned: 0,
        challengePassed: false
      };
    }
  }

  /**
   * Verifica sintaxe do código
   */
  async testSyntax(code: string): Promise<SyntaxCheckResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/test-syntax`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code })
      });

      if (!response.ok) {
        throw new Error("Erro ao verificar sintaxe");
      }

      return await response.json();
    } catch (erro) {
      return {
        valid: false,
        error: "Erro ao verificar sintaxe"
      };
    }
  }

  /**
   * Formata código
   */
  async formatCode(code: string): Promise<FormatCodeResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/format`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code })
      });

      if (!response.ok) {
        throw new Error("Erro ao formatar código");
      }

      return await response.json();
    } catch (erro) {
      return {
        formatted: code // Retornar código original se falhar
      };
    }
  }

  /**
   * Verifica se o executor está disponível
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Exportar instância singleton
export const codeExecutorService = new CodeExecutorService();
