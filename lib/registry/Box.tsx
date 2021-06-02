import { HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '../models';

export interface BoxProps extends HTMLAttributes<HTMLDivElement>, StyleProps {}

export const createBox: ComponentFactory<HTMLDivElement, BoxProps> = ({
  themed
}) => themed('div', { path: 'box' });
