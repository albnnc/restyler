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
import { StyleProps } from '../../models';
import { hash } from '../../utils';
import { Collapse } from '../Collapse';
import { MenuContext } from './MenuContext';

export interface MenuGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    StyleProps {
  id: string;
  title: ReactNode;
}

export const MenuGroup = forwardRef<HTMLDivElement, MenuGroupProps>(
  ({ id, title, children, ...rest }, ref) => {
    const MenuGroupTitle = useThemed<'div', { isActive: boolean }>('div', {
      path: 'menu.group.title'
    });
    const MenuGroupItems = useThemed('div', { path: 'menu.group.items' });
    const ThemedMenuGroup = useThemed('div', { path: 'menu.group' });
    const content = useMemo(
      () => <MenuGroupItems>{children}</MenuGroupItems>,
      [
        Children.map(children, v =>
          isValidElement(v) ? v.key ?? v.props.id ?? hash(v.props) : v
        )?.join()
      ]
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
