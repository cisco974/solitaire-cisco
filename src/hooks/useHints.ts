import { useState, useCallback } from 'react';

const HINTS_PER_GAME = 3;

interface HintState {
  hintsRemaining: number;
  showAdModal: boolean;
}

export function useHints() {
  const [state, setState] = useState<HintState>({
    hintsRemaining: HINTS_PER_GAME,
    showAdModal: false
  });

  const useHint = useCallback(() => {
    if (state.hintsRemaining > 0) {
      setState(prev => ({
        ...prev,
        hintsRemaining: prev.hintsRemaining - 1
      }));
      return true;
    }
    setState(prev => ({
      ...prev,
      showAdModal: true
    }));
    return false;
  }, [state.hintsRemaining]);

  const closeAdModal = useCallback(() => {
    setState(prev => ({
      ...prev,
      showAdModal: false,
      // Add one hint after watching the ad
      hintsRemaining: prev.hintsRemaining + 1
    }));
  }, []);

  const resetHints = useCallback(() => {
    setState({
      hintsRemaining: HINTS_PER_GAME,
      showAdModal: false
    });
  }, []);

  return {
    hintsRemaining: state.hintsRemaining,
    showAdModal: state.showAdModal,
    canUseHint: state.hintsRemaining > 0,
    useHint,
    closeAdModal,
    resetHints
  };
}