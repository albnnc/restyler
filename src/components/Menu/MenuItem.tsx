import React, { forwardRef, useContext, HTMLAttributes } from 'react';
import { useThemed } from '../../hooks';
import { ThemedProps } from '../../models';
import { MenuContext } from './MenuContext';

export interface MenuItemProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemedProps {
  id: string;
}

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ id, onClick, children, ...rest }, ref) => {
    const ThemedMenuItemTitle = useTyped('menu.item.title');
    const ThemedMenuItem = useTyped('menu.item');
    const { activeIds, onItemClick } = useContext(MenuContext);
    const isActive = activeIds.includes(id);
    return (
      <ThemedMenuItem ref={ref} isActive={isActive}>
        <ThemedMenuItemTitle
          isActive={isActive}
          onClick={e => {
            onItemClick(id);
            onClick?.(e);
          }}
          {...rest}
        >
          {children}
        </ThemedMenuItemTitle>
      </ThemedMenuItem>
    );
  }
);

MenuItem.displayName = 'MenuItem';

const useTyped = (key: string) =>
  useThemed<'div', { isActive: boolean }>('div', { key });
