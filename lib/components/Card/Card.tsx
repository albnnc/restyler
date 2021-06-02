import { useThemed } from 'lib/hooks';
import { forwardRef, HTMLAttributes } from 'react';
import { StyleProps } from '../../models';

export interface CardProps extends HTMLAttributes<HTMLDivElement>, StyleProps {}

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const ThemedCard = useThemed('div', { path: 'card' });
  return <ThemedCard ref={ref} {...props} />;
});
