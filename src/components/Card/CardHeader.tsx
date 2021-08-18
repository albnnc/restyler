import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemeProps } from '../../models';

export interface CardHeaderProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemeProps {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  (props, ref) => {
    const ThemedCardHeader = useThemed('div', { id: 'card.header' });
    return <ThemedCardHeader ref={ref} {...props} />;
  }
);
