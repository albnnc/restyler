import { HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '../../models';

export interface CardBodyProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {}

export const createCardBody: ComponentFactory<
  HTMLDivElement,
  CardBodyProps
> = ({ themed }) => themed('div', { path: 'card.body' });
