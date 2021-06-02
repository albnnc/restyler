import React, { forwardRef, InputHTMLAttributes } from 'react';
import { ComponentFactory, FormWidgetProps, StyleProps } from '../models';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, keyof FormWidgetProps>,
    FormWidgetProps<string>,
    StyleProps {}

export const createInput: ComponentFactory<HTMLInputElement, InputProps> = ({
  themed
}) => {
  const ThemedInput = themed('input', {
    path: 'input',
    style: {
      border: 'none',
      background: 'transparent',
      outline: 'none',
      padding: 0,
      margin: 0
    }
  });
  return forwardRef(({ onChange, ...rest }, ref) => {
    return (
      <ThemedInput
        ref={ref}
        type="text"
        onChange={e => {
          onChange?.(e.target.value);
        }}
        {...rest}
      />
    );
  });
};
