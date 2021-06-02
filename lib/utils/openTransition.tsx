import React, { ReactNode } from 'react';
import {
  render as renderComponentAtNode,
  unmountComponentAtNode
} from 'react-dom';
import { TransitionState } from '../hooks';

export interface TransitionRendererProps {
  handleClose: () => void;
  handleCloseEnd: () => void;
  isOpen: boolean;
}

export interface TransitionRenderer {
  (props: TransitionRendererProps): ReactNode;
}

export interface TransitionOptions {
  mountNode?: Element;
  onClose?: () => void;
  onCloseEnd?: () => void;
  render?: TransitionRenderer;
}

export const openTransition = ({
  mountNode,
  render,
  onClose,
  onCloseEnd
}: TransitionOptions) => {
  const rootNode = document.body;
  const holderNode = document.createElement('div');
  const targetNode = mountNode ?? rootNode;

  let state: TransitionState = 'enter';
  let isOpen = false;

  const handleClose = () => {
    onClose?.();
    isOpen = false;
    state = undefined;
    renderOnce();
  };

  const handleCloseEnd = () => {
    unmountComponentAtNode(holderNode);
    targetNode.removeChild(holderNode);
    onCloseEnd?.();
  };

  const renderOnce = () =>
    renderComponentAtNode(
      <>{render?.({ handleClose, handleCloseEnd, isOpen })}</>,
      holderNode,
      () => {
        if (!isOpen) {
          if (state === 'enter') {
            isOpen = true;
            state = undefined;
            renderOnce();
          } else if (state === undefined) {
            state = 'leave';
            renderOnce();
          }
        }
      }
    );

  const open = () => {
    targetNode.appendChild(holderNode);
    renderOnce();
  };

  open();
};
