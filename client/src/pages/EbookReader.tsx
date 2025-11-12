import React, { useState, useMemo, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Streamdown } from "streamdown";
import { getModuleById, getAllModules, isModuleUnlocked } from "@/data/ebookModules";
import { getChallengeByModuleId } from "@/data/challenges";
import { useUserProgress } from "@/hooks/useUserProgress";
import { ChallengeEditorIntegrated } from "@/components/ChallengeEditorIntegrated";
import { ChallengeSuccessModal } from "@/components/ChallengeSuccessModal";
import { ChevronLeft, ChevronRight, BookOpen, Lock, CheckCircle, Zap } from "lucide-react";

export default function EbookReader() {
  const [, params] = useRoute("/ebook/:moduleId");
  const moduleId = parseInt(params?.moduleId || "1", 10);
  
  const module = getModuleById(moduleId);
  const allModules = getAllModules();
  const { user, stats, completeChallenge, startModule } = useUserProgress();
  const completedModules = user?.completedModules || [];
  
  const [showChallenge, setShowChallenge] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const challenge = getChallengeByModuleId(moduleId);

  useEffect(() => {
    startModule(moduleId);
  }, [moduleId]);

  const handleChallengeComplete = (xp: number) => {
    setXpEarned(xp);
    setShowSuccessModal(true);
    completeChallenge(moduleId, xp);
  };

  const handleNextModule = () => {
    setShowSuccessModal(false);
    if (nextModule) {
      window.location.href = `/ebook/${nextModule.id}`;
    }
  };

  // Verificar se módulo está desbloqueado
  const isUnlocked = useMemo(() => {
    return isModuleUnlocked(moduleId, completedModules);
  }, [moduleId, completedModules]);

  // Encontrar módulo anterior e próximo
  const previousModule = allModules.find(m => m.id === moduleId - 1);
  const nextModule = allModules.find(m => m.id === moduleId + 1);

  // Verificar se módulo foi completado
  const isCompleted = completedModules.includes(moduleId);

  if (!module) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Card className="bg-slate-800 border-slate-700 max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-slate-300 mb-4">Módulo não encontrado</p>
            <a href="/ebook">
              <Button className="bg-blue-500 hover:bg-blue-600">
                Voltar ao Ebook
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="bg-slate-800 border-slate-700 max-w-md">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-yellow-400" />
              Módulo Bloqueado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-300">
              Este módulo está bloqueado. Complete os módulos anteriores para desbloqueá-lo.
            </p>
            <div className="space-y-2">
              {module.prerequisites.map(prereqId => {
                const prereqModule = getModuleById(prereqId);
                const isPrereqCompleted = completedModules.includes(prereqId);
                return (
                  <div key={prereqId} className="flex items-center gap-2 text-sm">
                    {isPrereqCompleted ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-red-400" />
                    )}
                    <span className={isPrereqCompleted ? "text-green-400" : "text-slate-400"}>
                      {prereqModule?.title}
                    </span>
                  </div>
                );
              })}
            </div>
            <a href="/ebook">
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                Voltar ao Ebook
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-blue-400" />
            <div>
              <h1 className="text-white font-bold">Módulo {moduleId}</h1>
              <p className="text-sm text-slate-400">{module.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isCompleted && (
              <div className="flex items-center gap-1 px-3 py-1 bg-green-500/10 border border-green-500 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">Completado</span>
              </div>
            )}
            <div className="flex items-center gap-1 px-3 py-1 bg-blue-500/10 border border-blue-500 rounded-lg">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400">{module.xpReward} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Índice */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800 border-slate-700 sticky top-24">
              <CardHeader>
                <CardTitle className="text-white text-sm">Módulos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {allModules.map(m => {
                  const isCurrentModule = m.id === moduleId;
                  const isModuleCompleted = completedModules.includes(m.id);
                  const isModuleUnlockedStatus = isModuleUnlocked(m.id, completedModules);

                  return (
                    <a
                      key={m.id}
                      href={`/ebook/${m.id}`}
                      className={`block p-3 rounded-lg transition-all ${
                        isCurrentModule
                          ? "bg-blue-500 text-white"
                          : isModuleUnlockedStatus
                          ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                          : "bg-slate-900 text-slate-500 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Módulo {m.id}</span>
                        {isModuleCompleted && (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                        {!isModuleUnlockedStatus && (
                          <Lock className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                      <p className="text-xs mt-1 opacity-75">{m.title}</p>
                    </a>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-3 space-y-6">
            {/* Card de Conteúdo */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 text-white">
                <div className="prose prose-invert max-w-none">
                  <Streamdown>{module.content}</Streamdown>
                </div>
              </CardContent>
            </Card>

            {/* Informações do Módulo */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6">
                  <p className="text-slate-400 text-sm">Tempo Estimado</p>
                  <p className="text-white text-lg font-bold">{module.estimatedTime} min</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6">
                  <p className="text-slate-400 text-sm">Dificuldade</p>
                  <p className={`text-lg font-bold capitalize ${
                    module.difficulty === "easy" ? "text-green-400" :
                    module.difficulty === "medium" ? "text-yellow-400" :
                    "text-red-400"
                  }`}>
                    {module.difficulty}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6">
                  <p className="text-slate-400 text-sm">Recompensa</p>
                  <p className="text-blue-400 text-lg font-bold flex items-center gap-1">
                    <Zap className="w-5 h-5" />
                    {module.xpReward} XP
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Botões de Navegação */}
            <div className="flex gap-4 justify-between">
              {previousModule ? (
                <Link href={`/ebook/${previousModule.id}`}>
                  <Button variant="outline" className="flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </Button>
                </Link>
              ) : (
                <div />
              )}

              <div className="flex gap-2">
                <Button
                  onClick={() => setShowChallenge(!showChallenge)}
                  className="bg-purple-500 hover:bg-purple-600 flex items-center gap-2"
                >
                  {showChallenge ? "Fechar Desafio" : "Ver Desafio"}
                </Button>

                {nextModule && (
                  <Link href={`/ebook/${nextModule.id}`}>
                    <Button className="bg-blue-500 hover:bg-blue-600 flex items-center gap-2">
                      Próximo
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Desafio */}
            {showChallenge && challenge && (
              <div className="space-y-4">
                <ChallengeEditorIntegrated
                  challenge={challenge}
                  onComplete={handleChallengeComplete}
                />
              </div>
            )}

            {/* Modal de Sucesso */}
            <ChallengeSuccessModal
              isOpen={showSuccessModal}
              xpEarned={xpEarned}
              moduleId={moduleId}
              onClose={() => setShowSuccessModal(false)}
              onNext={nextModule ? handleNextModule : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
