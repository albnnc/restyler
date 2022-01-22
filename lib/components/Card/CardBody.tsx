import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemeProps } from '../../models';

export interface CardBodyProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemeProps {}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  (props, ref) => {
    const ThemedCardBody = useThemed('div', 'card.body');
    return <ThemedCardBody ref={ref} {...props} />;
  }
);

CardBody.displayName = 'CardBody';
