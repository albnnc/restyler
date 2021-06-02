import {
  useCallback,
  useEffect,
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

  useEffect(() => {
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
      setStage('enter');
      setIsReallyMounted(true);
    } else {
      setStage('leave');
      handleEventListeners('addEventListener');
    }
    return () => handleEventListeners('removeEventListener');
  }, [isMounted]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
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
