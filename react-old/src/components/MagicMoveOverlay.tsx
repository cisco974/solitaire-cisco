import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './Card';
import { Card as CardType } from '../types/cards';

interface MagicMoveOverlayProps {
  isVisible: boolean;
  card: CardType | null;
  onAnimationComplete: () => void;
}

export function MagicMoveOverlay({ isVisible, card, onAnimationComplete }: MagicMoveOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && card && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm pointer-events-none z-50"
        >
          {/* Phase 1: Card Scale and Rotation */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ 
                scale: 0,
                opacity: 0,
                rotate: 0,
                x: '-50%',
                y: '-50%'
              }}
              animate={[
                // Initial appearance with scale up
                { 
                  scale: 3,
                  opacity: 1,
                  rotate: 0,
                  transition: { 
                    duration: 0.3,
                    ease: "easeOut"
                  }
                },
                // First 360° rotation
                { 
                  rotate: 360,
                  transition: { 
                    duration: 1,
                    ease: "linear"
                  }
                },
                // Second 360° rotation
                { 
                  rotate: 720,
                  transition: { 
                    duration: 1,
                    ease: "linear"
                  }
                }
              ]}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transformOrigin: 'center center',
                perspective: 1000,
                transformStyle: 'preserve-3d'
              }}
            >
              <Card
                card={card}
                className="w-20 h-32"
                style="classic"
                isHighlighted={true}
              />
            </motion.div>
          </motion.div>

          {/* Phase 2: Explosion and Foundation Appearance */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Particle burst effect */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: [0.5, 2],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 0.5,
                times: [0, 0.2, 1]
              }}
              className="absolute inset-0 pointer-events-none"
            >
              {/* Radial particles */}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 0
                  }}
                  animate={{ 
                    x: Math.cos(i * 30 * Math.PI / 180) * 50,
                    y: Math.sin(i * 30 * Math.PI / 180) * 50,
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  style={{
                    position: 'absolute',
                    left: 'calc(50% - 2px)',
                    top: 'calc(50% - 2px)',
                    width: '4px',
                    height: '4px',
                    background: 'white',
                    borderRadius: '50%',
                    filter: 'blur(2px)'
                  }}
                />
              ))}
            </motion.div>

            {/* Card appearance in foundation */}
            <motion.div
              initial={{ 
                scale: 0,
                opacity: 0,
                y: 0
              }}
              animate={{ 
                scale: [0, 1.2, 1],
                opacity: 1,
                y: [-50, 0]
              }}
              transition={{
                duration: 0.5,
                times: [0, 0.6, 1],
                ease: [0.34, 1.56, 0.64, 1]
              }}
              onAnimationComplete={onAnimationComplete}
            >
              <Card
                card={card}
                className="w-20 h-32"
                style="classic"
                isHighlighted={true}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}