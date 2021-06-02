import { ReactNode } from 'react';
import { Children } from 'react';

type GetChildren = (
  children: ReactNode
) => Array<Exclude<ReactNode, boolean | null | undefined>>;

export const getChildren: GetChildren = children =>
  Children.toArray(children).filter(child => {
    if (typeof child === 'string') {
      return !!child.trim();
    }
    return !!child;
  });
