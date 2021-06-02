import { HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '~lib/models';

export interface CardProps extends HTMLAttributes<HTMLDivElement>, StyleProps {}

export const createCard: ComponentFactory<HTMLDivElement, CardProps> = ({
  themed
}) => themed('div', { path: 'card' });
