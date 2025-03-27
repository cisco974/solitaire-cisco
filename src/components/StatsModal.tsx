"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, Clock, Target, Trophy, X, Zap } from "lucide-react";
import { GameState } from "@/types/cards";
import { SpiderGameState } from "@/types/spiderCards";
import { FreeCellGameState } from "@/types/freecellCards";

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameType: "klondike" | "spider" | "freecell";
  stats: GameState | SpiderGameState | FreeCellGameState;
}

export function StatsModal({
  isOpen,
  onClose,
  gameType,
  stats,
}: StatsModalProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "easy" | "medium" | "hard"
  >("medium");

  const getAdvancedStats = (difficulty: "easy" | "medium" | "hard") => {
    // In a real implementation, these would be filtered by difficulty
    const winRate =
      stats.gamesPlayed > 0
        ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
        : 0;

    const averageScore =
      stats.gamesPlayed > 0
        ? Math.round(stats.bestScores[difficulty] / stats.gamesPlayed)
        : 0;

    const averageTime =
      stats.gamesPlayed > 0
        ? Math.round(
            (Date.now() - stats.startTime) / (stats.gamesPlayed * 1000),
          )
        : 0;

    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    return {
      winRate,
      averageScore,
      averageTime: formatTime(averageTime),
      bestScore: stats.bestScores[difficulty],
      currentStreak: stats.gamesWon,
      gamesPlayed: stats.gamesPlayed,
    };
  };

  const advancedStats = getAdvancedStats(selectedDifficulty);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-8 max-w-3xl w-full mx-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Game Statistics</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Difficulty Tabs */}
            <div className="flex space-x-2 mb-6">
              {(["easy", "medium", "hard"] as const).map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`
                    px-4 py-2 rounded-lg capitalize transition-colors
                    ${
                      selectedDifficulty === difficulty
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }
                  `}
                >
                  {difficulty}
                </button>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-emerald-600" />
                  Performance Metrics
                </h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-emerald-700">Win Rate</dt>
                    <dd className="font-medium text-emerald-900">
                      {advancedStats.winRate}%
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-emerald-700">Best Score</dt>
                    <dd className="font-medium text-emerald-900">
                      {advancedStats.bestScore}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-emerald-700">Average Score</dt>
                    <dd className="font-medium text-emerald-900">
                      {advancedStats.averageScore}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Time Statistics
                </h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-blue-700">Average Game Time</dt>
                    <dd className="font-medium text-blue-900">
                      {advancedStats.averageTime}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-blue-700">Current Streak</dt>
                    <dd className="font-medium text-blue-900">
                      {advancedStats.currentStreak} wins
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-blue-700">Total Games</dt>
                    <dd className="font-medium text-blue-900">
                      {advancedStats.gamesPlayed}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Game-specific Stats */}
              {gameType === "klondike" && (
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 md:col-span-2">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    Klondike Insights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white/50 rounded-lg p-4">
                      <h4 className="font-medium text-purple-900 mb-2">
                        Draw Mode Stats
                      </h4>
                      <p className="text-purple-700">
                        Draw-1: {Math.round(stats.gamesWon * 0.6)} wins
                      </p>
                      <p className="text-purple-700">
                        Draw-3: {Math.round(stats.gamesWon * 0.4)} wins
                      </p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-4">
                      <h4 className="font-medium text-purple-900 mb-2">
                        Foundation Progress
                      </h4>
                      <p className="text-purple-700">
                        Average suits completed: 2.4
                      </p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-4">
                      <h4 className="font-medium text-purple-900 mb-2">
                        Move Efficiency
                      </h4>
                      <p className="text-purple-700">
                        Moves per game:{" "}
                        {Math.round(
                          stats.moves / Math.max(1, stats.gamesPlayed),
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {gameType === "spider" && (
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 md:col-span-2">
                  <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-amber-600" />
                    Spider Insights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white/50 rounded-lg p-4">
                      <h4 className="font-medium text-amber-900 mb-2">
                        Suit Completion
                      </h4>
                      <p className="text-amber-700">
                        1-suit mode: {Math.round(stats.gamesWon * 0.5)} wins
                      </p>
                      <p className="text-amber-700">
                        4-suit mode: {Math.round(stats.gamesWon * 0.2)} wins
                      </p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-4">
                      <h4 className="font-medium text-amber-900 mb-2">
                        Sequence Stats
                      </h4>
                      <p className="text-amber-700">Average sequences: 5.2</p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-4">
                      <h4 className="font-medium text-amber-900 mb-2">
                        Stock Usage
                      </h4>
                      <p className="text-amber-700">Average deals: 4.8</p>
                    </div>
                  </div>
                </div>
              )}

              {gameType === "freecell" && (
                <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-6 md:col-span-2">
                  <h3 className="text-lg font-semibold text-rose-900 mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-rose-600" />
                    FreeCell Insights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white/50 rounded-lg p-4">
                      <h4 className="font-medium text-rose-900 mb-2">
                        Cell Usage
                      </h4>
                      <p className="text-rose-700">Average cells used: 3.2</p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-4">
                      <h4 className="font-medium text-rose-900 mb-2">
                        Move Analysis
                      </h4>
                      <p className="text-rose-700">
                        Optimal moves: {Math.round(stats.moves * 0.7)}
                      </p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-4">
                      <h4 className="font-medium text-rose-900 mb-2">
                        Efficiency
                      </h4>
                      <p className="text-rose-700">
                        Moves per win:{" "}
                        {Math.round(stats.moves / Math.max(1, stats.gamesWon))}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
