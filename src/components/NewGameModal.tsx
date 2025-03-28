"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface NewGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewGame: (mode: string, difficulty: "easy" | "medium" | "hard") => void;
  currentGame: "klondike" | "spider" | "freecell";
  initialMode: string;
}

const gameOptions = {
  klondike: {
    name: "Klondike",
    modes: [
      { id: "draw-1", name: "Draw 1 Card" },
      { id: "draw-3", name: "Draw 3 Cards" },
    ],
  },
  spider: {
    name: "Spider",
    modes: [
      { id: "1-suit", name: "1 Suit" },
      { id: "2-suits", name: "2 Suits" },
      { id: "4-suits", name: "4 Suits" },
    ],
  },
  freecell: {
    name: "FreeCell",
    modes: [],
  },
};

const difficulties = [
  { id: "easy", name: "Easy", description: "More favorable card arrangements" },
  { id: "medium", name: "Medium", description: "Standard game rules" },
  { id: "hard", name: "Hard", description: "Challenging card layouts" },
];

export function NewGameModal({
  isOpen,
  onClose,
  onNewGame,
  currentGame,
  initialMode,
}: NewGameModalProps) {
  const [selectedMode, setSelectedMode] = useState<string>(initialMode);
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "easy" | "medium" | "hard"
  >("medium");

  useEffect(() => {
    setSelectedMode(initialMode);
  }, [initialMode]);

  const handleStartGame = () => {
    const mode =
      gameOptions[currentGame].modes.length > 0 ? selectedMode : "default";
    onNewGame(mode, selectedDifficulty);
  };

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
            className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
          >
            <h2 className="text-2xl font-bold mb-6">
              New Game - {gameOptions[currentGame].name}
            </h2>

            {/* Game Mode Selection */}
            {gameOptions[currentGame].modes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-gray-700 font-medium mb-3">Game Mode</h3>
                <div className="grid grid-cols-2 gap-2">
                  {gameOptions[currentGame].modes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      className={`
                        p-2 rounded-lg border-2 transition-colors
                        ${
                          selectedMode === mode.id
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "border-gray-200 hover:border-emerald-200"
                        }
                      `}
                    >
                      {mode.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Difficulty Selection */}
            <div className="mb-6">
              <h3 className="text-gray-700 font-medium mb-3">Difficulty</h3>
              <div className="space-y-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty.id}
                    onClick={() =>
                      setSelectedDifficulty(
                        difficulty.id as "easy" | "medium" | "hard",
                      )
                    }
                    className={`
                      w-full p-3 rounded-lg border-2 transition-colors text-left
                      ${
                        selectedDifficulty === difficulty.id
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 hover:border-emerald-200"
                      }
                    `}
                  >
                    <div
                      className={`font-medium ${selectedDifficulty === difficulty.id ? "text-emerald-700" : "text-gray-900"}`}
                    >
                      {difficulty.name}
                    </div>
                    <div
                      className={`text-sm ${selectedDifficulty === difficulty.id ? "text-emerald-600" : "text-gray-500"}`}
                    >
                      {difficulty.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleStartGame}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                Start Game
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NewGameModal;
