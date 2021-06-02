import React, { forwardRef, useEffect, useRef, useState } from 'react';
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

      const modalRef = useSharedRef<HTMLDivElement>(null, [ref]);
      const [isModalMounted, modalTransitionProps] = useTransition<
        HTMLDivElement
      >(modalRef, isOpen);

      const layerRef = useRef<HTMLDivElement>(null);
      const [isLayerMounted, layerTransitionProps] = useTransition<
        HTMLDivElement
      >(layerRef, isOpen);

      const [wasMounted, setWasMounted] = useState(false);
      useEffect(() => {
        if (wasMounted && !isModalMounted && !isLayerMounted) {
          handleCloseEnd?.();
          setWasMounted(false);
        } else {
          setWasMounted(true);
        }
      }, [isModalMounted, isLayerMounted]);

      useClickOutside(modalRef, e => {
        // do not close if closing another modal actually
        if (layerRef.current?.isSameNode(e.target as Element)) {
          handleClose?.();
        }
      });

      if (!isLayerMounted) {
        return null;
      }

      return (
        <Layer ref={layerRef} {...layerTransitionProps} kind="backdrop">
          {isModalMounted && (
            <Modal ref={modalRef} {...modalTransitionProps} {...rest} />
          )}
        </Layer>
      );
    }
  );
  return ModalTransition;
};
