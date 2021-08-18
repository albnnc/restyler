import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemedProps } from '../../models';

export interface CardBodyProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemedProps {}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  (props, ref) => {
    const ThemedCardBody = useThemed('div', { key: 'card.body' });
    return <ThemedCardBody ref={ref} {...props} />;
  }
);

CardBody.displayName = 'CardBody';
