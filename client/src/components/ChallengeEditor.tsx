import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Challenge, TestResult } from "@/types/gamification";
import { XPBadge } from "./ProgressBar";
import { Play, RotateCcw, Lightbulb } from "lucide-react";

interface ChallengeEditorProps {
  challenge: Challenge;
  onSubmit: (code: string) => Promise<TestResult[]>;
  onComplete: (xpEarned: number) => void;
  loading?: boolean;
}

export const ChallengeEditor: React.FC<ChallengeEditorProps> = ({
  challenge,
  onSubmit,
  onComplete,
  loading = false
}) => {
  const [code, setCode] = useState(challenge.initialCode);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [executing, setExecuting] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  const handleExecute = async () => {
    setExecuting(true);
    try {
      const results = await onSubmit(code);
      setTestResults(results);

      // Verificar se todos os testes passaram
      const allPassed = results.every(r => r.passed);
      if (allPassed) {
        onComplete(challenge.xpReward);
      }
    } catch (erro) {
      console.error("Erro ao executar código", erro);
    } finally {
      setExecuting(false);
    }
  };

  const handleReset = () => {
    setCode(challenge.initialCode);
    setTestResults([]);
    setShowHint(false);
    setHintIndex(0);
  };

  const allTestsPassed = testResults.length > 0 && testResults.every(r => r.passed);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Editor */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Editor de Código</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-96 p-4 bg-slate-900 text-white font-mono text-sm border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Escreva seu código aqui..."
          />

          <div className="flex gap-2 mt-4">
            <Button
              onClick={handleExecute}
              disabled={executing || loading}
              className="flex-1 bg-blue-500 hover:bg-blue-600"
            >
              <Play className="w-4 h-4 mr-2" />
              {executing ? "Executando..." : "Executar"}
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-1"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Resetar
            </Button>
          </div>

          {/* Hints */}
          {challenge.hints.length > 0 && (
            <div className="mt-4">
              <Button
                onClick={() => {
                  setShowHint(!showHint);
                  if (!showHint && hintIndex < challenge.hints.length) {
                    setHintIndex(hintIndex + 1);
                  }
                }}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                {showHint ? "Esconder Dica" : "Mostrar Dica"}
              </Button>

              {showHint && hintIndex > 0 && (
                <div className="mt-2 p-3 bg-yellow-500/10 border border-yellow-500 rounded-lg">
                  <p className="text-sm text-yellow-400">
                    💡 {challenge.hints[hintIndex - 1]}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="space-y-4">
        {/* Descrição do Desafio */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-white">{challenge.title}</CardTitle>
                <p className="text-sm text-slate-400 mt-2">
                  Dificuldade: {challenge.difficulty}
                </p>
              </div>
              <XPBadge xp={challenge.xpReward} />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 text-sm">{challenge.description}</p>
          </CardContent>
        </Card>

        {/* Testes */}
        {testResults.length > 0 && (
          <Card className={`border-2 ${allTestsPassed ? "border-green-500 bg-green-500/5" : "border-slate-700 bg-slate-800"}`}>
            <CardHeader>
              <CardTitle className={`text-sm ${allTestsPassed ? "text-green-400" : "text-white"}`}>
                {allTestsPassed ? "✅ Todos os testes passaram!" : "❌ Alguns testes falharam"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {testResults.map((result, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border ${
                    result.passed
                      ? "bg-green-500/10 border-green-500"
                      : "bg-red-500/10 border-red-500"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={result.passed ? "text-green-400" : "text-red-400"}>
                      {result.passed ? "✓" : "✗"}
                    </span>
                    <span className="text-sm font-mono text-white">
                      Teste {idx + 1}
                    </span>
                  </div>

                  {!result.passed && (
                    <div className="text-xs space-y-1 text-slate-300">
                      <p>
                        <span className="text-slate-400">Esperado:</span> {result.expected}
                      </p>
                      <p>
                        <span className="text-slate-400">Obtido:</span> {result.actual}
                      </p>
                      {result.error && (
                        <p className="text-red-400">
                          <span className="text-slate-400">Erro:</span> {result.error}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Exemplos de Entrada/Saída */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-sm text-white">Exemplos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-xs">
              {challenge.testCases.slice(0, 2).map((test, idx) => (
                <div key={idx} className="p-2 bg-slate-900 rounded">
                  <p className="text-slate-400">{test.description}</p>
                  <p className="text-slate-300 mt-1">
                    <span className="text-blue-400">Entrada:</span> {test.input}
                  </p>
                  <p className="text-slate-300">
                    <span className="text-green-400">Saída:</span> {test.expectedOutput}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
