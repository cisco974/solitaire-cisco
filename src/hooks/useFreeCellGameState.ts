"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FreeCellDifficulty,
  FreeCellGameAction,
  FreeCellGameState,
} from "@/types/freecellCards";

const STORAGE_KEY = "freecell-stats";

const defaultStats = {
  bestScores: {
    easy: 0,
    medium: 0,
    hard: 0,
  },
  gamesPlayed: 0,
  gamesWon: 0,
};

// État par défaut sans localStorage
const defaultState: FreeCellGameState = {
  score: 0,
  moves: 0,
  startTime: Date.now(),
  isComplete: false,
  tableauPiles: Array(8).fill([]),
  foundationPiles: Array(4).fill([]),
  freeCells: Array(4).fill(null),
  difficulty: "medium" as FreeCellDifficulty,
  ...defaultStats,
};

export function useFreeCellGameState() {
  // Initialiser avec l'état par défaut
  const [gameState, setGameState] = useState<FreeCellGameState>(defaultState);
  const [history, setHistory] = useState<FreeCellGameAction[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isInitialized, setIsInitialized] = useState(false);

  // Charger les données depuis localStorage uniquement côté client
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        setGameState((prevState) => ({
          ...prevState,
          difficulty: parsed.difficulty || prevState.difficulty,
          bestScores: parsed.bestScores || defaultStats.bestScores,
          gamesPlayed: parsed.gamesPlayed || 0,
          gamesWon: parsed.gamesWon || 0,
        }));
      }
    } catch (e) {
      console.error("Error loading state from localStorage:", e);
    }
    setIsInitialized(true);
  }, []);

  const saveState = useCallback((state: FreeCellGameState) => {
    try {
      const stateToSave = {
        difficulty: state.difficulty,
        bestScores: state.bestScores,
        gamesPlayed: state.gamesPlayed,
        gamesWon: state.gamesWon,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Error saving to localStorage:", e);
    }
  }, []);

  const updateState = useCallback(
    (newState: Partial<FreeCellGameState>) => {
      setGameState((prev) => {
        const updated = { ...prev, ...newState };
        saveState(updated);
        return updated;
      });
    },
    [saveState],
  );

  const addMove = useCallback(
    (action: FreeCellGameAction) => {
      setHistory((prev) => [...prev.slice(0, historyIndex + 1), action]);
      setHistoryIndex((prev) => prev + 1);
    },
    [historyIndex],
  );

  const undo = useCallback(() => {
    if (historyIndex < 0) return;

    const action = history[historyIndex];
    const { from, to, cards } = action;

    setGameState((prev) => {
      const newState = { ...prev };
      newState.tableauPiles = prev.tableauPiles.map((pile) => [...pile]);
      newState.foundationPiles = prev.foundationPiles.map((pile) => [...pile]);
      newState.freeCells = [...prev.freeCells];

      if (to.type === "tableau") {
        newState.tableauPiles[to.index] = newState.tableauPiles[to.index].slice(
          0,
          -cards.length,
        );
      } else if (to.type === "foundation") {
        newState.foundationPiles[to.index] = newState.foundationPiles[
          to.index
        ].slice(0, -1);
      } else if (to.type === "freeCell") {
        newState.freeCells[to.index] = null;
      }

      if (from.type === "tableau") {
        if (from.cardIndex !== undefined) {
          newState.tableauPiles[from.index] = newState.tableauPiles[
            from.index
          ].slice(0, from.cardIndex);
        }
        newState.tableauPiles[from.index] = [
          ...newState.tableauPiles[from.index],
          ...cards,
        ];
      } else if (from.type === "freeCell") {
        newState.freeCells[from.index] = cards[0];
      }

      return {
        ...newState,
        moves: prev.moves + 1,
        score: Math.max(0, prev.score - 10),
      };
    });

    setHistoryIndex((prev) => prev - 1);
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex >= history.length - 1) return;

    const action = history[historyIndex + 1];
    const { from, to, cards } = action;

    setGameState((prev) => {
      const newState = { ...prev };
      newState.tableauPiles = prev.tableauPiles.map((pile) => [...pile]);
      newState.foundationPiles = prev.foundationPiles.map((pile) => [...pile]);
      newState.freeCells = [...prev.freeCells];

      if (from.type === "tableau") {
        if (from.cardIndex !== undefined) {
          newState.tableauPiles[from.index] = newState.tableauPiles[
            from.index
          ].slice(0, from.cardIndex);
        } else {
          newState.tableauPiles[from.index] = newState.tableauPiles[
            from.index
          ].slice(0, -cards.length);
        }
      } else if (from.type === "freeCell") {
        newState.freeCells[from.index] = null;
      }

      if (to.type === "tableau") {
        newState.tableauPiles[to.index] = [
          ...newState.tableauPiles[to.index],
          ...cards,
        ];
      } else if (to.type === "foundation") {
        newState.foundationPiles[to.index] = [
          ...newState.foundationPiles[to.index],
          ...cards,
        ];
      } else if (to.type === "freeCell") {
        newState.freeCells[to.index] = cards[0];
      }

      return {
        ...newState,
        moves: prev.moves + 1,
        score: prev.score + 10,
      };
    });

    setHistoryIndex((prev) => prev + 1);
  }, [history, historyIndex]);

  const setDifficulty = useCallback(
    (difficulty: FreeCellDifficulty) => {
      updateState({ difficulty });
    },
    [updateState],
  );

  const updateStats = useCallback(
    (won: boolean) => {
      setGameState((prev) => {
        const newState = {
          ...prev,
          gamesPlayed: (prev.gamesPlayed || 0) + 1,
          gamesWon: (prev.gamesWon || 0) + (won ? 1 : 0),
        };

        if (won) {
          const finalScore = calculateScore(prev);
          if (finalScore > (prev.bestScores[prev.difficulty] || 0)) {
            newState.bestScores = {
              ...prev.bestScores,
              [prev.difficulty]: finalScore,
            };
          }
        }

        saveState(newState);
        return newState;
      });
    },
    [saveState],
  );

  return {
    gameState,
    updateState,
    addMove,
    undo,
    redo,
    setDifficulty,
    updateStats,
    canUndo: historyIndex >= 0,
    canRedo: historyIndex < history.length - 1,
    isInitialized,
  };
}

function calculateScore(state: FreeCellGameState): number {
  const timeBonus = Math.max(0, 500000 - (Date.now() - state.startTime)) / 1000;
  const difficultyMultiplier = {
    easy: 1,
    medium: 1.5,
    hard: 2,
  }[state.difficulty];

  return Math.floor((state.score + timeBonus) * difficultyMultiplier);
}
