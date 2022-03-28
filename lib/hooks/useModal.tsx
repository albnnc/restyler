import React, {
  DependencyList,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo
} from 'react';
import { Layer, Modal, ModalProps, SystemContext } from '../components';
import { disableScroll } from '../utils';
import { useClickOutside } from './useClickOutside';
import { useFocusTrap } from './useFocusTrap';
import { ImperativePortal } from './useImperativePortal';
import { useSharedRef } from './useSharedRef';
import { interactiveStackId, useStack } from './useStack';
import {
  StandaloneTransitionerProps,
  useStandaloneTransition
} from './useStandaloneTransition';
import { useTransition } from './useTransition';

export interface ModalRendererProps<C = never>
  extends StandaloneTransitionerProps<C> {}

export interface ModalOptions extends Omit<ModalProps, 'children'> {
  deps: DependencyList;
  portal?: ImperativePortal;
  onClose?: () => void;
}

export const useModal = <C extends unknown = never>(
  render: (props: ModalRendererProps<C>) => ReactNode,
  options: ModalOptions
) => {
  const { defaults } = useContext(SystemContext);
  const { deps, portal, onClose, ...modalProps } = useMemo(
    () => ({
      ...defaults?.dropOptions,
      ...options
    }),
    [options]
  );
  const openModal = useStandaloneTransition<HTMLDivElement, C>(
    (
      { context, handleClose: handleImplicitClose, ...layerTransitionProps },
      ref
    ) => {
      const handleClose = useCallback(() => {
        handleImplicitClose();
        onClose?.();
      }, []);
      const modalTransition = useTransition<HTMLDivElement>(
        (modalTransitionProps, ref) => {
          const clickOutsideRef = useClickOutside<HTMLDivElement>(
            () => isOnTop && handleClose()
          );
          const sharedRef = useSharedRef(null, [ref, clickOutsideRef]);
          const isOnTop = useStack(interactiveStackId);
          const content = useMemo(
            () =>
              render?.({ context, handleClose, ...modalTransitionProps }) ??
              null,
            []
          );
          return (
            <Modal ref={sharedRef} {...modalProps} {...modalTransitionProps}>
              {content}
            </Modal>
          );
        },
        {
          deps: [],
          isMounted: layerTransitionProps.isVisible
        }
      );
      const sharedRef = useSharedRef<HTMLDivElement>(null, [ref]);
      useFocusTrap(sharedRef);
      useEffect(() => {
        return disableScroll();
      }, []);
      return (
        <Layer ref={sharedRef} kind="backdrop" {...layerTransitionProps}>
          {modalTransition}
        </Layer>
      );
    },
    { deps: [onClose, ...deps], portal }
  );
  return openModal;
};
