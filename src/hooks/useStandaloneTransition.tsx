import React, {
  ComponentType,
  createRef,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import { SystemContext } from '../components';
import { ImperativePortal } from './useImperativePortal';
import {
  TransitionerProps,
  TransitionOptions,
  useTransition
} from './useTransition';
import { useUpdateEffect } from './useUpdateEffect';

type WrapProps<Options> = { onUnmount: () => void; options?: Options };
type WrapHandlers = { handleClose: () => void };

export interface StandaloneTransitionerProps<
  Element extends HTMLElement = HTMLElement,
  Options = never
> extends TransitionerProps<Element> {
  handleClose: () => void;
  options?: Options;
}

export type StandaloneTransitioner<
  Element extends HTMLElement = HTMLElement,
  Options = never
> = ComponentType<StandaloneTransitionerProps<Element, Options>>;

export interface StandaloneTransitionOptions
  extends Omit<TransitionOptions, 'isMounted'> {
  portal?: ImperativePortal;
}

export const useStandaloneTransition = <
  Element extends HTMLElement = HTMLElement,
  OpenOptions = never
>(
  Transitioner: StandaloneTransitioner<Element, OpenOptions>,
  options: StandaloneTransitionOptions
) => {
  const { defaults } = useContext(SystemContext);
  const { deps, portal } = {
    ...defaults?.standaloneTransitionOptions,
    ...options
  };

  const Wrap = useMemo(
    () =>
      forwardRef<WrapHandlers, WrapProps<OpenOptions>>(
        ({ onUnmount, options }, ref) => {
          const [isMounted, setIsMounted] = useState(false);
          const handleClose = useCallback(() => setIsMounted(false), []);
          const wrapRef = useRef<HTMLDivElement>(null);
          const reflow = useCallback(() => wrapRef.current?.offsetHeight, []);
          const transition = useTransition(
            props => (
              <div ref={wrapRef}>
                <Transitioner
                  handleClose={handleClose}
                  options={options}
                  {...props}
                />
              </div>
            ),
            { deps: [], isMounted }
          );
          useEffect(() => {
            reflow();
          }, [isMounted]);
          useEffect(() => {
            setIsMounted(true);
          }, []);
          useImperativeHandle(ref, () => ({ handleClose }), []);
          useUpdateEffect(() => {
            reflow();
            if (!transition) {
              onUnmount();
            }
          }, [transition]);
          return transition;
        }
      ),
    [...deps]
  );

  const open = useCallback(
    (options?: OpenOptions) => {
      const ref = createRef<WrapHandlers>();
      const key = Math.random();
      const child = (
        <Wrap
          ref={ref}
          key={key}
          onUnmount={() => portal?.remove(child)}
          options={options}
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
