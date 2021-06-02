import React, { forwardRef, HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '../../models';
import { RadioItemProps } from './RadioItemProps';

export interface RadioOptionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof RadioItemProps>,
    RadioItemProps,
    StyleProps {}

export const createRadioOption: ComponentFactory<
  HTMLDivElement,
  RadioOptionProps
> = ({ themed }) => {
  const ThemedRadioOption = themed('div', { path: 'radio.option' });
  const ThemedRadioOptionChecker = themed<'span', RadioItemProps>('span', {
    path: 'radio.option.checker'
  });
  const ThemedRadioOptionLabel = themed<'label', RadioItemProps>('label', {
    path: 'radio.option.label'
  });
  return forwardRef(({ children, isActive, value, onClick, ...rest }, ref) => {
    return (
      <ThemedRadioOption ref={ref} {...rest}>
        <ThemedRadioOptionChecker onClick={onClick} isActive={isActive} />
        <ThemedRadioOptionLabel onClick={onClick}>
          {children}
        </ThemedRadioOptionLabel>
      </ThemedRadioOption>
    );
  });
};
