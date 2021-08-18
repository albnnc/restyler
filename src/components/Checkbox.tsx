import React, { forwardRef, HTMLAttributes, useCallback } from 'react';
import { useThemedFactory } from '../hooks';
import { FormWidgetProps, ThemeProps } from '../models';

export interface CheckboxProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps,
    ThemeProps {}

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  ({ children, value, placeholder, disabled, onChange, ...rest }, ref) => {
    const useThemed =
      useThemedFactory<
        Pick<CheckboxProps, 'value' | 'placeholder' | 'disabled'>
      >();
    const ThemedCheckbox = useThemed('div', { id: 'checkbox' });
    const ThemedCheckboxChecker = useThemed('span', {
      id: 'checkbox.checker'
    });
    const ThemedCheckboxLabel = useThemed('label', { id: 'checkbox.label' });
    const extraProps = { value, placeholder, disabled };
    const handleClick = useCallback(() => {
      onChange?.(!value);
    }, [onChange]);
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
