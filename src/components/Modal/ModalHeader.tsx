import React, { forwardRef, HTMLAttributes } from 'react';
import { StandaloneTransitionerProps, useThemed } from '../../hooks';
import { ThemedProps } from '../../models';

export interface ModalHeaderProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<StandaloneTransitionerProps>,
    ThemedProps {}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  (props, ref) => {
    const ThemedModalHeader = useThemed('div', { key: 'modal.header' });
    return <ThemedModalHeader ref={ref} {...props} />;
  }
);
