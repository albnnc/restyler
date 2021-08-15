import React, { forwardRef, HTMLAttributes } from 'react';
import { StandaloneTransitionerProps, useThemed } from '../../hooks';
import { ThemeProps } from '../../models';

export interface ModalProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<StandaloneTransitionerProps>,
    ThemeProps {}

export const Modal = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const ThemedModal = useThemed('div', 'modal');
  return <ThemedModal ref={ref} {...props} />;
});

Modal.displayName = 'Modal';
