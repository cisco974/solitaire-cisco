import React, { useState } from "react";
import { PlayCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface GameVariant {
  id: string;
  name: string;
  modes: {
    id: string;
    name: string;
  }[];
  difficulties: {
    id: "easy" | "medium" | "hard";
    name: string;
  }[];
}

const gameVariants: GameVariant[] = [
  {
    id: "klondike",
    name: "Klondike",
    modes: [
      { id: "draw-1", name: "Draw 1 Card" },
      { id: "draw-3", name: "Draw 3 Cards" },
    ],
    difficulties: [
      { id: "easy", name: "Easy" },
      { id: "medium", name: "Medium" },
      { id: "hard", name: "Hard" },
    ],
  },
  {
    id: "spider",
    name: "Spider",
    modes: [
      { id: "1-suit", name: "1 Suit" },
      { id: "2-suits", name: "2 Suits" },
      { id: "4-suits", name: "4 Suits" },
    ],
    difficulties: [
      { id: "easy", name: "Easy" },
      { id: "medium", name: "Medium" },
      { id: "hard", name: "Hard" },
    ],
  },
  {
    id: "freecell",
    name: "FreeCell",
    modes: [],
    difficulties: [
      { id: "easy", name: "Easy" },
      { id: "medium", name: "Medium" },
      { id: "hard", name: "Hard" },
    ],
  },
];

interface GameHeaderProps {
  onNewGame: (
    variant: string,
    mode: string,
    difficulty: "easy" | "medium" | "hard",
  ) => void;
}

export function GameHeader({ onNewGame }: GameHeaderProps) {
  const [showNewGameModal, setShowNewGameModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<GameVariant | null>(
    null,
  );
  const [selectedMode, setSelectedMode] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "easy" | "medium" | "hard"
  >("medium");

  const handleStartGame = () => {
    if (!selectedVariant) return;

    const mode = selectedVariant.modes.length > 0 ? selectedMode : "default";
    onNewGame(selectedVariant.id, mode, selectedDifficulty);
    setShowNewGameModal(false);
  };

  return (
    <>
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Custom card logo - Hide on very small screens */}
              <div className="hidden sm:flex space-x-1">
                <div className="w-8 h-10 bg-white rounded-md flex items-center justify-center text-red-600 shadow-lg">
                  ♥
                </div>
                <div className="w-8 h-10 bg-white rounded-md flex items-center justify-center text-red-600 shadow-lg">
                  ♦
                </div>
                <div className="w-8 h-10 bg-white rounded-md flex items-center justify-center text-gray-900 shadow-lg">
                  ♠
                </div>
                <div className="w-8 h-10 bg-white rounded-md flex items-center justify-center text-gray-900 shadow-lg">
                  ♣
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                SLTR.com
              </h1>
            </div>

            <button
              onClick={() => setShowNewGameModal(true)}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              <span>New Game</span>
            </button>
          </div>
        </div>
      </header>

      {/* New Game Modal */}
      <AnimatePresence>
        {showNewGameModal && (
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
              <h2 className="text-2xl font-bold mb-6">New Game</h2>

              {/* Game Variant Selection */}
              <div className="mb-6">
                <h3 className="text-gray-700 font-medium mb-3">Select Game</h3>
                <div className="grid grid-cols-3 gap-2">
                  {gameVariants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => {
                        setSelectedVariant(variant);
                        setSelectedMode(variant.modes[0]?.id || "");
                      }}
                      className={`
                        p-3 rounded-lg border-2 transition-colors
                        ${
                          selectedVariant?.id === variant.id
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "border-gray-200 hover:border-emerald-200"
                        }
                      `}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Game Mode Selection */}
              {selectedVariant && selectedVariant?.modes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-gray-700 font-medium mb-3">Game Mode</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedVariant.modes.map((mode) => (
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
              {selectedVariant && (
                <div className="mb-6">
                  <h3 className="text-gray-700 font-medium mb-3">Difficulty</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedVariant.difficulties.map((difficulty) => (
                      <button
                        key={difficulty.id}
                        onClick={() => setSelectedDifficulty(difficulty.id)}
                        className={`
                          p-2 rounded-lg border-2 transition-colors
                          ${
                            selectedDifficulty === difficulty.id
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                              : "border-gray-200 hover:border-emerald-200"
                          }
                        `}
                      >
                        {difficulty.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowNewGameModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartGame}
                  disabled={!selectedVariant}
                  className={`
                    px-4 py-2 rounded-lg transition-colors
                    ${
                      selectedVariant
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }
                  `}
                >
                  Start Game
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
