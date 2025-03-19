"use client";

import { create } from "zustand";
import {
  Difficulty,
  GameAction,
  GameState,
  KlondikeMode,
  ValidMove,
} from "@/types/cards";

interface GameStateStore {
  gameState: GameState;
  updateState: (newState: Partial<GameState>) => void;
  addMove: (action: GameAction) => void;
  undo: () => void;
  showHint: () => void;
  highlightedMove: ValidMove | null;
  setMode: (mode: KlondikeMode) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  updateStats: (won: boolean) => void;
  canUndo: boolean;
}

const defaultState: GameState = {
  score: 0,
  moves: 0,
  startTime: Date.now(),
  isComplete: false,
  tableauPiles: Array(7).fill([]),
  foundationPiles: Array(4).fill([]),
  stock: [],
  waste: [],
  difficulty: "medium",
  mode: "draw-1",
  bestScores: {
    easy: 0,
    medium: 0,
    hard: 0,
  },
  gamesPlayed: 0,
  gamesWon: 0,
};

export const useGameState = create<GameStateStore>((set, get) => ({
  gameState: defaultState,
  updateState: (newState) =>
    set((state) => ({
      gameState: { ...state.gameState, ...newState },
    })),
  addMove: (action) => {
    // Add move implementation
  },
  undo: () => {
    // Undo implementation
  },
  showHint: () => {
    // Show hint implementation
  },
  highlightedMove: null,
  setMode: (mode) =>
    set((state) => ({
      gameState: { ...state.gameState, mode },
    })),
  setDifficulty: (difficulty) =>
    set((state) => ({
      gameState: { ...state.gameState, difficulty },
    })),
  updateStats: (won) => {
    const state = get().gameState;
    set({
      gameState: {
        ...state,
        gamesPlayed: state.gamesPlayed + 1,
        gamesWon: state.gamesWon + (won ? 1 : 0),
        bestScores: {
          ...state.bestScores,
          [state.difficulty]: won
            ? Math.max(state.bestScores[state.difficulty], state.score)
            : state.bestScores[state.difficulty],
        },
      },
    });
  },
  canUndo: false,
}));
