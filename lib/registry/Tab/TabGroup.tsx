import React, {
  cloneElement,
  forwardRef,
  Children,
  HTMLAttributes,
  ReactElement
} from 'react';
import { useTabManager } from '../../hooks';
import { ComponentFactory, StyleProps, TabManager } from '../../models';
import { TabOptionProps } from './TabOption';

export interface TabGroupProps
  extends Omit<
      HTMLAttributes<HTMLDivElement>,
      'value' | 'children' | 'onChange'
    >,
    StyleProps {
  children: ReactElement<TabOptionProps>[];
  manager?: TabManager;
  onChange?: (manager: TabManager) => void;
}

export const createTabGroup: ComponentFactory<
  HTMLDivElement,
  TabGroupProps
> = ({ themed }) => {
  const ThemedTabGroup = themed('div', { path: 'tab.group' });

  return forwardRef(({ children, manager, onChange, ...rest }, ref) => {
    const defaultTabId = children[0]?.props?.id;
    const innerManager = useTabManager(defaultTabId);
    const targetManager = manager ?? innerManager;

    const childrenWithProps = Children.map(
      children,
      (child: ReactElement<TabOptionProps>) => {
        return cloneElement(child, {
          isActive: targetManager.activeId === child.props.id,
          onClick: () => {
            targetManager.setActiveId(child.props.id);
            onChange?.(targetManager);
          }
        });
      }
    );

    return (
      <ThemedTabGroup ref={ref} {...rest}>
        {childrenWithProps}
      </ThemedTabGroup>
    );
  });
};
