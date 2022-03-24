import React, { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { Layer, Modal, ModalProps } from '../../components';
import { disableScroll } from '../../utils';
import { useClickOutside } from '../useClickOutside';
import { useFocusTrap } from '../useFocusTrap';
import { useSharedRef } from '../useSharedRef';
import { interactiveStackId, useStack } from '../useStack';
import {
  StandaloneTransitionerProps,
  useStandaloneTransition
} from '../useStandaloneTransition';
import { useTransition } from '../useTransition';

export interface ModalRendererProps extends StandaloneTransitionerProps {}

export interface ModalOptions extends Omit<ModalProps, 'children'> {
  onClose?: () => void;
  render: (props: ModalRendererProps) => ReactNode;
}

export const useModalOpener = () =>
  useStandaloneTransition<HTMLDivElement, ModalOptions>(
    (
      {
        context: { onClose, render, ...modalProps } = {} as ModalOptions,
        handleClose: handleImplicitClose,
        ...layerTransitionProps
      },
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
          const sharedRed = useSharedRef(null, [ref, clickOutsideRef]);
          const isOnTop = useStack(interactiveStackId);
          const content = useMemo(
            () => render?.({ handleClose, ...modalTransitionProps }) ?? null,
            []
          );
          return (
            <Modal ref={sharedRed} {...modalProps} {...modalTransitionProps}>
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
    { deps: [] }
  );
