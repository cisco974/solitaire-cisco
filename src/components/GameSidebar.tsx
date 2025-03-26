import React from 'react';
import { Medal, Hash, Timer, Star, Undo2, Redo2 } from 'lucide-react';

interface GameSidebarProps {
  difficulty: string;
  moves: number;
  elapsedTime: number;
  score: number;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  extraControls?: React.ReactNode;
}

export function GameSidebar({
  difficulty,
  moves,
  elapsedTime,
  score,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  extraControls
}: GameSidebarProps) {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-20 flex flex-col gap-2 p-2 bg-black/20 backdrop-blur-sm rounded-lg">
      {/* Difficulty Level */}
      <div className="text-center mb-1">
        <div className="flex items-center justify-center mb-1">
          <Medal className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-emerald-100 font-bold uppercase text-xs">
          {difficulty}
        </div>
      </div>

      <div className="border-t border-white/10 pt-2">
        {/* Moves Counter */}
        <div className="text-center mb-3">
          <div className="flex items-center justify-center mb-1">
            <Hash className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-emerald-100 text-xs font-medium">MOVES</div>
          <div className="text-emerald-100 font-bold text-sm">{moves}</div>
        </div>

        {/* Timer */}
        <div className="text-center mb-3">
          <div className="flex items-center justify-center mb-1">
            <Timer className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-emerald-100 text-xs font-medium">TIME</div>
          <div className="text-emerald-100 font-bold text-sm">{formatTime(elapsedTime)}</div>
        </div>

        {/* Score */}
        <div className="text-center mb-3">
          <div className="flex items-center justify-center mb-1">
            <Star className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-emerald-100 text-xs font-medium">SCORE</div>
          <div className="text-emerald-100 font-bold text-sm">{score}</div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-2">
        {/* Extra Controls (e.g., Auto Complete for Klondike) */}
        {extraControls}

        {/* Game Controls */}
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`w-full p-2 rounded-lg flex items-center justify-center transition-colors mb-2 ${
            canUndo 
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
              : 'bg-black/20 text-emerald-500/50 cursor-not-allowed'
          }`}
          title="Undo"
        >
          <Undo2 className="w-4 h-4" />
        </button>

        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`w-full p-2 rounded-lg flex items-center justify-center transition-colors ${
            canRedo 
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
              : 'bg-black/20 text-emerald-500/50 cursor-not-allowed'
          }`}
          title="Redo"
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}