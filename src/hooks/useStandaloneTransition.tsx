import React, {
  createRef,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState
} from 'react';
import { SystemContext } from '../components';
import { useForwardRef } from './useForwardRef';
import { ImperativePortal } from './useImperativePortal';
import {
  Transitioner,
  TransitionerProps,
  TransitionOptions,
  useTransition
} from './useTransition';
import { useUpdateEffect } from './useUpdateEffect';

type WrapProps<C> = { onUnmount: () => void; context?: C };
type WrapHandlers = { handleClose: () => void };

export interface StandaloneTransitionerProps<C = never>
  extends TransitionerProps {
  handleClose: () => void;
  context?: C;
}

export type StandaloneTransitioner<T, C = never> = Transitioner<
  T,
  StandaloneTransitionerProps<C>
>;

export interface StandaloneTransitionOptions
  extends Omit<TransitionOptions, 'isMounted'> {
  portal?: ImperativePortal;
}

export const useStandaloneTransition = <T extends HTMLElement, C = never>(
  transitioner: StandaloneTransitioner<T, C>,
  options: StandaloneTransitionOptions
) => {
  const { defaults } = useContext(SystemContext);
  const { deps, portal } = {
    ...defaults?.standaloneTransitionOptions,
    ...options
  };

  const Component = useForwardRef(transitioner, deps);
  const Wrap = useMemo(
    () =>
      forwardRef<WrapHandlers, WrapProps<C>>(({ onUnmount, context }, ref) => {
        const [isMounted, setIsMounted] = useState(false);
        const handleClose = useCallback(() => setIsMounted(false), []);
        const transition = useTransition<T>(
          (props, ref) => (
            <Component
              ref={ref}
              handleClose={handleClose}
              context={context}
              {...props}
            />
          ),
          { deps: [], isMounted }
        );
        useEffect(() => {}, [isMounted]);
        useEffect(() => {
          setIsMounted(true);
        }, []);
        useImperativeHandle(ref, () => ({ handleClose }), []);
        useUpdateEffect(() => {
          if (!transition) {
            onUnmount();
          }
        }, [transition]);
        return transition;
      }),
    [...deps]
  );

  const open = useCallback(
    (context?: C) => {
      const ref = createRef<WrapHandlers>();
      const key = Math.random();
      const child = (
        <Wrap
          ref={ref}
          key={key}
          onUnmount={() => portal?.remove(child)}
          context={context}
        />
      );
      portal?.push(child);
      return () => {
        ref.current?.handleClose();
      };
    },
    [portal, ...deps]
  );

  return open;
};
