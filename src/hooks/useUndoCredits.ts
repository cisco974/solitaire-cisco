'use client';

import { create } from 'zustand';

interface UndoState {
  undosRemaining: number;
  showAdModal: boolean;
  canUseUndo: boolean;
}

interface UndoStore extends UndoState {
  useUndo: () => boolean;
  closeAdModal: () => void;
  resetUndos: () => void;
}

const UNDOS_PER_GAME = 3;

export const useUndoCredits = create<UndoStore>((set) => ({
  undosRemaining: UNDOS_PER_GAME,
  showAdModal: false,
  canUseUndo: true,

  useUndo: () => {
    let success = false;
    set((state) => {
      if (state.undosRemaining > 0) {
        success = true;
        return { undosRemaining: state.undosRemaining - 1 };
      }
      return { showAdModal: true };
    });
    return success;
  },

  closeAdModal: () => set((state) => ({
    showAdModal: false,
    undosRemaining: state.undosRemaining + 1
  })),

  resetUndos: () => set({
    undosRemaining: UNDOS_PER_GAME,
    showAdModal: false,
    canUseUndo: true
  })
}));