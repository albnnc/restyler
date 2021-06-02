import { HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '../../models';

export interface TableCaptionProps
  extends HTMLAttributes<HTMLElement>,
    StyleProps {
  align?: string;
  valign?: string;
}

export const createTableCaption: ComponentFactory<
  HTMLElement,
  TableCaptionProps
> = ({ themed }) => themed('caption', { path: 'table.caption' });
