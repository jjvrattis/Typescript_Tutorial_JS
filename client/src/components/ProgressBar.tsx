import React from "react";

interface ProgressBarProps {
  currentXP: number;
  nextLevelXP: number;
  level: number;
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentXP,
  nextLevelXP,
  level,
  showLabel = true
}) => {
  const percentage = Math.min((currentXP / nextLevelXP) * 100, 100);

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-white">Nível {level}</span>
          <span className="text-xs text-slate-400">
            {currentXP} / {nextLevelXP} XP
          </span>
        </div>
      )}
      <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

interface XPBadgeProps {
  xp: number;
  animated?: boolean;
}

export const XPBadge: React.FC<XPBadgeProps> = ({ xp, animated = false }) => {
  return (
    <div
      className={`inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white rounded-full text-sm font-bold ${
        animated ? "animate-bounce" : ""
      }`}
    >
      <span>⭐</span>
      <span>+{xp} XP</span>
    </div>
  );
};

interface LevelBadgeProps {
  level: number;
  size?: "sm" | "md" | "lg";
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({ level, size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-lg",
    lg: "w-16 h-16 text-2xl"
  };

  return (
    <div
      className={`${sizeClasses[size]} flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold border-2 border-blue-400 shadow-lg`}
    >
      {level}
    </div>
  );
};

interface StreakIndicatorProps {
  streak: number;
  showLabel?: boolean;
}

export const StreakIndicator: React.FC<StreakIndicatorProps> = ({
  streak,
  showLabel = true
}) => {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-orange-500/20 border border-orange-500 rounded-lg">
      <span className="text-xl">🔥</span>
      <div>
        {showLabel && (
          <p className="text-xs text-slate-400">Sequência</p>
        )}
        <p className="text-lg font-bold text-orange-400">{streak}</p>
      </div>
    </div>
  );
};
