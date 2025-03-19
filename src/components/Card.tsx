'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card as CardType } from '@/types/cards';
import { cardStyles, cardBackStyles, CardBackStyle } from '@/types/customization';

interface CardProps {
  card: CardType;
  onClick?: () => void;
  draggable?: boolean;
  isDragging?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  style?: 'classic' | 'colorful';
  cardBack?: CardBackStyle;
  isGrayed?: boolean;
  isHighlighted?: boolean;
  className?: string;
  variant?: 'spider' | 'default';
  isTableau?: boolean;
  isMagicMove?: boolean;
}

export function Card({ 
  card, 
  onClick, 
  draggable = false,
  isDragging = false,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  style = 'classic',
  cardBack = 'classic-emerald',
  isGrayed = false,
  isHighlighted = false,
  className = 'w-20 h-32',
  variant = 'default',
  isTableau = false,
  isMagicMove = false
}: CardProps) {
  const { suit, rank, faceUp } = card;
  const cardStyle = cardStyles[style];
  const backStyle = cardBackStyles[cardBack];
  const [isDragOver, setIsDragOver] = useState(false);
  const [isBeingDragged, setIsBeingDragged] = useState(false);

  const symbolSizes = variant === 'spider' ? {
    rankSize: 'text-2xl',
    suitSize: 'text-xl',
    centerSize: 'text-5xl'
  } : {
    rankSize: 'text-3xl',
    suitSize: 'text-2xl',
    centerSize: 'text-8xl'
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (!draggable || !faceUp) return;

    const dragImage = document.createElement('div');
    dragImage.className = `
      ${className} rounded-lg p-2
      flex flex-col justify-between
      bg-white
      ${cardStyle.colors[suit]}
    `;
    
    dragImage.innerHTML = `
      <div class="flex items-start justify-between">
        <span class="${symbolSizes.rankSize} font-bold leading-none">${rank}</span>
        <span class="${symbolSizes.suitSize}">${cardStyle.suits[suit]}</span>
      </div>
      <div class="absolute inset-x-0 bottom-1 flex justify-center">
        <span class="${symbolSizes.centerSize} font-serif leading-none opacity-90">
          ${cardStyle.suits[suit]}
        </span>
      </div>
    `;

    dragImage.style.position = 'fixed';
    dragImage.style.top = '-1000px';
    dragImage.style.left = '-1000px';
    document.body.appendChild(dragImage);

    e.dataTransfer.setDragImage(dragImage, 30, 42);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', '');

    requestAnimationFrame(() => {
      document.body.removeChild(dragImage);
    });

    setIsBeingDragged(true);
    document.body.classList.add('dragging');
    onDragStart?.(e);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    document.body.classList.remove('dragging');
    setIsDragOver(false);
    setIsBeingDragged(false);
    onDragEnd?.(e);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (!isDragOver) {
      setIsDragOver(true);
    }
    
    onDragOver?.(e);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop?.(e);
  };

  return (
    <div 
      className={`
        relative ${className}
        ${isBeingDragged ? 'opacity-0' : 'opacity-100'}
        transition-opacity duration-150
        perspective-1000
      `}
    >
      <motion.div
        initial={false}
        animate={{
          rotateY: faceUp || isMagicMove ? 0 : 180,
          scale: isHighlighted ? 1.15 : 1,
          y: isHighlighted ? -12 : 0
        }}
        transition={{
          rotateY: { 
            duration: isTableau && !isMagicMove && !faceUp ? 0.6 : 0, 
            type: "spring", 
            stiffness: 100, 
            damping: 15 
          },
          scale: { duration: 0.3, ease: "easeOut" },
          y: { duration: 0.3, ease: "easeOut" }
        }}
        className="relative w-full h-full preserve-3d"
      >
        {/* Face up */}
        <div
          onClick={onClick}
          draggable={draggable && !isGrayed && faceUp}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            absolute inset-0 w-full h-full
            rounded-lg p-2
            flex flex-col justify-between
            select-none
            bg-white
            ${cardStyle.colors[suit]}
            ${draggable && !isGrayed ? 'active:cursor-grabbing' : ''}
            shadow-lg
            transition-all duration-150 ease-out
            backface-visible-false
            transform-gpu
            relative
            ${isGrayed ? 'cursor-not-allowed brightness-[0.97] contrast-[0.97]' : ''}
            ${isHighlighted ? 'ring-4 ring-emerald-400 ring-opacity-75' : ''}
          `}
          style={{ 
            touchAction: 'none',
            cursor: draggable && !isGrayed ? 'grab' : 'pointer'
          }}
        >
          <div className="flex items-start justify-between pointer-events-none">
            <span className={`${symbolSizes.rankSize} font-bold leading-none drop-shadow-sm`}>{rank}</span>
            <span className={`${symbolSizes.suitSize} drop-shadow-sm`}>{cardStyle.suits[suit]}</span>
          </div>

          <div className="absolute inset-x-0 bottom-1 flex justify-center pointer-events-none">
            <span className={`${symbolSizes.centerSize} font-serif select-none leading-none drop-shadow-sm opacity-90`}>
              {cardStyle.suits[suit]}
            </span>
          </div>

          {isGrayed && (
            <div className="absolute inset-0 bg-black/20 rounded-lg pointer-events-none" />
          )}

          {isDragOver && !isGrayed && (
            <div className="absolute inset-0 rounded-lg border-2 border-emerald-400 border-dashed animate-pulse bg-emerald-50/10" />
          )}

          {isHighlighted && (
            <div className="absolute inset-0 rounded-lg animate-pulse bg-emerald-400/10" />
          )}

          {isMagicMove && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [2, 0], opacity: [0.5, 0] }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 rounded-lg bg-emerald-400"
            />
          )}
        </div>

        {/* Face down */}
        <div 
          className={`
            absolute inset-0 w-full h-full
            rounded-lg overflow-hidden
            select-none
            shadow-lg
            transition-all duration-150 ease-out
            ${isDragOver ? 'ring-2 ring-emerald-400 ring-opacity-50' : ''}
            backface-visible-false rotate-y-180
            transform-gpu
            border-[4px] border-white
          `}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${backStyle.colors[0]}`}>
            <div className={`absolute inset-1 rounded-md overflow-hidden backdrop-blur-sm`}>
              <div className={`absolute inset-0 grid grid-cols-4 gap-1 p-1 bg-grid-diamond`}>
                {Array.from({ length: 24 }).map((_, i) => (
                  <div 
                    key={i}
                    className={`
                      aspect-square rounded-sm transform rotate-45
                      bg-gradient-to-br ${backStyle.colors[1]}
                    `}
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}