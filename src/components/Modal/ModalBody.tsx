import React, { forwardRef, HTMLAttributes } from 'react';
import { StandaloneTransitionerProps, useThemed } from '../../hooks';
import { ThemeProps } from '../../models';

export interface ModalBodyProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<StandaloneTransitionerProps>,
    ThemeProps {}

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  (props, ref) => {
    const ThemedModalBody = useThemed('div', 'modal.body');
    return <ThemedModalBody ref={ref} {...props} />;
  }
);
