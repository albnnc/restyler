import React, { forwardRef, HTMLAttributes } from 'react';
import { StandaloneTransitionerProps, useThemed } from '../../hooks';
import { ThemedProps } from '../../models';

export interface ModalBodyProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<StandaloneTransitionerProps>,
    ThemedProps {}

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  (props, ref) => {
    const ThemedModalBody = useThemed('div', { key: 'modal.body' });
    return <ThemedModalBody ref={ref} {...props} />;
  }
);
