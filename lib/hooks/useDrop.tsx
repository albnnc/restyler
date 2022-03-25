import React, {
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
  useContext,
  useRef
} from 'react';
import {
  Drop,
  NotificationProps as DropProps,
  SystemContext
} from '../components';
import { disableScroll } from '../utils';
import { useClickOutside } from './useClickOutside';
import { useSharedRef } from './useSharedRef';
import { interactiveStackId, useStack } from './useStack';
import {
  StandaloneTransitionerProps,
  useStandaloneTransition
} from './useStandaloneTransition';

export enum DropPlacement {
  Top = 'top',
  Bottom = 'bottom'
}

export interface DropOptions extends Omit<DropProps, 'children'> {
  render: (props: StandaloneTransitionerProps) => ReactNode;
  isTailored?: boolean;
  placement?: DropPlacement;
  onClose?: () => void;
}

export const useDrop = <T extends HTMLElement>() => {
  const { defaults } = useContext(SystemContext);
  const anchorRef = useRef<T>(null);
  const openDrop = useStandaloneTransition<HTMLDivElement, DropOptions>(
    (
      { context, handleClose: handleImplicitClose, ...transitionProps },
      ref
    ) => {
      const {
        render,
        isTailored,
        placement = DropPlacement.Bottom,
        onClose,
        ...dropProps
      } = useMemo(
        () => ({
          ...defaults?.dropOptions,
          ...context
        }),
        [context]
      );
      const handleClose = useCallback(() => {
        handleImplicitClose();
        onClose?.();
      }, []);
      const clickOusideRef = useClickOutside<HTMLDivElement>(handleClose);
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
            zIndex: 1,
            left,
            width: isTailored ? width : undefined,
            ...(placement === DropPlacement.Bottom
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
      deps: []
    }
  );
  return [openDrop, anchorRef] as const;
};
