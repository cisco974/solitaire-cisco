'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card as CardComponent } from './Card';
import { DifficultySelector } from './DifficultySelector';
import { GameTopbar } from './GameTopbar';
import { FoundationPile } from './FoundationPile';
import { Card, isPartOfDescendingSequence } from '@/types/cards';
import { SpiderGameState, SpiderDifficulty, isValidSpiderTableauMove, isValidSpiderFoundationMove, checkSpiderWinCondition } from '@/types/spiderCards';
import { Trophy } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useSpiderGameState } from '@/hooks/useSpiderGameState';
import { GameCustomization } from '@/types/customization';

interface SpiderSolitaireProps {
  mode?: 'draw-1' | 'draw-3';
  customization: GameCustomization;
}

function shuffle(array: Card[]): Card[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function SpiderSolitaire({ mode = '1-suit', customization }: SpiderSolitaireProps) {
  const { 
    gameState, 
    updateState, 
    addMove, 
    undo, 
    redo, 
    canUndo, 
    canRedo,
    setDifficulty,
    updateStats
  } = useSpiderGameState();
  const [draggedCards, setDraggedCards] = useState<{
    cards: Card[];
    sourceIndex: number;
    cardIndex: number;
  } | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isDealing, setIsDealing] = useState(false);
  const { playCardMove, playCardFlip, playWin, playError } = useSoundEffects();

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (checkSpiderWinCondition(gameState.foundationPiles)) {
      playWin();
      updateState({
        isComplete: true,
        score: calculateScore(gameState)
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

  function createSpiderDeck(): Card[] {
    const suits = 
      mode === '1-suit' ? ['♠']
      : mode === '2-suits' ? ['♠', '♥']
      : ['♠', '♥', '♦', '♣'];

    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck: Card[] = [];

    // Add appropriate number of decks based on mode
    const numDecks = 8 / suits.length;
    
    for (let d = 0; d < numDecks; d++) {
      for (const suit of suits) {
        for (const rank of ranks) {
          deck.push({ suit, rank, faceUp: false });
        }
      }
    }

    return shuffle(deck);
  }

  function startNewGame() {
    const deck = createSpiderDeck();
    const newTableauPiles: Card[][] = Array(10).fill([]).map(() => []);
    
    // Deal initial cards
    for (let i = 0; i < 54; i++) {
      const pileIndex = i % 10;
      const card = deck.pop()!;
      if (i >= 44) { // Last cards in each pile are face up
        card.faceUp = true;
      }
      newTableauPiles[pileIndex] = [...newTableauPiles[pileIndex], card];
    }

    // Split remaining cards into groups of 10 for the stock
    const stockPiles: Card[][] = [];
    while (deck.length >= 10) {
      stockPiles.push(deck.splice(0, 10));
    }

    updateState({
      tableauPiles: newTableauPiles,
      stock: stockPiles,
      foundationPiles: [],
      score: 0,
      moves: 0,
      startTime: Date.now(),
      isComplete: false
    });
  }

  const handleDealCards = () => {
    if (gameState.stock.length === 0 || isDealing) {
      playError();
      return;
    }

    setIsDealing(true);
    const stockPile = gameState.stock[gameState.stock.length - 1];
    const newTableauPiles = [...gameState.tableauPiles];

    // Deal cards with animation
    stockPile.forEach((card, index) => {
      setTimeout(() => {
        card.faceUp = true;
        newTableauPiles[index] = [...newTableauPiles[index], card];
        playCardFlip();

        // Update state after last card
        if (index === stockPile.length - 1) {
          updateState({
            tableauPiles: newTableauPiles,
            stock: gameState.stock.slice(0, -1),
            moves: gameState.moves + 1
          });
          setIsDealing(false);
        }
      }, index * 100);
    });
  };

  const handleDragStart = (
    e: React.DragEvent,
    cards: Card[],
    sourceIndex: number,
    cardIndex: number
  ) => {
    if (!e.dataTransfer) return;
    
    setDraggedCards({
      cards,
      sourceIndex,
      cardIndex
    });
    playCardMove();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    
    if (!draggedCards) return;
    
    const { cards, sourceIndex, cardIndex } = draggedCards;
    
    // Validate move
    if (!isValidSpiderTableauMove(cards, gameState.tableauPiles[targetIndex])) {
      playError();
      setDraggedCards(null);
      return;
    }

    const newTableauPiles = [...gameState.tableauPiles];
    
    // Remove cards from source
    newTableauPiles[sourceIndex] = newTableauPiles[sourceIndex].slice(0, cardIndex);
    if (newTableauPiles[sourceIndex].length > 0) {
      newTableauPiles[sourceIndex][newTableauPiles[sourceIndex].length - 1].faceUp = true;
    }

    // Add cards to target
    newTableauPiles[targetIndex] = [...newTableauPiles[targetIndex], ...cards];

    // Check for completed sequences
    const targetPile = newTableauPiles[targetIndex];
    if (targetPile.length >= 13) {
      const sequence = targetPile.slice(-13);
      if (isValidSpiderFoundationMove(sequence)) {
        // Remove sequence and add to foundation
        newTableauPiles[targetIndex] = targetPile.slice(0, -13);
        if (newTableauPiles[targetIndex].length > 0) {
          newTableauPiles[targetIndex][newTableauPiles[targetIndex].length - 1].faceUp = true;
        }
        updateState({
          tableauPiles: newTableauPiles,
          foundationPiles: [...gameState.foundationPiles, sequence],
          score: gameState.score + 100,
          moves: gameState.moves + 1
        });
        playCardMove();
      } else {
        updateState({
          tableauPiles: newTableauPiles,
          score: gameState.score + 5,
          moves: gameState.moves + 1
        });
      }
    } else {
      updateState({
        tableauPiles: newTableauPiles,
        score: gameState.score + 5,
        moves: gameState.moves + 1
      });
    }

    addMove({
      type: 'move',
      from: {
        type: 'tableau',
        index: sourceIndex,
        cardIndex
      },
      to: {
        type: 'tableau',
        index: targetIndex
      },
      cards
    });

    playCardMove();
    setDraggedCards(null);
  };

  const renderStockPile = () => {
    if (gameState.stock.length === 0) {
      return (
        <div className="w-14 h-20 rounded-lg border-2 border-dashed border-emerald-400/10 flex items-center justify-center">
          <span className="text-4xl text-emerald-400/50">✕</span>
        </div>
      );
    }

    return (
      <div className="flex">
        {Array.from({ length: Math.min(gameState.stock.length, 5) }).map((_, index) => (
          <div
            key={`stock-card-${index}`}
            className={`
              relative -ml-10 first:ml-0 transition-transform duration-200
              ${index === gameState.stock.length - 1 ? 'hover:-translate-y-2 cursor-pointer' : ''}
            `}
            style={{
              zIndex: index,
            }}
            onClick={index === gameState.stock.length - 1 ? handleDealCards : undefined}
          >
            <CardComponent 
              card={{ suit: '♠', rank: 'A', faceUp: false }}
              style={customization.cardStyle}
              cardBack={customization.cardBack}
              className="w-14 h-20"
              variant="spider"
            />
          </div>
        ))}
      </div>
    );
  };

  const isCardInValidSequence = (pileIndex: number, cardIndex: number): boolean => {
    const pile = gameState.tableauPiles[pileIndex];
    if (cardIndex === pile.length - 1) return true;
    return isPartOfDescendingSequence(pile, cardIndex, true);
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
                    setDifficulty(difficulty as SpiderDifficulty);
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
              <h2 className="text-2xl font-bold text-center mb-4">Congratulations!</h2>
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
        {/* Stock pile and Foundation piles */}
        <div className="grid grid-cols-10 gap-1 mb-6">
          {/* Stock pile in columns 1-2 */}
          <div className="col-span-2">
            {renderStockPile()}
          </div>

          {/* Foundation piles in columns 3-10 */}
          {Array(8).fill(null).map((_, index) => {
            const pile = gameState.foundationPiles[index] || [];
            return (
              <div key={`foundation-${index}`} className="col-span-1">
                <FoundationPile
                  pile={pile}
                  className="w-14 h-20"
                />
              </div>
            );
          })}
        </div>

        {/* Tableau piles */}
        <div className="grid grid-cols-10 gap-1">
          {gameState.tableauPiles.map((pile, pileIndex) => (
            <div 
              key={`tableau-${pileIndex}`}
              className={`
                col-span-1 flex flex-col min-h-[6rem]
                ${pile.length === 0 ? 'border-2 border-dashed border-emerald-400/10 rounded-lg w-14' : ''}
              `}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, pileIndex)}
            >
              {pile.map((card, cardIndex) => {
                const prevCard = cardIndex > 0 ? pile[cardIndex - 1] : null;
                let marginTop = '0';
                
                if (cardIndex > 0) {
                  if (!prevCard?.faceUp && !card.faceUp) {
                    marginTop = '-4.5rem'; // Closed to closed
                  } else if (!prevCard?.faceUp && card.faceUp) {
                    marginTop = '-4.5rem'; // Closed to open
                  } else if (prevCard?.faceUp && card.faceUp) {
                    marginTop = '-3.25rem'; // Open to open (adjusted from -3.5rem)
                  }
                }

                return (
                  <div 
                    key={`card-${pileIndex}-${cardIndex}`}
                    style={{ 
                      marginTop,
                      position: 'relative',
                      zIndex: cardIndex,
                      opacity: draggedCards?.sourceIndex === pileIndex && 
                              cardIndex >= draggedCards.cardIndex ? 0.3 : 1
                    }}
                  >
                    <CardComponent 
                      card={card}
                      draggable={card.faceUp}
                      isDragging={draggedCards?.sourceIndex === pileIndex && 
                                cardIndex >= draggedCards.cardIndex}
                      onDragStart={(e) => handleDragStart(
                        e,
                        pile.slice(cardIndex),
                        pileIndex,
                        cardIndex
                      )}
                      style={customization.cardStyle}
                      cardBack={customization.cardBack}
                      isGrayed={card.faceUp && !isCardInValidSequence(pileIndex, cardIndex)}
                      className="w-14 h-20"
                      variant="spider"
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

function calculateScore(state: SpiderGameState): number {
  const timeBonus = Math.max(0, 1000000 - (Date.now() - state.startTime)) / 1000;
  const difficultyMultiplier = {
    beginner: 1,
    medium: 1.5,
    expert: 2
  }[state.difficulty];
  
  return Math.floor((state.score + timeBonus) * difficultyMultiplier);
}

export default SpiderSolitaire;