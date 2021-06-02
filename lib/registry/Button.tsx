import { ButtonHTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '~lib/models';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    StyleProps {}

export const createButton: ComponentFactory<HTMLButtonElement, ButtonProps> = ({
  themed
}) =>
  themed('button', {
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
