import React, { forwardRef, InputHTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { FormWidgetProps, ThemeProps } from '../models';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, keyof FormWidgetProps>,
    FormWidgetProps<string>,
    ThemeProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, ...rest }, ref) => {
    const ThemedInput = useThemed('input', 'input');
    return (
      <ThemedInput
        ref={ref}
        type="text"
        value={value ?? ''}
        onChange={e => {
          onChange?.(e.target.value);
        }}
        {...rest}
      />
    );
  }
);

Input.displayName = 'Input';
