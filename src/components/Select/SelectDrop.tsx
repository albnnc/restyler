import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemeProps } from '../../models';

export interface SelectDropProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemeProps {}

export const SelectDrop = forwardRef<HTMLDivElement, SelectDropProps>(
  (props, ref) => {
    const ThemedSelectDrop = useThemed('div', { id: 'select.drop' });
    return <ThemedSelectDrop ref={ref} {...props} />;
  }
);

SelectDrop.displayName = 'SelectDrop';
