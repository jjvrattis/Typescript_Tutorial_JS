import { Router, Request, Response } from "express";
import { codeExecutor } from "../services/codeExecutor";
import { z, ZodError } from "zod";

const router = Router();

// Schema de validação
const ExecuteCodeSchema = z.object({
  code: z.string().min(1).max(50000),
  testCases: z.array(
    z.object({
      id: z.string(),
      input: z.string(),
      expectedOutput: z.string()
    })
  ),
  timeout: z.number().min(1000).max(30000).optional()
});

type ExecuteCodeRequest = z.infer<typeof ExecuteCodeSchema>;

/**
 * POST /api/code/execute
 * Executa código e valida contra testes
 */
router.post("/execute", async (req: Request, res: Response) => {
  try {
    // Validar request
    const request: ExecuteCodeRequest = ExecuteCodeSchema.parse(req.body);

    // Executar código
    const result = await codeExecutor.execute({
      code: request.code,
      testCases: request.testCases,
      timeout: request.timeout
    });

    // Retornar resultado
    res.json(result);
  } catch (erro) {
    if (erro instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validação falhou",
        details: erro.issues
      });
    }

    const errorMessage = erro instanceof Error ? erro.message : "Erro desconhecido";
    res.status(500).json({
      error: errorMessage,
      success: false,
      output: "",
      executionTime: 0,
      testResults: []
    });
  }
});

/**
 * POST /api/code/validate-challenge
 * Valida solução de um desafio específico
 */
router.post("/validate-challenge", async (req: Request, res: Response) => {
  try {
    const { code, challengeId, testCases } = req.body;

    if (!code || !challengeId || !testCases) {
      return res.status(400).json({
        error: "Código, challengeId e testCases são obrigatórios"
      });
    }

    // Executar código
    const result = await codeExecutor.execute({
      code,
      testCases,
      timeout: 5000
    });

    // Selecionar um único resultado para retornar
    const hasResults = result.testResults && result.testResults.length > 0;
    const passedResult = hasResults ? result.testResults.find(t => t.passed) : undefined;
    const selectedResult = passedResult ?? (hasResults ? result.testResults[0] : undefined);

    // Aprovação: pelo menos um teste passou
    const challengePassed = hasResults ? result.testResults.some(t => t.passed) : false;
    const xpEarned = challengePassed ? 100 : 0;

    res.json({
      ...result,
      xpEarned,
      challengePassed,
      testResults: selectedResult ? [selectedResult] : []
    });
  } catch (erro) {
    const errorMessage = erro instanceof Error ? erro.message : "Erro desconhecido";
    res.status(500).json({
      error: errorMessage,
      success: false
    });
  }
});

/**
 * POST /api/code/test-syntax
 * Apenas verifica se o código tem sintaxe válida
 */
router.post("/test-syntax", (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Código é obrigatório" });
    }

    // Tentar compilar o código
    try {
      new Function(code);
      res.json({ valid: true, error: null });
    } catch (erro) {
      const errorMessage = erro instanceof Error ? erro.message : "Erro de sintaxe";
      res.json({ valid: false, error: errorMessage });
    }
  } catch (erro) {
    res.status(500).json({ error: "Erro ao verificar sintaxe" });
  }
});

/**
 * POST /api/code/format
 * Formata código (simples)
 */
router.post("/format", (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Código é obrigatório" });
    }

    // Formatação básica (indentação)
    const formatted = code
      .split("\n")
      .map((line: string) => {
        const trimmed = line.trim();
        if (!trimmed) return "";
        
        // Contar abertas/fechadas de chaves
        let indent = 0;
        for (let i = 0; i < trimmed.length; i++) {
          if (trimmed[i] === "{") indent++;
          if (trimmed[i] === "}") indent--;
        }

        return "  ".repeat(Math.max(0, indent)) + trimmed;
      })
      .join("\n");

    res.json({ formatted });
  } catch (erro) {
    res.status(500).json({ error: "Erro ao formatar código" });
  }
});

/**
 * GET /api/code/health
 * Verifica se o executor está funcionando
 */
router.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    executor: "ready",
    timestamp: new Date().toISOString()
  });
});

export default router;
