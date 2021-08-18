import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { ThemeProps } from '../models';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ThemeProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type, ...rest }, ref) => {
    const ThemedButton = useThemed('button', { key: 'button' });
    return <ThemedButton ref={ref} type={type ?? 'button'} {...rest} />;
  }
);

Button.displayName = 'Button';
