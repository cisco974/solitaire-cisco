import useSound from 'use-sound';

export function useSoundEffects() {
  const [playCardMove] = useSound('/sounds/card-move.mp3', { volume: 0.5 });
  const [playCardFlip] = useSound('/sounds/card-flip.mp3', { volume: 0.5 });
  const [playWin] = useSound('/sounds/win.mp3', { volume: 0.7 });
  const [playError] = useSound('/sounds/error.mp3', { volume: 0.3 });

  return {
    playCardMove,
    playCardFlip,
    playWin,
    playError
  };
}