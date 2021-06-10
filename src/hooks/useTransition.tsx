import {
  useMemo,
  ComponentType,
  useState,
  useEffect,
  useLayoutEffect,
  TransitionEventHandler,
  TransitionEvent,
  useCallback,
  useContext
} from 'react';
import { getIndexOfMax } from '../utils';
import { SystemContext } from 'src/components';

export interface TransitionerProps {
  isVisible: boolean;
  isEntering: boolean;
  onTransitionEnd?: TransitionEventHandler;
}

export type Transitioner = ComponentType<TransitionerProps>;

export interface TransitionOptions {
  deps: any[];
  isMounted: boolean;
  timeout?: number;
}

export const useTransition = (
  transitioner: Transitioner,
  options: TransitionOptions
) => {
  const { defaults } = useContext(SystemContext);
  const { deps, isMounted, timeout } = {
    timeout: 1000,
    ...defaults?.transitionOptions,
    ...options
  };
  const Component = useMemo(() => transitioner, deps);
  const [isVisible, setIsVisible] = useState(!!isMounted);
  const [isEntering, setIsEntering] = useState(false);
  const [isReallyMounted, setIsReallyMounted] = useState(!!isMounted);
  const handleTransitionEnd = useCallback(
    ({ target, propertyName }: TransitionEvent) => {
      if (!target) {
        return;
      }
      const { transitionProperty, transitionDuration } = getComputedStyle(
        target as Element
      );
      const properties = transitionProperty.split(',').map(v => v.trim());
      const durations = transitionDuration
        .split(',')
        .map(v => v.trim().toLocaleLowerCase())
        .map(v =>
          v.endsWith('ms') ? +v.replace('ms', '') : +v.replace('s', '') * 1000
        );
      const longestProperty = properties[getIndexOfMax(durations)];
      if (longestProperty === propertyName) {
        setIsReallyMounted(isMounted);
        setIsEntering(false);
      }
    },
    [isMounted]
  );

  useLayoutEffect(() => {
    if (isMounted) {
      if (isReallyMounted) {
        setIsVisible(true);
      } else {
        setIsReallyMounted(true);
        setIsEntering(true);
      }
    } else {
      setIsVisible(false);
      const timeoutId = setTimeout(() => setIsReallyMounted(false), timeout);
      return () => clearTimeout(timeoutId);
    }
    return undefined;
  }, [isMounted]);

  useEffect(() => {
    setIsVisible(isReallyMounted);
  }, [isReallyMounted]);

  return useMemo(
    () =>
      isReallyMounted ? (
        <Component
          isVisible={isVisible}
          isEntering={isEntering}
          onTransitionEnd={handleTransitionEnd}
        />
      ) : null,
    [isReallyMounted, isVisible, isEntering, handleTransitionEnd, ...deps]
  );
};
