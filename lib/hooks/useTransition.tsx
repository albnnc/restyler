import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  RefObject
} from 'react';
import { requestAnimationDelay } from '../utils';

export type TransitionState = undefined | 'enter' | 'leave';

export const useTransition = <TElement extends HTMLElement>(
  ref: RefObject<TElement>,
  isMounted?: boolean
) => {
  const reflow = useCallback(() => ref.current?.offsetHeight, []);
  const [isReallyMounted, setIsReallyMounted] = useState(!!isMounted);
  const [stage, setStage] = useState<TransitionState>(undefined);
  const isActiveRef = useRef(false);
  const handlersRef = useRef({
    transitionstart: () => {},
    transitionend: () => {}
  });
  const clearHandlers = useCallback(() => {
    handlersRef.current = {
      transitionstart: () => {},
      transitionend: () => {}
    };
  }, []);

  useLayoutEffect(() => {
    if (isMounted === isReallyMounted && stage !== 'leave') {
      return;
    }
    isActiveRef.current = false;
    handlersRef.current = {
      transitionstart: () => (isActiveRef.current = true),
      transitionend: () => {
        isActiveRef.current = false;
        setIsReallyMounted(false);
        setStage(undefined);
        handleEventListeners('removeEventListener');
        clearHandlers();
      }
    };
    const handleEventListeners = (
      action: 'addEventListener' | 'removeEventListener'
    ) => {
      Object.entries(handlersRef.current).forEach(([event, fn]) =>
        ref.current?.[action](event, fn)
      );
    };

    if (isMounted) {
      setStage(stage => (stage === undefined ? 'enter' : undefined));
      setIsReallyMounted(true);
      handleEventListeners('removeEventListener');
      clearHandlers();
    } else {
      setStage('leave');
      handleEventListeners('addEventListener');
    }
    return () => handleEventListeners('removeEventListener');
  }, [isMounted]);

  useLayoutEffect(() => {
    reflow();
    if (stage === 'enter') {
      setStage(undefined);
    } else if (stage === 'leave') {
      requestAnimationDelay(() => {
        if (!isActiveRef.current) {
          handlersRef.current.transitionend();
        }
      });
    }
  }, [stage]);

  const transitionProps = useMemo(
    () => (stage ? { 'data-transition': stage } : {}),
    [stage]
  );

  return [isReallyMounted, transitionProps] as const;
};
