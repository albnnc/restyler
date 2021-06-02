import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { StyleProps } from '../../models';

export interface SelectOptionProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  isActive?: boolean;
  value: any;
}

export const SelectOption = forwardRef<HTMLDivElement, SelectOptionProps>(
  ({ value, children, ...rest }, ref) => {
    const ThemedOption = useThemed<'div', SelectOptionProps>('div', {
      path: 'select.option'
    });
    return (
      <ThemedOption ref={ref} value={value} {...rest}>
        {children ?? value?.toString()}
      </ThemedOption>
    );
  }
);
