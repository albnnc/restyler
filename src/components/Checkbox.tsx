import React, { forwardRef, HTMLAttributes, useCallback } from 'react';
import { useThemed } from '../hooks';
import { FormWidgetProps, ThemeProps } from '../models';

export interface CheckboxProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps,
    ThemeProps {}

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  ({ children, value, placeholder, disabled, onChange, ...rest }, ref) => {
    const ThemedCheckbox = useTyped('div', 'checkbox');
    const ThemedCheckboxChecker = useTyped('span', 'checkbox.checker');
    const ThemedCheckboxLabel = useTyped('label', 'checkbox.label');
    const themedProps = { value, placeholder, disabled };
    const handleClick = useCallback(() => {
      onChange?.(!value);
    }, [onChange]);
    return (
      <ThemedCheckbox ref={ref} {...themedProps} {...rest}>
        <ThemedCheckboxChecker onClick={handleClick} {...themedProps} />
        <ThemedCheckboxLabel onClick={handleClick} {...themedProps}>
          {children}
        </ThemedCheckboxLabel>
      </ThemedCheckbox>
    );
  }
);

Checkbox.displayName = 'Checkbox';

const useTyped = <T extends keyof JSX.IntrinsicElements>(
  tag: T,
  path: string
) =>
  useThemed<T, Pick<CheckboxProps, 'value' | 'placeholder' | 'disabled'>>(
    tag,
    path
  );
