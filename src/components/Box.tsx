import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { StyleProps } from '../models';

export interface BoxProps extends HTMLAttributes<HTMLDivElement>, StyleProps {}

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const ThemedBox = useThemed('div', { path: 'box' });
  return <ThemedBox ref={ref} {...props} />;
});
