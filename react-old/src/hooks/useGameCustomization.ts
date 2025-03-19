import { useState } from 'react';
import { GameCustomization, CardBackStyle, TableStyle, CardStyle } from '../types/customization';

const STORAGE_KEY = 'game-customization';

const defaultCustomization: GameCustomization = {
  cardBack: 'classic-red',
  table: 'emerald-felt',
  cardStyle: 'classic'
};

export function useGameCustomization() {
  const [customization, setCustomization] = useState<GameCustomization>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultCustomization;
  });

  const updateCustomization = (updates: Partial<GameCustomization>) => {
    const newCustomization = { ...customization, ...updates };
    setCustomization(newCustomization);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCustomization));
  };

  return {
    customization,
    updateCustomization
  };
}