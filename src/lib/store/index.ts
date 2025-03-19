import { create } from 'zustand';
import { GameCustomization } from '@/types/customization';
import { GameState } from '@/types/cards';
import { createGameStore } from './game';
import { createCustomizationStore } from './customization';
import { createHintsStore } from './hints';
import { createUndoStore } from './undo';
import { createMagicWandStore } from './magicWand';

// Export store hooks
export const useGameState = createGameStore;
export const useGameCustomization = createCustomizationStore;
export const useHints = createHintsStore;
export const useUndoCredits = createUndoStore;
export const useMagicWand = createMagicWandStore;