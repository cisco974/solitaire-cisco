'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card as CardComponent } from './Card';
import { DifficultySelector } from './DifficultySelector';
import { GameTopbar } from './GameTopbar';
import { FoundationPile } from './FoundationPile';
import { MagicMoveOverlay } from './MagicMoveOverlay';
import { Card, isValidFoundationMove, isValidTableauMove, checkWinCondition, ValidMove, findValidMoves } from '@/types/cards';
import { Trophy } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useGameState } from '@/hooks/useGameState';
import { GameCustomization } from '@/types/customization';

interface KlondikeGameProps {
  mode?: 'draw-1' | 'draw-3';
  customization: GameCustomization;
}

function createDeck(): Card[] {
  const suits = ['♠', '♥', '♦', '♣'] as const;
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;
  const deck: Card[] = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank, faceUp: false });
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

export function KlondikeGame({ mode = 'draw-1', customization }: KlondikeGameProps) {
  const { 
    gameState, 
    updateState, 
    addMove, 
    undo, 
    showHint,
    highlightedMove,
    canUndo,
    setMode, 
    setDifficulty,
    updateStats
  } = useGameState();
  const [draggedCards, setDraggedCards] = useState<{
    cards: Card[];
    sourceType: 'tableau' | 'waste' | 'foundation';
    sourceIndex: number;
    cardIndex: number;
  } | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isRecycling, setIsRecycling] = useState(false);
  const [magicMoveCard, setMagicMoveCard] = useState<Card | null>(null);
  const [showMagicOverlay, setShowMagicOverlay] = useState(false);
  const [magicMoveTarget, setMagicMoveTarget] = useState<{pileIndex: number, card: Card} | null>(null);
  const [magicMoveSource, setMagicMoveSource] = useState<{pileIndex: number, cardIndex: number} | null>(null);
  const { playCardMove, playCardFlip, playWin, playError } = useSoundEffects();
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (hasStarted && checkWinCondition(gameState.foundationPiles)) {
      playWin();
      updateState({
        isComplete: true,
        score: calculateScore(gameState)
      });
      updateStats(true);
    }
  }, [gameState.foundationPiles, playWin, updateState, updateStats, hasStarted]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!gameState.isComplete) {
        setElapsedTime(Math.floor((Date.now() - gameState.startTime) / 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.startTime, gameState.isComplete]);

  function startNewGame() {
    const deck = createDeck();
    const newTableauPiles: Card[][] = Array(7).fill([]).map(() => []);
    
    for (let i = 0; i < 7; i++) {
      for (let j = i; j < 7; j++) {
        const card = deck.pop()!;
        if (i === j) {
          card.faceUp = true;
        }
        newTableauPiles[j] = [...newTableauPiles[j], card];
      }
    }

    updateState({
      tableauPiles: newTableauPiles,
      stock: deck,
      waste: [],
      foundationPiles: Array(4).fill([]),
      score: 0,
      moves: 0,
      startTime: Date.now(),
      isComplete: false
    });
    
    setHasStarted(true);
  }

  const handleDeckClick = () => {
    if (isDrawing || isRecycling) return;
    setIsDrawing(true);

    if (gameState.stock.length === 0) {
      setIsRecycling(true);
      const reversedWaste = [...gameState.waste].reverse().map(card => ({ ...card, faceUp: false }));
      
      updateState({
        stock: reversedWaste,
        waste: [],
        score: Math.max(0, gameState.score - 100),
        moves: gameState.moves + 1
      });

      setTimeout(() => {
        setIsRecycling(false);
        playCardFlip();
      }, 300);
    } else {
      const cardsToDrawCount = mode === 'draw-3' ? 3 : 1;
      const cardsToDrawActual = Math.min(cardsToDrawCount, gameState.stock.length);
      const newCards = gameState.stock.slice(-cardsToDrawActual).map(card => ({ ...card, faceUp: true }));
      
      updateState({
        stock: gameState.stock.slice(0, -cardsToDrawActual),
        waste: [...gameState.waste, ...newCards],
        moves: gameState.moves + 1
      });
      playCardFlip();
    }

    setTimeout(() => setIsDrawing(false), 300);
  };

  const handleDragStart = (
    e: React.DragEvent,
    cards: Card[],
    sourceType: 'tableau' | 'waste' | 'foundation',
    sourceIndex: number,
    cardIndex: number
  ) => {
    if (!e.dataTransfer) return;
    
    setDraggedCards({
      cards,
      sourceType,
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

  const handleDrop = (
    e: React.DragEvent,
    targetType: 'tableau' | 'foundation',
    targetIndex: number
  ) => {
    e.preventDefault();
    
    if (!draggedCards) return;
    
    const { cards, sourceType, sourceIndex, cardIndex } = draggedCards;
    
    if (targetType === 'foundation') {
      if (cards.length !== 1) {
        playError();
        return;
      }
      
      const [card] = cards;
      if (!isValidFoundationMove(card, gameState.foundationPiles[targetIndex])) {
        playError();
        return;
      }
      
      const newFoundationPiles = [...gameState.foundationPiles];
      newFoundationPiles[targetIndex] = [...newFoundationPiles[targetIndex], card];
      
      if (sourceType === 'tableau') {
        const newTableauPiles = [...gameState.tableauPiles];
        newTableauPiles[sourceIndex] = newTableauPiles[sourceIndex].slice(0, -1);
        if (newTableauPiles[sourceIndex].length > 0) {
          newTableauPiles[sourceIndex][newTableauPiles[sourceIndex].length - 1].faceUp = true;
          playCardFlip();
        }
        updateState({ tableauPiles: newTableauPiles });
      } else if (sourceType === 'waste') {
        updateState({ waste: gameState.waste.slice(0, -1) });
      } else if (sourceType === 'foundation') {
        const newFoundationPilesSource = [...gameState.foundationPiles];
        newFoundationPilesSource[sourceIndex] = newFoundationPilesSource[sourceIndex].slice(0, -1);
        updateState({ foundationPiles: newFoundationPilesSource });
      }
      
      updateState({ 
        foundationPiles: newFoundationPiles,
        score: gameState.score + 10,
        moves: gameState.moves + 1
      });

      addMove({
        type: 'move',
        from: { type: sourceType, index: sourceIndex },
        to: { type: 'foundation', index: targetIndex },
        cards
      });

      playCardMove();
    }
    
    if (targetType === 'tableau') {
      if (!isValidTableauMove(cards, gameState.tableauPiles[targetIndex])) {
        playError();
        return;
      }
      
      const newTableauPiles = [...gameState.tableauPiles];
      newTableauPiles[targetIndex] = [...newTableauPiles[targetIndex], ...cards];
      
      if (sourceType === 'tableau') {
        newTableauPiles[sourceIndex] = newTableauPiles[sourceIndex].slice(0, cardIndex);
        if (newTableauPiles[sourceIndex].length > 0) {
          newTableauPiles[sourceIndex][newTableauPiles[sourceIndex].length - 1].faceUp = true;
          playCardFlip();
        }
      } else if (sourceType === 'waste') {
        updateState({ waste: gameState.waste.slice(0, -1) });
      } else if (sourceType === 'foundation') {
        const newFoundationPiles = [...gameState.foundationPiles];
        newFoundationPiles[sourceIndex] = newFoundationPiles[sourceIndex].slice(0, -1);
        updateState({ foundationPiles: newFoundationPiles });
      }
      
      updateState({ 
        tableauPiles: newTableauPiles,
        score: gameState.score + 5,
        moves: gameState.moves + 1
      });

      addMove({
        type: 'move',
        from: {
          type: sourceType,
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
    }
    
    setDraggedCards(null);
  };

  const handleCardClick = (card: Card, source: 'tableau' | 'waste' | 'foundation', pileIndex: number) => {
    // Handle card click logic
  };

  const handleFoundationClick = (index: number) => {
    // Handle foundation click logic
  };

  const handleTableauPileClick = (index: number) => {
    // Handle tableau pile click logic
  };

  return (
    <div className="w-full h-full">
      <GameTopbar
        moves={gameState.moves}
        elapsedTime={elapsedTime}
        score={gameState.score}
        canUndo={canUndo}
        onUndo={undo}
        onHint={showHint}
        onMagicWand={() => {}}
        hasMagicMove={findValidMoves(gameState).some(move => move.to.type === 'foundation')}
      />

      <div className="p-4">
        {/* Stock and Waste Piles */}
        <div className="grid grid-cols-7 gap-2 mb-8">
          <div className="col-span-2 flex gap-2">
            <div 
              onClick={handleDeckClick}
              className={`
                w-20 h-32 rounded-lg border-2 border-dashed flex items-center justify-center
                ${gameState.stock.length > 0 
                  ? 'bg-emerald-800/30 border-emerald-400/20 cursor-pointer hover:bg-emerald-700/30'
                  : 'bg-emerald-800/10 border-emerald-400/10'
                }
              `}
            >
              {gameState.stock.length > 0 ? (
                <CardComponent 
                  card={gameState.stock[gameState.stock.length - 1]} 
                  style={customization.cardStyle}
                  cardBack={customization.cardBack}
                />
              ) : (
                <span className="text-4xl text-emerald-400/50">↻</span>
              )}
            </div>

            <div className="relative w-20 h-32">
              {gameState.waste.map((card, index) => (
                <div
                  key={`waste-${index}`}
                  style={{
                    position: 'absolute',
                    left: index * 20,
                    zIndex: index
                  }}
                >
                  <CardComponent
                    card={card}
                    style={customization.cardStyle}
                    cardBack={customization.cardBack}
                    draggable={index === gameState.waste.length - 1}
                    onDragStart={(e) => handleDragStart(e, [card], 'waste', 0, gameState.waste.length - 1)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1"></div>

          {gameState.foundationPiles.map((pile, index) => (
            <div key={`foundation-${index}`} className="col-span-1">
              <FoundationPile
                pile={pile}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'foundation', index)}
                onDragStart={(e) => handleDragStart(e, [pile[pile.length - 1]], 'foundation', index, pile.length - 1)}
                style={customization.cardStyle}
                cardBack={customization.cardBack}
                draggable={pile.length > 0}
                isHighlighted={highlightedMove?.to.type === 'foundation' && highlightedMove.to.index === index}
              />
            </div>
          ))}
        </div>

        {/* Tableau Piles */}
        <div className="grid grid-cols-7 gap-2">
          {gameState.tableauPiles.map((pile, pileIndex) => (
            <div 
              key={`tableau-${pileIndex}`}
              className={`
                col-span-1 flex flex-col min-h-[8rem]
                ${pile.length === 0 ? 'border-2 border-dashed border-emerald-400/10 rounded-lg w-20' : ''}
              `}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'tableau', pileIndex)}
            >
              {pile.map((card, cardIndex) => {
                const prevCard = cardIndex > 0 ? pile[cardIndex - 1] : null;
                let marginTop = '0';
                
                if (cardIndex > 0) {
                  if (!prevCard?.faceUp && !card.faceUp) {
                    marginTop = '-7rem';
                  } else if (!prevCard?.faceUp && card.faceUp) {
                    marginTop = '-7rem';
                  } else if (prevCard?.faceUp && card.faceUp) {
                    marginTop = '-5.5rem';
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
                      isDragging={draggedCards?.sourceType === 'tableau' && 
                                draggedCards.sourceIndex === pileIndex && 
                                cardIndex >= draggedCards.cardIndex}
                      onDragStart={(e) => handleDragStart(
                        e,
                        pile.slice(cardIndex),
                        'tableau',
                        pileIndex,
                        cardIndex
                      )}
                      style={customization.cardStyle}
                      cardBack={customization.cardBack}
                      isTableau={true}
                      isHighlighted={highlightedMove?.from.type === 'tableau' && 
                                   highlightedMove.from.index === pileIndex &&
                                   highlightedMove.from.cardIndex === cardIndex}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Win Modal */}
      <AnimatePresence>
        {gameState.isComplete && (
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

      <MagicMoveOverlay
        isVisible={showMagicOverlay}
        card={magicMoveCard}
        onAnimationComplete={() => {
          if (magicMoveTarget && magicMoveSource) {
            const { pileIndex: targetPileIndex, card } = magicMoveTarget;
            const { pileIndex: sourcePileIndex, cardIndex: sourceCardIndex } = magicMoveSource;

            const newTableauPiles = [...gameState.tableauPiles];
            const sourcePile = [...newTableauPiles[sourcePileIndex]];
            
            sourcePile.splice(sourceCardIndex, 1);
            newTableauPiles[sourcePileIndex] = sourcePile;

            const newFoundationPiles = [...gameState.foundationPiles];
            newFoundationPiles[targetPileIndex] = [...newFoundationPiles[targetPileIndex], card];

            updateState({
              tableauPiles: newTableauPiles,
              foundationPiles: newFoundationPiles,
              score: gameState.score + 10,
              moves: gameState.moves + 1
            });

            setShowMagicOverlay(false);
            setMagicMoveTarget(null);
            setMagicMoveSource(null);
            playCardMove();
          }
        }}
      />
    </div>
  );
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