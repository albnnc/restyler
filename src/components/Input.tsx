import React, { forwardRef, InputHTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { FormWidgetProps, StyleProps } from '../models';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, keyof FormWidgetProps>,
    FormWidgetProps<string>,
    StyleProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, ...rest }, ref) => {
    const ThemedInput = useThemed('input', {
      path: 'input',
      style: {
        border: 'none',
        background: 'transparent',
        outline: 'none',
        padding: 0,
        margin: 0
      }
    });
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
