import { useThemed } from 'lib/hooks';
import { forwardRef, HTMLAttributes } from 'react';
import { StyleProps } from '../../models';

export interface CardFooterProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  (props, ref) => {
    const ThemedCardFooter = useThemed('div', { path: 'card.footer' });
    return <ThemedCardFooter ref={ref} {...props} />;
  }
);
