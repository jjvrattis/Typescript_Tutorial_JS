import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Trophy } from "lucide-react";

interface ChallengeSuccessModalProps {
  isOpen: boolean;
  xpEarned: number;
  moduleId: number;
  onClose: () => void;
  onNext?: () => void;
}

export const ChallengeSuccessModal: React.FC<ChallengeSuccessModalProps> = ({
  isOpen,
  xpEarned,
  moduleId,
  onClose,
  onNext
}) => {
  useEffect(() => {
    if (isOpen) {
      // Reproduzir som de sucesso (opcional)
      const audio = new Audio("data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==");
      audio.play().catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-gradient-to-br from-green-900 to-green-800 border-green-500 border-2 max-w-md w-full animate-in zoom-in-50 duration-300">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Trophy className="w-16 h-16 text-yellow-400 animate-bounce" />
              <CheckCircle className="w-8 h-8 text-green-400 absolute -bottom-2 -right-2 animate-pulse" />
            </div>
          </div>
          <CardTitle className="text-white text-2xl">Parabéns! 🎉</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-green-100 text-lg mb-4">
              Você completou o desafio do Módulo {moduleId}!
            </p>

            {/* XP Earned */}
            <div className="bg-green-700/50 rounded-lg p-4 mb-4 border border-green-500">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-green-100 font-semibold">XP Ganho</span>
              </div>
              <div className="text-4xl font-bold text-yellow-300">+{xpEarned}</div>
            </div>

            {/* Motivational Message */}
            <div className="space-y-2">
              <p className="text-green-100 text-sm">
                Você está progredindo muito bem! Continue assim para desbloquear os próximos módulos.
              </p>
              <div className="flex gap-2 text-xs text-green-200">
                <span>✓ Desafio Completado</span>
                <span>✓ XP Desbloqueado</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-green-600">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-green-400 text-green-100 hover:bg-green-700"
            >
              Fechar
            </Button>
            {onNext && (
              <Button
                onClick={onNext}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
              >
                Próximo Módulo →
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
