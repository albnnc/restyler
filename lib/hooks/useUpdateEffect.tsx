import { useEffect, useReducer, DependencyList, EffectCallback } from 'react';

export const useUpdateEffect = (fn: EffectCallback, deps: DependencyList) => {
  const [isFirst, check] = useReducer(() => false, true);
  useEffect(() => {
    if (isFirst) {
      check();
      return;
    }
    return fn();
  }, deps);
};
