import React, { createElement, useMemo, useRef } from 'react';
import { Layer, Modal, ModalProps } from '../components';
import { useClickOutside } from './useClickOutside';
import {
  StandaloneTransitioner,
  useStandaloneTransition
} from './useStandaloneTransition';

export interface ModalOptions extends ModalProps {
  render: StandaloneTransitioner;
}

export const useModal = () => {
  const openModal = useStandaloneTransition<
    HTMLDivElement,
    ModalProps & { render: StandaloneTransitioner }
  >(
    ({ options: { render, ...modalProps } = {}, ...rest }) => {
      const ref = useRef<HTMLDivElement>(null);
      const content = useMemo(
        () => (render ? createElement(render, rest) : null),
        []
      );
      useClickOutside(ref, () => {
        rest.handleClose();
      });
      return (
        <Layer kind="backdrop" {...rest}>
          <Modal ref={ref} {...rest} {...modalProps}>
            {content}
          </Modal>
        </Layer>
      );
    },
    {
      deps: []
    }
  );
  return { openModal };
};
