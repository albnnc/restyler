import { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { StyleProps } from '../../models';

export interface SelectDropProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {}

export const SelectDrop = forwardRef<HTMLDivElement, SelectDropProps>(
  (props, ref) => {
    const ThemedSelectDrop = useThemed('div', {
      path: 'select.drop',
      style: {
        zIndex: 1001
      }
    });
    return <ThemedSelectDrop ref={ref} {...props} />;
  }
);
