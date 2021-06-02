import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { StyleProps } from '../../models';
import { RadioItemProps } from './RadioItemProps';

export interface RadioOptionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof RadioItemProps>,
    RadioItemProps,
    StyleProps {}

export const RadioOption = forwardRef<HTMLDivElement, RadioOptionProps>(
  ({ children, isActive, value, onClick, ...rest }, ref) => {
    const ThemedRadioOption = useThemed('div', { path: 'radio.option' });
    const ThemedRadioOptionChecker = useThemed<'span', RadioItemProps>('span', {
      path: 'radio.option.checker'
    });
    const ThemedRadioOptionLabel = useThemed<'label', RadioItemProps>('label', {
      path: 'radio.option.label'
    });
    return (
      <ThemedRadioOption ref={ref} {...rest}>
        <ThemedRadioOptionChecker onClick={onClick} isActive={isActive} />
        <ThemedRadioOptionLabel onClick={onClick}>
          {children}
        </ThemedRadioOptionLabel>
      </ThemedRadioOption>
    );
  }
);
