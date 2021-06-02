import React, { forwardRef, useContext, HTMLAttributes } from 'react';
import { ComponentFactory, StyleProps } from '~lib/models';
import { MenuContext } from './MenuContext';

export interface MenuItemProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  id: string;
}

export const createMenuItem: ComponentFactory<
  HTMLDivElement,
  MenuItemProps
> = ({ themed }) => {
  const MenuItemTitle = themed<'div', { isActive: boolean }>('div', {
    path: 'menu.item.title'
  });
  const ThemedMenuItem = themed('div', { path: 'menu.item' });
  return forwardRef(({ id, onClick, children, ...rest }, ref) => {
    const { activeIds, onItemClick } = useContext(MenuContext);
    return (
      <ThemedMenuItem ref={ref}>
        <MenuItemTitle
          isActive={activeIds.includes(id)}
          onClick={e => {
            onItemClick(id);
            onClick?.(e);
          }}
          {...rest}
        >
          {children}
        </MenuItemTitle>
      </ThemedMenuItem>
    );
  });
};
