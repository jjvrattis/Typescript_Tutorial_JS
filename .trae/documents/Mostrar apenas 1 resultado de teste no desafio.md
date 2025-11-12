## Entendimento
- Hoje o executor compara o único `output` do aluno com todos os `expectedOutput` dos `testCases` do desafio, retornando 3 resultados no Módulo 1.
- Para desafios com um único cenário, o comportamento desejado é: aprovar se pelo menos um caso esperado confere e exibir apenas UM resultado (o que representa essa avaliação).

## Mudanças propostas (mínimas e seguras)
- Backend `validate-challenge` (server/src/routes/codeRoutes.ts):
  1) Definir aprovação como "pelo menos um passou": `challengePassed = result.testResults.some(t => t.passed)`.
  2) Reduzir os resultados enviados ao cliente para UM item:
     - Se existir algum `passed`, retornar somente o primeiro `passed`.
     - Caso contrário, retornar somente o primeiro `failed`.
  3) Calcular `xpEarned = challengePassed ? 100 : 0`.
- Frontend: manter o componente como está; ele já renderiza com base em `result.testResults`. Como o backend passará apenas um item, o UI exibirá um único cartão.

## Verificação
- Executar em dev, enviar uma solução que gere `CHAVE_5-10-7_PAR_22`. Esperado: retornar apenas 1 resultado (passado), `challengePassed = true`, `xpEarned = 100`.
- Testar com solução que não bate nenhuma expectativa: retornar apenas 1 resultado (falho), `challengePassed = false`, `xpEarned = 0`.

## Observações
- Essa mudança não altera o executor base; é um ajuste de resposta na rota do desafio para melhorar UX.
- Se preferir, posso também simplificar os `testCases` do Módulo 1 para conter apenas um caso, mas com a redução no backend isso não é necessário.