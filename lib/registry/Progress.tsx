import { ProgressHTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '../models';

export interface ProgressProps
  extends ProgressHTMLAttributes<HTMLProgressElement>,
    StyleProps {}

export const createProgress: ComponentFactory<
  HTMLProgressElement,
  ProgressProps
> = ({ themed }) => themed('progress', { path: 'progress' });
