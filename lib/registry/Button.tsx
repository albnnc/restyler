import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '../models';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    StyleProps {}

export const createButton: ComponentFactory<HTMLButtonElement, ButtonProps> = ({
  themed
}) => {
  const ThemedButton = themed('button', {
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
  return forwardRef((props, ref) => (
    <ThemedButton ref={ref} type="button" {...props} />
  ));
};
