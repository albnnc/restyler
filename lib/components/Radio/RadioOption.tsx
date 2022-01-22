import React, { forwardRef, HTMLAttributes } from 'react';
import { useThemedFactory } from '../../hooks';
import { FormWidgetDepiction, ThemeProps } from '../../models';

export interface RadioOptionProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemeProps,
    FormWidgetDepiction {
  isActive?: boolean;
  onClick?: () => void;
  value?: any;
}

export const RadioOption = forwardRef<HTMLDivElement, RadioOptionProps>(
  (
    {
      children,
      isActive,
      value,
      disabled,
      readOnly,
      invalid,
      required,
      onClick,
      ...rest
    },
    ref
  ) => {
    const useThemed = useThemedFactory<
      FormWidgetDepiction & Pick<RadioOptionProps, 'isActive'>
    >();
    const ThemedRadioOption = useThemed('div', 'radio.option');
    const ThemedRadioOptionChecker = useThemed('span', 'radio.option.checker');
    const ThemedRadioOptionLabel = useThemed('label', 'radio.option.label');
    const extraProps = { isActive, disabled, readOnly, invalid, required };
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
