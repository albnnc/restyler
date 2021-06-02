import React, { forwardRef, useContext, HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '../../models';
import { MenuContext } from './MenuContext';

export interface MenuGroupProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  id: string;
  title: string;
}

export const createMenuGroup: ComponentFactory<
  HTMLDivElement,
  MenuGroupProps
> = ({ registry, themed }) => {
  const { Collapse } = registry;
  const MenuGroupTitle = themed<'div', { isActive: boolean }>('div', {
    path: 'menu.group.title'
  });
  const MenuGroupItems = themed('div', { path: 'menu.group.items' });
  const ThemedMenuGroup = themed('div', { path: 'menu.group' });
  return forwardRef(({ id, title, children, ...rest }, ref) => {
    const { activeIds, onGroupClick } = useContext(MenuContext);
    return (
      <ThemedMenuGroup ref={ref} {...rest}>
        <MenuGroupTitle
          isActive={activeIds.includes(id)}
          onClick={() => onGroupClick(id)}
        >
          {title}
        </MenuGroupTitle>
        <Collapse isOpen={activeIds.includes(id)}>
          <MenuGroupItems>{children}</MenuGroupItems>
        </Collapse>
      </ThemedMenuGroup>
    );
  });
};
