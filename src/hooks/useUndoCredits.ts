"use client";
import { useCallback, useState } from "react";

const UNDOS_PER_GAME = 3;

interface UndoState {
  undosRemaining: number;
  showAdModal: boolean;
}

export function useUndoCredits() {
  const [state, setState] = useState<UndoState>({
    undosRemaining: UNDOS_PER_GAME,
    showAdModal: false,
  });

  const useUndo = useCallback(() => {
    if (state.undosRemaining > 0) {
      setState((prev) => ({
        ...prev,
        undosRemaining: prev.undosRemaining - 1,
      }));
      return true;
    }
    setState((prev) => ({
      ...prev,
      showAdModal: true,
    }));
    return false;
  }, [state.undosRemaining]);

  const closeAdModal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showAdModal: false,
      // Add one undo credit after watching the ad
      undosRemaining: prev.undosRemaining + 1,
    }));
  }, []);

  const resetUndos = useCallback(() => {
    setState({
      undosRemaining: UNDOS_PER_GAME,
      showAdModal: false,
    });
  }, []);

  return {
    undosRemaining: state.undosRemaining,
    showAdModal: state.showAdModal,
    canUseUndo: state.undosRemaining > 0,
    useUndo,
    closeAdModal,
    resetUndos,
  };
}
