/**
 * Tipos para o sistema de gamificação da plataforma
 */

export interface User {
  id: string;
  name: string;
  email: string;
  totalXP: number;
  level: number;
  completedModules: number[];
  badges: Badge[];
  currentStreak: number;
  lastActivityDate: string;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
}

export interface ModuleContent {
  id: number;
  title: string;
  description: string;
  content: string; // Markdown content
  sections: Section[];
  challenge: Challenge;
  xpReward: number;
  estimatedTime: number; // em minutos
  prerequisites: number[]; // IDs dos módulos que devem ser completados antes
  unlocked: boolean;
}

export interface Section {
  id: string;
  title: string;
  content: string; // Markdown
  codeExamples: CodeExample[];
}

export interface CodeExample {
  id: string;
  title: string;
  description: string;
  code: string;
  language: "javascript" | "typescript";
  output?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  initialCode: string;
  testCases: TestCase[];
  hints: string[];
  solution: string;
  xpReward: number;
  timeLimit: number; // em segundos
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  description: string;
}

export interface ChallengeSubmission {
  id: string;
  userId: string;
  moduleId: number;
  code: string;
  submittedAt: string;
  passed: boolean;
  testResults: TestResult[];
  executionTime: number; // em ms
  xpEarned: number;
}

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  expected: string;
  actual: string;
  error?: string;
}

export interface UserProgress {
  userId: string;
  moduleId: number;
  status: "locked" | "in_progress" | "completed";
  attempts: number;
  bestSubmission?: ChallengeSubmission;
  startedAt: string;
  completedAt?: string;
  timeSpent: number; // em segundos
}

export interface Leaderboard {
  userId: string;
  userName: string;
  totalXP: number;
  level: number;
  completedModules: number;
  rank: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  condition: string; // Descrição da condição para ganhar
  icon: string;
  xpBonus: number;
}

export interface DailyChallenge {
  id: string;
  date: string;
  moduleId: number;
  challenge: Challenge;
  xpMultiplier: number; // Bonus XP para desafios diários
  completed: boolean;
}

export interface UserStats {
  totalXP: number;
  level: number;
  completedModules: number;
  totalChallengesAttempted: number;
  totalChallengesPassed: number;
  successRate: number; // percentual
  currentStreak: number;
  longestStreak: number;
  totalTimeSpent: number; // em horas
  averageTimePerModule: number; // em minutos
  badges: Badge[];
  rank: number;
}

export interface CodeExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number; // em ms
  testResults: TestResult[];
}
