import React, { forwardRef, HTMLAttributes } from 'react';
import { StandaloneTransitionerProps, useThemed } from '../../hooks';
import { ThemedProps } from '../../models';

export interface ModalFooterProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<StandaloneTransitionerProps>,
    ThemedProps {}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  (props, ref) => {
    const ThemedModalFooter = useThemed('div', { key: 'modal.footer' });
    return <ThemedModalFooter ref={ref} {...props} />;
  }
);
