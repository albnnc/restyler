import { Children, isValidElement, ReactNode } from 'react';
import { hash } from './hash';

export interface ChildrenKeyOptions {
  pivots?: string[];
}

export const getChildrenKey = (
  children: ReactNode,
  { pivots = [] }: ChildrenKeyOptions = {}
) => {
  const keys: string[] =
    Children.map(children, child =>
      isValidElement(child)
        ? pivots
            .map(v => child.props[v])
            .concat([child.key])
            .join()
        : child?.toString() ?? ''
    ) ?? [];
  return hash(keys.join());
};
