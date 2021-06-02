import { HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '../../models';

export interface FormRowProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {}

export const createFormRow: ComponentFactory<HTMLDivElement, FormRowProps> = ({
  themed
}) => themed('div', { path: 'form.row' });
