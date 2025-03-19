import { create } from 'zustand';

interface HintsState {
  hintsRemaining: number;
  showAdModal: boolean;
  canUseHint: boolean;
}

interface HintsStore extends HintsState {
  useHint: () => boolean;
  closeAdModal: () => void;
  resetHints: () => void;
}

const HINTS_PER_GAME = 3;

export const createHintsStore = create<HintsStore>((set) => ({
  hintsRemaining: HINTS_PER_GAME,
  showAdModal: false,
  canUseHint: true,

  useHint: () => {
    let success = false;
    set((state) => {
      if (state.hintsRemaining > 0) {
        success = true;
        return { hintsRemaining: state.hintsRemaining - 1 };
      }
      return { showAdModal: true };
    });
    return success;
  },

  closeAdModal: () => set((state) => ({
    showAdModal: false,
    hintsRemaining: state.hintsRemaining + 1
  })),

  resetHints: () => set({
    hintsRemaining: HINTS_PER_GAME,
    showAdModal: false,
    canUseHint: true
  })
}));