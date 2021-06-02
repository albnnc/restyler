import { HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '../../models';

export interface ModalProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {}

export const createModal: ComponentFactory<HTMLDivElement, ModalProps> = ({
  themed
}) => themed('div', { path: 'modal' });
