import { useState, useCallback } from 'react';
import { GameState, GameAction, Difficulty, Card, KlondikeMode, ValidMove, findValidMoves } from '../types/cards';

const STORAGE_KEY = 'klondike-stats';

const defaultStats = {
  bestScores: {
    easy: 0,
    medium: 0,
    hard: 0
  },
  gamesPlayed: 0,
  gamesWon: 0
};

const getInitialState = (): GameState => {
  const baseState = {
    score: 0,
    moves: 0,
    startTime: Date.now(),
    isComplete: false,
    tableauPiles: Array(7).fill([]),
    foundationPiles: Array(4).fill([]),
    stock: [],
    waste: [],
    difficulty: 'medium' as Difficulty,
    mode: 'draw-1' as KlondikeMode,
    ...defaultStats
  };

  const savedState = localStorage.getItem(STORAGE_KEY);
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      return {
        ...baseState,
        difficulty: parsed.difficulty || baseState.difficulty,
        mode: parsed.mode || baseState.mode,
        bestScores: parsed.bestScores || defaultStats.bestScores,
        gamesPlayed: parsed.gamesPlayed || 0,
        gamesWon: parsed.gamesWon || 0
      };
    } catch (e) {
      console.error('Error parsing saved state:', e);
      return baseState;
    }
  }

  return baseState;
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(getInitialState);
  const [history, setHistory] = useState<GameAction[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [highlightedMove, setHighlightedMove] = useState<ValidMove | null>(null);

  const saveState = useCallback((state: GameState) => {
    const stateToSave = {
      difficulty: state.difficulty,
      mode: state.mode,
      bestScores: state.bestScores,
      gamesPlayed: state.gamesPlayed,
      gamesWon: state.gamesWon
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, []);

  const updateState = useCallback((newState: Partial<GameState>) => {
    setGameState(prev => {
      const updated = { ...prev, ...newState };
      saveState(updated);
      return updated;
    });
  }, [saveState]);

  const addMove = useCallback((action: GameAction) => {
    setHistory(prev => [...prev.slice(0, historyIndex + 1), action]);
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex < 0) return;

    const action = history[historyIndex];
    const { from, to, cards } = action;

    setGameState(prev => {
      const newState = { ...prev };
      newState.tableauPiles = prev.tableauPiles.map(pile => [...pile]);
      newState.foundationPiles = prev.foundationPiles.map(pile => [...pile]);
      newState.waste = [...prev.waste];

      if (to.type === 'tableau') {
        newState.tableauPiles[to.index] = newState.tableauPiles[to.index].slice(0, -cards.length);
      } else if (to.type === 'foundation') {
        newState.foundationPiles[to.index] = newState.foundationPiles[to.index].slice(0, -1);
      }

      if (from.type === 'tableau') {
        if (from.cardIndex !== undefined) {
          newState.tableauPiles[from.index] = newState.tableauPiles[from.index].slice(0, from.cardIndex);
        }
        newState.tableauPiles[from.index] = [...newState.tableauPiles[from.index], ...cards];
      } else if (from.type === 'waste') {
        newState.waste = [...newState.waste, ...cards];
      }

      return {
        ...newState,
        moves: prev.moves + 1,
        score: Math.max(0, prev.score - 10)
      };
    });

    setHistoryIndex(prev => prev - 1);
  }, [history, historyIndex]);

  const showHint = useCallback(() => {
    const validMoves = findValidMoves(gameState);
    if (validMoves.length > 0) {
      // Prioritize foundation moves, then tableau moves
      const foundationMoves = validMoves.filter(move => move.to.type === 'foundation');
      const move = foundationMoves.length > 0 ? foundationMoves[0] : validMoves[0];
      setHighlightedMove(move);
      
      // Clear highlight after 2 seconds
      setTimeout(() => {
        setHighlightedMove(null);
      }, 2000);
    }
  }, [gameState]);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    updateState({ difficulty });
  }, [updateState]);

  const setMode = useCallback((mode: KlondikeMode) => {
    updateState({ mode });
  }, [updateState]);

  const updateStats = useCallback((won: boolean) => {
    setGameState(prev => {
      const newState = {
        ...prev,
        gamesPlayed: (prev.gamesPlayed || 0) + 1,
        gamesWon: (prev.gamesWon || 0) + (won ? 1 : 0)
      };

      if (won) {
        const finalScore = calculateScore(prev);
        if (finalScore > (prev.bestScores[prev.difficulty] || 0)) {
          newState.bestScores = {
            ...prev.bestScores,
            [prev.difficulty]: finalScore
          };
        }
      }

      saveState(newState);
      return newState;
    });
  }, [saveState]);

  return {
    gameState,
    updateState,
    addMove,
    undo,
    showHint,
    highlightedMove,
    setDifficulty,
    setMode,
    updateStats,
    canUndo: historyIndex >= 0
  };
}

function calculateScore(state: GameState): number {
  const timeBonus = Math.max(0, 700000 - (Date.now() - state.startTime)) / 1000;
  const difficultyMultiplier = {
    easy: 1,
    medium: 1.5,
    hard: 2
  }[state.difficulty];
  return Math.floor((state.score + timeBonus) * difficultyMultiplier);
}