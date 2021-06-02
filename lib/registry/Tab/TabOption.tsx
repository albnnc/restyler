import React, { forwardRef, HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '~lib/models';

export interface TabOptionProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  id: string;
  isActive?: boolean;
}

export const createTabOption: ComponentFactory<
  HTMLDivElement,
  TabOptionProps
> = ({ themed }) => {
  const ThemedTabOption = themed<'div', TabOptionProps>('div', {
    path: 'tab.option'
  });
  return forwardRef((props, ref) => {
    return <ThemedTabOption ref={ref} {...props} />;
  });
};
