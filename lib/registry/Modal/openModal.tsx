import React from 'react';
import { disableScroll, openTransition, TransitionOptions } from '../../utils';
import { ModalProps } from './Modal';

export interface ModalOptions
  extends TransitionOptions,
    Omit<ModalProps, 'children'> {}

export const createOpenModal = ({ registry }) => ({
  mountNode,
  render,
  onClose,
  onCloseEnd,
  ...rest
}: ModalOptions) => {
  const { ModalTransition } = registry;
  const enableScroll = disableScroll();
  openTransition({
    mountNode,
    onClose: () => {
      enableScroll();
      onClose?.();
    },
    onCloseEnd,
    render: props => (
      <ModalTransition {...props} {...rest}>
        {render?.(props)}
      </ModalTransition>
    )
  });
};
