import React from 'react';
import { Card as CardComponent } from './Card';
import { Card } from '../types/cards';
import { motion } from 'framer-motion';

interface FoundationPileProps {
  pile: Card[];
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  onDragStart?: (e: React.DragEvent) => void;
  className?: string;
  isLight?: boolean;
  draggable?: boolean;
  style?: 'classic' | 'colorful';
  cardBack?: string;
  isHighlighted?: boolean;
  isMagicMove?: boolean;
}

export function FoundationPile({ 
  pile, 
  onDragOver, 
  onDrop, 
  onDragStart,
  className = 'w-20 h-32', 
  isLight = false,
  draggable = false,
  style = 'classic',
  cardBack = 'classic-red',
  isHighlighted = false,
  isMagicMove = false
}: FoundationPileProps) {
  return (
    <div 
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`
        relative ${className} rounded-lg
        ${pile.length > 0 
          ? isLight ? 'bg-white/20 backdrop-blur-sm shadow-lg' : 'bg-white/10 backdrop-blur-sm shadow-lg'
          : isLight ? 'bg-white/10 backdrop-blur-sm border-2 border-dashed border-white/30' : 'bg-white/5 backdrop-blur-sm border-2 border-dashed border-white/20'
        }
      `}
    >
      {pile.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <span className={`text-2xl font-bold ${isLight ? 'text-white/60' : 'text-white/40'}`}>A</span>
          </motion.div>
        </div>
      )}
      {pile.length > 0 && (
        <CardComponent 
          card={pile[pile.length - 1]} 
          className={className}
          style={style}
          cardBack={cardBack}
          draggable={draggable}
          onDragStart={onDragStart}
          isHighlighted={isHighlighted}
          isMagicMove={isMagicMove}
        />
      )}

      {/* Hover effect */}
      <div className="absolute inset-0 rounded-lg transition-colors hover:bg-white/5" />
    </div>
  );
}