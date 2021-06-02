import { useCallback, useMemo, useReducer, useRef, RefObject } from 'react';
import { requestAnimationDelay } from '../utils';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export type TransitionStage = undefined | 'enter' | 'leave';

export const useTransition = <TElement extends HTMLElement>(
  ref: RefObject<TElement>,
  isMounted?: boolean
) => {
  const reflow = useCallback(() => ref.current?.offsetHeight, []);
  const [_, rerender] = useReducer(() => Symbol(), Symbol());

  const transition = useRef({
    stage: undefined as TransitionStage,
    isAnimating: false,
    isMounted: !!isMounted,
    handlers: undefined as
      | undefined
      | {
          id: any;
          transitionend: () => void;
          transitionstart: () => void;
        }
  }).current;

  const handleEventListeners = useCallback(
    (action: 'add' | 'remove', handlers: typeof transition['handlers']) => {
      Object.entries(handlers ?? {}).forEach(([event, fn]) => {
        if (typeof fn === 'function') {
          ref.current?.[`${action}EventListener`](event, fn);
        }
      });
    },
    []
  );

  useIsomorphicLayoutEffect(() => {
    if (isMounted === transition.isMounted && transition.stage !== 'leave') {
      return;
    }
    transition.isAnimating = false;
    const handlers = (transition.handlers = {
      id: Symbol(),
      transitionstart: () => (transition.isAnimating = true),
      transitionend: () => {
        if (!ref.current) {
          return;
        }
        handleEventListeners('remove', handlers);
        transition.isMounted = transition.stage !== 'leave';
        transition.isAnimating = false;
        transition.stage = undefined;
        rerender();
      }
    });
    if (isMounted) {
      transition.stage = transition.stage === undefined ? 'enter' : undefined;
      transition.isMounted = true;
      handleEventListeners('remove', handlers);
    } else {
      transition.stage = 'leave';
      handleEventListeners('add', handlers);
    }
    rerender();
    return () => {
      handleEventListeners('remove', handlers);
    };
  }, [isMounted]);

  useIsomorphicLayoutEffect(() => {
    reflow();
    if (transition.stage === 'enter') {
      transition.stage = undefined;
      rerender();
    } else if (transition.stage === 'leave') {
      // Waiting a little bit and checking if animation
      // has started. If not, one has to force end transition,
      // but only after checking the handler relevance.
      const targetId = transition.handlers?.id ?? Symbol();
      requestAnimationDelay(() => {
        if (!transition.isAnimating && transition.handlers?.id === targetId) {
          transition.handlers?.transitionend();
        }
      });
    }
  }, [transition.stage]);

  const transitionProps = useMemo(
    () => ({ 'data-transition': transition.stage }),
    [transition.stage]
  );

  return [transition.isMounted, transitionProps] as const;
};
