import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { StyleProps } from '../../models';

export interface RadioOptionProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  isActive?: boolean;
  onClick?: () => void;
  value?: any;
}

export const RadioOption = forwardRef<HTMLDivElement, RadioOptionProps>(
  ({ children, isActive, value, onClick, ...rest }, ref) => {
    const ThemedRadioOption = useThemed('div', { path: 'radio.option' });
    const ThemedRadioOptionChecker = useThemed<
      'span',
      Pick<RadioOptionProps, 'isActive' | 'value'>
    >('span', {
      path: 'radio.option.checker'
    });
    const ThemedRadioOptionLabel = useThemed<
      'label',
      Pick<RadioOptionProps, 'isActive' | 'value'>
    >('label', {
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

RadioOption.displayName = 'RadioOption';
