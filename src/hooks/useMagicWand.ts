import { useState, useCallback } from 'react';

const MAGIC_MOVES_PER_GAME = 3;

interface MagicWandState {
  movesRemaining: number;
  showAdModal: boolean;
}

export function useMagicWand() {
  const [state, setState] = useState<MagicWandState>({
    movesRemaining: MAGIC_MOVES_PER_GAME,
    showAdModal: false
  });

  const useMagicMove = useCallback(() => {
    if (state.movesRemaining > 0) {
      setState(prev => ({
        ...prev,
        movesRemaining: prev.movesRemaining - 1
      }));
      return true;
    }
    setState(prev => ({
      ...prev,
      showAdModal: true
    }));
    return false;
  }, [state.movesRemaining]);

  const closeAdModal = useCallback(() => {
    setState(prev => ({
      ...prev,
      showAdModal: false,
      movesRemaining: prev.movesRemaining + 1
    }));
  }, []);

  const resetMagicMoves = useCallback(() => {
    setState({
      movesRemaining: MAGIC_MOVES_PER_GAME,
      showAdModal: false
    });
  }, []);

  return {
    movesRemaining: state.movesRemaining,
    showAdModal: state.showAdModal,
    canUseMagicMove: state.movesRemaining > 0,
    useMagicMove,
    closeAdModal,
    resetMagicMoves
  };
}