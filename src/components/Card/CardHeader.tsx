import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemedProps } from '../../models';

export interface CardHeaderProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemedProps {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  (props, ref) => {
    const ThemedCardHeader = useThemed('div', { key: 'card.header' });
    return <ThemedCardHeader ref={ref} {...props} />;
  }
);
