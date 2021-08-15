import React, { forwardRef, HTMLAttributes, useCallback } from 'react';
import { useThemed } from '../hooks';
import { FormWidgetProps, ThemeProps } from '../models';

export interface CheckboxProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps,
    ThemeProps {}

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  ({ children, value, onChange, ...rest }, ref) => {
    const ThemedCheckbox = useThemed('div', 'checkbox');
    const ThemedCheckboxChecker = useThemed<'span', FormWidgetProps>(
      'span',
      'checkbox.checker'
    );
    const ThemedCheckboxLabel = useThemed<'label', FormWidgetProps>(
      'label',
      'checkbox.label'
    );
    const handleClick = useCallback(() => {
      onChange?.(!value);
    }, [onChange]);
    return (
      <ThemedCheckbox ref={ref} {...rest}>
        <ThemedCheckboxChecker value={value} onClick={handleClick} />
        <ThemedCheckboxLabel value={value} onClick={handleClick}>
          {children}
        </ThemedCheckboxLabel>
      </ThemedCheckbox>
    );
  }
);

Checkbox.displayName = 'Checkbox';
