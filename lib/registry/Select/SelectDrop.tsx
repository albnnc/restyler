import { HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '../../models';

export interface SelectDropProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {}

export const createSelectDrop: ComponentFactory<
  HTMLDivElement,
  SelectDropProps
> = ({ themed }) =>
  themed('div', {
    path: 'select.drop',
    style: {
      zIndex: 1001
    }
  });
