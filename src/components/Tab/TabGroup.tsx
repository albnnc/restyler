import React, {
  cloneElement,
  forwardRef,
  Children,
  HTMLAttributes,
  ReactElement
} from 'react';
import { useTabManager, useThemed } from '../../hooks';
import { ThemeProps, TabManager } from '../../models';
import { TabOptionProps } from './TabOption';

export interface TabGroupProps
  extends Omit<
      HTMLAttributes<HTMLDivElement>,
      'value' | 'children' | 'onChange'
    >,
    ThemeProps {
  children: ReactElement<TabOptionProps> | ReactElement<TabOptionProps>[];
  manager?: TabManager;
  onChange?: (manager: TabManager) => void;
}

export const TabGroup = forwardRef<HTMLDivElement, TabGroupProps>(
  ({ children, manager, onChange, ...rest }, ref) => {
    const ThemedTabGroup = useThemed('div', { key: 'tab.group' });
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
  }
);

TabGroup.displayName = 'TabGroup';
