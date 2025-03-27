"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card as CardComponent } from "./Card";
import { DifficultySelector } from "./DifficultySelector";
import { GameTopbar } from "./GameTopbar";
import { FoundationPile } from "./FoundationPile";
import { Card, getCardColor, getRankValue } from "@/types/cards";
import {
  checkFreeCellWinCondition,
  FreeCellGameState,
  isValidFreeCellFoundationMove,
  isValidFreeCellMove,
} from "@/types/freecellCards";
import { Trophy } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useFreeCellGameState } from "@/hooks/useFreeCellGameState";
import { GameCustomization } from "@/types/customization";

interface FreeCellProps {
  customization: GameCustomization;
}

function createFreeCellDeck(): Card[] {
  const suits = ["♠", "♥", "♦", "♣"];
  const ranks = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  const deck: Card[] = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank, faceUp: true }); // All cards are face up in FreeCell
    }
  }

  return shuffle(deck);
}

function shuffle(array: Card[]): Card[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function FreeCell({ customization }: FreeCellProps) {
  const {
    gameState,
    updateState,
    addMove,
    undo,
    redo,
    canUndo,
    canRedo,
    updateStats,
  } = useFreeCellGameState();
  const [draggedCards, setDraggedCards] = useState<{
    cards: Card[];
    sourceType: "tableau" | "freeCell";
    sourceIndex: number;
    cardIndex: number;
  } | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { playCardMove, playCardFlip, playWin, playError } = useSoundEffects();

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (checkFreeCellWinCondition(gameState.foundationPiles)) {
      playWin();
      updateState({
        isComplete: true,
        score: calculateScore(gameState),
      });
      updateStats(true);
    }
  }, [gameState.foundationPiles, playWin, updateState, updateStats]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!gameState.isComplete) {
        setElapsedTime(Math.floor((Date.now() - gameState.startTime) / 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.startTime, gameState.isComplete]);

  function startNewGame() {
    const deck = createFreeCellDeck();
    const newTableauPiles: Card[][] = Array(8)
      .fill([])
      .map(() => []);

    // Deal cards to tableau piles
    for (let i = 0; i < 52; i++) {
      const pileIndex = i % 8;
      const card = deck.pop()!;
      newTableauPiles[pileIndex] = [...newTableauPiles[pileIndex], card];
    }

    updateState({
      tableauPiles: newTableauPiles,
      foundationPiles: Array(4).fill([]),
      freeCells: Array(4).fill(null),
      score: 0,
      moves: 0,
      startTime: Date.now(),
      isComplete: false,
    });
  }

  const isValidSequence = (cards: Card[]): boolean => {
    if (cards.length === 0) return true;
    if (cards.length === 1) return true;

    for (let i = 0; i < cards.length - 1; i++) {
      const currentCard = cards[i];
      const nextCard = cards[i + 1];

      if (getCardColor(currentCard.suit) === getCardColor(nextCard.suit))
        return false;
      if (getRankValue(currentCard.rank) !== getRankValue(nextCard.rank) + 1)
        return false;
    }

    return true;
  };

  const isCardInValidSequence = (
    pileIndex: number,
    cardIndex: number,
  ): boolean => {
    const pile = gameState.tableauPiles[pileIndex];

    // Last card in pile is always valid for moving
    if (cardIndex === pile.length - 1) return true;

    // Check if this card starts a valid sequence to the end of the pile
    const sequence = pile.slice(cardIndex);
    return isValidSequence(sequence);
  };

  const canDragCard = (pileIndex: number, cardIndex: number): boolean => {
    // Check if the card is part of a valid sequence
    if (!isCardInValidSequence(pileIndex, cardIndex)) return false;

    // Calculate maximum movable cards based on free cells and empty columns
    const emptyFreeCells = gameState.freeCells.filter(
      (cell) => cell === null,
    ).length;
    const emptyColumns = gameState.tableauPiles.filter(
      (pile) => pile.length === 0,
    ).length;
    const maxMovableCards = (emptyFreeCells + 1) * Math.pow(2, emptyColumns);

    // Check if sequence length is within movable limit
    const sequenceLength = gameState.tableauPiles[pileIndex].length - cardIndex;
    return sequenceLength <= maxMovableCards;
  };

  const handleDragStart = (
    e: React.DragEvent,
    cards: Card[],
    sourceType: "tableau" | "freeCell",
    sourceIndex: number,
    cardIndex: number,
  ) => {
    if (!e.dataTransfer) return;

    // Check if the card is draggable
    if (sourceType === "tableau" && !canDragCard(sourceIndex, cardIndex)) {
      playError();
      e.preventDefault();
      return;
    }

    setDraggedCards({
      cards,
      sourceType,
      sourceIndex,
      cardIndex,
    });
    playCardMove();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = "move";
    }
  };

  const handleDrop = (
    e: React.DragEvent,
    targetType: "tableau" | "foundation" | "freeCell",
    targetIndex: number,
  ) => {
    e.preventDefault();

    if (!draggedCards) return;

    const { cards, sourceType, sourceIndex, cardIndex } = draggedCards;

    // Handle dropping on foundation piles
    if (targetType === "foundation") {
      if (cards.length !== 1) {
        playError();
        return;
      }

      const [card] = cards;
      if (
        !isValidFreeCellFoundationMove(
          card,
          gameState.foundationPiles[targetIndex],
        )
      ) {
        playError();
        return;
      }

      const newFoundationPiles = [...gameState.foundationPiles];
      newFoundationPiles[targetIndex] = [
        ...newFoundationPiles[targetIndex],
        card,
      ];

      // Remove card from source
      if (sourceType === "tableau") {
        const newTableauPiles = [...gameState.tableauPiles];
        newTableauPiles[sourceIndex] = newTableauPiles[sourceIndex].slice(
          0,
          -1,
        );
        updateState({ tableauPiles: newTableauPiles });
      } else {
        const newFreeCells = [...gameState.freeCells];
        newFreeCells[sourceIndex] = null;
        updateState({ freeCells: newFreeCells });
      }

      updateState({
        foundationPiles: newFoundationPiles,
        score: gameState.score + 10,
        moves: gameState.moves + 1,
      });

      addMove({
        type: "move",
        from: { type: sourceType, index: sourceIndex },
        to: { type: "foundation", index: targetIndex },
        cards,
      });

      playCardMove();
    }

    // Handle dropping on tableau piles
    else if (targetType === "tableau") {
      if (
        !isValidFreeCellMove(
          cards,
          gameState.tableauPiles[targetIndex],
          gameState.freeCells,
          gameState.tableauPiles,
        )
      ) {
        playError();
        return;
      }

      const newTableauPiles = [...gameState.tableauPiles];
      newTableauPiles[targetIndex] = [
        ...newTableauPiles[targetIndex],
        ...cards,
      ];

      // Remove cards from source
      if (sourceType === "tableau") {
        newTableauPiles[sourceIndex] = newTableauPiles[sourceIndex].slice(
          0,
          cardIndex,
        );
      } else {
        const newFreeCells = [...gameState.freeCells];
        newFreeCells[sourceIndex] = null;
        updateState({ freeCells: newFreeCells });
      }

      updateState({
        tableauPiles: newTableauPiles,
        score: gameState.score + 5,
        moves: gameState.moves + 1,
      });

      addMove({
        type: "move",
        from: {
          type: sourceType,
          index: sourceIndex,
          cardIndex,
        },
        to: {
          type: "tableau",
          index: targetIndex,
        },
        cards,
      });

      playCardMove();
    }

    // Handle dropping on free cells
    else if (targetType === "freeCell") {
      if (cards.length !== 1 || gameState.freeCells[targetIndex] !== null) {
        playError();
        return;
      }

      const newFreeCells = [...gameState.freeCells];
      newFreeCells[targetIndex] = cards[0];

      // Remove card from source
      if (sourceType === "tableau") {
        const newTableauPiles = [...gameState.tableauPiles];
        newTableauPiles[sourceIndex] = newTableauPiles[sourceIndex].slice(
          0,
          -1,
        );
        updateState({
          tableauPiles: newTableauPiles,
          freeCells: newFreeCells,
          moves: gameState.moves + 1,
        });
      } else {
        newFreeCells[sourceIndex] = null;
        updateState({
          freeCells: newFreeCells,
          moves: gameState.moves + 1,
        });
      }

      addMove({
        type: "move",
        from: { type: sourceType, index: sourceIndex },
        to: { type: "freeCell", index: targetIndex },
        cards,
      });

      playCardMove();
    }

    setDraggedCards(null);
  };

  return (
    <div className="w-full h-full">
      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
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
              <h2 className="text-2xl font-bold mb-6">Game Settings</h2>
              <div className="mb-6">
                <h3 className="text-gray-700 font-medium mb-3">Difficulty</h3>
                <DifficultySelector
                  currentDifficulty={gameState.difficulty}
                  onSelect={(difficulty) => {
                    setShowSettings(false);
                    startNewGame();
                  }}
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Win Modal */}
      <AnimatePresence>
        {gameState.isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
            >
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring" }}
                className="flex items-center justify-center mb-6"
              >
                <Trophy className="w-16 h-16 text-yellow-400" />
              </motion.div>
              <h2 className="text-2xl font-bold text-center mb-4">
                Congratulations!
              </h2>
              <p className="text-gray-600 text-center mb-6">
                You've won with a score of {gameState.score}!
              </p>
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startNewGame}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                >
                  Play Again
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Topbar */}
      <GameTopbar
        moves={gameState.moves}
        elapsedTime={elapsedTime}
        score={gameState.score}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
      />

      <div className="p-4">
        {/* Top section with free cells and foundations */}
        <div className="grid grid-cols-8 gap-2 mb-8">
          {/* Free Cells */}
          {gameState.freeCells.map((card, index) => (
            <div key={`freeCell-${index}`} className="col-span-1">
              <FoundationPile
                pile={card ? [card] : []}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "freeCell", index)}
                isLight={true}
              />
            </div>
          ))}

          {/* Foundation piles */}
          {gameState.foundationPiles.map((pile, index) => (
            <div key={`foundation-${index}`} className="col-span-1">
              <FoundationPile
                pile={pile}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "foundation", index)}
              />
            </div>
          ))}
        </div>

        {/* Tableau piles */}
        <div className="grid grid-cols-8 gap-2">
          {gameState.tableauPiles.map((pile, pileIndex) => (
            <div
              key={`tableau-${pileIndex}`}
              className={`
                col-span-1 flex flex-col min-h-[8rem]
                ${pile.length === 0 ? "border-2 border-dashed border-emerald-400/10 rounded-lg w-20" : ""}
              `}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "tableau", pileIndex)}
            >
              {pile.map((card, cardIndex) => {
                const prevCard = cardIndex > 0 ? pile[cardIndex - 1] : null;
                let marginTop = "0";

                if (cardIndex > 0) {
                  if (!prevCard?.faceUp && !card.faceUp) {
                    marginTop = "-7rem"; // Closed to closed
                  } else if (!prevCard?.faceUp && card.faceUp) {
                    marginTop = "-7rem"; // Closed to open
                  } else if (prevCard?.faceUp && card.faceUp) {
                    marginTop = "-5.5rem"; // Open to open (reduced from -4rem)
                  }
                }

                return (
                  <div
                    key={`card-${pileIndex}-${cardIndex}`}
                    style={{
                      marginTop,
                      position: "relative",
                      zIndex: cardIndex,
                      opacity:
                        draggedCards?.sourceIndex === pileIndex &&
                        cardIndex >= draggedCards.cardIndex
                          ? 0.3
                          : 1,
                    }}
                  >
                    <CardComponent
                      card={card}
                      draggable={canDragCard(pileIndex, cardIndex)}
                      isDragging={
                        draggedCards?.sourceIndex === pileIndex &&
                        cardIndex >= draggedCards.cardIndex
                      }
                      onDragStart={(e) =>
                        handleDragStart(
                          e,
                          pile.slice(cardIndex),
                          "tableau",
                          pileIndex,
                          cardIndex,
                        )
                      }
                      style={customization.cardStyle}
                      cardBack={customization.cardBack}
                      isGrayed={!isCardInValidSequence(pileIndex, cardIndex)}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
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
