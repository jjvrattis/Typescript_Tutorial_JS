## Objetivo
Garantir que o sandbox de código nas lições funcione de forma estável em desenvolvimento, com verificação de sintaxe, execução segura, validação de desafios e feedback claro ao usuário.

## Diagnóstico Atual
- Frontend chama `POST /api/code/test-syntax` e `POST /api/code/validate-challenge` (`client/src/services/codeExecutorService.ts:48–66, 91–109`).
- Backend tem rotas em `server/src/routes/codeRoutes.ts` para `execute`, `validate-challenge`, `test-syntax`, `format`, `health`.
- Executor roda o código em `Worker` e compara `output` com todos os `expectedOutput` dos testes (`server/src/services/codeExecutor.ts:165–206`).
- Desafio do Módulo 1 possui múltiplos `expectedOutput` diferentes, mas o código do aluno só gera um output por execução (`client/src/data/challenges.ts:25–44`). Isso torna impossível "todos os testes" passarem simultaneamente.

## Melhorias no Backend
- Tornar a aprovação do desafio baseada em "pelo menos um teste passou" ao invés de "todos":
  - Em `server/src/routes/codeRoutes.ts:81–90`, definir `challengePassed = result.testResults.some(t => t.passed)` e `xpEarned = challengePassed ? 100 : 0`.
- Robustez na comparação de outputs:
  - Em `server/src/services/codeExecutor.ts:191–206`, ajustar `compareOutputs` para normalizar tokens específicos do módulo 1 (mapear `par` → `PAR`, `ímpar` → `ÍMPAR` antes de comparar) e trim de espaços/linhas.
- Registrar melhor erros do worker e garantir caminho do worker (`server/src/services/codeExecutor.ts:115–160`).

## Ajustes nos Desafios
- Padronizar `expectedOutput` do Módulo 1 para o mesmo formato de maiúsculas (`PAR`/`ÍMPAR`) e documentar isso no enunciado (referência `client/src/data/challenges.ts:25–44`).
- Opcional: reduzir a lista de `testCases` para um único caso por desafio simples, evitando confusão.

## Melhorias no Frontend
- Feedback claro no editor:
  - `ChallengeEditorIntegrated.tsx:105–114` já exibe erro de sintaxe. Adicionar mensagem quando a validação passa "parcialmente" (alguns testes passam) e orientação para ajustar maiúsculas.
- Remover placeholders quebrados de HTML (feito) e garantir que `/client/public/favicon.png` exista.

## Verificação
- Fluxo manual:
  - `pnpm dev` e abrir `http://localhost:3002/ebook/1`.
  - Testar: código com `PAR` e `ÍMPAR` maiúsculos deve passar pelo menos um teste e marcar o desafio como aprovado.
- Testes automatizados (Vitest):
  - Unit para `compareOutputs` com variações de maiúsculas/minúsculas.
  - Unit para `validate-challenge` retornando `challengePassed = true` com um teste passado.

## Entrega
- Fazer as mudanças propostas e validar em desenvolvimento.
- Documentar rapidamente no código onde ajustar tokens de comparação (comentário na função `compareOutputs`).

## Observação
- Caso queira validação por caso de teste com entradas dinâmicas, podemos evoluir o executor para invocar uma função do aluno com parâmetros, mas isso exige que o enunciado mude de "constantes fixas" para "função que recebe inputs". Posso implementar em uma fase seguinte se preferir.