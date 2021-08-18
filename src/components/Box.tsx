import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { ThemeProps } from '../models';

export interface BoxProps extends HTMLAttributes<HTMLDivElement>, ThemeProps {}

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const ThemedBox = useThemed('div', { key: 'box' });
  return <ThemedBox ref={ref} {...props} />;
});

Box.displayName = 'Box';
