'use client';

import { create } from 'zustand';
import { Difficulty, GameAction, GameState, KlondikeMode, ValidMove, findValidMoves } from '@/types/cards';

interface GameStateStore {
  gameState: GameState;
  history: GameAction[];
  historyIndex: number;
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
  difficulty: 'medium',
  mode: 'draw-1',
  bestScores: {
    easy: 0,
    medium: 0,
    hard: 0
  },
  gamesPlayed: 0,
  gamesWon: 0
};

export const useGameState = create<GameStateStore>((set, get) => ({
  gameState: defaultState,
  history: [],
  historyIndex: -1,
  updateState: (newState) => set((state) => ({
    gameState: { ...state.gameState, ...newState }
  })),
  addMove: (action) => {
    set((state) => {
      const newHistory = [...state.history.slice(0, state.historyIndex + 1), action];
      return {
        history: newHistory,
        historyIndex: state.historyIndex + 1,
        canUndo: true
      };
    });
  },
  undo: () => {
    const state = get();
    if (state.historyIndex < 0) return;

    const action = state.history[state.historyIndex];
    const { from, to, cards } = action;

    const newState = { ...state.gameState };
    newState.tableauPiles = state.gameState.tableauPiles.map(pile => [...pile]);
    newState.foundationPiles = state.gameState.foundationPiles.map(pile => [...pile]);
    newState.waste = [...state.gameState.waste];

    // Remove cards from destination
    if (to.type === 'tableau') {
      newState.tableauPiles[to.index] = newState.tableauPiles[to.index].slice(0, -cards.length);
    } else if (to.type === 'foundation') {
      newState.foundationPiles[to.index] = newState.foundationPiles[to.index].slice(0, -1);
    }

    // Add cards back to source
    if (from.type === 'tableau') {
      if (from.cardIndex !== undefined) {
        newState.tableauPiles[from.index] = newState.tableauPiles[from.index].slice(0, from.cardIndex);
      }
      newState.tableauPiles[from.index] = [...newState.tableauPiles[from.index], ...cards];
    } else if (from.type === 'waste') {
      newState.waste = [...newState.waste, ...cards];
    }

    set({
      gameState: {
        ...newState,
        moves: state.gameState.moves + 1,
        score: Math.max(0, state.gameState.score - 10)
      },
      historyIndex: state.historyIndex - 1,
      canUndo: state.historyIndex > 0
    });
  },
  showHint: () => {
    const state = get().gameState;
    const validMoves = findValidMoves(state);
    if (validMoves.length > 0) {
      const foundationMoves = validMoves.filter(move => move.to.type === 'foundation');
      const move = foundationMoves.length > 0 ? foundationMoves[0] : validMoves[0];
      set({ highlightedMove: move });
      
      setTimeout(() => {
        set({ highlightedMove: null });
      }, 2000);
    }
  },
  highlightedMove: null,
  setMode: (mode) => set((state) => ({
    gameState: { ...state.gameState, mode }
  })),
  setDifficulty: (difficulty) => set((state) => ({
    gameState: { ...state.gameState, difficulty }
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
          [state.difficulty]: won ? Math.max(state.bestScores[state.difficulty], state.score) : state.bestScores[state.difficulty]
        }
      }
    });
  },
  canUndo: false
}));