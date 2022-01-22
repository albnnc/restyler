import React, { forwardRef, HTMLAttributes } from 'react';
import { StandaloneTransitionerProps, useThemed } from '../../hooks';
import { ThemeProps } from '../../models';

export interface ModalFooterProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<StandaloneTransitionerProps>,
    ThemeProps {}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  (props, ref) => {
    const ThemedModalFooter = useThemed('div', 'modal.footer');
    return <ThemedModalFooter ref={ref} {...props} />;
  }
);
