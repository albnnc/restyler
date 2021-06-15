import React, { ReactNode, useCallback, useMemo } from 'react';
import { Layer, Modal, ModalProps } from '../../components';
import { useClickOutside } from '../useClickOutside';
import { useSharedRef } from '../useSharedRef';
import { useStack } from '../useStack';
import {
  StandaloneTransitionerProps,
  useStandaloneTransition
} from '../useStandaloneTransition';
import { useTransition } from '../useTransition';

export interface ModalRendererProps extends StandaloneTransitionerProps {}

export interface ModalOptions extends Omit<ModalProps, 'children'> {
  onClose?: () => void;
  render: (props: StandaloneTransitionerProps) => ReactNode;
}

export const modalStackId = Symbol();

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
          const content = useMemo(
            () => render?.({ handleClose, ...modalTransitionProps }) ?? null,
            []
          );
          const sharedRed = useSharedRef<HTMLDivElement>(null, [ref]);
          const isOnTop = useStack(modalStackId);
          useClickOutside(sharedRed, () => isOnTop && handleClose());
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
      return (
        <Layer ref={ref} kind="backdrop" {...layerTransitionProps}>
          {modalTransition}
        </Layer>
      );
    },
    { deps: [] }
  );
