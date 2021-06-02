import { useThemed } from 'lib/hooks';
import { forwardRef, HTMLAttributes } from 'react';
import { StyleProps } from '../models';

export interface BoxProps extends HTMLAttributes<HTMLDivElement>, StyleProps {}

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const ThemedBox = useThemed('div', { path: 'box' });
  return <ThemedBox ref={ref} {...props} />;
});
