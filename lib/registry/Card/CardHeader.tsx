import { HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '~lib/models';

export interface CardHeaderProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {}

export const createCardHeader: ComponentFactory<
  HTMLDivElement,
  CardHeaderProps
> = ({ themed }) => themed('div', { path: 'card.header' });
