import { DependencyList, useCallback, useRef } from 'react';

export const useCleanableRef = <T extends unknown>(
  callback: (instance: T) => (() => void) | void | undefined,
  deps: DependencyList
) => {
  const cleanup = useRef<(() => void) | void | undefined>();
  return useCallback(
    (instance: T) => {
      if (cleanup.current) {
        cleanup.current();
        cleanup.current = undefined;
      }
      if (instance) {
        cleanup.current = callback(instance);
      }
    },
    [callback, ...deps]
  );
};
