import React, {
  forwardRef,
  useContext,
  useMemo,
  AllHTMLAttributes
} from 'react';
import { useThemedFactory } from '../../hooks';
import { ThemeProps } from '../../models';
import { MenuContext } from './MenuContext';

export interface MenuItemProps
  extends AllHTMLAttributes<HTMLAnchorElement>,
    ThemeProps {
  id: string;
}

export const MenuItem = forwardRef<HTMLAnchorElement, MenuItemProps>(
  ({ id, onClick, children, ...rest }, ref) => {
    const useThemed = useThemedFactory<{ isActive: boolean }>();
    const ThemedMenuItem = useThemed('a', 'menu.item');
    const ThemedMenuItemTitle = useThemed('div', 'menu.item.title');
    const { activeIds, onItemClick } = useContext(MenuContext);
    const isActive = useMemo(() => activeIds.includes(id), [activeIds]);
    const extraProps = { isActive };
    return (
      <ThemedMenuItem
        ref={ref}
        onClick={e => {
          onItemClick(id);
          onClick?.(e);
        }}
        {...extraProps}
        {...rest}
      >
        <ThemedMenuItemTitle {...extraProps}>{children}</ThemedMenuItemTitle>
      </ThemedMenuItem>
    );
  }
);

MenuItem.displayName = 'MenuItem';
