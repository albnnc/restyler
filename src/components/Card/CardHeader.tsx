import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { StyleProps } from '../../models';

export interface CardHeaderProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  (props, ref) => {
    const ThemedCardHeader = useThemed('div', { path: 'card.header' });
    return <ThemedCardHeader ref={ref} {...props} />;
  }
);

CardHeader.displayName = 'CardHeader';
