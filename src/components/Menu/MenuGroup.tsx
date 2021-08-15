import React, {
  forwardRef,
  useContext,
  HTMLAttributes,
  ReactNode,
  useMemo,
  Children,
  isValidElement
} from 'react';
import { useThemed } from '../../hooks';
import { ThemeProps } from '../../models';
import { getChildrenKey, hash } from '../../utils';
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
    const MenuGroupTitle = useThemed<'div', { isActive: boolean }>(
      'div',
      'menu.group.title'
    );
    const MenuGroupItems = useThemed('div', 'menu.group.items');
    const ThemedMenuGroup = useThemed('div', 'menu.group');
    const content = useMemo(
      () => <MenuGroupItems>{children}</MenuGroupItems>,
      [getChildrenKey(children, { pivots: ['id'] })]
    );
    const { activeIds, onGroupClick } = useContext(MenuContext);
    return (
      <ThemedMenuGroup ref={ref} {...rest}>
        <MenuGroupTitle
          isActive={activeIds.includes(id)}
          onClick={() => onGroupClick(id)}
        >
          {title}
        </MenuGroupTitle>
        <Collapse isOpen={activeIds.includes(id)}>{content}</Collapse>
      </ThemedMenuGroup>
    );
  }
);

MenuGroup.displayName = 'MenuGroup';
