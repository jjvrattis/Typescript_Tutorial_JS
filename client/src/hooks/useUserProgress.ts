import { useState, useEffect } from "react";
import { User, UserProgress, UserStats, ModuleContent } from "@/types/gamification";

const STORAGE_KEY = "user_progress";

export const useUserProgress = () => {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Inicializar dados do usuário
  useEffect(() => {
    const loadUserData = () => {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const data = JSON.parse(storedData);
          setUser(data.user);
          setProgress(data.progress);
          calculateStats(data.user, data.progress);
        } else {
          // Criar novo usuário
          const newUser: User = {
            id: `user_${Date.now()}`,
            name: "Aprendiz",
            email: "aprendiz@fullstackacademy.com",
            totalXP: 0,
            level: 1,
            completedModules: [],
            badges: [],
            currentStreak: 0,
            lastActivityDate: new Date().toISOString(),
            createdAt: new Date().toISOString()
          };
          setUser(newUser);
          saveUserData(newUser, []);
        }
      } catch (erro) {
        console.error("Erro ao carregar dados do usuário", erro);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const saveUserData = (userData: User, progressData: UserProgress[]) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          user: userData,
          progress: progressData
        })
      );
    } catch (erro) {
      console.error("Erro ao salvar dados do usuário", erro);
    }
  };

  const calculateStats = (userData: User, progressData: UserProgress[]) => {
    const completedModules = progressData.filter(p => p.status === "completed").length;
    const totalAttempts = progressData.reduce((sum, p) => sum + p.attempts, 0);
    const totalPassed = progressData.filter(p => p.status === "completed").length;
    const successRate = totalAttempts > 0 ? (totalPassed / totalAttempts) * 100 : 0;
    const totalTimeSpent = progressData.reduce((sum, p) => sum + p.timeSpent, 0);
    const averageTimePerModule = completedModules > 0 
      ? totalTimeSpent / completedModules / 60 
      : 0;

    const newStats: UserStats = {
      totalXP: userData.totalXP,
      level: userData.level,
      completedModules,
      totalChallengesAttempted: totalAttempts,
      totalChallengesPassed: totalPassed,
      successRate: Math.round(successRate),
      currentStreak: userData.currentStreak,
      longestStreak: userData.currentStreak, // TODO: Implementar rastreamento
      totalTimeSpent: totalTimeSpent / 3600,
      averageTimePerModule: Math.round(averageTimePerModule),
      badges: userData.badges,
      rank: 1 // TODO: Implementar ranking
    };

    setStats(newStats);
  };

  const completeChallenge = (moduleId: number, xpEarned: number) => {
    if (!user) return;

    // Atualizar progresso
    const updatedProgress = progress.map(p => {
      if (p.moduleId === moduleId) {
        return {
          ...p,
          status: "completed" as const,
          completedAt: new Date().toISOString() as string,
          attempts: p.attempts + 1
        };
      }
      return p;
    });

    // Atualizar usuário
    const updatedUser = {
      ...user,
      totalXP: user.totalXP + xpEarned,
      level: Math.floor((user.totalXP + xpEarned) / 500) + 1,
      completedModules: Array.from(new Set([...user.completedModules, moduleId])),
      lastActivityDate: new Date().toISOString()
    };

    setUser(updatedUser);
    setProgress(updatedProgress);
    saveUserData(updatedUser, updatedProgress);
    calculateStats(updatedUser, updatedProgress);
  };

  const startModule = (moduleId: number) => {
    if (!user) return;

    const existingProgress = progress.find(p => p.moduleId === moduleId);
    
    if (!existingProgress) {
      const newProgress: UserProgress = {
        userId: user.id,
        moduleId,
        status: "in_progress",
        attempts: 0,
        startedAt: new Date().toISOString() as string,
        timeSpent: 0
      };

      const updatedProgress = [...progress, newProgress];
      setProgress(updatedProgress);
      saveUserData(user, updatedProgress);
    }
  };

  const getModuleProgress = (moduleId: number) => {
    return progress.find(p => p.moduleId === moduleId);
  };

  const getLevel = () => {
    return user ? user.level : 1;
  };

  const getTotalXP = () => {
    return user ? user.totalXP : 0;
  };

  const getXPForNextLevel = () => {
    const currentLevel = getLevel();
    return (currentLevel * 500) - getTotalXP();
  };

  const getProgressPercentage = () => {
    const currentLevel = getLevel();
    const xpInCurrentLevel = getTotalXP() - ((currentLevel - 1) * 500);
    return Math.min((xpInCurrentLevel / 500) * 100, 100);
  };

  return {
    user,
    progress,
    stats,
    loading,
    completeChallenge,
    startModule,
    getModuleProgress,
    getLevel,
    getTotalXP,
    getXPForNextLevel,
    getProgressPercentage,
    updateUserName: (name: string) => {
      if (user) {
        const updatedUser = { ...user, name };
        setUser(updatedUser);
        saveUserData(updatedUser, progress);
      }
    }
  };
};
