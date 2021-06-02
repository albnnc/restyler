import { HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '../models';

export interface LayerProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {}

export const createLayer: ComponentFactory<HTMLDivElement, LayerProps> = ({
  themed
}) =>
  themed('div', {
    path: 'layer',
    style: {
      position: 'fixed',
      zIndex: '1000',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh'
    }
  });
