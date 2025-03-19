import React from 'react';
import { Difficulty } from '../types/cards';

interface DifficultySelectorProps {
  currentDifficulty: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
}

export function DifficultySelector({ currentDifficulty, onSelect }: DifficultySelectorProps) {
  return (
    <div className="flex gap-2">
      {(['easy', 'medium', 'hard'] as Difficulty[]).map((difficulty) => (
        <button
          key={difficulty}
          onClick={() => onSelect(difficulty)}
          className={`px-4 py-2 rounded-lg transition-colors capitalize ${
            currentDifficulty === difficulty
              ? 'bg-emerald-600 text-white'
              : 'bg-emerald-800/30 text-emerald-400 hover:bg-emerald-700/30'
          }`}
        >
          {difficulty}
        </button>
      ))}
    </div>
  );
}