import React, { forwardRef, HTMLAttributes } from 'react';
import { StandaloneTransitionerProps, useThemed } from '../hooks';
import { StyleProps } from '../models';

export interface ModalProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<StandaloneTransitionerProps>,
    StyleProps {}

export const Modal = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const ThemedModal = useThemed('div', { path: 'modal' });
  return <ThemedModal ref={ref} {...props} />;
});

Modal.displayName = 'Modal';
