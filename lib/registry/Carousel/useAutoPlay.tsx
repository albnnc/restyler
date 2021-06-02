import { useEffect, useReducer, useState } from 'react';

interface AutoPlayProps {
  handleChange: () => void;
  timeout?: number;
}

export const useAutoPlay = (cb: () => void, interal?: number) => {
  const [tick, setTick] = useReducer(v => v + 1, 0);
  const [isRun, stop] = useReducer(() => false, true);
  let timeoutId;
  useEffect(() => {
    if (!isRun) return;
    if (!interal && timeoutId) {
      clearTimeout(timeoutId);
      return;
    }
    timeoutId = setTimeout(() => {
      cb();
      setTick();
    }, interal ?? 2000);

    return () => clearTimeout(timeoutId);
  }, [interal, tick]);
  return () => {
    clearTimeout(timeoutId);
    stop();
  };
};
