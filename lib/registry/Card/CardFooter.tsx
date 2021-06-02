import { HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '~lib/models';

export interface CardFooterProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {}

export const createCardFooter: ComponentFactory<
  HTMLDivElement,
  CardFooterProps
> = ({ themed }) => themed('div', { path: 'card.footer' });
