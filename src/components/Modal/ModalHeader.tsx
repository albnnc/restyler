import React, { forwardRef, HTMLAttributes } from 'react';
import { StandaloneTransitionerProps, useThemed } from '../../hooks';
import { StyleProps } from '../../models';

export interface ModalHeaderProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<StandaloneTransitionerProps>,
    StyleProps {}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  (props, ref) => {
    const ThemedModalHeader = useThemed('div', { path: 'modal.header' });
    return <ThemedModalHeader ref={ref} {...props} />;
  }
);

ModalHeader.displayName = 'ModalHeader';
