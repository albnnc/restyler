import React, { forwardRef, HTMLAttributes } from 'react';
import { StandaloneTransitionerProps, useThemed } from '../../hooks';
import { ThemeProps } from '../../models';

export interface ModalHeaderProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<StandaloneTransitionerProps>,
    ThemeProps {}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  (props, ref) => {
    const ThemedModalHeader = useThemed('div', 'modal.header');
    return <ThemedModalHeader ref={ref} {...props} />;
  }
);
