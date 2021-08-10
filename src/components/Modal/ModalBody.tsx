import React, { forwardRef, HTMLAttributes } from 'react';
import { StandaloneTransitionerProps, useThemed } from '../../hooks';
import { StyleProps } from '../../models';

export interface ModalBodyProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<StandaloneTransitionerProps>,
    StyleProps {}

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  (props, ref) => {
    const ThemedModalBody = useThemed('div', { path: 'modal.body' });
    return <ThemedModalBody ref={ref} {...props} />;
  }
);

ModalBody.displayName = 'ModalBody';
