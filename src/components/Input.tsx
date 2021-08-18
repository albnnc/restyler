import React, { forwardRef, InputHTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { FormWidgetProps, ThemedProps } from '../models';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, keyof FormWidgetProps>,
    FormWidgetProps<string>,
    ThemedProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, ...rest }, ref) => {
    const ThemedInput = useThemed('input', { key: 'input' });
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
