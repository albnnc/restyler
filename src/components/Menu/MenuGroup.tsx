import React, {
  forwardRef,
  useContext,
  HTMLAttributes,
  ReactNode,
  useMemo
} from 'react';
import { useThemedFactory } from '../../hooks';
import { ThemeProps } from '../../models';
import { getChildrenKey } from '../../utils';
import { Collapse } from '../Collapse';
import { MenuContext } from './MenuContext';

export interface MenuGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    ThemeProps {
  id: string;
  title: ReactNode;
}

export const MenuGroup = forwardRef<HTMLDivElement, MenuGroupProps>(
  ({ id, title, children, ...rest }, ref) => {
    const useThemed = useThemedFactory<{ isActive: boolean }>();
    const MenuGroupTitle = useThemed('div', 'menu.group.title');
    const MenuGroupItems = useThemed('div', 'menu.group.items');
    const ThemedMenuGroup = useThemed('div', 'menu.group');
    const { activeIds, onGroupClick } = useContext(MenuContext);
    const isActive = useMemo(() => activeIds.includes(id), [activeIds]);
    // Need to be memoized since content memoization depends on extraProps.
    const extraProps = useMemo(() => ({ isActive }), [isActive]);
    const content = useMemo(
      () => <MenuGroupItems {...extraProps}>{children}</MenuGroupItems>,
      [extraProps, getChildrenKey(children, { pivots: ['id'] })]
    );
    return (
      <ThemedMenuGroup ref={ref} {...extraProps} {...rest}>
        <MenuGroupTitle onClick={() => onGroupClick(id)} {...extraProps}>
          {title}
        </MenuGroupTitle>
        <Collapse isOpen={isActive}>{content}</Collapse>
      </ThemedMenuGroup>
    );
  }
);

MenuGroup.displayName = 'MenuGroup';
