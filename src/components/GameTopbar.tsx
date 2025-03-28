import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, RotateCcw, Wand2 } from "lucide-react";
import { useHints } from "../hooks/useHints";
import { useUndoCredits } from "../hooks/useUndoCredits";
import { useMagicWand } from "../hooks/useMagicWand";
import { AdModal } from "./AdModal";

interface GameTopbarProps {
  moves: number;
  elapsedTime: number;
  score: number;
  canUndo: boolean;
  onUndo: () => void;
  onHint: () => void;
  onMagicWand: () => void;
  extraControls?: React.ReactNode;
  hasMagicMove?: boolean; // <-- Add this line
}

export function GameTopbar({
  moves,
  elapsedTime,
  score,
  canUndo: gameCanUndo,
  onUndo,
  onHint,
  onMagicWand,
  extraControls,
}: GameTopbarProps) {
  const {
    hintsRemaining,
    showAdModal: showHintAdModal,
    canUseHint,
    useHint: runHint, // 👈 renommage ici
    closeAdModal: closeHintAdModal,
  } = useHints();

  const {
    undosRemaining,
    showAdModal: showUndoAdModal,
    canUseUndo,
    useUndo: runUndo, // 👈 renommé ici
    closeAdModal: closeUndoAdModal,
  } = useUndoCredits();

  const {
    movesRemaining: magicMovesRemaining,
    showAdModal: showMagicAdModal,
    canUseMagicMove,
    useMagicMove: runMagicMove, // ✅ renommé ici
    closeAdModal: closeMagicAdModal,
  } = useMagicWand();

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleHintClick = () => {
    if (runHint()) {
      onHint();
    }
  };

  const handleUndoClick = () => {
    if (gameCanUndo && runUndo()) {
      onUndo();
    }
  };

  const handleMagicWandClick = () => {
    if (runMagicMove()) {
      onMagicWand();
    }
  };

  const buttonClasses = `
    bg-white/10 backdrop-blur-sm rounded-lg
    w-[90px] h-[52px] px-3
    flex flex-col items-center justify-center
    transition-all
  `;

  const actionButtonClasses = `
    bg-white/10 backdrop-blur-sm rounded-lg
    w-[90px] h-[52px] px-3
    flex items-center justify-center gap-2
    transition-all hover:bg-white/20
  `;

  return (
    <>
      <div className="flex items-center justify-between gap-4 p-4">
        {/* Game Stats */}
        <div className="flex items-center gap-4">
          <div className={`${buttonClasses}`}>
            <div className="text-white/50 text-xs">MOVES</div>
            <div className="text-white font-medium tabular-nums text-sm">
              {moves}
            </div>
          </div>

          <div className={`${buttonClasses}`}>
            <div className="text-white/50 text-xs">TIME</div>
            <div className="text-white font-medium tabular-nums text-sm">
              {formatTime(elapsedTime)}
            </div>
          </div>

          <div className={`${buttonClasses}`}>
            <div className="text-white/50 text-xs">SCORE</div>
            <div className="text-white font-medium tabular-nums text-sm">
              {score}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {extraControls}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUndoClick}
            disabled={!gameCanUndo}
            className={`
              relative ${actionButtonClasses}
              ${
                gameCanUndo
                  ? "text-white"
                  : "text-white/20 cursor-not-allowed hover:bg-white/10"
              }
            `}
            title="Undo"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Undo</span>
            {(undosRemaining > 0 || !canUseUndo) && gameCanUndo && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 rounded-md flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {undosRemaining > 0 ? undosRemaining : "Ad"}
                </span>
              </div>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleHintClick}
            className={`relative ${actionButtonClasses} text-white`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Hint</span>
            {(hintsRemaining > 0 || !canUseHint) && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 rounded-md flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {hintsRemaining > 0 ? hintsRemaining : "Ad"}
                </span>
              </div>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMagicWandClick}
            className={`relative ${actionButtonClasses} text-white`}
          >
            <Wand2 className="w-4 h-4" />
            <span>Magic</span>
            {(magicMovesRemaining > 0 || !canUseMagicMove) && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 rounded-md flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {magicMovesRemaining > 0 ? magicMovesRemaining : "Ad"}
                </span>
              </div>
            )}
          </motion.button>
        </div>
      </div>

      <AdModal isOpen={showHintAdModal} onClose={closeHintAdModal} />
      <AdModal isOpen={showUndoAdModal} onClose={closeUndoAdModal} />
      <AdModal isOpen={showMagicAdModal} onClose={closeMagicAdModal} />
    </>
  );
}
