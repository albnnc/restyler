import { useEffect, useRef, useState, HTMLAttributes, RefObject } from 'react';
import { onNextFrame } from '../utils';

export type TransitionState = undefined | 'enter' | 'leave';

export const useTransition = <TElement extends HTMLElement>(
  isMounted?: boolean
) => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  const ref = useRef<TElement>(null);
  const [isReallyMounted, setIsReallyMounted] = useState(!!isMounted);
  const [transitionState, setTransitionState] = useState<TransitionState>(
    undefined
  );

  useEffect(() => {
    if (isFirstRender) {
      return;
    }
    let isTransitioning = false;
    const onTransitionStart = () => (isTransitioning = true);
    const onTransitionEnd = () => {
      isTransitioning = false;
      setIsReallyMounted(false);
      setTransitionState(undefined);
      removeEventListeners();
    };
    const addEventListeners = () => {
      if (ref.current) {
        ref.current.addEventListener('transitionstart', onTransitionStart);
        ref.current.addEventListener('transitionend', onTransitionEnd);
      }
    };
    const removeEventListeners = () => {
      if (ref.current) {
        ref.current.removeEventListener('transitionstart', onTransitionStart);
        ref.current.removeEventListener('transitionend', onTransitionEnd);
      }
    };

    if (isMounted) {
      setIsReallyMounted(true);
      setTransitionState('enter');
      onNextFrame(() => setTransitionState(undefined));
    } else {
      setTransitionState('leave');
      addEventListeners();
      onNextFrame(() => {
        if (!isTransitioning) {
          onTransitionEnd();
        }
      });
    }
    return removeEventListeners;
  }, [isMounted]);

  const transitionProps = {
    ref,
    ...(transitionState ? { 'data-transition': transitionState } : {})
  };

  return [isReallyMounted, transitionProps] as [
    boolean,
    HTMLAttributes<TElement> & {
      'data-transition': 'leave' | 'enter';
      ref: RefObject<TElement>;
    }
  ];
};
