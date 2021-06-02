import React, { forwardRef, HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '../../models';

export interface SelectOptionProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  isActive?: boolean;
  value: any;
}

export const createSelectOption: ComponentFactory<
  HTMLDivElement,
  SelectOptionProps
> = ({ themed }) => {
  const ThemedOption = themed<'div', SelectOptionProps>('div', {
    path: 'select.option'
  });
  return forwardRef(({ value, children, ...rest }, ref) => {
    return (
      <ThemedOption ref={ref} value={value} {...rest}>
        {children ?? value?.toString()}
      </ThemedOption>
    );
  });
};
