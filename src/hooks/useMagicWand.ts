'use client';

import { create } from 'zustand';

interface MagicWandState {
  movesRemaining: number;
  showAdModal: boolean;
  canUseMagicMove: boolean;
}

interface MagicWandStore extends MagicWandState {
  useMagicMove: () => boolean;
  closeAdModal: () => void;
  resetMagicMoves: () => void;
}

const MAGIC_MOVES_PER_GAME = 3;

export const useMagicWand = create<MagicWandStore>((set) => ({
  movesRemaining: MAGIC_MOVES_PER_GAME,
  showAdModal: false,
  canUseMagicMove: true,

  useMagicMove: () => {
    let success = false;
    set((state) => {
      if (state.movesRemaining > 0) {
        success = true;
        return { movesRemaining: state.movesRemaining - 1 };
      }
      return { showAdModal: true };
    });
    return success;
  },

  closeAdModal: () => set((state) => ({
    showAdModal: false,
    movesRemaining: state.movesRemaining + 1
  })),

  resetMagicMoves: () => set({
    movesRemaining: MAGIC_MOVES_PER_GAME,
    showAdModal: false,
    canUseMagicMove: true
  })
}));