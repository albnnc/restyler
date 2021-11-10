import React, { forwardRef, InputHTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { FormWidgetProps, ThemeProps } from '../models';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, keyof FormWidgetProps>,
    FormWidgetProps<string | number>,
    ThemeProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, value, onChange, ...rest }, ref) => {
    const ThemedInput = useThemed('input', 'input');
    return (
      <ThemedInput
        ref={ref}
        type={type ?? 'text'}
        value={value ?? ''}
        onChange={e => {
          let value: string | number = e.target.value;
          if (type === 'number') {
            value = parseFloat(value);
          }
          onChange?.(value);
        }}
        {...rest}
      />
    );
  }
);

Input.displayName = 'Input';
