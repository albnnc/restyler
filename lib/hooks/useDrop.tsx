import React, {
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
  useContext,
  useRef,
  DependencyList
} from 'react';
import {
  Drop,
  NotificationProps as DropProps,
  SystemContext
} from '../components';
import { disableScroll } from '../utils';
import { useClickOutside } from './useClickOutside';
import { ImperativePortal } from './useImperativePortal';
import { useSharedRef } from './useSharedRef';
import { interactiveStackId, useStack } from './useStack';
import {
  StandaloneTransitionerProps,
  useStandaloneTransition
} from './useStandaloneTransition';

export type DropPlacement = 'top' | 'bottom';

export interface DropOptions extends Omit<DropProps, 'children'> {
  deps: DependencyList;
  portal?: ImperativePortal;
  placement?: DropPlacement;
  isTailored?: boolean;
  isBlurResistant?: boolean;
  onClose?: () => void;
}

export const useDrop = <T extends HTMLElement>(
  render: (props: StandaloneTransitionerProps) => ReactNode,
  options: DropOptions
) => {
  const { defaults } = useContext(SystemContext);
  const {
    deps,
    isTailored,
    placement = 'bottom',
    portal,
    onClose,
    isBlurResistant,
    ...dropProps
  } = useMemo(
    () => ({
      ...defaults?.dropOptions,
      ...options
    }),
    [options]
  );
  const anchorRef = useRef<T>(null);
  const openDrop = useStandaloneTransition<HTMLDivElement>(
    ({ handleClose: handleImplicitClose, ...transitionProps }, ref) => {
      const handleClose = useCallback(() => {
        handleImplicitClose();
        onClose?.();
      }, []);
      const clickOusideRef = useClickOutside<HTMLDivElement>(
        () => !isBlurResistant && handleClose()
      );
      const sharedRef = useSharedRef(null, [ref, clickOusideRef]);
      useStack(interactiveStackId);
      useEffect(() => {
        return disableScroll();
      }, []);
      const {
        top = 0,
        left = 0,
        height = 0,
        width = 0
      } = anchorRef.current?.getBoundingClientRect() ?? {};
      const { height: parentHeight = 0 } =
        anchorRef.current?.closest('body')?.getBoundingClientRect() ?? {};
      return (
        <Drop
          ref={sharedRef}
          style={{
            position: 'fixed',
            left,
            width: isTailored ? width : undefined,
            ...(placement === 'bottom'
              ? { top: top + height }
              : { bottom: parentHeight - top })
          }}
          {...dropProps}
          {...transitionProps}
          handleClose={handleClose}
        >
          {render?.({
            ...dropProps,
            ...transitionProps,
            handleClose
          })}
        </Drop>
      );
    },
    {
      deps: [render, isTailored, onClose, ...deps],
      portal
    }
  );
  return [openDrop, anchorRef] as const;
};
