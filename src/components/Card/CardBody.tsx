import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { StyleProps } from '../../models';

export interface CardBodyProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  (props, ref) => {
    const ThemedCardBody = useThemed('div', { path: 'card.body' });
    return <ThemedCardBody ref={ref} {...props} />;
  }
);

CardBody.displayName = 'CardBody';
