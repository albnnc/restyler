import React from 'react';
import { System } from '../../models';
import { disableScroll, openTransition, TransitionOptions } from '../../utils';
import { SystemContext } from '../SystemContext';
import { ModalProps } from './Modal';
import { ModalTransition } from './ModalTransition';

export interface ModalOptions
  extends TransitionOptions,
    Omit<ModalProps, 'children'> {}

export const openModal = (options: { system: System } & ModalOptions) => {
  const { system, mountNode, render, onClose, onCloseEnd, ...rest } = {
    ...options.system.defaults?.modalOptions,
    ...options
  };
  const enableScroll = disableScroll();
  openTransition({
    mountNode,
    onClose: () => {
      enableScroll();
      onClose?.();
    },
    onCloseEnd,
    render: props => (
      <SystemContext.Provider value={system}>
        <ModalTransition {...props} {...rest}>
          {render?.(props)}
        </ModalTransition>
      </SystemContext.Provider>
    )
  });
};
