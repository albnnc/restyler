import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemedProps } from '../../models';

export interface SelectDropProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemedProps {}

export const SelectDrop = forwardRef<HTMLDivElement, SelectDropProps>(
  (props, ref) => {
    const ThemedSelectDrop = useThemed('div', { key: 'select.drop' });
    return <ThemedSelectDrop ref={ref} {...props} />;
  }
);

SelectDrop.displayName = 'SelectDrop';
