import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { ComponentFactory, StyleProps } from '../../models';
import { hash } from '../../utils';

export interface SelectOption {
  name?: ReactNode;
  value: any;
}

export interface SelectOptionsProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  onOptionSelect: (option: SelectOption) => void;
  options: SelectOption[];
  value: any;
}

export const createSelectOptions: ComponentFactory<
  HTMLDivElement,
  SelectOptionsProps
> = ({ themed }) => {
  const ThemedOptions = themed('div', {
    path: 'select.options',
    style: {
      zIndex: 1001
    }
  });
  const ThemedOptionsItem = themed<'div', { isActive?: boolean }>('div', {
    path: 'select.options.item'
  });

  return forwardRef(({ onOptionSelect, options, value, ...rest }, ref) => {
    return (
      <ThemedOptions ref={ref} {...rest}>
        {options.map(v => (
          <ThemedOptionsItem
            isActive={value === v.value}
            key={hash(v)}
            onClick={() => onOptionSelect(v)}
          >
            {v.name ?? v.value}
          </ThemedOptionsItem>
        ))}
      </ThemedOptions>
    );
  });
};
