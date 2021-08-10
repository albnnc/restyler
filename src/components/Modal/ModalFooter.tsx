import React, { forwardRef, HTMLAttributes } from 'react';
import { StandaloneTransitionerProps, useThemed } from '../../hooks';
import { StyleProps } from '../../models';

export interface ModalFooterProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<StandaloneTransitionerProps>,
    StyleProps {}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  (props, ref) => {
    const ThemedModalFooter = useThemed('div', { path: 'modal.footer' });
    return <ThemedModalFooter ref={ref} {...props} />;
  }
);

ModalFooter.displayName = 'ModalFooter';
