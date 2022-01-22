import React, { forwardRef, HTMLAttributes, useCallback } from 'react';
import { useThemedFactory } from '../hooks';
import { FormWidgetDepiction, FormWidgetProps, ThemeProps } from '../models';

export interface CheckboxProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps,
    ThemeProps {}

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  (
    {
      children,
      value,
      disabled,
      readOnly,
      invalid,
      required,
      onChange,
      ...rest
    },
    ref
  ) => {
    const useThemed = useThemedFactory<
      FormWidgetDepiction & Pick<CheckboxProps, 'value'>
    >();
    const ThemedCheckbox = useThemed('div', 'checkbox');
    const ThemedCheckboxChecker = useThemed('span', 'checkbox.checker');
    const ThemedCheckboxLabel = useThemed('label', 'checkbox.label');
    const extraProps = { value, disabled, readOnly, invalid, required };
    const handleClick = useCallback(() => {
      if (disabled || readOnly) {
        return;
      }
      onChange?.(!value);
    }, [onChange, value, disabled, readOnly]);
    return (
      <ThemedCheckbox ref={ref} {...extraProps} {...rest}>
        <ThemedCheckboxChecker onClick={handleClick} {...extraProps} />
        <ThemedCheckboxLabel onClick={handleClick} {...extraProps}>
          {children}
        </ThemedCheckboxLabel>
      </ThemedCheckbox>
    );
  }
);

Checkbox.displayName = 'Checkbox';
