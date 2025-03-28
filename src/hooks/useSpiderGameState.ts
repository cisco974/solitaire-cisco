import { useCallback, useState } from "react";
import {
  SpiderGameAction,
  SpiderGameState,
  SpiderMode,
} from "@/types/spiderCards";
import { Difficulty } from "@/types/global";

const STORAGE_KEY = "spider-stats";
const defaultStats = {
  bestScores: {
    easy: 0,
    medium: 0,
    hard: 0,
  },
  gamesPlayed: 0,
  gamesWon: 0,
};

const getInitialState = (): SpiderGameState => {
  const baseState = {
    score: 0,
    moves: 0,
    startTime: Date.now(),
    isComplete: false,
    tableauPiles: Array(10).fill([]),
    foundationPiles: [],
    stock: [],
    difficulty: "medium" as Difficulty,
    mode: "1-suit" as SpiderMode,
    ...defaultStats,
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
        gamesWon: parsed.gamesWon || 0,
      };
    } catch (e) {
      console.error("Error parsing saved state:", e);
      return baseState;
    }
  }

  return baseState;
};

export function useSpiderGameState() {
  const [gameState, setGameState] = useState<SpiderGameState>(getInitialState);
  const [history, setHistory] = useState<SpiderGameAction[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const saveState = useCallback((state: SpiderGameState) => {
    const stateToSave = {
      difficulty: state.difficulty,
      mode: state.mode,
      bestScores: state.bestScores,
      gamesPlayed: state.gamesPlayed,
      gamesWon: state.gamesWon,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, []);

  const updateState = useCallback(
    (newState: Partial<SpiderGameState>) => {
      setGameState((prev) => {
        const updated = { ...prev, ...newState };
        saveState(updated);
        return updated;
      });
    },
    [saveState],
  );

  const addMove = useCallback(
    (action: SpiderGameAction) => {
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
      newState.foundationPiles = [...prev.foundationPiles];

      if (to.type === "tableau") {
        newState.tableauPiles[to.index] = newState.tableauPiles[to.index].slice(
          0,
          -cards.length,
        );
      } else if (to.type === "foundation") {
        newState.foundationPiles = newState.foundationPiles.slice(0, -1);
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
      newState.foundationPiles = [...prev.foundationPiles];

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
      }

      if (to.type === "tableau") {
        newState.tableauPiles[to.index] = [
          ...newState.tableauPiles[to.index],
          ...cards,
        ];
      } else if (to.type === "foundation") {
        newState.foundationPiles = [...prev.foundationPiles, cards];
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
    (difficulty: Difficulty) => {
      updateState({ difficulty });
    },
    [updateState],
  );

  const setMode = useCallback(
    (mode: SpiderMode) => {
      updateState({ mode });
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
    setMode,
    updateStats,
    canUndo: historyIndex >= 0,
    canRedo: historyIndex < history.length - 1,
  };
}

function calculateScore(state: SpiderGameState): number {
  const timeBonus =
    Math.max(0, 1000000 - (Date.now() - state.startTime)) / 1000;
  const difficultyMultiplier = {
    easy: 1,
    medium: 1.5,
    hard: 2,
  }[state.difficulty];

  return Math.floor((state.score + timeBonus) * difficultyMultiplier);
}
