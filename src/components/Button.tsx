import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { StyleProps } from '../models';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    StyleProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type, ...rest }, ref) => {
    const ThemedButton = useThemed('button', {
      path: 'button',
      style: {
        background: 'transparent',
        border: 'none',
        color: 'inherit',
        cursor: 'pointer',
        font: 'inherit',
        margin: 0,
        outline: 'none',
        padding: 0
      }
    });
    return <ThemedButton ref={ref} type={type ?? 'button'} {...rest} />;
  }
);
