import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemedProps } from '../../models';

export interface CardFooterProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemedProps {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  (props, ref) => {
    const ThemedCardFooter = useThemed('div', { key: 'card.footer' });
    return <ThemedCardFooter ref={ref} {...props} />;
  }
);

CardFooter.displayName = 'CardFooter';
