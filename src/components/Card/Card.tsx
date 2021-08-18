import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemeProps } from '../../models';

export interface CardProps extends HTMLAttributes<HTMLDivElement>, ThemeProps {}

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const ThemedCard = useThemed('div', { key: 'body' });
  return <ThemedCard ref={ref} {...props} />;
});

Card.displayName = 'Card';
