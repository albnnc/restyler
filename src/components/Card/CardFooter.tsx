import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemeProps } from '../../models';

export interface CardFooterProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemeProps {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  (props, ref) => {
    const ThemedCardFooter = useThemed('div', 'card.footer');
    return <ThemedCardFooter ref={ref} {...props} />;
  }
);

CardFooter.displayName = 'CardFooter';
