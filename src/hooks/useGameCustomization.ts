'use client';

import { create } from 'zustand';
import { GameCustomization } from '@/types/customization';

interface GameCustomizationStore {
  customization: GameCustomization;
  updateCustomization: (updates: Partial<GameCustomization>) => void;
}

const defaultCustomization: GameCustomization = {
  cardBack: 'classic-red',
  table: 'emerald-felt',
  cardStyle: 'classic'
};

export const useGameCustomization = create<GameCustomizationStore>((set) => ({
  customization: defaultCustomization,
  updateCustomization: (updates) => set((state) => ({
    customization: { ...state.customization, ...updates }
  }))
}));