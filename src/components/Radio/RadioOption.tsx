import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemeProps } from '../../models';

export interface RadioOptionProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemeProps {
  isActive?: boolean;
  onClick?: () => void;
  value?: any;
}

export const RadioOption = forwardRef<HTMLDivElement, RadioOptionProps>(
  ({ children, isActive, value, onClick, ...rest }, ref) => {
    const ThemedRadioOption = useThemed('div', 'radio.option');
    const ThemedRadioOptionChecker = useThemed<
      'span',
      Pick<RadioOptionProps, 'isActive' | 'value'>
    >('span', 'radio.option.checker');
    const ThemedRadioOptionLabel = useThemed<
      'label',
      Pick<RadioOptionProps, 'isActive' | 'value'>
    >('label', 'radio.option.label');
    const themedProps = { isActive, value };
    return (
      <ThemedRadioOption ref={ref} {...rest}>
        <ThemedRadioOptionChecker onClick={onClick} {...themedProps} />
        <ThemedRadioOptionLabel onClick={onClick} {...themedProps}>
          {children}
        </ThemedRadioOptionLabel>
      </ThemedRadioOption>
    );
  }
);

RadioOption.displayName = 'RadioOption';
