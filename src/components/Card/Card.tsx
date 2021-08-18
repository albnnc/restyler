import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemedProps } from '../../models';

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemedProps {}

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const ThemedCard = useThemed('div', { key: 'body' });
  return <ThemedCard ref={ref} {...props} />;
});

Card.displayName = 'Card';
