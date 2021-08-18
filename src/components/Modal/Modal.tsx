import React, { forwardRef, HTMLAttributes } from 'react';
import { StandaloneTransitionerProps, useThemed } from '../../hooks';
import { ThemedProps } from '../../models';

export interface ModalProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<StandaloneTransitionerProps>,
    ThemedProps {}

export const Modal = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const ThemedModal = useThemed('div', { key: 'modal' });
  return <ThemedModal ref={ref} {...props} />;
});
