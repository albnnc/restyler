import React, { forwardRef, useEffect, useState } from 'react';
import { useClickOutside, useSharedRef, useTransition } from '../../hooks';
import { ComponentFactory } from '../../models';
import { TransitionRendererProps } from '../../utils';
import { ModalProps } from './Modal';

export interface ModalTransitionProps
  extends TransitionRendererProps,
    ModalProps {}

export const createModalTransition: ComponentFactory<
  HTMLDivElement,
  ModalTransitionProps
> = ({ registry }) => {
  const ModalTransition = forwardRef<HTMLDivElement, ModalTransitionProps>(
    ({ handleClose, handleCloseEnd, isOpen, ...rest }, ref) => {
      const { Layer, Modal } = registry;

      const [
        isModalMounted,
        { ref: modalRef, ...modalTransitionProps }
      ] = useTransition<HTMLDivElement>(isOpen);
      const [isLayerMounted, layerTransitionProps] = useTransition<
        HTMLDivElement
      >(isOpen);

      const sharedRef = useSharedRef<HTMLDivElement>(null, [ref, modalRef]);

      const [wasMounted, setWasMounted] = useState(false);
      useEffect(() => {
        if (wasMounted && !isModalMounted && !isLayerMounted) {
          handleCloseEnd?.();
          setWasMounted(false);
        } else {
          setWasMounted(true);
        }
      }, [isModalMounted, isLayerMounted]);

      useClickOutside(sharedRef, e => {
        // do not close if closing another modal actually
        if (layerTransitionProps.ref.current?.isSameNode(e.target as Element)) {
          handleClose?.();
        }
      });

      if (!isLayerMounted) {
        return null;
      }

      return (
        <Layer {...layerTransitionProps} kind="backdrop">
          {isModalMounted && (
            <Modal ref={sharedRef} {...modalTransitionProps} {...rest} />
          )}
        </Layer>
      );
    }
  );
  return ModalTransition;
};
