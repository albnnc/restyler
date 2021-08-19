import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemedFactory } from '../../hooks';
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
    const useThemed =
      useThemedFactory<Pick<RadioOptionProps, 'isActive' | 'value'>>();
    const ThemedRadioOption = useThemed('div', 'radio.option');
    const ThemedRadioOptionChecker = useThemed('span', 'radio.option.checker');
    const ThemedRadioOptionLabel = useThemed('label', 'radio.option.label');
    const extraProps = { isActive, value };
    return (
      <ThemedRadioOption ref={ref} {...rest} {...extraProps}>
        <ThemedRadioOptionChecker onClick={onClick} {...extraProps} />
        <ThemedRadioOptionLabel onClick={onClick} {...extraProps}>
          {children}
        </ThemedRadioOptionLabel>
      </ThemedRadioOption>
    );
  }
);

RadioOption.displayName = 'RadioOption';
